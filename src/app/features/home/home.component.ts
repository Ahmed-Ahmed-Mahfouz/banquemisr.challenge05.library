import { Component, OnInit } from '@angular/core';
import { BookService } from '../../core/services/book.service';
import { BookComponent } from '../book/book.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BookComponent, CommonModule, SharedModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  books: any[] = [];
  isLoading: boolean = false;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    this.isLoading = true;
    this.bookService.getBooksBySubject().subscribe(
      (data) => {
        this.books = data.works;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching books:', error);
        this.isLoading = false;
      }
    );
  }
}
