import { Component, OnInit, Input } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { HorseService } from './../../../shared/services/horse.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-horse-profile',
  templateUrl: './horse-profile.component.html',
  styleUrls: ['./horse-profile.component.scss'],
})
export class HorseProfileComponent implements OnInit {


  @Input('horseItem') horse: {
      name: string,
      isResident: string,
      id: string; 
      club_id: string;
    }

  private horse_club;
  private groom;
  private request_id;

  private subscription;

  constructor(public alertController: AlertController, private horseService: HorseService, private router: Router) { }

  ngOnInit() {
    console.log(this.horse.id);

    if (this.horse.isResident == "true") {
      // this.horseService.checkResident(this.horse.id).subscribe((data: any) => {
      //   this.groom = data[0].payload.doc.data().groom;
      //   let res = this.horseService.getHorseClubTitle(data[0].payload.doc.data().id_club, this.horse.id).subscribe(doc => {
      //     this.horse_club = doc.data().title;
      //   });
      // });
    }

    if (this.horse.isResident == "request") {
      this.horseService.getRequestID(this.horse.id).subscribe(data => {
        if (data.length != 0) {
          this.request_id = data[0]['payload'].doc.id;
          console.log(this.request_id);
        }
      });;
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Введите ID КСК',
      inputs: [
        {
          name: 'ID',
          type: 'text',
          placeholder: 'ID'
        }],
      buttons: [
        {
          text: 'Отмена',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Подтвердить',
          handler: (data) => {
            this.registerHorseInClub(this.horse.id, data.ID);
          }
        }
      ]
    });

    await alert.present();
  }

  async registerHorseInClub(horse_id: string, club_id: string){
    this.horseService.createRequestInClub(horse_id, club_id);
    this.horseService.updateHorse({
      "isResident": "request",
      "name": this.horse.name
    }, this.horse.id);
  }

  ngDoCheck(){
    //  console.log(this.horseService.checkResident(this.horse.id));
    //  //.subscribe( data => {
    // //   console.log(data);
    // // });
  }

  cancelRequest() {
    this.horseService.deleteRequestInClub(this.horse, this.request_id);
  }

  goToCarePage(){
    this.router.navigateByUrl("/home/profile/care");
  }
}
