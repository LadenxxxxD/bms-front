import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { DetailsService } from '../details/details.service';
import { LoginService } from '../login/login.service';

import { Route, ActivatedRoute } from '@angular/router';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers: [DetailsService, LoginService, BsModalService]
})
export class DetailsComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private service: DetailsService,
    ) {
    this.route.queryParams.subscribe();
  }

  ngOnInit() {

  }

  ngOnDestroy() {
  }
}
