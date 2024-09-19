import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { WishlistService } from '../../services/wishlist.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  book: any;

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
}
