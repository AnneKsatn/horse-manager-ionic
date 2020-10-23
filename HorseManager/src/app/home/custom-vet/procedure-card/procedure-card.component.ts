import { Route } from '@angular/compiler/src/core';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HorseService } from '../../../shared/services/horse.service';

@Component({
  selector: 'app-custom-procedure-card',
  templateUrl: './procedure-card.component.html',
  styleUrls: ['./procedure-card.component.scss'],
})
export class CustomProcedureCardComponent implements OnInit {

  @Input('procedure') procedure: any;

  constructor(private horseService: HorseService, private router: Router) { }

  ngOnInit() {}
}
