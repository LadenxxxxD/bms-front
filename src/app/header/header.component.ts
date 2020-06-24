<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
=======
import { Component } from '@angular/core';
import { Router } from '@angular/router';

const navigateMap = {
  1: 'library/details',
  3: 'library/books'
}

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  type = '1';

  constructor(private router: Router) { }

  public tagClick(type) {
    this.type = type;
    const url = navigateMap[type];
    if (url) {
      this.router.navigate([url]);
    }
  }

}
>>>>>>> 2a66dd5838117b3afcdfa6e70de3eb4f4c3f98d3
