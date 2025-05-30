import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { product } from '../../models/product';

@Component({
  selector: 'app-cu-product',
  templateUrl: './cu-product.component.html'
})
export class CuProductComponent implements OnChanges {

@Input() product: product | undefined;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {
      // Si quisieras hacer una copia por separado, podrías hacerlo aquí
    }
  }
}
