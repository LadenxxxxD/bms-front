import { Component, OnInit } from '@angular/core';
import { RankService } from './rank-board.service';
import * as G2 from '@antv/g2';
import { Funnel } from '@antv/g2plot';
import { Chart } from '@antv/g2';

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
      this.bookChart();
    });




    // 用户借阅排行榜
    this.rankService.getUserRankList().subscribe((userRankList: userRank[]) => {
      this.userRankList = userRankList;
      this.userChart();
    });
  }

  // 热门图书排行榜 图表
  bookChart() {
    const data = this.bookRankList.map(function (item) {
      return {
        '书名': item.bookName,
        '作者': item.authorName,
        '借阅次数': item.countLentNum
      }
    });
    const chart = new Chart({
      container: 'bookRankList',
      autoFit: true,
      height: 500,
      width: 600
    });

    chart.data(data);
    chart.tooltip({
      showMarkers: false
    });

    chart
      .interval()
      .position('书名*借阅次数')
      .label('借阅次数')
      .color('书名');

    chart.interaction('element-highlight');

    chart.render();
  }

  // 热门用户排行榜 图表
  userChart() {
    const data = this.userRankList.map(function (item) {
      return {
        '用户名': item.userName,
        '借阅次数': item.countLentNum
      }
    });

    const chart = new G2.Chart({
      container: 'userRankList', // 指定图表容器 ID
      width: 600,
      height: 400,
    });

    chart.data(data);
    chart.interval().position('用户名*借阅次数').label('借阅次数').color('用户名');
    chart.interaction('element-highlight');
    chart.render();
  }

}
