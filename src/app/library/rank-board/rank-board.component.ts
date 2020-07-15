import { Component, OnInit } from '@angular/core';
import { RankService } from './rank-board.service';
import { Line } from '@antv/g2plot';
import * as G2 from '@antv/g2';
import { Funnel } from '@antv/g2plot';

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
      console.log(this.bookRankList);
      const data = this.bookRankList.map(function (item){
        return {
          '书名': item.bookName,
          '作者': item.authorName,
          '借阅次数': item.countLentNum
        }
      });

      // const data = [
      //   { action: '浏览网站', pv: 200 },
      //   { action: '放入购物车', pv: 100 },
      //   { action: '生成订单', pv: 80 },
      //   { action: '支付', pv: 70 },
      //   { action: '成交1', pv: 60 },
      //   { action: '成交2', pv: 58 },
      //   { action: '成交3', pv: 55 },
      //   { action: '成交4', pv: 54 },
      //   { action: '成交5', pv: 50 },
      //   { action: '成交6', pv: 49 },
      // ];

      const funnelPlot = new Funnel(document.getElementById('bookRankList'), {
        data,
        xField: '书名',
        yField: '借阅次数',
        percentage:{
          visible:false
        }
        // dynamicHeight: true,
      });
      funnelPlot.render();

    });




    // 用户借阅排行榜
    this.rankService.getUserRankList().subscribe((userRankList: userRank[]) => {
      this.userRankList = userRankList;

      // console.log(this.userRankList)
      const data = this.userRankList.map(function (item) {
        return {
          '用户名': item.userName,
          '借阅次数': item.countLentNum
        }
      });
      // console.log(data)


      // Step 1: 创建 Chart 对象
      const chart = new G2.Chart({
        container: 'userRankList', // 指定图表容器 ID
        width: 600, // 指定图表宽度
        height: 300, // 指定图表高度
      });

      // Step 2: 载入数据源
      chart.data(data);

      // Step 3：创建图形语法，绘制柱状图
      chart.interval().position('用户名*借阅次数');

      // Step 4: 渲染图表
      chart.render();
    });
  }

}
