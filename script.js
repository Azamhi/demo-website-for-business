(() => {
  "use strict";
  const PHONE = "918294241261";
  const EMAIL = "azamali8294@gmail.com";
  const products = {
    business: {name:"Business Pro", price:10999, category:"Business Website", description:"Company or agency website design"},
    ecommerce: {name:"ShopLaunch", price:12999, category:"Online Store", description:"E-commerce storefront design concept"},
    restaurant: {name:"Saffron Table", price:9999, category:"Restaurant Website", description:"Restaurant, menu and dining website"},
    portfolio: {name:"Creator Portfolio", price:7999, category:"Personal Portfolio", description:"Personal portfolio and work showcase"},
    coaching: {name:"Coach & Consult", price:8999, category:"Coaching Website", description:"Coach or consultant lead-generation website"},
    realestate: {name:"Estate One", price:11999, category:"Real Estate Website", description:"Property showcase website"}
  };
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  let cart = [];
  let activeFilter = "All";
  let toastTimer;
  const money = n => "₹" + Number(n).toLocaleString("en-IN");
  const toast = message => {
    const el = $("#toast"); el.textContent = message; el.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove("show"), 2400);
  };
  const saveCart = () => { try { sessionStorage.setItem("webstore-cart", JSON.stringify(cart)); } catch(e) {} };
  try { cart = JSON.parse(sessionStorage.getItem("webstore-cart") || "[]"); if (!Array.isArray(cart)) cart=[]; } catch(e) { cart=[]; }
  cart = cart.filter(id => products[id]);
  const count = () => cart.length;
  function renderCart() {
    $("#cart-count").textContent = count();
    $("#drawer-count").textContent = `(${count()})`;
    $("#cart-items").innerHTML = cart.map((id, i) => {
      const p=products[id];
      return `<div class="cart-item"><div class="cart-thumb">${p.name.split(" ").map(x=>x[0]).join("").slice(0,2)}</div><div><h4>${p.name}</h4><p>${money(p.price)} · ${p.category}</p></div><button class="remove-item" data-remove="${i}" aria-label="Remove ${p.name}">×</button></div>`;
    }).join("");
    const empty = count()===0;
    $("#cart-empty").hidden = !empty; $("#cart-footer").hidden = empty;
    $("#cart-total").textContent = money(cart.reduce((sum,id)=>sum+products[id].price,0));
    saveCart();
  }
  function openCart() {
    $("#cart-overlay").hidden=false; $("#cart-drawer").classList.add("open");
    $("#cart-drawer").setAttribute("aria-hidden","false"); document.body.style.overflow="hidden";
  }
  function closeCart() {
    $("#cart-overlay").hidden=true; $("#cart-drawer").classList.remove("open");
    $("#cart-drawer").setAttribute("aria-hidden","true"); document.body.style.overflow="";
  }
  $("#cart-open").addEventListener("click",openCart);
  $("#cart-close").addEventListener("click",closeCart);
  $("#cart-overlay").addEventListener("click",closeCart);
  $("#continue-shopping").addEventListener("click",()=>{closeCart();$("#websites").scrollIntoView({behavior:"smooth"});});
  document.addEventListener("keydown",e=>{if(e.key==="Escape")closeCart();});
  document.addEventListener("click", e => {
    const add=e.target.closest("[data-add]");
    if(add){const id=add.dataset.add;if(!cart.includes(id)){cart.push(id);renderCart();toast(products[id].name+" added to cart");}else{toast("This website is already in your cart");}return;}
    const remove=e.target.closest("[data-remove]");
    if(remove){cart.splice(Number(remove.dataset.remove),1);renderCart();return;}
    const details=e.target.closest("[data-details]");
    if(details){const p=products[details.dataset.details];const msg=`Hi Azam, I'm interested in the ${p.name} (${money(p.price)} starting price). Please share the package details, customization options and timeline.`;window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`,"_blank","noopener");}
  });
  $("#clear-cart").addEventListener("click",()=>{cart=[];renderCart();toast("Cart cleared");});
  $("#checkout-button").addEventListener("click",()=>{
    if(!cart.length)return;
    const lines=cart.map(id=>`• ${products[id].name} — ${money(products[id].price)}`).join("\n");
    const total=cart.reduce((sum,id)=>sum+products[id].price,0);
    const message=`Hi Azam, I'd like to enquire about these website designs:\n\n${lines}\n\nEstimated starting total: ${money(total)}\n\nPlease confirm the deliverables, customization, timeline and payment terms.`;
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`,"_blank","noopener");
  });
  function filterProducts(){
    const query=$("#search-input").value.trim().toLowerCase();
    const sort=$("#sort-select").value;
    const cards=$$(".product-card");
    cards.sort((a,b)=>sort==="low"?+a.dataset.price- +b.dataset.price:sort==="high"?+b.dataset.price- +a.dataset.price:0);
    cards.forEach(card=>{
      const category=card.dataset.category;
      const matchesCategory=activeFilter==="All"||category===activeFilter;
      const matchesQuery=(card.dataset.name+" "+category+" "+card.textContent).toLowerCase().includes(query);
      card.hidden=!(matchesCategory&&matchesQuery);
      $("#product-grid").appendChild(card);
    });
    $("#empty-state").hidden=cards.some(c=>!c.hidden);
  }
  $$(".filter-chip").forEach(btn=>btn.addEventListener("click",()=>{
    activeFilter=btn.dataset.filter;
    $$(".filter-chip").forEach(b=>b.classList.toggle("selected",b===btn));
    filterProducts();
  }));
  $("#search-input").addEventListener("input",filterProducts);
  $("#sort-select").addEventListener("change",filterProducts);
  $("#search-toggle").addEventListener("click",()=>{
    $("#search-box").scrollIntoView({behavior:"smooth",block:"center"});
    $("#search-input").focus();
  });
  const menuButton=$(".menu-toggle");
  menuButton.addEventListener("click",()=>{
    const nav=$(".nav-links"),open=nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded",String(open));menuButton.textContent=open?"×":"☰";
  });
  $$(".nav-links a").forEach(a=>a.addEventListener("click",()=>{$(".nav-links").classList.remove("open");menuButton.setAttribute("aria-expanded","false");menuButton.textContent="☰";}));
  $("#contact-form").addEventListener("submit", e => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const project = String(form.get("project") || "").trim();
    const details = String(form.get("message") || "").trim() || "No additional details";
    const message =
`Hello Azam! 👋

I want to enquire about your website design service.

👤 Name: ${name}
📧 Email: ${email}
🌐 Website Type: ${project}

📝 Project Details:
${details}

Please share the pricing, delivery time and next steps.

Thank you!`;
    const whatsappURL = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
    const newWindow = window.open(whatsappURL, "_blank", "noopener,noreferrer");
    // If a browser blocks a new tab, open WhatsApp in the current tab.
    if (!newWindow) window.location.href = whatsappURL;
  });
  $("#year").textContent=new Date().getFullYear();
  renderCart();
})();