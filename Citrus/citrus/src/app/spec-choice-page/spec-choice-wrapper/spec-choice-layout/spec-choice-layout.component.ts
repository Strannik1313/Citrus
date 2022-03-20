import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MasterData } from 'src/app/interfaces/master-data';

@Component({
  selector: 'app-spec-choice-layout',
  templateUrl: './spec-choice-layout.component.html',
  styleUrls: ['./spec-choice-layout.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpecChoiceLayoutComponent implements OnInit {
  @Input() masterData: MasterData[] = [{ 
    name: '',
    services: [''],
    id: ''
  }]
  @Input() isInitialize: boolean = false
  constructor() {  }

  ngOnInit(): void {
    
  }
  
}
