import { deliveryOptions } from "./deliveryOptions.js";
import { products } from "./products.js";
export let cart=JSON.parse(localStorage.getItem('cart'));

if(!cart)
{
  cart=[];
}

export function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(button){
  let matchingItem;
  let selectElem=document.querySelector(`.js-select-quantity-${button.dataset.productId}`);
  cart.forEach( (product) => {
  if(product.id===button.dataset.productId)
  {
    matchingItem=product; 
  }
  })
  if(matchingItem)
  {
    matchingItem.quantity+=Number(selectElem.value);
  }
  else{
      cart.push({
        id:button.dataset.productId,
        quantity:Number(selectElem.value),
        deliveryId:'1'
      }
    )
  }
  saveToStorage();
  document.querySelector(`.js-added-to-cart-${button.dataset.productId}`).classList.add('added-to-cart-visible');
  setTimeout(()=>{
      document.querySelector(`.js-added-to-cart-${button.dataset.productId}`).classList.remove('added-to-cart-visible');
      },1000);
}

export function getCartQuantity(){
  let cartQuantity=0;
  cart.forEach((product)=>{
    cartQuantity+=product.quantity;
  })
  return cartQuantity;
}

export function getCartPrice(){
  let cartPrice=0;
  let product;
  cart.forEach((cartItem)=>{
    products.forEach( (prod)=>{
      if(cartItem.id===prod.id){
        product=prod;
      }
    })
    cartPrice+=cartItem.quantity*product.priceCents;
  })
  return cartPrice;
}

export function deleteFromCart(prodId){
  let newCart=[]
  cart.forEach( (cartItem)=>
  {
    if(cartItem.id!==prodId){
      newCart.push(cartItem);
    }
  })
  cart=newCart;
  saveToStorage();
}
export function changeDeliveryId(prodId,newDeliveryId){
  cart.forEach((cartItem)=>{
    if(cartItem.id===prodId){
      cartItem.deliveryId=newDeliveryId;
    }
  })
  saveToStorage();
}
export function changeCartQuantity(prodId,newQuantity){
  cart.forEach((cartItem)=>{
    if(cartItem.id===prodId){
      cartItem.quantity=newQuantity;
    }
  })
  saveToStorage();
  console.log(cart);
}