import { Component, ElementRef, ViewChild } from '@angular/core';
import { product } from '../../models/product';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';
import { ProductService } from '../../services/product.service';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-listarproduct',
  templateUrl: './listarproduct.component.html',
  styleUrl: './listarproduct.component.css'
})
export class ListarproductComponent {
  @ViewChild('modalproduct') modal: ElementRef | undefined;

  VectorProduct:product[]= [];

  productoSeleccionado: product | undefined = undefined;
  isNew: boolean = false;

  isLoading=true;

  constructor(private _productService: ProductService, private _util:UtilityService){
    this.LoadProducts();
  }
  
  LoadProducts(){
    this.isLoading=true;
    this._productService.getProductos()
    .subscribe((rs)=>{
      this.VectorProduct = rs;
      this.isLoading = false;
    });
  }

  EditarProducto(product:product){
    console.log(product);
    this.isNew = false;
    this.productoSeleccionado = product;
  }
 
  NuevoPoducto(){
    this.isNew = true;
    this.productoSeleccionado = {id:0, nombre:"", Descripcion:"", precio:0, categoria:"", imagen:"" };
  }

  GuardarProducto(){
    if(this.isNew){
        this.VectorProduct.push(this.productoSeleccionado!); //Equivalente a llamar un API POST
        this.productoSeleccionado = undefined;
        this._util.CerrarModal(this.modal)
    }else{
      //llamada API PUT
        this.productoSeleccionado = undefined;
        this._util.CerrarModal(this.modal)
    }
    Swal.fire({
      title: 'Cambios guardados correctamente',
      icon: 'success'
    })
  }

  EliminarProducto(pd:product){
    Swal.fire(
      {
        icon:'question',
        title:`¿Está seguro que desea eliminar el producto '${pd.nombre}'?`,
        showCancelButton:true,
        showConfirmButton:true,
        cancelButtonText:'No, conservar',
        confirmButtonText:'Si, eliminar',
        allowOutsideClick:false,
        buttonsStyling:false,
        reverseButtons:true,

        customClass: {
          cancelButton:'btn btn-secondary me-2',
          confirmButton:'btn btn-danger'
        }
      }
    )
    .then(rs =>{
    if(rs.isConfirmed){
      //llamada API DELETE
      Swal.fire({
        title: 'Producto eliminado correctamente',
        icon: 'success'
      })
    }

    });
  }


}
