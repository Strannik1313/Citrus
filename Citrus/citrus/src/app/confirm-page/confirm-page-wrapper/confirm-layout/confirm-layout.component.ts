import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientData } from 'src/app/interfaces/client-data';

@Component({
  selector: 'app-confirm-layout',
  templateUrl: './confirm-layout.component.html',
  styleUrls: ['./confirm-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmLayoutComponent implements OnInit {
  @Input() clientData: ClientData = {
    master: '',
    masterId: 0,
    masterWasSelected: false,
    services: [],
    date: new Date,
    time: {
      hour: 0,
      minute: 0
    },
    name: '',
    surname: '',
    phoneNumber: '',
    comments: ''
  }
  // @Output() formValue: EventEmitter = new EventEmitter
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
    console.log(this.clientData)
  }
  submit() {
    console.log(this.submitForm.value);
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
}
