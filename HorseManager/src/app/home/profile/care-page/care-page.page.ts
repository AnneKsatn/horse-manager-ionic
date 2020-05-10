import { Component, OnInit } from '@angular/core';
import { CareService } from '../../../shared/services/care.service';
import { HorseService } from './../../../shared/services/horse.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-care-page',
  templateUrl: './care-page.page.html',
  styleUrls: ['./care-page.page.scss'],
})
export class CarePagePage implements OnInit {

  constructor(private careService: CareService, 
    private horseService: HorseService,
    private route: ActivatedRoute) { }

  private horse_id;
  private club_id;

  public feeding_times;
  public walkings;

  ngOnInit() {
    this.horse_id = this.route.snapshot.queryParams['horse_id'];
    this.club_id = this.route.snapshot.queryParams['club_id']

    this.careService.getFeedings(this.club_id).subscribe( data => {
      this.feeding_times = data.map(function(item: any) {
        return {
          "hour": item.payload.doc.data().hour,
          "minute": item.payload.doc.data().minute,
          "id": item.payload.doc.id,
        }
      });

      this.feeding_times.forEach(element => {
        element.horse_id = this.horse_id;
      });
    });

    // this.careService.getWalking(this.horse_id).subscribe((data: any) => {
    //   this.walkings = data.map(function(item){
    //     return {
    //       "time_start": item.payload.doc.data().time_start,
    //       "time_end": item.payload.doc.data().time_end,
    //       "paddoc": item.payload.doc.data().paddoc,
    //     }
    //   })
    // });
  }
}
