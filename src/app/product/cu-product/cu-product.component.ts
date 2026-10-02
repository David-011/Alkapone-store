import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-cu-product',
  templateUrl: './cu-product.component.html'
})
export class CuProductComponent implements OnChanges {

  @Input() product: Product | undefined;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {
    }
  }
}
