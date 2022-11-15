import getTemplate from './template';
import './app.css';
import Items from '../Items/Items';
import products from '../../data';


export default class ShoppingCart {
    constructor (data) {
      this.elt = document.querySelector(data.elt);
      this.items = [];
      this.initLocalStorage();
      this.loadItems();
      this.render();
      this.renderItemsCount();
      this.sumItems(); 
      this.totalPrice();
      this.activateElement();
      this.codePromo();
    }

    initLocalStorage () {
        
        if (!localStorage.items) {
          localStorage.items = JSON.stringify(products);
         }
        
      }
      loadItems () {
        JSON.parse(localStorage.items).forEach(item => {
          this.items.push(new Items(item, this));
        });
      }
  
      render () {
        this.elt.innerHTML = getTemplate(this);
        this.items.forEach(item => item.render('.list-product'));
      } 

      renderItemsCount () {
        let r = 0;
        this.items.forEach(item => r+=item.quantity);
        this.elt.querySelector('#count-item strong').innerText = 
        r;
          
      }
     
      destroyItem (id) {
        this.items.splice(this.items.findIndex(item => item.id == id), 1);
        const obj = this.items.map(item => {
          return {
              id:item.id,
              category:item.category,
              name:item.name,
              price:item.price,
              image: item.image,
              quantity: item.quantity
      }});
        localStorage.items = JSON.stringify(obj);
        this.renderItemsCount();
      }

      changeQuantity(id, quantity) {
        const index = this.items.findIndex(item => item.id == id);
        this.items[index].quantity = Number(quantity);
        const obj = this.items.map(item => {
            return {
                id:item.id,
                category:item.category,
                name:item.name,
                price:item.price,
                image: item.image,
                quantity: item.quantity
            }
      })
        localStorage.items =JSON.stringify(obj);
        this.renderItemsCount();
        this.sumItems();
      }

      sumItems(){
        let value = 0;
       this.items.forEach(item => value+=(item.quantity*item.price));
       this.elt.querySelector("#sum span").innerText = value;
       this.totalPrice();
      }
      activateElement(){
        this.elt.querySelector('#delivery').onchange =() =>{
          this.elt.querySelector('#delivery').value += this.totalPrice();
        };
          
      }
      totalPrice(){
        let values = 0;
        this.items.forEach(item => values+=(item.quantity*item.price));
        values += Number(this.elt.querySelector('#delivery').value);
        this.elt.querySelector("#price span").innerText = values;
      }
      codePromo(){
        this.elt.querySelector('#promo').onkeyup = (e) =>{
          if (e.code === 'Enter'){
            const codes = this.elt.querySelector('#promo').value;
            if(codes.match("kdo")){
              this.totalPrice()*0.1;
            }else{
              console.log('mauvais code');
        }
      }
      
    }
    this.totalPrice();
    }
}