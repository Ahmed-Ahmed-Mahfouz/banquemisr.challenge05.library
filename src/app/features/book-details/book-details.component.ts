import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../core/services/book.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  book: any;
  isInWishlist: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    const workId = this.route.snapshot.paramMap.get('id');
    if (workId) {
      this.bookService.getBookDetails(workId).subscribe(
        (data) => {
          console.log(data);
          this.book = data;
          this.isInWishlist = this.wishlistService.isInWishlist(this.book);
        },
        (error) => {
          console.error('Error fetching book details:', error);
        }
      );
    }
  }

  get authorsList(): string {
    return this.book?.authors?.join(', ') || 'Unknown';
  }

  normalizeBook(book: any) {
    return {
      key: book.key,
      title: book.title,
      cover_id: book.coverId || book.covers?.[0] || null,
      first_publish_year:
        book.publishYear || book.firstPublishYear || 'Unknown',
      authors: Array.isArray(book.authors)
        ? book.authors.map((author: string) => ({ name: author }))
        : [],
    };
  }

  toggleWishlist() {
    if (this.isInWishlist) {
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
          this.wishlistService.removeFromWishlist(this.book);
          this.isInWishlist = false;
          Swal.fire(
            'Removed!',
            'The book has been removed from your wishlist.',
            'success'
          );
        }
      });
    } else {
      const normalizedBook = this.normalizeBook(this.book);
      this.wishlistService.addToWishlist(normalizedBook);
      this.isInWishlist = true;
    }
  }
}
