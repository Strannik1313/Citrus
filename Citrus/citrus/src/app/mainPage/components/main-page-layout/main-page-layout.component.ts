import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page-layout',
  templateUrl: './main-page-layout.component.html',
  styleUrls: ['./main-page-layout.component.scss']
})
export class MainPageLayoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToNextPage(): void {
    console.log(this.router.routerState.snapshot.url)
    this.router.navigate(['/crossroad'])
  }
}
