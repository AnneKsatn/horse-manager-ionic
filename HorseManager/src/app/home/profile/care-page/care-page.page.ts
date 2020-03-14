import { Component, OnInit } from '@angular/core';
import { CareService } from '../../../shared/services/care.service';
import { HorseService } from './../../../shared/services/horse.service';

@Component({
  selector: 'app-care-page',
  templateUrl: './care-page.page.html',
  styleUrls: ['./care-page.page.scss'],
})
export class CarePagePage implements OnInit {

  constructor(private careService: CareService, private horseService: HorseService) { }

  private horse_id = "aUWkQP7Dwk2P6ttlTfFG";
  private horse_club_id = "DyIWkJTo7cCQK6CdFK95"

  private times;
  private walkings;

  ngDoCheck() {
    if (this.times.length == 0) {
      this.times = this.careService.getFeedings(this.horse_id);
    }
  }
  ngOnInit() {
    this.times = this.careService.getFeedings(this.horse_id);
    this.careService.getWalking(this.horse_id).subscribe((data: any) => {
      this.walkings = data.map(function(item){
        return {
          "time_start": item.payload.doc.data().time_start,
          "time_end": item.payload.doc.data().time_end,
          "paddoc": item.payload.doc.data().paddoc,
        }
      })
    });
  }

}
