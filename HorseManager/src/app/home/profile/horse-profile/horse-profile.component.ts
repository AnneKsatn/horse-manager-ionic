import { Component, OnInit, Input } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { HorseService } from './../../../shared/services/horse.service';



@Component({
  selector: 'app-horse-profile',
  templateUrl: './horse-profile.component.html',
  styleUrls: ['./horse-profile.component.scss'],
})
export class HorseProfileComponent implements OnInit {


  @Input('horseItem') horse: {
      name: string,
      isResident: string,
      id: string; }

  private horse_club;
  private groom;

  constructor(public alertController: AlertController, private horseService: HorseService) { }

  ngOnInit() {
    if (this.horse.isResident == "true") {
      console.log(this.horse.id);
      this.horseService.checkResident(this.horse.id).subscribe( (data: any) => {
        this.groom = data[0].payload.doc.data().groom;
        let res = this.horseService.getHorseClubTitle(data[0].payload.doc.data().id_club, this.horse.id).subscribe(doc => {
          this.horse_club = doc.data().title;
    });
     });
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
            this.createApplication(data.ID);
          }
        }
      ]
    });

    await alert.present();
  }

  async createApplication(id: string){
    this.horseService.createApp(id);
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
    this.horseService.deleteApp(this.horse);
  }
}
