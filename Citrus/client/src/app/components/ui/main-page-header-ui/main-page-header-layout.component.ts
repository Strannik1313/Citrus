import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page-header-layout',
  templateUrl: './main-page-header-layout.component.html',
  styleUrls: ['./main-page-header-layout.component.scss']
})
export class MainPageHeaderLayoutComponent implements OnInit {

  @Input() isAuthorized: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

}
