document.addEventListener('DOMContentLoaded', () => {
    const DRAG_SELECTOR = '[data-drag-enabled="true"]';

    // 1. Check if we are on Desktop (width > 768px)
    const isDesktop = window.innerWidth > 768;

    if (!isDesktop) {
        // If mobile, do nothing (drag disabled)
        return;
    }

    // 2. Show a "Tip" to the user with a loop
    function showTipLoop() {
        // Create tip element
        const tip = document.createElement('div');
        tip.className = 'drag-tip-toast';
        tip.innerHTML = '<i class="fa-solid fa-hand-pointer"></i> <span>Tip: You can drag & rearrange everything!</span>';
        document.body.appendChild(tip);

        // Trigger animation (allow DOM to render first)
        requestAnimationFrame(() => {
            tip.classList.add('show');
        });

        // Hide after 10 seconds
        setTimeout(() => {
            tip.classList.remove('show');

            // Remove from DOM after fade out (0.5s)
            setTimeout(() => {
                tip.remove();

                // Show again after 5 seconds
                setTimeout(showTipLoop, 5000);
            }, 500);
        }, 10000);
    }

    // Start the tip loop
    showTipLoop();

    let isDragging = false;

    // Global click handler to prevent navigation if we just finished dragging
    document.addEventListener('click', (e) => {
        const target = e.target.closest(DRAG_SELECTOR);
        if (target) {
            // Check if this specific element was just dragged
            if (target.getAttribute('data-was-dragged') === 'true') {
                e.preventDefault();
                e.stopPropagation();
                // Reset the flag immediately so future clicks work
                target.setAttribute('data-was-dragged', 'false');
                return false;
            }
        }
    }, true); // Capture phase is crucial here

    // Initialize Interact.js
    interact(DRAG_SELECTOR).draggable({
        inertia: true,
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: 'body', // Allow dragging anywhere on the page
                endOnly: false       // Stop at edge instead of snapping back at the end
            })
        ],
        autoScroll: {
            container: window,
            margin: 50,
            speed: 300
        },
        listeners: {
            start(event) {
                isDragging = true;
                const target = event.target;
                target.classList.add('is-dragging');
                target.style.willChange = 'transform';
                target.setAttribute('data-was-dragged', 'false'); // Reset start

                // If dragging a button, detach it from the container so it moves independently
                if (target.classList.contains('link-btn')) {
                    target.style.zIndex = '9999';

                    // Check if it's already directly in body
                    if (target.parentElement !== document.body) {
                        // Calculate current absolute position
                        const rect = target.getBoundingClientRect();
                        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

                        // Move to body
                        document.body.appendChild(target);

                        // Set absolute position to match where it was visually
                        target.style.position = 'absolute';
                        target.style.left = '0px';
                        target.style.top = '0px';
                        target.style.width = `${rect.width}px`; // Maintain width

                        // Reset transform and apply initial position via transform
                        // We use transform for dragging, so we set the initial transform to its current page position
                        const initialX = rect.left + scrollLeft;
                        const initialY = rect.top + scrollTop;

                        target.style.transform = `translate(${initialX}px, ${initialY}px)`;
                        target.setAttribute('data-x', initialX);
                        target.setAttribute('data-y', initialY);
                    }
                }

                // Stop propagation so parent doesn't drag if we drag a child
                event.stopPropagation();
            },
            move(event) {
                const target = event.target;
                // keep the dragged position in the data-x/data-y attributes
                const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                // translate the element
                target.style.transform = `translate(${x}px, ${y}px)`;

                // update the posiion attributes
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);

                // Mark as dragged only if moved significantly (e.g. > 2px total)
                // For simplicity, we assume any move event is a drag
                target.setAttribute('data-was-dragged', 'true');
            },
            end(event) {
                const target = event.target;
                target.classList.remove('is-dragging');
                target.style.willChange = 'auto';

                // We do NOT reset data-was-dragged here immediately.
                // The click event fires *after* the drag end.
                // We let the click handler consume the flag.

                // However, if no click happens (e.g. dropped on empty space), we should reset it eventually
                setTimeout(() => {
                    isDragging = false;
                    target.setAttribute('data-was-dragged', 'false');
                }, 100);
            }
        }
    });
});
