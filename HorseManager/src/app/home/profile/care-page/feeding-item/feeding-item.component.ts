import { Component, OnInit, Input } from '@angular/core';
import { CareService } from '../../../../shared/services/care.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-feeding-item',
  templateUrl: './feeding-item.component.html',
  styleUrls: ['./feeding-item.component.scss'],
})
export class FeedingItemComponent implements OnInit {

  @Input('item') item: any;

  constructor(public alertController: AlertController, public careService: CareService) { }

  ngOnInit() {}

  async deleteAlert() {
    const alert = await this.alertController.create({
      header: 'Удалить?',
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
            this.careService.deleteFeedingConsist(this.item.id);
          }
        }
      ]
    });

    await alert.present();
  }


}
