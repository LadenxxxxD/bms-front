import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class RankService {
    constructor(private httpClient: HttpClient) { }

    public getBookRankList() {
        return this.httpClient.get('http://localhost:8080/api/rank/getBookRank');
    }
    public getUserRankList() {
        return this.httpClient.get('http://localhost:8080/api/rank/getUserRank');
    }
}