import { Component, OnInit,  Input } from '@angular/core';
import { CareService } from '../../../../shared/services/care.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-feeding',
  templateUrl: './feeding.component.html',
  styleUrls: ['./feeding.component.scss'],
})
export class FeedingComponent implements OnInit {

  @Input('feeding') feeding: any;

  constructor(private careService: CareService, public alertController: AlertController) {}

  public consist;

  ngOnInit() {
    this.careService.getFeedingConsist(this.feeding.id, this.feeding.horse_id).subscribe(
      (data: any) => {

        this.consist = data.map(function (item) {
          return {
            "amount": item.payload.doc.data().amount,
            "item": item.payload.doc.data().item,
            "id": item.payload.doc.id
          };
        });

        this.consist.forEach(element => {
          element.horse_id = this.feeding.horse_id;
          element.feeding_id = this.feeding.id;
        });
      });
  }

  
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Добавить данные',
      inputs: [
        {
          name: 'item',
          type: 'text',
          placeholder: 'льняной жмых'
        },
        {
          name: 'amount',
          type: 'text',
          placeholder: '200'
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
            this.careService.postFeedingConsist(
              this.feeding.id, 
              this.feeding.horse_id,
              data.item, 
              data.amount);
          }
        }
      ]
    });

    await alert.present();
  }
}
