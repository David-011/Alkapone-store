import { Component } from '@angular/core';

interface Product {
  id: number;
  imgSrc: string;
  alt: string;
  title: string;
  price: string;
  liked: boolean;
}

@Component({
  selector: 'app-ropa',
  templateUrl: './ropa.component.html',
  styleUrls: ['./ropa.component.css']
})
export class RopaComponent {
  allProducts: Product[] = [
    { id: 1, imgSrc: 'assets/camisa1.png', alt: 'Camisa Tipo Polo Algodón', title: 'CAMISA TIPO POLO ALGODÓN', price: '$200.000', liked: false },
    { id: 2, imgSrc: 'assets/camisa2.png', alt: 'Camiseta de Algodón', title: 'CAMISETA DE ALGODÓN', price: '$350.000', liked: false },
    { id: 3, imgSrc: 'assets/camisa3.png', alt: 'Conjunto Amiri Collection', title: 'CONJUNTO AMIRI COLLECTION', price: '$360.000', liked: true },
    { id: 4, imgSrc: 'assets/camisa4.png', alt: 'Camiseta de Algodón', title: 'CAMISETA DE ALGODÓN', price: '$200.000', liked: false },
    { id: 5, imgSrc: 'assets/camisa2.png', alt: 'Reloj Casio Negro', title: 'RELOJ CASIO NEGRO', price: '$200.000', liked: true },
    { id: 6, imgSrc: 'assets/camisa3.png', alt: 'Reloj Q&Q Blanco', title: 'RELOJ Q&Q BLANCO', price: '$350.000', liked: false },
    // ... agrega aquí más productos si quieres
  ];

  displayedProducts: Product[] = [];
  productsPerPage = 8;

  constructor() {
    this.loadInitialProducts();
  }

  loadInitialProducts() {
    this.displayedProducts = this.allProducts.slice(0, this.productsPerPage);
  }

  loadMore() {
    const currentLength = this.displayedProducts.length;
    const nextItems = this.allProducts.slice(currentLength, currentLength + this.productsPerPage);
    this.displayedProducts = this.displayedProducts.concat(nextItems);
  }

  toggleLike(product: Product) {
    product.liked = !product.liked;
  }

  canLoadMore(): boolean {
    return this.displayedProducts.length < this.allProducts.length;
  }
}
