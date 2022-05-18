import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-main-page-layout-wrapper',
  templateUrl: './main-page-layout-wrapper.component.html',
  styleUrls: ['./main-page-layout-wrapper.component.scss']
})
export class MainPageLayoutWrapperComponent implements OnInit {

  constructor(
    private storage: StorageService
  ) { }

  ngOnInit(): void {
    this.storage.setAccessMap('/')
  }

}
