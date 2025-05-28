import { Component, ElementRef, ViewChild } from '@angular/core';
import { product } from '../../models/product';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listarproduct',
  templateUrl: './listarproduct.component.html',
  styleUrl: './listarproduct.component.css'
})
export class ListarproductComponent {
  @ViewChild('modalproduct') modal: ElementRef | undefined;

  VectorProduct:product[]= [
    {id:1, nombre:"Camiseta Y/out", Descripcion:"talla Xl-M", precio:120000.00, categoria:"Camisetas Top quality",imagen:"assets/img/camisa1.png"},
    {id:2, nombre:"Camiseta Clemont", Descripcion:"talla Xl-M", precio:120000.00, categoria:"Camisetas Top quality",imagen:"assets/img/camisa2.png"}
  ];

  productoSeleccionado: product | undefined = undefined;
  isNew: boolean = false;

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
        this.CerrarModal(this.modal)
    }else{
      //llamada API PUT
        this.productoSeleccionado = undefined;
        this.CerrarModal(this.modal)
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

  CerrarModal(modal: ElementRef | undefined){
    if (modal){
      let bsModal = Modal.getInstance(modal?.nativeElement)
      bsModal?.hide();

      let backdrop = document.querySelector(".modal-backdrop.fade.show");
      if (backdrop){
        backdrop.parentNode?.removeChild(backdrop);
      }
      document.body.removeAttribute('style');
      document.body.removeAttribute('class');
    }  
  }
}
