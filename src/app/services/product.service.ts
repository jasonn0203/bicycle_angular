import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { CartItem, Category, Order, OrderDetail, Product } from '../data-type';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  api: string = 'https://bicycle-angular.onrender.com';
  // 'http://localhost:3000/product'

  cartData = new EventEmitter<Product[] | []>();
  orderList: any;
  constructor(private http: HttpClient) {}
  addProduct(data: Product) {
    return this.http.post(`${this.api}/product`, data);
  }
  productList() {
    return this.http.get<Product[]>(`${this.api}/product`);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.api}/product/${id}`);
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.api}/product/${id}`);
  }

  updateProduct(product: Product) {
    return this.http.put<Product>(
      `${this.api}//product/${product.id}`,
      product
    );
  }
  trendyProducts() {
    return this.http.get<Product[]>(`${this.api}/product`);
  }

  searchProduct(query: string) {
    return this.http.get<Product[]>(`${this.api}/product?q=${query}`);
  }

  localAddToCart(data: Product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }
  updateCartItem(cart: CartItem) {
    return this.http.put<CartItem>(`${this.api}/cart/${cart.id}`, cart);
  }
  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: Product[] = JSON.parse(cartData);
      items = items.filter((item: Product) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(cartData: CartItem) {
    return this.http.post(`${this.api}/cart`, cartData);
  }
  getCartList(userId: number) {
    return this.http
      .get<Product[]>(`${this.api}/cart?userId=` + userId, {
        observe: 'response',
      })
      .subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  }
  removeToCart(cartId: number) {
    return this.http.delete(`${this.api}/cart/` + cartId);
  }
  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<CartItem[]>(`${this.api}/cart?userId=` + userData.id);
  }

  deleteCartItems(cartId: number) {
    return this.http
      .delete(`${this.api}/cart/` + cartId)
      .subscribe((result) => {
        this.cartData.emit([]);
      });
  }
}
