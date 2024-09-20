import { TestBed } from '@angular/core/testing';

import { BookService } from './book.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('BookService', () => {
  let service: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('BookService', () => {
    let service: BookService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [BookService],
      });
      service = TestBed.inject(BookService);
      httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
      httpMock.verify();
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should fetch books by subject', () => {
      const dummyBooks = { works: [{ title: 'Book 1' }, { title: 'Book 2' }] };
      service.getBooksBySubject('finance', 9).subscribe((books) => {
        expect(books).toEqual(dummyBooks);
      });

      const req = httpMock.expectOne(
        'https://openlibrary.org/subjects/finance.json?limit=9'
      );
      expect(req.request.method).toBe('GET');
      req.flush(dummyBooks);
    });

    it('should fetch book details', () => {
      const dummyBookDetails = { title: 'Book Title' };
      const dummyEditions = { entries: [{ number_of_pages: 123 }] };
      const dummySubjectDetails = {
        works: [
          {
            key: '/works/OL123W',
            edition_count: 1,
            first_publish_year: 2000,
            authors: [{ name: 'Author 1' }],
          },
        ],
      };

      service.getBookDetails('OL123W').subscribe((details) => {
        expect(details.title).toBe('Book Title');
        expect(details.numberOfPages).toBe(123);
        expect(details.editionCount).toBe(1);
        expect(details.firstPublishYear).toBe(2000);
        expect(details.authors).toEqual(['Author 1']);
      });

      const bookDetailsReq = httpMock.expectOne(
        'https://openlibrary.org/works/OL123W.json'
      );
      expect(bookDetailsReq.request.method).toBe('GET');
      bookDetailsReq.flush(dummyBookDetails);

      const editionsReq = httpMock.expectOne(
        'https://openlibrary.org/works/OL123W/editions.json?limit=1'
      );
      expect(editionsReq.request.method).toBe('GET');
      editionsReq.flush(dummyEditions);

      const subjectDetailsReq = httpMock.expectOne(
        'https://openlibrary.org/subjects/finance.json?limit=9'
      );
      expect(subjectDetailsReq.request.method).toBe('GET');
      subjectDetailsReq.flush(dummySubjectDetails);
    });

    it('should fetch author details', () => {
      const dummyAuthorDetails = {
        name: 'Author Name',
        birth_date: '1900-01-01',
        photos: [1],
      };
      const dummyTopWorks = { entries: [{ title: 'Top Work' }] };
      const dummyWorkCount = { entries: [{}, {}] };
      const dummySubjects = {
        entries: [{ subjects: ['Subject 1', 'Subject 2'] }],
      };

      service.getAuthorDetails('OL123A').subscribe((details) => {
        expect(details.name).toBe('Author Name');
        expect(details.birthDate).toBe('1900-01-01');
        expect(details.image).toBe(1);
        expect(details.topWorkTitle).toBe('Top Work');
        expect(details.workCount).toBe(2);
        expect(details.subjects).toEqual(['Subject 1', 'Subject 2']);
      });

      const authorDetailsReq = httpMock.expectOne(
        'https://openlibrary.org/authors/OL123A.json'
      );
      expect(authorDetailsReq.request.method).toBe('GET');
      authorDetailsReq.flush(dummyAuthorDetails);

      const topWorksReq = httpMock.expectOne(
        'https://openlibrary.org/authors/OL123A/works.json?limit=1'
      );
      expect(topWorksReq.request.method).toBe('GET');
      topWorksReq.flush(dummyTopWorks);

      const workCountReq = httpMock.expectOne(
        'https://openlibrary.org/authors/OL123A/works.json'
      );
      expect(workCountReq.request.method).toBe('GET');
      workCountReq.flush(dummyWorkCount);

      const subjectsReq = httpMock.expectOne(
        'https://openlibrary.org/authors/OL123A/works.json'
      );
      expect(subjectsReq.request.method).toBe('GET');
      subjectsReq.flush(dummySubjects);
    });

    it('should fetch books by search key', () => {
      const dummySearchResults = {
        docs: [
          {
            title: 'Book 1',
            author_name: ['Author 1'],
            first_publish_year: 2000,
            cover_i: 1,
            key: 'OL123W',
          },
          {
            title: 'Book 2',
            author_name: ['Author 2'],
            first_publish_year: 2001,
            cover_i: 2,
            key: 'OL124W',
          },
        ],
      };

      service.getBooksBySearchKey('title', 'finance', 9).subscribe((books) => {
        expect(books.length).toBe(2);
        expect(books[0].title).toBe('Book 1');
        expect(books[0].author).toBe('Author 1');
        expect(books[0].publishYear).toBe(2000);
        expect(books[0].coverId).toBe(1);
        expect(books[0].workKey).toBe('OL123W');
      });

      const req = httpMock.expectOne(
        'https://openlibrary.org/search.json?title=finance&limit=9'
      );
      expect(req.request.method).toBe('GET');
      req.flush(dummySearchResults);
    });
  });
});
