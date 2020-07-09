import { Component, OnInit } from '@angular/core';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { Book } from "./book.interface";
import { ManageBookService } from "./manage-book.service";
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile, NzUploadChangeParam, } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';



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
  templateUrl: './manage-book.component.html',
  styleUrls: ['./manage-book.component.css']
})
export class ManageBookComponent implements OnInit {
  isVisible = false;
  isOkLoading = false;
  isShowModal = false;
  isInsertStat = false;
  loading = false;
  avatarUrl?: string;

  constructor(private manageBookService: ManageBookService, private message: NzMessageService) { }


  booksData: Book[];
  searchData: Book = this.initBookData();
  modalData: Book = this.initBookData();
  targetBookData: Book;

  // 表单数据
  listOfColumns: ColumnItem[] = [
    {
      name: '图书ID',
      sortOrder: 'ascend',
      sortFn: (a: Book, b: Book) => a.bookId.localeCompare(b.bookId)
    },
    {
      name: '书名',
      sortOrder: null,
      sortFn: (a: Book, b: Book) => a.bookName.localeCompare(b.bookName)
    },
    {
      name: '作者'
    },
    {
      name: '出版社',
      sortOrder: null,
      sortFn: (a: Book, b: Book) => a.educationName.length - b.educationName.length
    },
    {
      name: '剩余数量',
      sortOrder: null,
      sortFn: (a: Book, b: Book) => a.quantity - b.quantity
    }
  ];
  listOfData: Book[];
  fileList: NzUploadFile[] = [];

  ngOnInit() {
    this.manageBookService.queryAllBooks().subscribe((books: Book[]) => {
      this.booksData = books;
      this.listOfData = clone(books);
    });
    this.reset();
  }

  search() {
    this.manageBookService.queryAllBooks().subscribe((books: Book[]) => {
      this.booksData = books;
      this.listOfData = this.booksData.filter(item => {
        return item.bookId.indexOf(this.searchData.bookId) !== -1 &&
          item.authorName.indexOf(this.searchData.authorName) !== -1 &&
          item.bookName.indexOf(this.searchData.bookName) !== -1 &&
          item.educationName.indexOf(this.searchData.educationName) !== -1;
      });
    });


  }

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter(d => d.bookId !== id);
    // 发送删除请求
    this.manageBookService.deleteBook(id).subscribe(result => {
      result ? this.message.create("success", "删除成功！") : this.message.create("error", "删除失败！");
    });
  }

  showModal(book?: Book): void {
    this.isShowModal = true;
    if (book) {
      this.targetBookData = book;
      this.modalData = clone(book);
    } else {
      this.isInsertStat = true;
    }
  }

  handleOk(): void {
    // 判断是否有空值
    if (this.hasEmpty(this.modalData)) {
      this.message.create("error", "操作失败: 所有项目不能为空！");
      return;
    } else {
      this.isOkLoading = true;
      setTimeout(() => {
        if (this.isInsertStat) {
          // 查重bookId
          if (this.manageBookService.compare(this.modalData.bookId, this.listOfData)) {
            this.listOfData.push(this.modalData);
            // 发送insert请求
            this.manageBookService.addBook(this.modalData).subscribe(result => {
              result ? this.message.create("success", "新增成功！") : this.message.create("error", "新增失败！");
            });
          } else {
            this.message.create("error", "操作失败： book id已存在！");
          }
        } else {
          // this.targetBookData = clone(this.modalData);  // 这里不能使用克隆函数 否则会丢失双向绑定
          this.targetBookData.bookId = this.modalData.bookId;
          this.targetBookData.bookName = this.modalData.bookName;
          this.targetBookData.authorName = this.modalData.authorName;
          this.targetBookData.educationName = this.modalData.educationName;
          this.targetBookData.quantity = this.modalData.quantity;
          // 发送update请求
          this.manageBookService.updateBook(this.modalData).subscribe(result => {
            result ? this.message.create("success", "编辑成功！") : this.message.create("error", "编辑失败！");
          });
        }
        this.reset();
      }, 2000);
    }
  }

  handleCancel(): void {
    this.isShowModal = false;
    this.reset();
  }

  reset(): void {
    this.modalData = this.initBookData();
    this.targetBookData = this.initBookData();
    this.isInsertStat = false;
    this.isShowModal = false;
    this.isOkLoading = false;
  }

  hasEmpty(bookData: Book): boolean {
    for (let key in bookData) {
      if (bookData[key] === '') {
        return true;
      }
    }
    return false;
  }

  initBookData(): Book {
    return {
      bookId: '',
      bookName: '',
      authorName: '',
      educationName: '',
      quantity: 0,
      bookDescription: '',
      bookImg: ''
    };
  }

  // 处理上传
  handleChange(info: NzUploadChangeParam): void {
    let fileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-1);

    // 2. Read from response and show file link
    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
        this.modalData.bookImg = file.response.url;
        console.log(file.response.url);
      }
      return file;
    });

    this.fileList = fileList;
    console.log(this.fileList);
  }
}

var clone = (function f(obj) {
  if (obj === null) return null
  if (typeof obj !== 'object') return obj;
  if (obj.constructor === Date) return new Date(obj);
  var newObj = new obj.constructor();  //保持继承链
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {   //不遍历其原型链上的属性
      var val = obj[key];
      // 使用arguments.callee解除与函数名的耦合
      newObj[key] = typeof val === 'object' ? f(val) : val;
    }
  }
  return newObj;
});

