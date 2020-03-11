import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(public alertController: AlertController) { }

  ngOnInit() { }

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
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

}
