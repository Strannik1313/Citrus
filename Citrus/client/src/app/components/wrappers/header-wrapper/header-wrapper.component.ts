import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-header-wrapper',
  templateUrl: './header-wrapper.component.html',
  styleUrls: ['./header-wrapper.component.scss']
})
export class HeaderWrapperComponent implements OnInit, OnDestroy {
 
  constructor(
    public storage: StorageService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}
