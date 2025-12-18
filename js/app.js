async function loadJSON(path) {
const res = await fetch(path);
return res.json();
}


function showToast() {
const toast = document.getElementById('toast');
toast.classList.add('show');
setTimeout(() => toast.classList.remove('show'), 1800);
}


(async function init() {
const config = await loadJSON('data/site-config.json');
document.getElementById('hero-title').textContent = config.hero_title;
document.getElementById('hero-subtitle').textContent = config.hero_subtitle;


const offers = await loadJSON('data/offers.json');
const container = document.getElementById('offers');


offers.forEach((offer, index) => {
const el = document.createElement('div');
el.className = 'offer';


el.innerHTML = `
${offer.badge ? `<div class="badge">
  <img src="${offer.badge}" alt="${offer.brand} logo">
</div>` : ''}
<h3>${offer.brand}</h3>
<p>${offer.description}</p>
<p class="promo" data-code="${offer.promo_code}">Промокод: ${offer.promo_code}</p>
<p>Діє до: ${offer.valid_until}</p>
<a href="${offer.url}" class="cta" target="_blank">${offer.cta_text}</a>
`;


el.querySelector('.promo').addEventListener('click', () => {
navigator.clipboard.writeText(offer.promo_code);
showToast();
});


el.querySelector('.cta').addEventListener('click', () => {
if (window.gtag) {
gtag('event', 'click_offer', {
offer_id: offer.id,
brand: offer.brand,
position: index + 1
});
}
});


container.appendChild(el);
});

})();

