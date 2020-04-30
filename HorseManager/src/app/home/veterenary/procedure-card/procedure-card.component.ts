import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-procedure-card',
  templateUrl: './procedure-card.component.html',
  styleUrls: ['./procedure-card.component.scss'],
})
export class ProcedureCardComponent implements OnInit {

  @Input('procedure') procedure: any;
  constructor() { }

  ngOnInit() {
    console.log(this.procedure);
  }

}