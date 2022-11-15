import getTemplate from './template';


export default class Items {
    constructor (data, parent) {
      this.id = data.id;
      this.category = data.category;
      this.name = data.name;
      this.price =data.price;
      this.quantity = data.quantity;
      this.image = data.image;
      this.parent = parent;
      this.elt = null;
      
    
    }

    render (elt) {
        const newItems = document.createElement('div');
        document.querySelector(elt).append(newItems);
        newItems.outerHTML = getTemplate(this); 
        
        this.elt = document.querySelector(elt + ' .product:last-of-type');
        this.activateElements();
        
        this.sum();
      }

      activateElements () { 
        this.elt.querySelector('select').onchange = () =>{
            this.quantity = this.elt.querySelector('select').value;
            this.parent.changeQuantity(this.id,this.quantity);
            this.sum();
    
        };
        
        this.elt.querySelector('.destroy').onclick = () => {
          this.selfDestroy();
        };
      }
   
      selfDestroy () {
        this.elt.remove();
        this.parent.destroyItem(this.id);
      }
      
      sum(){
        const sums = Number(this.price*this.quantity);
        this.elt.querySelector('#somme span').innerText = sums ;
      }
   

}