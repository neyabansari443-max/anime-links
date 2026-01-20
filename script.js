document.addEventListener('DOMContentLoaded', () => {
    const DRAG_SELECTOR = '[data-drag-enabled="true"]';

    // 1. Check if we are on Desktop (width > 768px)
    const isDesktop = window.innerWidth > 768;

    if (!isDesktop) {
        // If mobile, do nothing (drag disabled)
        return;
    }

    document.addEventListener('DOMContentLoaded', () => {
        const DRAG_SELECTOR = '[data-drag-enabled="true"]';

        const isDesktop = window.innerWidth > 768;

        if (!isDesktop) {
            return;
        }

        function showTipLoop() {
            const tip = document.createElement('div');
            tip.className = 'drag-tip-toast';
            tip.innerHTML = '<i class="fa-solid fa-hand-pointer"></i> <span>Tip: You can drag & rearrange everything!</span>';
            document.body.appendChild(tip);

            requestAnimationFrame(() => {
                tip.classList.add('show');
            });

            setTimeout(() => {
                tip.classList.remove('show');

                setTimeout(() => {
                    tip.remove();
                    setTimeout(showTipLoop, 5000);
                }, 500);
            }, 10000);
        }

        showTipLoop();

        let isDragging = false;

        document.addEventListener('click', (e) => {
            const target = e.target.closest(DRAG_SELECTOR);
            if (target) {
                if (target.getAttribute('data-was-dragged') === 'true') {
                    e.preventDefault();
                    e.stopPropagation();
                    target.setAttribute('data-was-dragged', 'false');
                    return false;
                }
            }
        }, true);

        interact(DRAG_SELECTOR).draggable({
            inertia: true,
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: 'body',
                    endOnly: false
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
                    target.setAttribute('data-was-dragged', 'false');

                    if (target.classList.contains('link-btn')) {
                        target.style.zIndex = '9999';

                        if (target.parentElement !== document.body) {
                            const rect = target.getBoundingClientRect();
                            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

                            document.body.appendChild(target);

                            target.style.position = 'absolute';
                            target.style.left = '0px';
                            target.style.top = '0px';
                            target.style.width = `${rect.width}px`;

                            const initialX = rect.left + scrollLeft;
                            const initialY = rect.top + scrollTop;

                            target.style.transform = `translate(${initialX}px, ${initialY}px)`;
                            target.setAttribute('data-x', initialX);
                            target.setAttribute('data-y', initialY);
                        }
                    }

                    event.stopPropagation();
                },
                move(event) {
                    const target = event.target;
                    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                    target.style.transform = `translate(${x}px, ${y}px)`;

                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);

                    target.setAttribute('data-was-dragged', 'true');
                },
                end(event) {
                    const target = event.target;
                    target.classList.remove('is-dragging');
                    target.style.willChange = 'auto';

                    setTimeout(() => {
                        isDragging = false;
                        target.setAttribute('data-was-dragged', 'false');
                    }, 100);
                }
            }
        });
    });
                // For simplicity, we assume any move event is a drag
