import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import Swal from 'sweetalert2';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';

interface Book {
  key: string;
  title: string;
  authors: { name: string }[];
  first_publish_year: number;
  cover_id: number;
}

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  wishlist: Book[] = [];
  isLoading: boolean = false;

  constructor(private wishlistService: WishlistService) {}

  ngOnInit() {
    this.fetchWishlist();
  }

  fetchWishlist() {
    this.isLoading = true;
    try {
      this.wishlist = this.wishlistService.getWishlist();
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      this.isLoading = false;
    }
  }

  removeFromWishlist(book: Book) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to remove this book from your wishlist?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          this.wishlistService.removeFromWishlist(book);
          this.fetchWishlist();
          Swal.fire(
            'Removed!',
            'The book has been removed from your wishlist.',
            'success'
          );
        } catch (error) {
          console.error('Error removing book from wishlist:', error);
          Swal.fire(
            'Error!',
            'There was an error removing the book from your wishlist.',
            'error'
          );
        }
      }
    });
  }
}
