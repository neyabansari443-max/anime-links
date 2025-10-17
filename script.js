const PRODUCTS = [
  { id:1, name:"Naruto Figure", imageURL:"./products/Naruto Figure.jpg", description:"Limited edition Uzumaki Naruto figurine, highly detailed, perfect for collectors and anime fans.", affiliateLink:"https://amzn.to/4nVuqSV" },
  { id:2, name:"AOT T-Shirt", imageURL:"./products/AOT T-Shirt.jpg", description:"Official Attack on Titan Survey Corps logo shirt, premium cotton, all sizes available.", affiliateLink:"https://amzn.to/47rqd3s" },
  { id:3, name:"Demon Slayer Mug", imageURL:"./products/Demon Slayer Mug.jpg", description:"Ceramic mug featuring Tanjiro Kamado, microwave safe, full color print.", affiliateLink:"https://amzn.to/46S3KfM" },
  { id:4, name:"One Piece Cap", imageURL:"./products/One Piece Cap.webp", description:"Snapback cap, Straw Hat Pirates theme, adjustable, sturdy embroidery.", affiliateLink:"https://amzn.to/4oiemdv" },
  { id:5, name:"Dragon Ball Poster", imageURL:"./products/Dragon ball poster.webp", description:"High-res wall poster of Goku, A2 size, colorfast and tear-resistant.", affiliateLink:"https://amzn.to/47iLZp0" },
  { id:6, name:"Pokemon Ball Belt", imageURL:"./products/Pokemon Ball Belt.webp", description:"Official Pokemon Trainer belt with two Poké Balls and Pikachu figurine.", affiliateLink:"https://amzn.to/4olcTDp" },
  { id:7, name:"My Hero Academia Keychain", imageURL:"./products/My Hero Keychain.jpg", description:"Acrylic keychain set featuring Midoriya and other heroes, sturdy clasp.", affiliateLink:"https://amzn.to/46SoCU6" },
  { id:8, name:"Ken Kaneki Figure", imageURL:"./products/Ghoul Mask.jpg", description:"A collectible figurine of Ken Kaneki from Tokyo Ghoul.", affiliateLink:"https://amzn.to/4nrBKEV" },
  { id:9, name:"Sailor Moon Pen", imageURL:"./products/Sailor Moon Pen.webp", description:"Moon Stick ballpen, cute collectible for journaling and drawing.", affiliateLink:"https://amzn.to/496GDzr" },
  { id:10, name:"Bleach Hoodie", imageURL:"./products/Bleach Hoodie.jpg", description:"Thick fleece hoodie with Ichigo design, kangaroo pocket, unisex fit.", affiliateLink:"https://amzn.to/3ILcHyk" },
  { id:11, name:"Haikyuu T-Shirt", imageURL:"./products/Haikyuu Shorts.jpg", description:"Karasuno volleyball club T-shirt, moisture-wick material, various sizes.", affiliateLink:"https://amzn.to/4qe2jja" },
  { id:12, name:"Spy x Family Notebook", imageURL:"./products/Spy Notebook.jpg", description:"Hardcover notebook with Anya Forger, 120 blank creamy pages.", affiliateLink:"https://amzn.to/4hdXtP2" },
  { id:13, name:"Gojo figure", imageURL:"./products/Gojo.jpg", description:"A collectible figurine of Gojo Satoru from Jujutsu Kaisen.", affiliateLink:"https://amzn.to/3WaZl1h" },
  { id:14, name:"Kurosaki Ring", imageURL:"./products/Kurosaki Ring.jpg", description:"Adjustable metal ring inspired by Ichigo's Hollow mask, nickel-free.", affiliateLink:"https://amzn.to/4q7xOvj" },
  { id:15, name:"Attack Titan Figure", imageURL:"./products/Titan Figure.jpg", description:"Colossal Titan figure, detailed sculpt, limited edition run.", affiliateLink:"https://amzn.to/47fiJ2k" },
  { id:16, name:"Nezuko Figure", imageURL:"./products/Nezuko.webp", description:"A fun collectible figurine of Nezuko from Demon Slayer.", affiliateLink:"https://amzn.to/3WGmTv6" },
  { id:17, name:"Zenitsu Figure", imageURL:"./products/Zenitsu.jpg", description:"A collectible figurine of Zenitsu from Demon Slayer with vivid colors.", affiliateLink:"https://amzn.to/46Tas59" },
  { id:18, name:"DBZ Badge", imageURL:"./products/DBZ Badge.webp", description:"A collectible badge featuring iconic Dragon Ball Z imagery.", affiliateLink:"https://amzn.to/4761hgw" },
  { id:19, name:"Light Yagami Figure", imageURL:"./products/Death Note.jpg", description:"A collectible figurine of Light from Death Note, holding the journal.", affiliateLink:"https://amzn.to/3J2lg80" },
  { id:20, name:"Inosuke Figure", imageURL:"./products/Inosuke.jpg", description:"Inosuke Hashibira collectible figure from Demon Slayer, highly detailed.", affiliateLink:"https://amzn.to/4hhjM6r" }
];

function renderCarousel(container, productsArray) {
  const renderCards = arr => arr.map(p => (
    `<div class='carousel-card' tabindex='0' data-id='${p.id}'>`+
    `<img class='carousel-img' src='${p.imageURL}' alt='${p.name}'>`+
    `<div class='carousel-label'>${p.name}</div>`+
    `</div>`)).join('');
  container.innerHTML = renderCards(productsArray) + renderCards(productsArray);
}

function renderCarouselDots(container, count) {
  let dots = '';
  for(let i=0;i<count;i++) dots += `<span class="carousel-dot"></span>`;
  container.innerHTML = dots;
}

function openModal(product) {
  document.getElementById('modal-img').src = product.imageURL;
  document.getElementById('modal-img').alt = product.name;
  document.getElementById('modal-title').textContent = product.name;
  document.getElementById('modal-desc').textContent = product.description;
  const cta = document.getElementById('modal-cta');
  cta.href = product.affiliateLink;
  document.getElementById('modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('modal').style.display = 'none';
  document.body.style.overflow = '';
}
document.addEventListener('DOMContentLoaded', () => {
  // Top carousel
  const topCarousel = document.getElementById('top-carousel');
  renderCarousel(topCarousel, PRODUCTS);
  // Dots for top carousel
  renderCarouselDots(document.getElementById('carousel-dots'), PRODUCTS.length);
  // Bottom carousel
  renderCarousel(document.getElementById('bottom-carousel'), PRODUCTS);
  [topCarousel, document.getElementById('bottom-carousel')].forEach(carousel => {
    carousel.addEventListener('click', e => {
      let card = e.target;
      while (card && !card.classList.contains('carousel-card')) card = card.parentElement;
      if (card) {
        const product = PRODUCTS.find(p => p.id === Number(card.getAttribute('data-id')));
        if (product) openModal(product);
      }
    });
    carousel.addEventListener('keydown', e => {
      if ((e.key === "Enter" || e.key === " ") && e.target.classList.contains('carousel-card')) {
        const product = PRODUCTS.find(p => p.id === Number(e.target.getAttribute('data-id')));
        if (product) openModal(product);
      }
    });
    // Desktop animation pause
    carousel.addEventListener('mouseenter', () => { carousel.style.animationPlayState = 'paused'; });
    carousel.addEventListener('mouseleave', () => { carousel.style.animationPlayState = 'running'; });
    // Touch scroll stop/resume
    carousel.addEventListener('touchstart', ()=>carousel.style.animationPlayState='paused');
    carousel.addEventListener('touchend', ()=>carousel.style.animationPlayState='running');
  });
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal').addEventListener('click', e => {
    if (e.target === document.getElementById('modal')) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === "Escape") closeModal();
  });
});

//end
