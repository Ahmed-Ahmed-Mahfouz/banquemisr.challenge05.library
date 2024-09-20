import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BookService } from './book.service';

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
      `${service['apiUrl']}/subjects/finance.json?limit=9`
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyBooks);
  });

  it('should handle error when fetching books by subject', () => {
    service.getBooksBySubject('finance', 9).subscribe((books) => {
      expect(books).toEqual([]);
    });

    const req = httpMock.expectOne(
      `${service['apiUrl']}/subjects/finance.json?limit=9`
    );
    req.error(new ErrorEvent('Network error'));
  });

  it('should fetch book details', () => {
    const dummyBookDetails = { title: 'Book 1' };
    const dummyEditions = { entries: [{ number_of_pages: 100 }] };
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
      expect(details).toEqual({
        ...dummyBookDetails,
        numberOfPages: 100,
        editionCount: 1,
        firstPublishYear: 2000,
        authors: ['Author 1'],
      });
    });

    const bookDetailsReq = httpMock.expectOne(
      `${service['apiUrl']}/works/OL123W.json`
    );
    bookDetailsReq.flush(dummyBookDetails);

    const editionsReq = httpMock.expectOne(
      `${service['apiUrl']}/works/OL123W/editions.json?limit=1`
    );
    editionsReq.flush(dummyEditions);

    const subjectDetailsReq = httpMock.expectOne(
      `${service['apiUrl']}/subjects/finance.json?limit=9`
    );
    subjectDetailsReq.flush(dummySubjectDetails);
  });

  it('should handle error when fetching book details', () => {
    service.getBookDetails('OL123W').subscribe((details) => {
      expect(details).toEqual({
        numberOfPages: 'Unknown',
        editionCount: 'Unknown',
        firstPublishYear: 'Unknown',
        authors: [],
      });
    });

    const bookDetailsReq = httpMock.expectOne(
      `${service['apiUrl']}/works/OL123W.json`
    );
    bookDetailsReq.error(new ErrorEvent('Network error'));

    const editionsReq = httpMock.expectOne(
      `${service['apiUrl']}/works/OL123W/editions.json?limit=1`
    );
    editionsReq.error(new ErrorEvent('Network error'));

    const subjectDetailsReq = httpMock.expectOne(
      `${service['apiUrl']}/subjects/finance.json?limit=9`
    );
    subjectDetailsReq.error(new ErrorEvent('Network error'));
  });

  it('should fetch author details', () => {
    const dummyAuthorDetails = {
      name: 'Author 1',
      birth_date: '1970',
      photos: [1],
    };
    const dummyTopWorks = { entries: [{ title: 'Top Work' }] };
    const dummyWorks = { entries: [{ subjects: ['Subject 1', 'Subject 2'] }] };

    service.getAuthorDetails('OL123A').subscribe((details) => {
      expect(details).toEqual({
        name: 'Author 1',
        birthDate: '1970',
        image: 1,
        topWorkTitle: 'Top Work',
        workCount: 1,
        subjects: ['Subject 1', 'Subject 2'],
      });
    });

    const authorDetailsReq = httpMock.expectOne(
      `${service['apiUrl']}/authors/OL123A.json`
    );
    authorDetailsReq.flush(dummyAuthorDetails);

    const topWorksReq = httpMock.expectOne(
      `${service['apiUrl']}/authors/OL123A/works.json?limit=1`
    );
    topWorksReq.flush(dummyTopWorks);

    const workCountReq = httpMock.expectOne(
      `${service['apiUrl']}/authors/OL123A/works.json`
    );
    workCountReq.flush(dummyWorks);

    const subjectsReq = httpMock.expectOne(
      `${service['apiUrl']}/authors/OL123A/works.json`
    );
    subjectsReq.flush(dummyWorks);
  });

  it('should handle error when fetching author details', () => {
    service.getAuthorDetails('OL123A').subscribe((details) => {
      expect(details).toEqual({
        name: 'Unknown',
        birthDate: 'Unknown',
        image: 'No image available',
        topWorkTitle: 'Unknown',
        workCount: 0,
        subjects: [],
      });
    });

    const authorDetailsReq = httpMock.expectOne(
      `${service['apiUrl']}/authors/OL123A.json`
    );
    authorDetailsReq.error(new ErrorEvent('Network error'));

    const topWorksReq = httpMock.expectOne(
      `${service['apiUrl']}/authors/OL123A/works.json?limit=1`
    );
    topWorksReq.error(new ErrorEvent('Network error'));

    const workCountReq = httpMock.expectOne(
      `${service['apiUrl']}/authors/OL123A/works.json`
    );
    workCountReq.error(new ErrorEvent('Network error'));

    const subjectsReq = httpMock.expectOne(
      `${service['apiUrl']}/authors/OL123A/works.json`
    );
    subjectsReq.error(new ErrorEvent('Network error'));
  });

  it('should fetch books by search key', () => {
    const dummyBooks = {
      docs: [
        {
          title: 'Book 1',
          author_name: ['Author 1'],
          first_publish_year: 2000,
          cover_i: 1,
          key: 'OL123W',
        },
      ],
    };

    service.getBooksBySearchKey('title', 'finance', 9).subscribe((books) => {
      expect(books).toEqual([
        {
          title: 'Book 1',
          author: 'Author 1',
          publishYear: 2000,
          coverId: 1,
          workKey: 'OL123W',
        },
      ]);
    });

    const req = httpMock.expectOne(
      `${service['apiUrl']}/search.json?title=finance&limit=9`
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyBooks);
  });

  it('should handle error when fetching books by search key', () => {
    service.getBooksBySearchKey('title', 'finance', 9).subscribe((books) => {
      expect(books).toEqual([]);
    });

    const req = httpMock.expectOne(
      `${service['apiUrl']}/search.json?title=finance&limit=9`
    );
    req.error(new ErrorEvent('Network error'));
  });
});
