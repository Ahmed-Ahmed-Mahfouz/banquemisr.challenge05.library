import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { BookComponent } from '../book/book.component';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [CommonModule, SharedModule, BookComponent, HomeComponent],
  exports: [HomeComponent],
})
export class HomeModule {}
