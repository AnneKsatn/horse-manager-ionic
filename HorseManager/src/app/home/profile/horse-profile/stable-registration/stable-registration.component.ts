import { Component, OnInit, Input } from '@angular/core';
import { HorseService } from '../../../../shared/services/horse.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-stable-registration',
  templateUrl: './stable-registration.component.html',
  styleUrls: ['./stable-registration.component.scss'],
})
export class StableRegistrationComponent implements OnInit {


  @Input('horseId') horseId: number;

  public requestExistence;
  public requestId;

  constructor(
    private horseService: HorseService,
    public alertController: AlertController,
  ) { }

  ngOnInit() {

    // this.horseService.is_resident(this.horseId).subscribe(data => {
    //   console.log(data);
    // })
    this.horseService.getRequest(this.horseId.toString()).subscribe(data => {
      if (data.length != 0) {
        this.requestExistence = true;
        this.requestId = data[0]['payload'].doc.id;
      } else {
        this.requestExistence = false;
      }
    })
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
            this.registerHorseInClub(this.horseId.toString(), data.ID);
          }
        }
      ]
    });

    await alert.present();
  }

  async registerHorseInClub(horse_id: string, club_id: string) {
    this.horseService.createRequestInClub(horse_id, club_id)
  }

  cancelRequest() {
    this.horseService.deleteRequest(this.horseId, this.requestId);
  }
}
