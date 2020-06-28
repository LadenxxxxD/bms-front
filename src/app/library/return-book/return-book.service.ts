import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReturnBookService {

  constructor(private httpClient: HttpClient){}
  public returnBook(UserID:number,BookID:number){
    const body={
      userId:UserID,
      bookId:BookID
    };
    return this.httpClient.post('http://localhost:8080/returnbook', body);
  }
}
