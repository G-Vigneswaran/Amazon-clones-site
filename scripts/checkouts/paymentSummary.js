import { cart } from "../../data/cart-class.js";
import { deliveryOptions,getDeliveryPriceCent } from "../../data/deliveryOptions.js";
import { convertPriceCent } from "../../utils/money.js";
export function renderPaymentSummary()
{ 
  let shippingPriceCent=0;
  cart.cart.forEach((cartItem) => {
    shippingPriceCent+=getDeliveryPriceCent(cartItem.deliveryId);
  });
  document.querySelector('.js-ship-payment-summary-money').innerHTML=`$${convertPriceCent(shippingPriceCent)}`;
  document.querySelector('.js-beforetax-payment-summary-money').innerHTML=`$${convertPriceCent(shippingPriceCent+cart.getCartPrice())}`;
  document.querySelector('.js-tax-payment-summary-money').innerHTML=`$${convertPriceCent((shippingPriceCent+cart.getCartPrice())*0.1)}`;
  document.querySelector('.js-total-payment-summary-money').innerHTML=`$${convertPriceCent((shippingPriceCent+cart.getCartPrice())*0.1+(shippingPriceCent+cart.getCartPrice()))}`;
}