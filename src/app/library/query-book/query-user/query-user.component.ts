import { Component, OnInit } from '@angular/core';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { BookService } from './query-book.service';

interface DataItem {
  bookId: string;
  bookName: string;
  authorName: string;
  educationName: string;
  quantity: number;
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
  userId = ''; //用户ID
  bookId = ''; // 图书ID
  authorName = ''; // 作者名
  bookName = ''; // 书名
  educationName = ''; // 出版社
  count = ''; //剩余图书数量

  constructor(private bookService: BookService) { }

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
    const that = this;
    if (this.authorName === '' && this.bookName === '' && this.educationName === '') {
      this.bookService.queryBooksAll().subscribe((result: any) => {
        that.listOfData = result;
      });
    } else {
      this.bookService.queryBookByUser(this.authorName, this.bookName, this.educationName).subscribe((result: any) => {
        that.listOfData = result;
      });
    }
  }

}

