import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NewMasterFormData } from 'src/app/models/new-master-form-data';
import { PriceList } from 'src/app/models/price-list';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-admin-create-master-panel-wrapper',
  templateUrl: './admin-create-master-panel-wrapper.component.html',
  styleUrls: ['./admin-create-master-panel-wrapper.component.scss']
})
export class AdminCreateMasterPanelWrapperComponent implements OnDestroy {
  public disabledForm: boolean = false;
  public priceList: PriceList = new PriceList;
  public services: Array<string> = [];
  private subscriptions: Subscription[] = [];
  constructor(
    public http: HttpService,
    private route: Router
  ) {
    this.subscriptions.push(this.http.getStudioServices().subscribe(data => {
      this.services = [
        ... this.services,
        ...data
      ];
    }));
  };

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  };

  onSaveFormValue(e: NewMasterFormData) {
    this.subscriptions.push(this.http?.createNewMaster(e)?.subscribe());
    this.disabledForm = true;
    this.route?.navigate(['/admin']);
  }

  showPriceList(e: MatSelectionListChange): void {
    if (e.source.selectedOptions.selected.length > 0) {
      this.priceList = {...this.priceList};
      this.priceList.priceListVisible = true;
      let tempArray: Array<string> = [];
      let i = 0;
      e.source.selectedOptions.selected.forEach(d => {
        tempArray[i] = d.value;
        i++;
      });
      this.priceList.selectionList = tempArray;
    } else {
      this.priceList = {...this.priceList};
      this.priceList.selectionList = [];
      this.priceList.priceListVisible = false;
    };
  };
}
