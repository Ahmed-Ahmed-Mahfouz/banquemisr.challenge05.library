import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { AuthorDetailsComponent } from './author-details.component';

@NgModule({
  imports: [CommonModule, SharedModule, AuthorDetailsComponent],
  exports: [AuthorDetailsComponent],
})
export class AuthorDetailsModule {}
