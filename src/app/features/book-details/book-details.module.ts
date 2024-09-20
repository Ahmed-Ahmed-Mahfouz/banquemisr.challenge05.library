import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { BookDetailsComponent } from './book-details.component';

@NgModule({
  imports: [CommonModule, SharedModule, BookDetailsComponent],
  exports: [BookDetailsComponent],
})
export class BookDetailsModule {}
