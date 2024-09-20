import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BookService } from './services/book.service';
import { WishlistService } from './services/wishlist.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [BookService, WishlistService],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded.');
    }
  }
}
