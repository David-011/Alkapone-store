import { Component, Input, input } from '@angular/core';
import { product } from '../../models/product';

@Component({
  selector: 'app-cu-product',
  templateUrl: './cu-product.component.html',
  styleUrl: './cu-product.component.css'
})
export class CuProductComponent {
  @Input() product: product | undefined; 

}
