import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MasterData } from 'src/app/interfaces/master-data';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-spec-choice-wrapper',
  templateUrl: './spec-choice-wrapper.component.html',
  styleUrls: ['./spec-choice-wrapper.component.scss']
})
export class SpecChoiceWrapperComponent implements OnInit, OnDestroy {
  masterData: MasterData[] = []
  subscription: Subscription
  isInitialize: boolean = false
  constructor(
    private http: HttpService
  ) {
    this.subscription = this.http.getClientData().subscribe((data) => {
      this.masterData = data
      this.isInitialize = true
    })
   }

  ngOnInit(): void {
    
  }

  ngOnDestroy():void {
    this.subscription.unsubscribe()
  }
}
