import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarproductComponent } from './listarproduct/listarproduct.component';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
    {
      path: '',
      component: ListarproductComponent
    }
]

@NgModule({
  declarations: [
    ListarproductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class ProductModule { }
