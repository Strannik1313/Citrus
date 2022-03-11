import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-date-choice-layout',
  templateUrl: './date-choice-layout.component.html',
  styleUrls: ['./date-choice-layout.component.scss']
})
export class DateChoiceLayoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  goToNextPage(): void {
    this.router.navigate(['/confirm-page'])
  }
}
