import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
// 使用可被注入标签， 必须加入到一个provider里->放入到app.module里
export class BookService {
  constructor(private httpClient: HttpClient) { }

  // 查询所有图书
  public queryAllBooks() {
    return this.httpClient.get('http://localhost:8080/api/books/query');
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
  public lent(userId: string, bookId: string) {
    const body = {
      userId: userId,
      bookId: bookId
    };
    // const bodyJson = JSON.stringify(body);
    return this.httpClient.post<boolean>('http://localhost:8080/api/books/lent', body);
  }
}


