import './app.css'
import product from '../Shop/js/data';
import ShoppingCart from './js/components/ShoppingCart/ShoppingCart';


new ShoppingCart({
  elt: '#app',
  product
});

