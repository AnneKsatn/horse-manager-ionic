import { Component, OnInit, ɵConsole } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


export interface horseInt{
  isResident: string;
  name: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(public alertController: AlertController, private firestore: AngularFirestore) { }

  horses: horseInt[];

  ngOnInit() {
    // this.firestore.collection('horses', ref => ref.where('id', '==', "1")).valueChanges().subscribe(
    //   (data: horseInt[]) => {
    //     this.horses = data;
    //   }
    // );

    this.firestore.collection('horses').valueChanges().subscribe(
      (data: horseInt[]) => {
        this.horses = data;
      }
    );
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
    this.firestore.collection('joining_application').add({
      horse_id: 1,
      club_id: id
    });
  }
}
