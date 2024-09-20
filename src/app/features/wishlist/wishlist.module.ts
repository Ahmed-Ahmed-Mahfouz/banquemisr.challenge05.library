import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { WishlistComponent } from './wishlist.component';

@NgModule({
  imports: [CommonModule, SharedModule, WishlistComponent],
  exports: [WishlistComponent],
})
export class WishlistModule {}
