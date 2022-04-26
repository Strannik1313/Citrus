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
  templateUrl: './confirm-layout.component.html',
  styleUrls: ['./confirm-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmLayoutComponent implements OnInit {
  @Input() clientData: ClientData = new ClientData
  @Input() authorizedClientData: AuthorizedClientData = new AuthorizedClientData
  @Input() haveAccountData: boolean = false
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
      this.submitForm.setValue({
        clientName: this.authorizedClientData.name,
        clientLastname: this.authorizedClientData.surname,
        phoneNumber: this.authorizedClientData.phoneNumber,
        comments: ''
      })
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
    return `${this.clientData.time.hour}:${this.clientData.time.minute}`
  }
  // formValueOutput() {
  //   this.formValue.emit(this.submitForm.value)
  // }
}
