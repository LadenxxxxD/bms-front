import { Component, OnInit } from '@angular/core';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { BookService } from './query-book.service';
import { NzMessageService } from 'ng-zorro-antd/message';

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
  selector: 'app-query-admin',
  templateUrl: './query-admin.component.html',
  styleUrls: ['./query-admin.component.css']
})
export class QueryAdminComponent implements OnInit {
  isVisible = false;
  isOkLoading = false;
  userId = ''; // 用户ID
  bookId = ''; // 图书ID
  authorName = ''; // 作者名
  bookName = ''; // 书名
  educationName = ''; // 出版社
  count = ''; // 剩余图书数量

  modalUserId = ''; // modal用户ID
  modalBookId = ''; // modal图书ID
  modalAuthorName = ''; // modal作者名
  modalBookName = ''; // modal书名
  modalEducationName = ''; // modal出版社
  modalCount = ''; // modal剩余图书数量

  constructor(private bookService: BookService, private message: NzMessageService) { }
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
  ngOnInit() { }
  // 检索
  search() {
    if (this.authorName === '' && this.bookName === '' && this.educationName === '') {
      this.bookService.queryBooksAll().subscribe((result: any) => {
        this.listOfData = result;
      });
    } else {
      this.bookService.queryBookByUser(this.authorName, this.bookName, this.educationName).subscribe((result: any) => {
        if (result !== []) {
          this.listOfData = result;
        } else {
          this.listOfData = [];
        }
      });
    }

  }
  // 点击借阅触发模态框
  showModal(data: any): void {
    this.modalBookId = data.bookId;
    this.modalBookName = data.bookName;
    this.modalAuthorName = data.authorName;
    this.modalEducationName = data.educationName;
    this.modalCount = data.quantity;
    this.isVisible = true;
  }
  // 全局提示
  createMessage(type: string, str: string): void {
    this.message.create(type, str);
  }
  // 点击模态框确定
  handleOk(): void {
    this.userId = this.modalUserId;
    this.bookService.lent(this.modalUserId, this.modalBookId).subscribe((result: any) => {
      if (result) {
        this.search();
        this.createMessage('success', '用户ID为：' + this.modalUserId + '的用户借阅成功 欢迎下次光临！');
      } else {
        this.createMessage('error', '借阅失败！');
      }
    });
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 2000);
  }
  // 点击模态框取消
  handleCancel(): void {
    this.isVisible = false;
  }
}

