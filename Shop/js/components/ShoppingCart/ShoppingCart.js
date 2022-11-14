import getTemplate from './template';
import './app.css';
import Items from '../Items/Items';
import products from '../../data';


export default class ShoppingCart {
    constructor (data) {
      this.elt = document.querySelector(data.elt);
      this.items=[];
      this.initLocalStorage();
      this.loadItems();
      this.render();
      this.renderItemsCount();
      this.sumItems();
      
    }

    initLocalStorage () {
        
        if (!localStorage.items) {
          localStorage.items = JSON.stringify(products);
        }
        
      }
      loadItems () {
        JSON.parse(localStorage.items).forEach(item => {
            console.log(item)
          this.items.push(new Items(item, this));
        });
      }
  
      render () {
        this.elt.innerHTML = getTemplate(this);
        this.items.forEach(item => item.render('.list-product'));
      } 

      renderItemsCount () {
        this.elt.querySelector('#count-item strong').innerText = 
        this.items.filter(item => item.quantity).length;
          
      }
     
      destroyItem (id) {
        this.items.splice(this.items.findIndex(item => item.id == id), 1);
        localStorage.items = JSON.stringify(this.items)
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
        localStorage.items = JSON.stringify(obj)
        this.renderItemsCount();
      }

      sumItems(){
        //this.elt.querySelector('.sum span').innerText = Item.sum * this.items.length;
        
      }
      
}