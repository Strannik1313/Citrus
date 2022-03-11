import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crossroad-page-layout',
  templateUrl: './crossroad-page-layout.component.html',
  styleUrls: ['./crossroad-page-layout.component.scss']
})
export class CrossroadPageLayoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToNextPage(key: string): void {
    switch (key) {
      case 'master':
        this.router.navigate(['/spec-choice'])
        break
      case 'service':
        this.router.navigate(['/service-choice'])
        break

    }

  }
}
