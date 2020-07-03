import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BookInfo } from './bookInfo.model';


@Injectable()
// 使用可被注入标签， 必须加入到一个provider里->放入到app.module里
export class UserBookService {
  constructor(private httpClient: HttpClient) { }

  public queryBooks(bookId: string, authorName: string, bookName: string, educationName: string) {
    const query = new HttpParams()
      .set("bookId", bookId)
      .set("authorName", authorName)
      .set("bookName", bookName)
      .set("educationName", educationName);
    return this.httpClient.get('http://localhost:8080/api/books/query', { params: query });
  }

  // 点击上传图片名
  public upload(bookInfo: BookInfo) {
    const body = {
      bookId: bookInfo.getBookId(),
      authorName: bookInfo.getAuthorName(),
      educationName: bookInfo.getEducationName(),
      bookName: bookInfo.getBookName(),
      quantity: bookInfo.getQuantity(),
      bookImg: bookInfo.getBookImg(),
    };
    const bodyJson = JSON.stringify(body);
    return this.httpClient.post<boolean>('http://localhost:8080//queryUser/uploadBookInfo', bodyJson);
  }
}
