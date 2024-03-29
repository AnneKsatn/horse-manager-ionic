import { Component, OnInit, Input } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { HorseService } from '../../../shared/services/horse.service';
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
      birth_year: string;
    }

  public horse_JSON;

  public horse_club;
  private groom;
  private request_id;

  private subscription;

  constructor(public alertController: AlertController, private horseService: HorseService, private router: Router) { }

  ngOnInit() {

    if (this.horse.isResident == "true") {
      this.horseService.getHorseClubTitle(this.horse.club_id).subscribe( (data: any) => {
        this.horse_club = data.data().title;
      })
    }

    if (this.horse.isResident == "request") {
      this.horseService.getRequest(this.horse.id).subscribe(data => {
        if (data.length != 0) {
          this.request_id = data[0]['payload'].doc.id;
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
    }, this.horse.id);
  }

  ngDoCheck(){
    //  console.log(this.horseService.checkResident(this.horse.id));
    //  //.subscribe( data => {
    // //   console.log(data);
    // // });
  }

  cancelRequest() {
    this.horseService.deleteRequest(this.horse, this.request_id);
  }

  goToCarePage(){
    this.router.navigateByUrl("/home/profile/care");
  }

  editHorse(horse_id: string){
    console.log(horse_id)
  }
}
