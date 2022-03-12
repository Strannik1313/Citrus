import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-spec-choice-layout',
  templateUrl: './spec-choice-layout.component.html',
  styleUrls: ['./spec-choice-layout.component.scss']
})
export class SpecChoiceLayoutComponent implements OnInit {

  constructor( 
    private router: Router,
    public routeWithUrl: RouteService
    ) { }

  ngOnInit(): void {
  }
  // goToNextPage(): void {
  //   this.router.navigate(['/service-choice'])
  // }
}
