// Sidebar

const asideIcon = document.getElementById('aside-icon');
const iconClose = document.getElementById('icon-close');
const aside = document.getElementById('aside');
const asideShadow = document.getElementById('aside-shadow');

const minus = document.getElementById('minus');
const plus = document.getElementById('plus');
const quantity = document.getElementById('quantity');
const formAddToCart = document.getElementById('form-addtocart');

let count = 0
const allProductsInCart = [];

const cart = document.querySelector('.cart');
const badge = document.querySelector(".badge");
let quantityProducts = allProductsInCart.length;

asideIcon.addEventListener('click', () => {
  aside.classList.toggle('aside-show');
  asideShadow.classList.toggle('aside-show');
})

iconClose.addEventListener('click', () => {
  aside.classList.remove('aside-show');
  asideShadow.classList.remove('aside-show');
})


// Add product

document.addEventListener('DOMContentLoaded', () => {
  quantity.value = count;
})

minus.addEventListener('click', () => {
  count--
  if (count < 0) {
    count = 0;
  }
  quantity.value = count;
})

plus.addEventListener('click', () => {
  count++
  if (count > 100) {
    count = 100;
  }
  quantity.value = count;
})

formAddToCart.addEventListener('submit', (e) => {
  e.preventDefault();
  if (count > 0) {
    const titleHTML = document.querySelector('.product__title');
    const title = titleHTML.textContent;
    const priceHTML = document.querySelector('.price');
    let price = priceHTML.textContent.slice(1);
    const total = (count * parseFloat(price)).toFixed(2);
    let productInCart = {
      title,
      price,
      count,
      total
    }
    quantityProducts++;
    allProductsInCart.push(productInCart);

    showQuantity()

    if (document.querySelector('.cart__box').classList.contains('cart-box__show')) {
      showProductInCart();
    }
  }
})

// Show product quantity in cart

function showQuantity() {

  if (quantityProducts) {
    badge.classList.add("show-badge");
    badge.innerText = quantityProducts;
  } 
  if (!quantityProducts) {
    badge.classList.remove("show-badge");
  }
}

// Show cart

const container = document.querySelector('.container');

document.addEventListener('DOMContentLoaded', () => {
  showCartBox()
})

function showCartBox() {
  const cartBox = document.createElement("div");
  cartBox.classList.add("cart__box");
  cartBox.innerHTML = `
  <h3 class="cart__title">Cart</h3>
  <div class="cart__body"></div>`;
  container.appendChild(cartBox);
  /*
  cart.addEventListener('click', () => {
    cartBox.classList.toggle('cart-box__show');
    if (cartBox.classList.contains('cart-box__show')) {
      showProductInCart();
    }
  })*/
  document.addEventListener('click', e => {
    const isClickInCart = cart.contains(e.target);
    const isClickInCartBox = cartBox.contains(e.target);

    if (isClickInCart) {
      cartBox.classList.toggle('cart-box__show');
      if (cartBox.classList.contains('cart-box__show')) {
        showProductInCart();
      }
    } else if (!isClickInCartBox && cartBox.classList.contains('cart-box__show')) {
      cartBox.classList.remove('cart-box__show');
    }
  })
  showProductInCart()
}

function showProductInCart() {
  
  const cartBody = document.querySelector('.cart__body');
  if (quantityProducts) {
    cartBody.innerHTML = makeHTMLProductsInCart().join('');
    const deleteBtn = document.querySelectorAll(".deleteBtn");
    deleteBtn.forEach(d => {
      d.addEventListener('click', (e) => {
        deleteProductInCart(e);
      }) 
    })
  } else {
    cartBody.innerHTML = `
    <p class="cart__empty">
      Your cart is empty.
    </p>`;
  } 
}

function makeHTMLProductsInCart() {
  const allProductsInCartHTML = allProductsInCart.map((p, i) => {
    return `
        <div class="product-in-cart">
          <img class="product-in-cart-img" src="../images/image-product-1-thumbnail.jpg" alt="">
          <div>
            <p>${p.title}</p>
            <p>$${p.price} x ${p.count} <span class="bold very-dark-blue">$${p.total}</span></p>
          </div>
          <div class="deleteBtn" data-index="${i}">
            <img src="../images/icon-delete.svg" alt="">
          </div>
        </div>
      `;
  });
  allProductsInCartHTML.push(`<button class="btn product__add btn--checkout">Checkoout</button>`);
  return allProductsInCartHTML;
}

// Delete product from cart

function deleteProductInCart(e) {
  const clicckedElement = e.currentTarget;
  const elementIndex = clicckedElement.dataset.index;
  allProductsInCart.splice(elementIndex, 1);
  quantityProducts--;
  showCartBox();
  showQuantity();
}



