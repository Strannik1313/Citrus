import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-main-page-layout',
  templateUrl: './main-page-layout.component.html',
  styleUrls: ['./main-page-layout.component.scss']
})
export class MainPageLayoutComponent implements OnInit {

  constructor(
    private storage: StorageService
  ) { }

  ngOnInit(): void {
    this.storage.setAccessMap('/')
  }

}
