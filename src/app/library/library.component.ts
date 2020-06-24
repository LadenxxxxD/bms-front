import { Component, OnInit } from '@angular/core';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';

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
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  isVisible = false;
  isOkLoading = false;

  constructor() { }

  ngOnInit() {
  }

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
  listOfData: DataItem[] = [
    {
      bookId: 'a1336',
      bookName: 'JavaScript权威指南',
      authorName: '弗兰纳根',
      educationName: "机械工业出版社",
      quantity: 32
    },
    {
      bookId: 'a1348',
      bookName: 'JavaScript高级程序设计',
      authorName: 'Nicholas C. Zakas ',
      educationName: "人民邮电出版社",
      quantity: 45
    },
    {
      bookId: 'a1386',
      bookName: '你不知道的JavaScript',
      authorName: '辛普森（Kyle Simpson）',
      educationName: "电子工业出版社",
      quantity: 16
    },
    {
      bookId: 'a1346',
      bookName: 'JavaScript编程精解',
      authorName: '马尔奇·哈弗贝克',
      educationName: "机械工业出版社",
      quantity: 3
    },
    {
      bookId: 'a1396',
      bookName: 'JavaScript语言精粹',
      authorName: '克罗克福德',
      educationName: "电子工业出版社",
      quantity: 27
    },
  ];



  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter(d => d.bookId !== id);
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}

