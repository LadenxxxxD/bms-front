import { Component, OnInit } from '@angular/core';
import { RankService } from './rank-board.service';


interface bookRank {
  bookName: string,
  authorName: string,
  countLentNum: number
}
interface userRank {
  userName: string,
  countLentNum: number
}

@Component({
  selector: 'app-rank-board',
  templateUrl: './rank-board.component.html',
  styleUrls: ['./rank-board.component.css']
})
export class RankBoardComponent implements OnInit {
  bookRankList: bookRank[];
  userRankList: userRank[];

  constructor(private rankService: RankService) { }

  ngOnInit(): void {
    this.rankService.getBookRankList().subscribe((bookRankList: bookRank[]) => {
      this.bookRankList = bookRankList;
    });
    this.rankService.getUserRankList().subscribe((userRankList: userRank[]) => {
      this.userRankList = userRankList;
    });
  }

}
