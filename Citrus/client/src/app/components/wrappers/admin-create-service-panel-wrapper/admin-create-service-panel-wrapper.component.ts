import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NewServiceFormData } from 'src/app/interfaces/new-service-form-data';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'admin-create-service-panel-wrapper',
  templateUrl: './admin-create-service-panel-wrapper.component.html',
  styleUrls: ['./admin-create-service-panel-wrapper.component.scss']
})
export class AdminCreateServicePanelWrapperComponent implements OnInit, OnDestroy {
  disabledForm: boolean = false
  subscriptions: Array<Subscription> = []
  constructor(
    private http: HttpService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }
  onFormSubmit(e: NewServiceFormData): void {
    let hour = ''
    let minute = ''
    let tempNumber = ''
    for (let i = 0; i < e.duration.length; i++) {
      if (e.duration[i] === ':') {
        hour = tempNumber;
        tempNumber = ''
        continue
      }
      tempNumber = tempNumber + e.duration[i]
      if (i == e.duration.length - 1) {
        minute = tempNumber
      }
    }
    this.subscriptions.push(this.http.createNewService({
      service: e.service,
      duration: {
        hour: Number(hour),
        minute: Number(minute)
      }
    }).subscribe());
    this.disabledForm = true
    this.route.navigate(['/'])
  }

}
