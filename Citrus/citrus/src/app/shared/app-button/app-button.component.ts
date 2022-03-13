import { Component, Input, OnInit } from '@angular/core';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-custom-button',
  templateUrl: './app-button.component.html',
  styleUrls: ['./app-button.component.scss']
})
export class AppButtonComponent implements OnInit{

  @Input() name: string = ''
  @Input() url: string = ''
  constructor(
    
    public routeWithUrl: RouteService
  ) { }

  ngOnInit(): void {
  }
  


}
