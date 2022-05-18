import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { MasterData } from 'src/app/interfaces/master-data';

@Component({
  selector: 'app-spec-choice-layout',
  templateUrl: './spec-choice-layout.component.html',
  styleUrls: ['./spec-choice-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpecChoiceLayoutComponent {
  @Input() masterData: MasterData[] = [];
  @Input() selectedOption: number = 0;
  @Output() selectedItems: EventEmitter<MatSelectionListChange> = new EventEmitter;

  selectedItem(e: MatSelectionListChange): void {
    this.selectedItems.emit(e);
  };

  trackByFn(index: number, item: MasterData): number {
    return index;
  };
}
