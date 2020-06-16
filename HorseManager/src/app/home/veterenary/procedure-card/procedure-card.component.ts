import { Component, OnInit, Input } from '@angular/core';
import { HorseService } from '../../../shared/services/horse.service';

@Component({
  selector: 'app-procedure-card',
  templateUrl: './procedure-card.component.html',
  styleUrls: ['./procedure-card.component.scss'],
})
export class ProcedureCardComponent implements OnInit {

  @Input('procedure') procedure: any;

  constructor(private horseService: HorseService) { }

  ngOnInit() {
    // this.horseService.getHorseClubTitle(this.procedure.club_id).subscribe( data => {
    //   this.procedure.club_title = data.data().title;
    //  })
  }

}
