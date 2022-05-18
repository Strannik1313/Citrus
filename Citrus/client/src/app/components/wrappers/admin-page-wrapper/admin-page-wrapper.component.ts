import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-admin-page-wrapper',
  templateUrl: './admin-page-wrapper.component.html',
  styleUrls: ['./admin-page-wrapper.component.scss']
})
export class AdminPageWrapperComponent  {

  constructor(
    private router: Router,
    private http: HttpService
  ) { }

  goToCreateMaster(): void {
    this.router.navigate(['/admin/create-master']);
  };

  goToCreateMasterService(): void {
    this.router.navigate(['/admin/create-service']);
  };

  goToOrderList(): void {
    this.router.navigate(['/admin/order-list']);
  };
  
  logout(): void {
    this.http.logout();
  };
}
