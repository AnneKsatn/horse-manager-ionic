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

  constructor(public alertController: AlertController, private horseService: HorseService) { }

  ngOnInit() {}

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
      "name": this.horse.name,
      "id": this.horse.id
    });
  }

  cancelRequest() {
    this.horseService.deleteApp(this.horse);
  }
}
