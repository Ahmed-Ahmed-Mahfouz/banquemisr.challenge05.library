import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'https://openlibrary.org';

  constructor(private http: HttpClient) {}

  getBooksBySubject(
    subject: string = 'finance',
    limit: number = 9
  ): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/subjects/${subject}.json?limit=${limit}`
    );
  }

  getBookDetails(olid: string) {
    return this.http.get(`${this.apiUrl}/books/${olid}.json`);
  }

  searchBooks(query: string) {
    return this.http.get(`${this.apiUrl}/search.json?q=${query}`);
  }
}
