import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-encontrado',
  templateUrl: './no-encontrado.component.html',
  styleUrls: ['./no-encontrado.component.css']
})
export class NoEncontradoComponent {
  constructor(private router: Router) {}
  volver(): void { this.router.navigate(['/home']); }
}
