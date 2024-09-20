import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  getBookDetails(workId: string): Observable<any> {
    const bookDetails$ = this.http.get(`${this.apiUrl}/works/${workId}.json`);

    const editions$ = this.http
      .get(`${this.apiUrl}/works/${workId}/editions.json?limit=1`)
      .pipe(
        map((response: any) => {
          const edition = response.entries[0];
          return {
            numberOfPages: edition?.number_of_pages || 'Unknown',
          };
        })
      );

    const subjectDetails$ = this.getBooksBySubject().pipe(
      map((response: any) => {
        const work = response.works.find(
          (w: any) => w.key === `/works/${workId}`
        );
        return {
          editionCount: work?.edition_count,
          firstPublishYear: work?.first_publish_year,
          authors: work?.authors?.map((author: any) => author.name),
        };
      })
    );

    return forkJoin([bookDetails$, editions$, subjectDetails$]).pipe(
      map(([bookDetails, editionsDetails, subjectDetails]) => ({
        ...bookDetails,
        ...editionsDetails,
        ...subjectDetails,
      }))
    );
  }

  getAuthorDetails(authorId: string): Observable<any> {
    const authorDetails$ = this.http
      .get(`${this.apiUrl}/authors/${authorId}.json`)
      .pipe(
        map((response: any) => ({
          name: response.name || 'Unknown',
          birthDate: response.birth_date || 'Unknown',
          image:
            response.photos && response.photos.length > 0
              ? response.photos[0]
              : 'No image available',
        }))
      );

    const topWorks$ = this.http
      .get(`${this.apiUrl}/authors/${authorId}/works.json?limit=1`)
      .pipe(
        map((response: any) => {
          const topWork = response.entries[0];
          return {
            topWorkTitle: topWork?.title || 'Unknown',
          };
        })
      );

    const workCount$ = this.http
      .get(`${this.apiUrl}/authors/${authorId}/works.json`)
      .pipe(
        map((response: any) => {
          return {
            workCount: response?.entries.length || 0,
          };
        })
      );

    const subjects$ = this.http
      .get(`${this.apiUrl}/authors/${authorId}/works.json`)
      .pipe(
        map((response: any) => {
          const subjects = response.entries
            .map((work: any) => work.subjects)
            .flat()
            .filter(Boolean);
          // Slice to get up to 5 unique subjects
          const uniqueSubjects = [...new Set(subjects)].slice(0, 5);
          return {
            subjects: uniqueSubjects,
          };
        })
      );

    return forkJoin([authorDetails$, topWorks$, workCount$, subjects$]).pipe(
      map(([authorDetails, topWorks, workCount, subjects]) => ({
        ...authorDetails,
        ...topWorks,
        ...workCount,
        subjects: subjects.subjects,
      }))
    );
  }

  getBooksBySearchKey(
    searchKey: string,
    query: string,
    limit: number = 9
  ): Observable<any> {
    const url = `${this.apiUrl}/search.json?${searchKey}=${query}&limit=${limit}`;
    return this.http.get(url).pipe(
      map((response: any) => {
        return response.docs.slice(0, limit).map((book: any) => ({
          title: book.title,
          author: book.author_name?.[0] || 'Unknown Author',
          publishYear: book.first_publish_year || 'Unknown Year',
          coverId: book.cover_i || null,
          workKey: book.key,
        }));
      })
    );
  }
}
