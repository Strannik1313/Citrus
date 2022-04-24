import { ChangeDetectionStrategy, Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthFormComponent implements OnInit, DoCheck {
  submitForm: FormGroup
  hide = true;
  @Input() disabledForm: boolean = false
  @Output() formValue: EventEmitter<any> = new EventEmitter

  constructor() {
    this.submitForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")]),
      'password': new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }
  ngDoCheck(): void {
    if (this.disabledForm) {
      this.submitForm.disable()
    } else {
      this.submitForm.enable()
    }
  }
  submit() {
    this.submitForm.disable()
    this.formValue.emit(this.submitForm.value);
  }

  ngOnInit(): void {
  }

  getErrorMessage(inputName: string) {
    switch (inputName) {
      case 'email': {
        if (this.submitForm.controls['email'].hasError('required')) {
          return 'Поле обязательно для заполнения';
        }
        return this.submitForm.controls['email'].hasError('pattern') ? 'Введите корректный email' : '';
      }
      case 'password': {
        if (this.submitForm.controls['password'].hasError('required')) {
          return 'Поле обязательно для заполнения';
        }
        return this.submitForm.controls['password'].hasError('minlength') ? 'Минимальное количество символов - 5' : '';
      }
      default: return 'Ошибка'
    }
    
    
  }
}
