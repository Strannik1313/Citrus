import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page-layout-header',
  templateUrl: './main-page-layout-header.component.html',
  styleUrls: ['./main-page-layout-header.component.scss']
})
export class MainPageLayoutHeaderComponent implements OnInit {

  @Input() isAuthorized: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

}
