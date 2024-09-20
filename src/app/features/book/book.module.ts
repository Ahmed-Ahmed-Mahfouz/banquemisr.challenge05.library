import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './book.component';

@NgModule({
  imports: [CommonModule, BookComponent],
  exports: [BookComponent],
})
export class BookModule {}
