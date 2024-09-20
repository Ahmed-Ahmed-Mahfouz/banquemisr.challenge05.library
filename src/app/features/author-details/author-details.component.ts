import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../core/services/book.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

interface Author {
  name: string;
  birthDate: string;
  topWorkTitle: string;
  workCount: number;
  subjects: string[];
  image: string;
}

@Component({
  selector: 'app-author-details',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css'],
})
export class AuthorDetailsComponent implements OnInit {
  author: Author | null = null;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.fetchAuthorDetails();
  }

  fetchAuthorDetails(): void {
    this.isLoading = true;
    const authorId = this.route.snapshot.paramMap.get('id');
    if (authorId) {
      this.bookService.getAuthorDetails(authorId).subscribe({
        next: (data) => {
          this.author = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching author details:', error);
          this.isLoading = false;
        },
      });
    }
  }
}
