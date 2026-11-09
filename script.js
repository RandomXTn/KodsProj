// Produits et prix recopiés depuis les pages du catalogue de référence.
// Les descriptions, matières et variantes sont à confirmer sur la fiche source.
const products = [
{name:'Bague “Bubble”',category:'Bague',price:'29,00',sold:false,photo:'bague-bubble.webp',url:'bague-bubble'},
{name:'Bague “Prestige”',category:'Bague',price:'32,00',sold:true,photo:'bague-prestige.webp',url:'bague-prestige'},
{name:'Bague “Classy”',category:'Bague',price:'29,00',sold:false,photo:'bague-classy.webp',url:'bague-classy-3'},
{name:'Bague “Dimaond Curve”',category:'Bague',price:'32,00',sold:false,photo:'bague-dimaond-curve.webp',url:'bague-dimaond-curve'},
{name:'Bague “Gold Heart”',category:'Bague',price:'32,00',sold:false,photo:'bague-gold-heart.webp',url:'bague-gold-heart'},
{name:'Bague “Solara”',category:'Bague',price:'32,00',sold:true,photo:'bague-solara.webp',url:'bague-solara'},
{name:'Set “Oria”',category:'Set',price:'99,00',sold:false,photo:'set-oria.webp',url:'set-oria'},
{name:'Set “Diana”',category:'Set',price:'199,00',sold:false,photo:'set-diana.webp',url:'set-diana'},
{name:'Rangement “Muse”',category:'Rangement',price:'29,90',sold:false,photo:'rangement-muse.webp',url:'muse',variants:'Beige'},
{name:'Boucle “Classy”',category:'Boucle',price:'69,00',sold:false,photo:'boucle-classy.webp',url:'boucle-classy'},
{name:'Boucle “Oria”',category:'Boucle',price:'79,00',sold:false,photo:'boucle-oria.webp',url:'boucle-oria'},
{name:'Boucle “Nolia”',category:'Boucle',price:'89,00',sold:true,photo:'boucle-nolia.webp',url:'boucle-nolia'},
{name:'Bague “Orlina”',category:'Bague',price:'89,00',sold:false,photo:'bague-orlina.webp',url:'bague-orlina'},
{name:'Bague “Florea”',category:'Bague',price:'89,00',sold:true,photo:'bague-florea.webp',url:'bague-florea'},
{name:'Bague “Pink Blush”',category:'Bague',price:'99,00',sold:false,photo:'bague-pink-blush.webp',url:'bague-pink-blush'},
{name:'Bague “Purple Blush”',category:'Bague',price:'99,00',sold:false,photo:'bague-purple-blush.webp',url:'bague-purple-blush'},
{name:'Collier “Aurea”',category:'Collier',price:'89,00',sold:false,photo:'collier-aurea.webp',url:'collier-liora-2'},
{name:'Collier “Lotusia”',category:'Collier',price:'89,00',sold:true,photo:'collier-lotusia.webp',url:'collier-lotusia'},
{name:'Collier “Liora”',category:'Collier',price:'89,00',sold:false,photo:'collier-liora.webp',url:'collier-liora'},
{name:'Bracelet “Ora”',category:'Bracelet',price:'99,00',sold:false,photo:'bracelet-ora.webp',url:'bracelet-ora'},
{name:'Bracelet “Radiant”',category:'Bracelet',price:'109,00',sold:false,photo:'bracelet-radiant.webp',url:'bracelet-radiant'},
{name:'Set “Zircon Glow”',category:'Set',price:'149,00',sold:false,photo:'set-zircon-glow.webp',url:'set-zircon-glow'},
{name:'Set “Arabesque”',category:'Set',price:'189,00',sold:false,photo:'set-arabesque.webp',url:'set-arabesque'},
{name:'Collier “Floating Flower”',category:'Collier',price:'89,00',sold:false,photo:'collier-floating-flower.webp',url:'collier-floating-flower'},
{name:'Collier “Azur”',category:'Collier',price:'129,00',sold:false,photo:'collier-azur.webp',url:'collier-azur'},
{name:'Collier “Promise”',category:'Collier',price:'89,00',sold:false,photo:'collier-promise.webp',url:'collier-promise'},
{name:'Collier “Strass”',category:'Collier',price:'69,00',sold:true,photo:'collier-strass.webp',url:'collier-strass'},
{name:'Collier “Square”',category:'Collier',price:'89,00',sold:false,photo:'https://opierre.tn/wp-content/uploads/2026/10/Opierre-Silver-Cushion-Halo-Solitaire-Necklace-600x600-1.png',url:'collier-square'},
{name:'Collier “Diana”',category:'Collier',price:'89,00',sold:false,photo:'collier-diana.webp',url:'collier-diana'},
{name:'Collier “Blush Garden”',category:'Collier',price:'149,00',sold:false,photo:'collier-blush-garden.webp',url:'collier-blush-garden'},
{name:'Collier “Pinky”',category:'Collier',price:'79,00',sold:false,photo:'collier-pinky.webp',url:'collier-pinky'},
{name:'Collier “Gold Eternal”',category:'Collier',price:'89,00',sold:false,photo:'collier-gold-eternal.webp',url:'collier-gold-eternal'},
{name:'Collier “White Eternal”',category:'Collier',price:'89,00',sold:false,photo:'collier-white-eternal.webp',url:'collier-white-eternal'},
{name:'Collier “Purple Blush”',category:'Collier',price:'139,00',sold:false,photo:'collier-purple-blush.webp',url:'collier-purple-blush'},
{name:'Collier “White Blush”',category:'Collier',price:'139,00',sold:false,photo:'collier-white-blush.webp',url:'collier-white-blush'},
{name:'Set “Precious”',category:'Set',price:'149,00',sold:true,photo:'set-precious.webp',url:'set-previous'},
{name:'Duo “Precious”',category:'Special Edition',price:'67,15',sold:true,photo:'duo-precious.webp',url:'duo-precious'},
{name:'Royal Blush',category:'Special Edition',price:'220,15',sold:true,photo:'https://opierre.tn/wp-content/uploads/2026/10/IMG_2459-scaled-1024x1024.jpg',url:'royal-blush'},
{name:'Infinite Glow',category:'Special Edition',price:'245,65',sold:false,photo:'infinite-glow.webp',badge:'-15%',url:'infinite-glow'},
{name:'Precious Bloom',category:'Special Edition',price:'135,15',sold:false,photo:'precious-bloom.webp',badge:'-15%',url:'precious-bloom'},
{name:'Golden Weave',category:'Special Edition',price:'118,15',sold:false,photo:'golden-weave.webp',badge:'-15%',url:'golden-weave'},
{name:'Pearl Glow',category:'Special Edition',price:'109,65',sold:true,photo:'pearl-glow.webp',url:'pearl-glow'},
{name:'Golden Petals',category:'Special Edition',price:'169,15',sold:true,photo:'golden-petals.webp',url:'golden-petals'},
{name:'Glowy',category:'Special Edition',price:'126,65',sold:false,photo:'glowy.webp',badge:'-15%',url:'glowy'},
{name:'Montre “Signature”',category:'Montre',price:'159,00',sold:false,photo:'montre-signature.webp',url:'montre-signature'},
{name:'Collier “White Tree”',category:'Collier',price:'79,00',sold:true,photo:'collier-white-tree.webp',url:'collier-white-tree'},
{name:'Collier “Purple Flower”',category:'Collier',price:'89,00',sold:true,photo:'collier-purple-flower.webp',url:'collier-purple-flower'}
];
const grid=document.querySelector('#product-grid'),search=document.querySelector('#search'),category=document.querySelector('#category'),resultCount=document.querySelector('#result-count'),noResults=document.querySelector('#no-results');
let cart=JSON.parse(localStorage.getItem('elora-cart-items')||'{}'),favorites=JSON.parse(localStorage.getItem('elora-favorites')||'[]');
const params=new URLSearchParams(location.search);if(search&&params.has('q'))search.value=params.get('q');if(category&&params.has('categorie'))category.value=params.get('categorie');
const fallback={Bague:'bague-gold-pierre-irisee.webp',Collier:'visuel-categorie-design.webp',Bracelet:'photo-produit-2026-10-01.webp',Boucle:'visuel-categorie-design-1.webp',Set:'campagne-set-oria.webp',SpecialEdition:'visuel-categorie-6.webp',Montre:'photo-produit-2025-09.webp',Rangement:'visuel-boutique-ccc.webp'};
function photoFor(product){if(product.photo)return product.photo.startsWith('http')?product.photo:`images/${product.photo}`;return `images/${fallback[product.category==='Special Edition'?'SpecialEdition':product.category]||'visuel-categorie-design.webp'}`}
function countCart(){return Object.values(cart).reduce((total,n)=>total+Number(n),0)}
function saveCart(){localStorage.setItem('elora-cart-items',JSON.stringify(cart));updateCart()}
function updateCart(){document.querySelectorAll('[data-cart-count]').forEach(node=>node.textContent=countCart())}
function card(product){const key=product.name.replaceAll('"','&quot;'),saved=favorites.includes(product.name),photo=photoFor(product);return `<article class="product-card"><a class="product-visual has-photo" href="produit.html?slug=${encodeURIComponent(product.url)}"><img loading="lazy" src="${photo}" alt="${key}"><span class="product-badge">${product.badge || ""}</span></a><div class="product-meta"><span>${product.category}</span><button class="favorite ${saved?'is-favorite':''}" data-favorite="${key}" aria-label="${saved?'Retirer des':'Ajouter aux'} favoris">${saved?'♥':'♡'}</button></div><h2><a href="produit.html?slug=${encodeURIComponent(product.url)}">${key}</a></h2><p class="product-detail">${product.sold?'Épuisé sur la source':'Statut à vérifier'}${product.variants?` · Options : ${product.variants}`:''}</p><div class="product-buy"><strong>${product.price} DT</strong><a class="source-link" href="produit.html?slug=${encodeURIComponent(product.url)}">Voir le produit ↗</a><button class="add-to-cart" data-add="${product.url}" ${product.sold?'disabled':''}>${product.sold?'Épuisé':'Ajouter au panier +'}</button></div></article>`}
function renderProducts(){if(!grid)return;const query=(search?.value||'').trim().toLocaleLowerCase('fr'),selected=category?.value||'';const shown=products.filter(product=>product.name.toLocaleLowerCase('fr').includes(query)&&(!selected||product.category===selected));grid.innerHTML=shown.map(card).join('');if(resultCount)resultCount.textContent=`${shown.length} produit${shown.length>1?'s':''}`;if(noResults)noResults.hidden=shown.length>0;updateCart()}
function findProduct(){const slug=new URLSearchParams(location.search).get('slug');return products.find(product=>product.url===slug)}
function renderDetail(){const root=document.querySelector('#product-detail');if(!root)return;const product=findProduct();if(!product){root.innerHTML='<p>Produit introuvable. <a href="produits.html">Retour à la boutique</a></p>';return}document.title=`${product.name} — ELORA`;const visual=photoFor(product);root.innerHTML=`<nav class="breadcrumbs"><a href="index.html">Accueil</a> / <a href="produits.html">Boutique</a> / ${product.category}</nav><div class="detail-layout"><div class="detail-photo"><img src="${visual}" alt="${product.name}"></div><div class="detail-copy"><p class="eyebrow">${product.category.toUpperCase()}</p><h1>${product.name}</h1><strong class="detail-price">${product.price} DT</strong><p>${product.sold?'Ce produit apparaît épuisé dans le relevé source.':'Disponibilité actuelle à vérifier auprès de la boutique.'}</p><p>${product.variants?`Options visibles dans le relevé : ${product.variants}.`:''}</p><p>Consultez la fiche source pour les détails exacts du modèle, sa matière et ses caractéristiques.</p><div class="detail-actions"><button class="button" data-add="${product.url}" ${product.sold?'disabled':''}>${product.sold?'Épuisé':'Ajouter au panier'}</button><button class="button button-light" data-favorite="${product.name}">♡ Favoris</button></div><a class="source-link" target="_blank" rel="noopener" href="https://opierre.tn/product/${product.url}/">Consulter la fiche source ↗</a></div></div><section class="section related"><div class="section-heading"><h2>Vous aimerez aussi</h2><a href="produits.html" class="text-link">Voir toute la boutique</a></div><div class="product-grid">${products.filter(item=>item.category===product.category&&item.url!==product.url).slice(0,4).map(card).join('')}</div></section>`}
function renderCategory(){const root=document.querySelector('#category-page');if(!root)return;const slug=new URLSearchParams(location.search).get('cat')||'';const names={bagues:['Bagues','Bague'],colliers:['Colliers','Collier'],bracelets:['Bracelets','Bracelet'],boucles:['Boucles','Boucle'],sets:['Sets et parures','Set'],editions:['Special Edition','Special Edition'],montres:['Montres','Montre'],accessoires:['Accessoires','Rangement']};const entry=names[slug]||names.bagues;const shown=products.filter(p=>p.category===entry[1]);root.innerHTML=`<section class="page-hero"><p class="eyebrow">COLLECTION ELORA</p><h1>${entry[0]}</h1><p>Explorez la sélection ELORA dans cette catégorie.</p></section><section class="section catalog"><div class="product-grid">${shown.map(card).join('')}</div></section>`;document.title=`${entry[0]} — ELORA`}
function renderCart(){const root=document.querySelector('#cart-page');if(!root)return;const rows=Object.entries(cart).map(([slug,qty])=>({product:products.find(p=>p.url===slug),qty})).filter(row=>row.product);const subtotal=rows.reduce((n,row)=>n+Number(row.product.price.replace(',','.'))*row.qty,0);root.innerHTML=`<section class="page-hero"><p class="eyebrow">ELORA</p><h1>Votre panier</h1><p>Panier de démonstration locale — aucune commande ni paiement réel.</p></section><section class="section cart-layout">${rows.length?`<div class="cart-lines">${rows.map(({product,qty})=>`<article class="cart-line"><img src="${photoFor(product)}" alt="${product.name}"><div><h2>${product.name}</h2><p>${product.price} DT</p><label>Quantité <input type="number" min="1" value="${qty}" data-qty="${product.url}"></label><button data-remove="${product.url}">Retirer</button></div></article>`).join('')}</div><aside class="cart-summary"><h2>Résumé</h2><p>Sous-total <strong>${subtotal.toFixed(2)} DT</strong></p><p>Livraison et paiement à confirmer avec ELORA.</p><a class="button" href="checkout.html">Continuer (démo)</a></aside>`:`<div class="empty-cart"><h2>Votre panier est vide.</h2><a class="button" href="produits.html">Découvrir la boutique</a></div>`}</section>`}
function renderWishlist(){const root=document.querySelector('#wishlist-page');if(!root)return;root.innerHTML=`<section class="page-hero"><p class="eyebrow">VOS FAVORIS</p><h1>Ma liste d’envies</h1></section><section class="section"><div class="product-grid">${products.filter(p=>favorites.includes(p.name)).map(card).join('')||'<p>Aucun favori enregistré pour le moment.</p>'}</div></section>`}
document.addEventListener('click',event=>{const add=event.target.closest('[data-add]'),favorite=event.target.closest('[data-favorite]'),remove=event.target.closest('[data-remove]');if(add){const candidate=products.find(p=>p.url===add.dataset.add||p.name===add.dataset.add);if(candidate){const slug=candidate.url;cart[slug]=Number(cart[slug]||0)+1;saveCart();const old=add.textContent;add.textContent='Ajouté ✓';setTimeout(()=>add.textContent=old,1000)}}if(favorite){const name=favorite.dataset.favorite;favorites=favorites.includes(name)?favorites.filter(item=>item!==name):[...favorites,name];localStorage.setItem('elora-favorites',JSON.stringify(favorites));renderProducts();renderWishlist()}if(remove){delete cart[remove.dataset.remove];saveCart();renderCart()}});
document.addEventListener('change',event=>{const slug=event.target.dataset.qty;if(slug){cart[slug]=Math.max(1,Number(event.target.value)||1);saveCart();renderCart()}});
search?.addEventListener('input',renderProducts);category?.addEventListener('change',renderProducts);const menuButton=document.querySelector('.menu-toggle');menuButton?.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')==='true';menuButton.setAttribute('aria-expanded',String(!open));document.querySelector('.nav')?.classList.toggle('nav-open',!open)});document.querySelectorAll('[data-year]').forEach(node=>node.textContent=new Date().getFullYear());const form=document.querySelector('#contact-form');form?.addEventListener('submit',event=>{event.preventDefault();document.querySelector('#form-status').textContent='Démo : le message ne part pas. Contactez-nous par WhatsApp ou Instagram.'});renderProducts();renderDetail();renderCategory();renderCart();renderWishlist();updateCart();


// Diaporama de photos dans le bandeau d’accueil.
const heroSlides=[...document.querySelectorAll('.store-hero-slides img')];
const heroDots=[...document.querySelectorAll('.hero-pager button')];
let currentHeroSlide=0;
function showHeroSlide(index){
  heroSlides.forEach((slide,i)=>slide.classList.toggle('is-active',i===index));
  heroDots.forEach((dot,i)=>dot.classList.toggle('current',i===index));
  currentHeroSlide=index;
}
heroDots.forEach((dot,i)=>dot.addEventListener('click',()=>showHeroSlide(i)));
if(heroSlides.length>1){setInterval(()=>showHeroSlide((currentHeroSlide+1)%heroSlides.length),5000)}
