import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WishlistService } from '../../core/services/wishlist.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  @Input() book: any;
  authorNames: string[] = [];

  constructor(
    private router: Router,
    private wishlistService: WishlistService
  ) {}

  ngOnInit() {
    this.fetchAuthorNames();
  }

  fetchAuthorNames() {
    this.authorNames =
      this.book?.authors?.map(
        (author: { name: string }) => author.name ?? 'Unknown'
      ) ?? [];
  }

  navigateToDetails() {
    const bookKey = this.book?.key?.split('/')?.pop();
    if (bookKey) {
      this.router.navigate(['/book-details', bookKey]);
    } else {
      console.error('No key found for this book.');
    }
  }

  navigateToAuthorDetails(authorKey: string) {
    const authorId = authorKey?.split('/')?.pop();
    if (authorId) {
      this.router.navigate(['/author-details', authorId]);
    } else {
      console.error('No key found for this author.');
    }
  }

  addToWishlist() {
    try {
      this.wishlistService.addToWishlist(this.book);
    } catch (error) {
      console.error('Failed to add to wishlist', error);
    }
  }
}
