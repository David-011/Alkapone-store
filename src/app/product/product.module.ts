import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarproductComponent } from './listarproduct/listarproduct.component';
import { RouterModule, Routes } from '@angular/router';
import { CuProductComponent } from './cu-product/cu-product.component';
import { FormsModule } from '@angular/forms';

const ROUTES: Routes = [
    {
      path: '',
      component: ListarproductComponent
    }
]

@NgModule({
  declarations: [
    ListarproductComponent,
    CuProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FormsModule
  ]
})
export class ProductModule { }
