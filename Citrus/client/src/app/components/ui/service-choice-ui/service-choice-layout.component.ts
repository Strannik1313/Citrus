import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
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
  @Input() preSelection: string = ''
  @Output() selectionChange: EventEmitter<MatSelectChange> = new EventEmitter
  constructor() { }

  ngOnInit(): void {
  }
  
  selectIsTouched(e: MatSelectChange): void {
    this.selectionChange.emit(e)
  }
}
