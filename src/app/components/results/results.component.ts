import { Component, Input, OnInit } from '@angular/core';
import { Result } from 'src/app/interfaces';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent  {

  @Input() results:Result[]=[];

  constructor() { }

}
