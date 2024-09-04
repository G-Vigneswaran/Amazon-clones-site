import { convertPriceCent } from '../utils/money.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { cart } from './cart.js';
export let deliveryOptions=[{
  id:'1',
  deliveryCent:0,
  days:7
},
{
  id:'2',
  deliveryCent:499,
  days:3
},
{
  id:'3',
  deliveryCent:999,
  days:2
}
];
export function getDeliveryDate(id){
  let date;
  deliveryOptions.forEach((option)=>{
    if(option.id==id){
      date= option.days;
    }
  })
  return date;
}
export function getDeliveryPriceCent(id){
  let price;
  deliveryOptions.forEach((option)=>{
    if(option.id==id){
      price= option.deliveryCent;
    }
  })
  return price;
}
export function generateDeliveryOptions(product,cartItem){
  let optionHtml='';
  let today=dayjs();
  let todayString=today.format('dddd, MMMM D ');
  deliveryOptions.forEach((option)=>{
  optionHtml+=
    `
    <div class="delivery-option">
      <input type="radio" 
        ${ option.id==cartItem.deliveryId?'checked' : '' }
        class="delivery-option-input js-delivery-option-input"
        name="delivery-option-${cartItem.id}"
        data-delivery-date= ${today.add(option.days,'days').format('dddd, MMMM D ')}
        data-delivery-id=${option.id}
        data-product-id=${cartItem.id}
        "        
        >
      <div>
        <div class="delivery-option-date">
          ${today.add(option.days,'days').format('dddd, MMMM D ')}
        </div>
        <div class="delivery-option-price">
          ${ option.days===7? "FREE Shipping" : convertPriceCent(option.deliveryCent) }
        </div>
      </div>
    </div>
    `;
  })
  return optionHtml;
  
}