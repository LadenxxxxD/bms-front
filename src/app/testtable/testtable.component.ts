import { Component, OnInit } from '@angular/core';

interface ItemData {
  id: number;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-testtable',
  templateUrl: './testtable.component.html',
  styleUrls: ['./testtable.component.css']
})


export class TesttableComponent implements OnInit {
  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.onAllChecked(true);
      }
    },
    {
      text: 'Select Odd Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 !== 0));
        this.refreshCheckedStatus();
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 === 0));
        this.refreshCheckedStatus();
      }
    }
  ];
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: ItemData[] = [];
  listOfData: ItemData[] = [];
  setOfCheckedId = new Set<number>();

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: ItemData[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  ngOnInit(): void {
    this.listOfData =[
      {
        id: 1,
        name: 'JavaScript权威指南',
        age: 2,
        address: "机械工业出版社"
      },
      {
        id: 1,
        name: 'JavaScript高级程序设计',
        age: 2,
        address: "人民邮电出版社"
      },
      {
        id: 1,
        name: '你不知道的JavaScript',
        age: 2,
        address: "电子工业出版社"
      },
      {
        id: 1,
        name: 'JavaScript编程精解',
        age: 2,
        address: "机械工业出版社"
      },
      {
        id: 1,
        name: 'JavaScript语言精粹',
        age: 2,
        address: "电子工业出版社"
      },
      {
        id: 1,
        name: 'JavaScript语言精粹',
        age: 2,
        address: "电子工业出版社"
      },
      {
        id: 1,
        name: 'JavaScript语言精粹',
        age: 2,
        address: "电子工业出版社"
      },
      {
        id: 1,
        name: 'JavaScript语言精粹',
        age: 2,
        address: "电子工业出版社"
      },
      {
        id: 1,
        name: 'JavaScript权威指南',
        age: 2,
        address: "机械工业出版社"
      },
      {
        id: 1,
        name: 'JavaScript高级程序设计',
        age: 2,
        address: "人民邮电出版社"
      },
      {
        id: 1,
        name: '你不知道的JavaScript',
        age: 2,
        address: "电子工业出版社"
      },
      {
        id: 1,
        name: 'JavaScript编程精解',
        age: 2,
        address: "机械工业出版社"
      },
      {
        id: 1,
        name: 'JavaScript语言精粹',
        age: 2,
        address: "电子工业出版社"
      },
      {
        id: 1,
        name: 'JavaScript语言精粹',
        age: 2,
        address: "电子工业出版社"
      },
      {
        id: 1,
        name: 'JavaScript语言精粹',
        age: 2,
        address: "电子工业出版社"
      },
      {
        id: 1,
        name: 'JavaScript语言精粹',
        age: 2,
        address: "电子工业出版社"
      }
    ];
    // new Array(100).fill(0).map((_, index) => {
    //   return {
    //     id: index,
    //     name: `Edward King ${index}`,
    //     age: 32,
    //     address: `London, Park Lane no. ${index}`
    //   };
    // });
  }

}
