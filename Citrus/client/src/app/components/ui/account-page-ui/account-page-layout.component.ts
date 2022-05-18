import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorizedClientData } from 'src/app/models/authorized-client-data';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page-layout.component.html',
  styleUrls: ['./account-page-layout.component.scss']
})
export class AccountPageComponent implements OnInit, DoCheck {
  submitForm: FormGroup
  hide = true;
  @Input() disabledForm: boolean = false
  @Input() haveAccountData: boolean = false
  @Input() authorizedClientData: AuthorizedClientData = new AuthorizedClientData
  @Output() formValue: EventEmitter<any> = new EventEmitter

  constructor() {
    this.submitForm = new FormGroup({
      'name': new FormControl('', [Validators.required, Validators.pattern("[А-ЯЁ][а-яё]{1,}")]),
      'surname': new FormControl('', [Validators.required, Validators.pattern("[А-ЯЁ][а-яё]{1,}")]),
      'phoneNumber': new FormControl('', [Validators.required, Validators.pattern("[0-9]{1,}")])
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
    if (this.haveAccountData) {
      if (!!this.authorizedClientData.name) {
        this.submitForm.setValue({
          name: this.authorizedClientData.name
        })
      }
      if (!!this.authorizedClientData.surname) {
        this.submitForm.setValue({
          surname: this.authorizedClientData.surname
        })
      }
      if (!!this.authorizedClientData.phoneNumber) {
        this.submitForm.setValue({
          phoneNumber: this.authorizedClientData.phoneNumber
        })
      }
    }

  }

  getErrorMessage(inputName: string) {
    switch (inputName) {
      case 'name': {
        if (this.submitForm.controls['name'].hasError('required')) {
          return 'Поле обязательно для заполнения';
        }
        return this.submitForm.controls['name'].hasError('pattern') ? 'Используйте только кириллицу' : '';
      }
      case 'surname': {
        if (this.submitForm.controls['surname'].hasError('required')) {
          return 'Поле обязательно для заполнения';
        }
        return this.submitForm.controls['surname'].hasError('pattern') ? 'Используйте только кириллицу' : '';
      }
      case 'phoneNumber': {
        if (this.submitForm.controls['phoneNumber'].hasError('required')) {
          return 'Поле обязательно для заполнения';
        }
        return this.submitForm.controls['phoneNumber'] ? 'Используйте только цифры' : '';
      }
      default: return 'Ошибка'
    }


  }
}
