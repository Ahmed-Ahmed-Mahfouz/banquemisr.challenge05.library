import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WishlistService } from '../../core/services/wishlist.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule],
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
    if (this.book.authors) {
      this.authorNames = this.book.authors.map(
        (author: { name: string }) => author.name || 'Unknown'
      );
    }
  }

  get authorsList(): string {
    return this.authorNames.join(', ') || 'Unknown';
  }

  navigateToDetails() {
    if (this.book.key) {
      this.router.navigate(['/book-details', this.book.key.split('/').pop()]);
    } else {
      console.error('No key found for this book');
    }
  }

  navigateToAuthorDetails(authorKey: string) {
    this.router.navigate(['/author-details', authorKey.split('/').pop()]);
  }

  addToWishlist() {
    this.wishlistService.addToWishlist(this.book);
  }
}
