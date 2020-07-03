import { Component, OnInit } from '@angular/core';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { UserBookService } from './query-book.service';
import { BookInfo } from './bookInfo.model';
import { NzMessageService } from 'ng-zorro-antd/message';

interface DataItem {
  bookId: string;
  bookName: string;
  authorName: string;
  educationName: string;
  quantity: number;
  bookImg: string;
}

interface ColumnItem {
  name: string;
  sortOrder?: NzTableSortOrder;
  sortFn?: NzTableSortFn;
  listOfFilter?: NzTableFilterList;
  filterFn?: NzTableFilterFn;
  filterMultiple?: boolean;
  sortDirections?: NzTableSortOrder[];
}

@Component({
  selector: 'app-queryadmi',
  templateUrl: './query-user.component.html',
  styleUrls: ['./query-user.component.css']
})
export class QueryUserComponent implements OnInit {
  isVisible = false;
  isOkLoading = false;
  userId = ''; // 用户ID
  bookId = ''; // 图书ID
  authorName = ''; // 作者名
  bookName = ''; // 书名
  educationName = ''; // 出版社
  count = ''; // 剩余图书数量

  bookImg = '../assets/images/'; // 图书图片
  currentId = ''; // 当前item的Id
  expandSet = new Set<number>(); // 加号的Set
  isShowExpand: boolean = false;
  currentExpand: number;

  constructor(private bookService: UserBookService, private message: NzMessageService) { }

  // thead columns
  listOfColumns: ColumnItem[] = [
    {
      name: '图书ID',
      sortOrder: 'ascend',
      sortFn: (a: DataItem, b: DataItem) => a.bookId.localeCompare(b.bookId),
    },
    {
      name: '书名',
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.bookName.localeCompare(b.bookName),
    },
    {
      name: '作者'
    },
    {
      name: '出版社',
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.educationName.length - b.educationName.length,
    },
    {
      name: '剩余数量',
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.quantity - b.quantity
    }
  ];
  listOfData: DataItem[] = [];
  ngOnInit() {
  }
  // 检索
  search() {
    this.bookService.queryBooks(this.bookId, this.authorName, this.bookName, this.educationName).subscribe((result: any) => {
      this.listOfData = result;
    });
  }

  // 全局提示
  createMessage(type: string, str: string): void {
    this.message.create(type, str);
  }
  // 加号展开的个数 既图书详情展开的个数
  onExpandChange(id: number, checked: boolean): void {
    if (id !== this.currentExpand) {
      this.currentExpand = id;
      checked = this.isShowExpand = false;
      this.expandSet = new Set<number>();
    }
    if (!checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
    this.isShowExpand = !checked;
  }
}
