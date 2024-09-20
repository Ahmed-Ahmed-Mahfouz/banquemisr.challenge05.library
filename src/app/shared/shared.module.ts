import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [ToastComponent],
  imports: [CommonModule, SpinnerComponent, NavbarComponent],
  exports: [SpinnerComponent, NavbarComponent, ToastComponent],
})
export class SharedModule {}
