import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Book } from "./book.interface";

@Injectable()
export class ManageBookService {
  constructor(private httpClient: HttpClient) { }

  public search(data: any) {
    // return this.httpClient.get('assets/testJson/getDetails.json', { params: data });
    // return this.httpClient.get('http://localhost:8080/api/books/query/all');
    const body = {};
    return this.httpClient.post('http://localhost:8080/queryUser/queryBooks', body);
  }

  //查重图书id 如果图书id重复了就返回false
  public compare(bookId: String, books: Book[]) {
    let result = true;
    for (let i in books) {
      if (bookId === books[i].bookId) {
        result = false;
      }
    }
    return result;
  }

  // 查询所有图书
  public queryAllBooks() {
    // const params = {};
    return this.httpClient.get('http://localhost:8080/api/books/query/all');
  }

  public queryBooks(bookId: string, authorName: string, bookName: string, educationName: string) {
    const query = new HttpParams()
      .set("bookId", bookId)
      .set("authorName", authorName)
      .set("bookName", bookName)
      .set("educationName", educationName);
    return this.httpClient.get('http://localhost:8080/api/books/query', { params: query });
  }

  // 点击借阅quantity减1
  public borrowBook(userId: string, bookId: string) {
    const data = {
      userId: userId,
      bookId: bookId
    };
    return this.httpClient.put('http://localhost:8080/api/books/borrow', data);
  }

}