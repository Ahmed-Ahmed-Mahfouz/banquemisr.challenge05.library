import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./features/search/search.component').then(
        (m) => m.SearchComponent
      ),
  },
  {
    path: 'wishlist',
    loadComponent: () =>
      import('./features/wishlist/wishlist.component').then(
        (m) => m.WishlistComponent
      ),
  },
  {
    path: 'book-details/:id',
    loadComponent: () =>
      import('./features/book-details/book-details.component').then(
        (m) => m.BookDetailsComponent
      ),
  },
  {
    path: 'author-details/:id',
    loadComponent: () =>
      import('./features/author-details/author-details.component').then(
        (m) => m.AuthorDetailsComponent
      ),
  },
];
