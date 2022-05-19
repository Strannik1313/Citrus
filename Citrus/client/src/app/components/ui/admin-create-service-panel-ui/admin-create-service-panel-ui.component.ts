import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-create-service-panel-ui',
  templateUrl: './admin-create-service-panel-ui.component.html',
  styleUrls: ['./admin-create-service-panel-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminCreateServicePanelUiComponent {
  public createServiceForm: FormGroup;
  @Input() disabledForm: boolean = false;
  @Output() onSaveFormValue: EventEmitter<{ service: string, duration: string }> = new EventEmitter;

  constructor() {
    this.createServiceForm = new FormGroup({
      'service': new FormControl('', [Validators.required, Validators.pattern("[А-ЯЁ]|[а-яё]{1,}")]),
      'duration': new FormControl('', [Validators.required, Validators.pattern("[0-9]{1}:[0-9]{2}")]),
    });
  };

  onSubmit(): void {
    this.createServiceForm.disable();
    this.onSaveFormValue.emit(this.createServiceForm.value);
  };

  getErrorMessage(inputName: string) {
    switch (inputName) {
      case 'service': {
        if (this.createServiceForm.controls['service'].hasError('required')) {
          return 'Поле обязательно для заполнения';
        };
        return this.createServiceForm.controls['service'].hasError('pattern') ? 'Введите корректное имя' : '';
      };
      case 'duration': {
        if (this.createServiceForm.controls['duration'].hasError('required')) {
          return 'Поле обязательно для заполнения';
        };
        return this.createServiceForm.controls['duration'].hasError('pattern') ? 'Введите длительность процедуры в таком виде: \'1:30\' ' : '';
      };
      default: return 'Ошибка';
    };
  };
}



