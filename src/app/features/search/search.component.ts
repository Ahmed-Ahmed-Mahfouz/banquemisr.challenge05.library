import { Component } from '@angular/core';
import { BookService } from '../../core/services/book.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

interface Book {
  title: string;
  author: string;
  publishYear: string;
  coverId: number | null;
  workKey: string;
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  selectedCategory: string = '';
  searchQuery: string = '';
  books: Book[] = [];
  errorMessage: string = '';
  isDropdownOpen: boolean = false;
  isLoading: boolean = false;

  constructor(private bookService: BookService) {}

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.isDropdownOpen = false;
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  performSearch(): void {
    if (!this.searchQuery || !this.selectedCategory) {
      this.errorMessage = 'Please enter a search text and select a category';
      return;
    }

    this.isLoading = true;

    const searchKey = this.selectedCategory.toLowerCase();
    this.bookService
      .getBooksBySearchKey(searchKey, this.searchQuery)
      .subscribe({
        next: (books) => {
          this.books = books;
          this.errorMessage = '';
        },
        error: (err) => {
          this.errorMessage = 'Failed to fetch books. Please try again later.';
          console.error(err);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  clearErrorMessage(): void {
    this.errorMessage = '';
  }
}
