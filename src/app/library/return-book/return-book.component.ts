import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ReturnBookService } from './return-book.service';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-return-book',
  templateUrl: './return-book.component.html',
  styleUrls: ['./return-book.component.css']
})
export class ReturnBookComponent implements OnInit {

  validateForm!: FormGroup;
  returnBookflg = false;
  bookId:number;
  userId:number;
  submitForm(): void {
    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  constructor(private fb: FormBuilder,private rbService:ReturnBookService,private message: NzMessageService) {}

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value.length>6) {
      return { maxLength: true, error: true };
    }
    return {};
  };

  rebook(){

    this.rbService.returnBook(this.userId,this.bookId).subscribe((data: boolean) => {
      this.returnBookflg=data
      if(!this.returnBookflg){
        this.message.create('error', `用户ID或图书ID错误`);
      }else{
        this.message.create('success', `归还成功`);

      }

    });
  }
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userID: [null, [this.confirmationValidator]],
      bookID: [null, [this.confirmationValidator]],
    });
  }

}
