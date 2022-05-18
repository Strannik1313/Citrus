import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorizedClientData } from 'src/app/models/authorized-client-data';
import { ClientData } from 'src/app/models/client-data';


export interface SubmitData {
  clientName: string,
  clientLastname: string,
  phoneNumber: string,
  comments: string
}

@Component({
  selector: 'app-confirm-layout',
  templateUrl: './confirm-page-layout.component.html',
  styleUrls: ['./confirm-page-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmLayoutComponent implements OnInit {
  @Input() clientData: ClientData = new ClientData
  @Input() authorizedClientData: AuthorizedClientData = new AuthorizedClientData
  @Input() haveAccountData: boolean = false
  @Input() isAdmin: boolean = false
  @Output() formValue: EventEmitter<any> = new EventEmitter
  submitForm: FormGroup
  constructor() {
    this.submitForm = new FormGroup({
      'clientName': new FormControl('', [Validators.required]),
      'clientLastname': new FormControl('', [Validators.required]),
      'phoneNumber': new FormControl('', [Validators.required, Validators.pattern("[0-9 ]{9}")]),
      'comments': new FormControl(''),
    });
  }

  ngOnInit(): void {
    if (this.haveAccountData) {
      if (!!this.authorizedClientData.name) {
        this.submitForm.setValue({
          ...this.submitForm.value,
          clientName: this.authorizedClientData.name
        })
      }
      if (!!this.authorizedClientData.surname) {
        this.submitForm.setValue({
          ...this.submitForm.value,
          clientLastname: this.authorizedClientData.surname
        })
      }
      if (!!this.authorizedClientData.phoneNumber) {
        this.submitForm.setValue({
          ...this.submitForm.value,
          phoneNumber: this.authorizedClientData.phoneNumber
        })
      }
    }
  }
  submit() {
    this.formValue.emit(this.submitForm.value)
  }
  getErrorMessage(inputName: string) {
    switch (inputName) {
      case 'clientName': {
        return 'Введите Ваше имя';
      }
      case 'clientLastname': {
        return 'Введите Вашу фамилию';
      }
      case 'phoneNumber': {
        return 'Введите корректный номер телефона ';
      }
      default: return 'SomeError'
    }
  }
  getValue() {
    return `${this.clientData.time.hour}:${this.clientData.time.minute}0`
  }
  
}
