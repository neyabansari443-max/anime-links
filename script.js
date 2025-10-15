const PRODUCTS = [
  { id:1, name:"Naruto Figure", imageURL:"./products/Naruto Figure.webp", description:"Limited edition Uzumaki Naruto figurine, highly detailed, perfect for collectors and anime fans.", affiliateLink:"#affiliate_link_01" },
  { id:2, name:"AOT T-Shirt", imageURL:"./products/AOT T-Shirt.jpg", description:"Official Attack on Titan Survey Corps logo shirt, premium cotton, all sizes available.", affiliateLink:"#affiliate_link_02" },
  { id:3, name:"Demon Slayer Mug", imageURL:"./products/Demon Slayer Mug.jpg", description:"Ceramic mug featuring Tanjiro Kamado, microwave safe, full color print.", affiliateLink:"#affiliate_link_03" },
  { id:4, name:"One Piece Cap", imageURL:"./products/One Piece Cap.webp", description:"Snapback cap, Straw Hat Pirates theme, adjustable, sturdy embroidery.", affiliateLink:"#affiliate_link_04" },
  { id:5, name:"Dragon Ball Poster", imageURL:"./products/Dragon ball poster.webp", description:"High-res wall poster of Goku, A2 size, colorfast and tear-resistant.", affiliateLink:"#affiliate_link_05" },
  { id:6, name:"Pokemon Ball Belt", imageURL:"./products/Pokemon Ball Belt.webp", description:"Official Pokemon Trainer belt with two Poké Balls and Pikachu figurine.", affiliateLink:"#affiliate_link_06" },
  { id:7, name:"My Hero Academia Keychain", imageURL:"./products/My Hero Keychain.jpg", description:"Acrylic keychain set featuring Midoriya and other heroes, sturdy clasp.", affiliateLink:"#affiliate_link_07" },
  { id:8, name:"Ken Kaneki Figure", imageURL:"./products/Ghoul Mask.webp", description:"A collectible figurine of Ken Kaneki from Tokyo Ghoul.", affiliateLink:"#affiliate_link_08" },
  { id:9, name:"Sailor Moon Pen", imageURL:"./products/Sailor Moon Pen.webp", description:"Moon Stick ballpen, cute collectible for journaling and drawing.", affiliateLink:"#affiliate_link_09" },
  { id:10, name:"Bleach Hoodie", imageURL:"./products/Bleach Hoodie.jpg", description:"Thick fleece hoodie with Ichigo design, kangaroo pocket, unisex fit.", affiliateLink:"#affiliate_link_10" },
  { id:11, name:"Haikyuu T-Shirt", imageURL:"./products/Haikyuu Shorts.jpg", description:"Karasuno volleyball club T-shirt, moisture-wick material, various sizes.", affiliateLink:"#affiliate_link_11" },
  { id:12, name:"Spy x Family Notebook", imageURL:"./products/Spy Notebook.jpg", description:"Hardcover notebook with Anya Forger, 120 blank creamy pages.", affiliateLink:"#affiliate_link_12" },
  { id:13, name:"Gojo figure", imageURL:"./products/Gojo.webp", description:"A collectible figurine of Gojo Satoru from Jujutsu Kaisen.", affiliateLink:"#affiliate_link_13" },
  { id:14, name:"Kurosaki Ring", imageURL:"./products/Kurosaki Ring.jpg", description:"Adjustable metal ring inspired by Ichigo's Hollow mask, nickel-free.", affiliateLink:"#affiliate_link_14" },
  { id:15, name:"Attack Titan Figure", imageURL:"./products/Titan Figure.webp", description:"Colossal Titan figure, detailed sculpt, limited edition run.", affiliateLink:"#affiliate_link_15" },
  { id:16, name:"Nezuko Figure", imageURL:"./products/Nezuko.webp", description:"A fun collectible figurine of Nezuko from Demon Slayer.", affiliateLink:"#affiliate_link_16" },
  { id:17, name:"Zenitsu Figure", imageURL:"./products/Zenitsu.webp", description:"A collectible figurine of Zenitsu from Demon Slayer with vivid colors.", affiliateLink:"#affiliate_link_17" },
  { id:18, name:"DBZ Badge", imageURL:"./products/DBZ Badge.webp", description:"A collectible badge featuring iconic Dragon Ball Z imagery.", affiliateLink:"#affiliate_link_18" },
  { id:19, name:"Light Yagami Figure", imageURL:"./products/Death Note.webp", description:"A collectible figurine of Light from Death Note, holding the journal.", affiliateLink:"#affiliate_link_19" },
  { id:20, name:"Inosuke Figure", imageURL:"./products/Inosuke.webp", description:"Inosuke Hashibira collectible figure from Demon Slayer, highly detailed.", affiliateLink:"#affiliate_link_20" }
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