import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-sprint-contract-home',
  templateUrl: './sprint-contract-home.component.html',
  imports:[
    RouterModule
  ]
})
export class SprintContractHomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
