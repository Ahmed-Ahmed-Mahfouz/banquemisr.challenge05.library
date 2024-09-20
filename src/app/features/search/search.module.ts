import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { SearchComponent } from './search.component';

@NgModule({
  imports: [CommonModule, SharedModule, SearchComponent],
  exports: [SearchComponent],
})
export class SearchModule {}
