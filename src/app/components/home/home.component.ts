import { BookService } from './../../services/book.service';
import { Component, OnInit } from '@angular/core';
import { BookComponent } from '../book/book.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BookComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  books: any[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getBooksBySubject().subscribe(
      (data) => {
        this.books = data.works;
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }
}
