import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-choice-layout',
  templateUrl: './service-choice-layout.component.html',
  styleUrls: ['./service-choice-layout.component.scss']
})
export class ServiceChoiceLayoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  goToNextPage(): void {
    this.router.navigate(['/date-choice'])
  }
}
