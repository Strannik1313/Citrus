import { Component, OnInit, Input } from '@angular/core';
import { StudioData } from 'src/app/interfaces/studio-data';

@Component({
  selector: 'app-select-time',
  templateUrl: './select-time.component.html',
  styleUrls: ['./select-time.component.scss']
})
export class SelectTimeComponent implements OnInit {

  freeTimeArray:Array<number> = []
  @Input() studioData: StudioData = {
    maxLoad: 0,
    arrayOfFreeTimes: []
  }
  constructor() { }

  ngOnInit(): void {
   
    
  }

}
