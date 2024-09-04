import { renderOrderSummary } from "./checkouts/orderSummary.js";
import { renderPaymentSummary } from "./checkouts/paymentSummary.js";
import { loadProducts,loadProductsFetch } from "../data/products.js";
import '../backend/practice.js';

async function fun() {
 await loadProductsFetch(); //let v=await loadProductsFetch();
 
  renderOrderSummary();
  renderPaymentSummary();
}
fun();
/*
loadProductsFetch().then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
});
*/