// Constants
const ASIDE_ICON_ID = 'aside-icon';
const ICON_CLOSE_ID = 'icon-close';
const ASIDE_ID = 'aside';
const ASIDE_SHADOW_ID = 'aside-shadow';
const MINUS_ID = 'minus';
const PLUS_ID = 'plus';
const QUANTITY_FIELD_ID = 'quantityField';
const FORM_ADD_TO_CART_ID = 'form-addtocart';
const CART_CLASS = 'cart';
const BADGE_CLASS = 'badge';
const CONTAINER_CLASS = 'container';
const CART_BOX_CLASS = 'cart__box';
const CART_TITLE_CLASS = 'cart__title';
const CART_BODY_CLASS = 'cart__body';
const DELETE_BTN_CLASS = 'deleteBtn';

// Selectors
const asideIcon = document.getElementById(ASIDE_ICON_ID);
const iconClose = document.getElementById(ICON_CLOSE_ID);
const aside = document.getElementById(ASIDE_ID);
const asideShadow = document.getElementById(ASIDE_SHADOW_ID);
const minus = document.getElementById(MINUS_ID);
const plus = document.getElementById(PLUS_ID);
const quantityField = document.getElementById(QUANTITY_FIELD_ID);
const formAddToCart = document.getElementById(FORM_ADD_TO_CART_ID);
const cart = document.querySelector(`.${CART_CLASS}`);
const badge = document.querySelector(`.${BADGE_CLASS}`);
const container = document.querySelector(`.${CONTAINER_CLASS}`);

// Other variables
let count = 0;
const allProductsInCart = [];
let quantityProducts = allProductsInCart.length;
let cartBox;

// Event Listeners
asideIcon.addEventListener('click', toggleAside);
iconClose.addEventListener('click', closeAside);
document.addEventListener('DOMContentLoaded', initQuantityField);
minus.addEventListener('click', decreaseCount);
plus.addEventListener('click', increaseCount);
formAddToCart.addEventListener('submit', addToCart);
document.addEventListener('click', toggleCartBox);

// Functions
function toggleAside() {
  aside.classList.toggle('aside-show');
  asideShadow.classList.toggle('aside-show');
}

function closeAside() {
  aside.classList.remove('aside-show');
  asideShadow.classList.remove('aside-show');
}

function initQuantityField() {
  quantityField.value = count;
}

function decreaseCount() {
  count = Math.max(count - 1, 0);
  quantityField.value = count;
}

function increaseCount() {
  count = Math.min(count + 1, 100);
  quantityField.value = count;
}

function addToCart(e) {
  e.preventDefault();
  if (count > 0) {
    const titleHTML = document.querySelector('.product__title');
    const title = titleHTML.textContent;
    const priceHTML = document.querySelector('.price');
    const price = parseFloat(priceHTML.textContent.slice(1));
    const total = (count * price).toFixed(2);
    const productInCart = { title, price, count, total };
    quantityProducts++;
    allProductsInCart.push(productInCart);
    showBadgeQuantity();
    if (document.querySelector(`.${CART_BOX_CLASS}`).classList.contains('cart-box__show')) {
      showProductInCart();
    }
  }
}

function showBadgeQuantity() {
  badge.classList.toggle('show-badge', quantityProducts > 0);
  badge.innerText = quantityProducts;
}

function toggleCartBox(e) {
  const isClickInCart = cart.contains(e.target);
  const isClickInCartBox = cartBox && cartBox.contains(e.target);

  if (isClickInCart) {
    toggleCartBoxVisibility();
    if (cartBox.classList.contains('cart-box__show')) {
      showProductInCart();
    }
  } else if (cartBox && !isClickInCartBox && cartBox.classList.contains('cart-box__show')) {
    cartBox.classList.remove('cart-box__show');
  }
}

function toggleCartBoxVisibility() {
  if (!cartBox) {
    createCartBox();
  }
  cartBox.classList.toggle('cart-box__show');
}

function createCartBox() {
  cartBox = document.createElement('div');
  cartBox.classList.add(CART_BOX_CLASS);
  cartBox.innerHTML = `
    <h3 class="${CART_TITLE_CLASS}">Cart</h3>
    <div class="${CART_BODY_CLASS}"></div>`;
  container.appendChild(cartBox);
}

function showProductInCart() {
  const cartBody = document.querySelector(`.${CART_BODY_CLASS}`);
  if (quantityProducts > 0) {
    cartBody.innerHTML = makeHTMLProductsInCart().join('');
    const deleteBtn = document.querySelectorAll(`.${DELETE_BTN_CLASS}`);
    deleteBtn.forEach((d) => {
      d.addEventListener('click', deleteProductInCart);
    });
  } else {
    cartBody.innerHTML = `<p class="cart__empty">Your cart is empty.</p>`;
  }
}

function makeHTMLProductsInCart() {
  const allProductsInCartHTML = allProductsInCart.map((p, i) => `
    <div class="product-in-cart">
      <img class="product-in-cart-img" src="../images/image-product-1-thumbnail.jpg" alt="">
      <div>
        <p>${p.title}</p>
        <p>$${p.price} x ${p.count} <span class="bold very-dark-blue">$${p.total}</span></p>
      </div>
      <div class="${DELETE_BTN_CLASS}" data-index="${i}">
        <img src="../images/icon-delete.svg" alt="">
      </div>
    </div>`
  );
  allProductsInCartHTML.push(`<button class="btn product__add btn--checkout">Checkout</button>`);
  return allProductsInCartHTML;
}

function deleteProductInCart(e) {
  const clickedElement = e.currentTarget;
  const elementIndex = clickedElement.dataset.index;
  allProductsInCart.splice(elementIndex, 1);
  quantityProducts--;
  toggleCartBoxVisibility();
  showBadgeQuantity();
  showProductInCart();
}
