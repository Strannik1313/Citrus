import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-header-wrapper',
  templateUrl: './header-wrapper.component.html',
  styleUrls: ['./header-wrapper.component.scss']
})
export class HeaderWrapperComponent {
 
  constructor(
    public storage: StorageService
  ) {
    
   }
}
