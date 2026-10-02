import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isScrolled = false;
  menuOpen = false;
  searchOpen = false;
  searchTerm = '';
  clienteLogueado: any = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkLogin();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen) this.searchOpen = false;
  }

  toggleSearch() {
    this.searchOpen = !this.searchOpen;
    if (this.searchOpen) this.menuOpen = false;
  }

  search() {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/ropa'], { queryParams: { q: this.searchTerm } });
      this.searchOpen = false;
      this.searchTerm = '';
    }
  }

  checkLogin(): void {
    const cliente = localStorage.getItem('cliente');
    if (cliente) {
      this.clienteLogueado = JSON.parse(cliente);
    }
  }

  goToAuth(): void {
    if (this.clienteLogueado) {
      this.logout();
    } else {
      this.router.navigate(['/auth']);
    }
  }

  logout(): void {
    localStorage.removeItem('cliente');
    this.clienteLogueado = null;
    this.router.navigate(['/home']);
  }
}
