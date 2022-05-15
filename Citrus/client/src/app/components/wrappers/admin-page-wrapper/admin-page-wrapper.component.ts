import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page-wrapper',
  templateUrl: './admin-page-wrapper.component.html',
  styleUrls: ['./admin-page-wrapper.component.scss']
})
export class AdminPageWrapperComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  goToCreateMaster(): void {
    this.router.navigate(['/admin/create-master'])
  }
  goToCreateMasterService(): void {
    this.router.navigate(['/admin/create-service'])
  }
}
