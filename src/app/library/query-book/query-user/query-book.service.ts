import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
// 使用可被注入标签， 必须加入到一个provider里->放入到app.module里
export class BookService {
  constructor(private httpClient: HttpClient) { }
  // 查询所有图书
  public queryBooksAll() {
    const body = {};
    return this.httpClient.post<boolean>('http://localhost:8080/queryUser/queryBooks', body);
  }

  public queryBookByAuthorName(authorName: string) {
    const body = {
      authorName: '贝贝'
    };
    return this.httpClient.post<boolean>('http://localhost:8080/queryUser/queryBookByAuthor', body);
  }

  public queryBookByBookName(bookName: string) {
    const body = {
      authorName: 'javascript'
    };
    return this.httpClient.post<boolean>('http://localhost:8080/queryUser/queryBookByBookName', body);
  }

  public queryBookByEducationName(educationName: string) {
    const body = {
      authorName: '工业'
    };
    return this.httpClient.post<boolean>('http://localhost:8080/queryUser/queryBookByEducationName', body);
  }
  // 点击借阅通过用户自定义词条查询
  public queryBookByUser(authorName: string, bookName: string, educationName: string) {
    const body = {
      authorName: authorName,
      bookName: bookName,
      educationName: educationName
    };
    const bodyJson = JSON.stringify(body);
    return this.httpClient.post<boolean>('http://localhost:8080/queryUser/queryBookByUser', bodyJson);
  }
  // 点击借阅quantity减1
  public lent(userId: string, bookId: string) {
    const body = {
      userId: userId,
      bookId: bookId
    };
    const bodyJson = JSON.stringify(body);
    return this.httpClient.post<boolean>('http://localhost:8080/queryUser/lent', bodyJson);
  }
}


