import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MasterData } from 'src/app/interfaces/master-data';

@Component({
  selector: 'app-service-choice-layout',
  templateUrl: './service-choice-layout.component.html',
  styleUrls: ['./service-choice-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceChoiceLayoutComponent implements OnInit {
  @Input() masterData: MasterData[] = []
  @Input() services: Array<string> = []
  constructor() { }

  ngOnInit(): void {
  }
  
}
