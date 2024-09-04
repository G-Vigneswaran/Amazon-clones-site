import {cart} from '../../data/cart-class.js';
import {products, getProduct} from '../../data/products.js';
import { convertPriceCent } from '../../utils/money.js';
import { generateDeliveryOptions, getDeliveryDate } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
export  function renderOrderSummary(){
    
  let htmlCode='';
  let paymentHtml='';
  let today=dayjs();
  cart.cart.forEach((cartItem)=>{
  let product=getProduct(cartItem.id);
  htmlCode+=`
    <div class="cart-item-container js-cart-item-container-${cartItem.id}">
      <div class="delivery-date js-delivery-date js-delivery-date-${cartItem.id}">
        Delivery date: ${today.add(getDeliveryDate(cartItem.deliveryId),'days').format('dddd, MMMM D ')}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${product.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${product.name}
          </div>
          <div class="product-price">
            ${convertPriceCent(product.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <div class="js-update-link-${cartItem.id}"></div>
            <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id=${cartItem.id}>
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-quantity-link "  data-product-id=${cartItem.id}>
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${generateDeliveryOptions(product,cartItem)}
        </div>
      </div>
    </div>
  `;
  paymentHtml=`
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cart.getCartQuantity()}):</div>
            <div class="payment-summary-money">$${convertPriceCent(cart.getCartPrice())}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money js-ship-payment-summary-money">$0.00</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money js-beforetax-payment-summary-money">$0.00</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money js-tax-payment-summary-money">$4.77</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money js-total-payment-summary-money">$0.00</div>
          </div>

          <button class="place-order-button button-primary js-place-order-button">
            Place your order
          </button>
  `;
  
  document.querySelector('.js-order-summary').innerHTML=htmlCode;
  document.querySelector('.js-payment-summary').innerHTML=paymentHtml;


  
  })
  
  document.querySelectorAll('.js-delete-quantity-link').forEach((prod)=>{
    prod.addEventListener('click',()=>{
      cart.deleteFromCart(prod.dataset.productId);
      console.log(cart);
      let removeElem=document.querySelector(`.js-cart-item-container-${prod.dataset.productId}`);
      removeElem.remove();
      if(cart.length===0){
        document.querySelector('.js-order-summary').innerHTML='No items in cart!!';
        document.querySelector('.js-payment-summary').innerHTML=paymentHtml;
      }
      renderPaymentSummary();
    })
  })

  document.querySelectorAll('.js-update-quantity-link').forEach((product)=>{
    product.addEventListener('click',()=>{
      product.innerHTML='';
      document.querySelector(`.js-update-link-${product.dataset.productId}`).innerHTML=`<input type="number" placeholder=0 class="quantity-input js-quantity-input" min=1><span class="link-primary js-save-quantity" data-product-id=${product.dataset.productId}>Save</span>`; 
      document.querySelectorAll('.js-save-quantity').forEach((productSave)=>{
        productSave.addEventListener('click',()=>{
          let newQuantity=document.querySelector('.js-quantity-input').value;
          cart.changeCartQuantity(productSave.dataset.productId,Number(newQuantity));
          renderOrderSummary();
          renderPaymentSummary();
        })
      })
    });
    
  });

  

  document.querySelectorAll('.js-delivery-option-input').forEach((radioButton)=>{
    radioButton.addEventListener('click',()=>{
      cart.changeDeliveryId(radioButton.dataset.productId,radioButton.dataset.deliveryId);
      renderOrderSummary();
      renderPaymentSummary();
    })
  })

  document.querySelector('.js-return-to-home-link').innerHTML=`${cart.getCartQuantity()} items`;

  console.log(document.querySelector('.js-place-order-button'));
  
 
}

