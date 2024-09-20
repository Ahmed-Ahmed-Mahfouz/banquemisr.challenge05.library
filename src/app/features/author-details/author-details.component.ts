import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../core/services/book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-author-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css'],
})
export class AuthorDetailsComponent implements OnInit {
  author: any;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    const authorId = this.route.snapshot.paramMap.get('id');
    if (authorId) {
      this.bookService.getAuthorDetails(authorId).subscribe(
        (data) => {
          this.author = data;
        },
        (error) => {
          console.error('Error fetching author details:', error);
        }
      );
    }
  }
}
