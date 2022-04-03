import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { MasterData } from 'src/app/interfaces/master-data';

@Component({
  selector: 'app-spec-choice-layout',
  templateUrl: './spec-choice-layout.component.html',
  styleUrls: ['./spec-choice-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpecChoiceLayoutComponent implements OnInit{
  @Input() masterData: MasterData[] = [{
    name: '',
    services: [''],
    id: ''
  }]
  @Input() isInitialize: boolean = false
  @Input() selectedOption: string = ''
  @Output() selectedItems: EventEmitter<MatSelectionListChange> = new EventEmitter

  constructor() { }

  ngOnInit(): void {
  }
  
  selectedItem(e: MatSelectionListChange): void {
    this.selectedItems.emit(e)
  }

}
