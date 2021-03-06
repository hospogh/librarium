import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IBook} from '../defines/IBook';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class BookService {

  constructor(private http: HttpClient) {
  }


  getAllBooks() {
    return this.http.get(`/api/book/book-list`) as Observable<IBook[]>;
  }

  reserve(bookId) {
  return this.http.get(`/api/book/reserve/${bookId}`);
}

  return(bookId) {
    return this.http.get(`/api/book/return/${bookId}`);
  }

  search(content: string) {
    return this.http.post(`/api/book/book-search`, {content})  as Observable<IBook[]>;
  }
}
