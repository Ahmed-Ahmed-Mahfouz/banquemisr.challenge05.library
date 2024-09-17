import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'book-details', component: BookDetailsComponent },
];
