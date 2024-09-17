import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent implements OnInit {
  @Input() book: any;

  constructor(private router: Router, private bookService: BookService) {}

  ngOnInit() {}

  get authorsList(): string {
    return (
      this.book.authors?.map((a: { name: any }) => a.name).join(', ') ||
      'Unknown'
    );
  }

  navigateToDetails() {
    this.router.navigate(['/book-details']);
  }

  navigateToWishlist() {
    this.router.navigate(['/wishlist']);
  }
}
