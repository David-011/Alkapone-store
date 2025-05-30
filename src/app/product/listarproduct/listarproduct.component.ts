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

  VectorProduct: product[] = [];

  productoSeleccionado: product | undefined = undefined;
  isNew: boolean = false;

  isLoading = true;

  constructor(private _productService: ProductService, private _util: UtilityService) {
    this.LoadProducts();
  }

  LoadProducts() {
    this.isLoading = true;
    this._productService.getProductos()
      .subscribe((rs) => {
        this.VectorProduct = rs;
        this.isLoading = false;
      });
  }

  EditarProducto(product: product) {
    console.log(product);
    this.isNew = false;
    this.productoSeleccionado = { ...product }; // Copia para evitar modificar el original
  }

  NuevoPoducto() {
    this.isNew = true;
    this.productoSeleccionado = {
      idProducto: 0,
      nombre: "",
      descripcion: "",
      precio: 0,
      stock: 0,
      categoria: ""
    };
  }

  GuardarProducto() {
    if (this.isNew) {
      this._productService.addProducto(this.productoSeleccionado!).subscribe({
        next: () => {
          this.LoadProducts();
          this.productoSeleccionado = undefined;
          this._util.CerrarModal(this.modal);
          Swal.fire({
            title: 'Producto creado correctamente',
            icon: 'success'
          });
        },
        error: () => {
          Swal.fire('Error al crear el producto', '', 'error');
        }
      });
    } else {
      this._productService.updateProducto(this.productoSeleccionado!.idProducto, this.productoSeleccionado!).subscribe({
        next: () => {
          this.LoadProducts();
          this.productoSeleccionado = undefined;
          this._util.CerrarModal(this.modal);
          Swal.fire({
            title: 'Producto actualizado correctamente',
            icon: 'success'
          });
        },
        error: () => {
          Swal.fire('Error al actualizar el producto', '', 'error');
        }
      });
    }
  }

  EliminarProducto(pd: product) {
    Swal.fire({
      icon: 'question',
      title: `¿Está seguro que desea eliminar el producto '${pd.nombre}'?`,
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'No, conservar',
      confirmButtonText: 'Sí, eliminar',
      allowOutsideClick: false,
      buttonsStyling: false,
      reverseButtons: true,
      customClass: {
        cancelButton: 'btn btn-secondary me-2',
        confirmButton: 'btn btn-danger'
      }
    }).then(rs => {
      if (rs.isConfirmed) {
        this._productService.deleteProducto(pd.idProducto).subscribe({
          next: () => {
            this.LoadProducts();
            Swal.fire({
              title: 'Producto eliminado correctamente',
              icon: 'success'
            });
          },
          error: () => {
            Swal.fire('Error al eliminar el producto', '', 'error');
          }
        });
      }
    });
  }
}
