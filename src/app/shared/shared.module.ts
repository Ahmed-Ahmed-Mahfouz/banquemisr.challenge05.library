import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  imports: [CommonModule, SpinnerComponent, NavbarComponent],
  exports: [SpinnerComponent, NavbarComponent],
})
export class SharedModule {}
