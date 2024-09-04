import { deliveryOptions } from "./deliveryOptions.js";
import { products } from "./products.js";

export class Cart
{
  cart;
  #key;
  constructor(key){
    this.#key=key;
    this.loadFromStorage();
  }
  loadFromStorage()
  {
    this.cart=JSON.parse(localStorage.getItem(this.#key));
    if(!this.cart)
        this.cart=[];
  }
  saveToStorage()
  {
    localStorage.setItem(this.#key,JSON.stringify(this.cart));
  }
  addToCart(button){
    let matchingItem;
    let selectElem=document.querySelector(`.js-select-quantity-${button.dataset.productId}`);
    this.cart.forEach( (product) => {
    if(product.productId===button.dataset.productId)
    {
      matchingItem=product; 
    }
    })
    if(matchingItem)
    {
      matchingItem.quantity+=Number(selectElem.value);
    }
    else{
        this.cart.push({
          productId:button.dataset.productId,
          quantity:Number(selectElem.value),
          deliveryId:'1'
        }
      )
    }
    saveToStorage();
    document.querySelector(`.js-added-to-cart-${button.dataset.productId}`).classList.add('added-to-this.cart-visible');
    setTimeout(()=>{
        document.querySelector(`.js-added-to-cart-${button.dataset.productId}`).classList.remove('added-to-this.cart-visible');
        },1000);
    }
    getCartQuantity(){
      let cartQuantity=0;
      this.cart.forEach((product)=>{
        cartQuantity+=product.quantity;
      })
      return cartQuantity;
    }
    getCartPrice(){
      let cartPrice=0;
      let product;
      this.cart.forEach((cartItem)=>{
        products.forEach( (prod)=>{
          if(cartItem.id===prod.id){
            product=prod;
          }
        })
        cartPrice+=cartItem.quantity*product.priceCents;
      })
      return cartPrice;
    }
    deleteFromCart(prodId){
      let newCart=[]
      this.cart.forEach( (cartItem)=>
      {
        if(cartItem.id!==prodId){
          newCart.push(cartItem);
        }
      })
      this.cart=newCart;
      this.saveToStorage();
    }
    changeDeliveryId(prodId,newDeliveryId){
      this.cart.forEach((cartItem)=>{
        if(cartItem.id===prodId){
          cartItem.deliveryId=newDeliveryId;
        }
      })
      this.saveToStorage();
    }
    changeCartQuantity(prodId,newQuantity){
      this.cart.forEach((cartItem)=>{
        if(cartItem.id===prodId){
          cartItem.quantity=newQuantity;
        }
      })
      this.saveToStorage();
    }
}

export let cart= new Cart('cart');