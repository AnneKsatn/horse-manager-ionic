import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HorseService } from '../../../shared/services/horse.service';
import { IHorse, IHorseProfile } from '../../../shared/models/horse.model';

@Component({
  selector: 'app-horse-profile',
  templateUrl: './horse-profile.page.html',
  styleUrls: ['./horse-profile.page.scss'],
})
export class HorseProfilePage implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private horseService: HorseService) { }

  horse: IHorseProfile | null = null;

  ngOnInit() {
    let horse_id = this.activatedRoute.snapshot.queryParams['horse_id']

    this.horseService.find(horse_id).subscribe( response => {
      this.horse = response.body;
      console.log(this.horse)
    })
  }

  cancelRequest(){}

  presentAlert(){}

}

// public horse_club;
// private groom;
// private request_id;

// private subscription;

// constructor(public alertController: AlertController, private horseService: HorseService, private router: Router) { }

// ngOnInit() {

// if (this.horse.isResident == "true") {
//   this.horseService.getHorseClubTitle(this.horse.club_id).subscribe( (data: any) => {
//     this.horse_club = data.data().title;
//   })
//   // this.horseService.checkResident(this.horse.id).subscribe((data: any) => {
//   //   this.groom = data[0].payload.doc.data().groom;
//   //   let res = this.horseService.getHorseClubTitle(data[0].payload.doc.data().id_club, this.horse.id).subscribe(doc => {
//   //     this.horse_club = doc.data().title;
//   //   });
//   // });
// }

// if (this.horse.isResident == "request") {
//   this.horseService.getRequestID(this.horse.id).subscribe(data => {
//     if (data.length != 0) {
//       this.request_id = data[0]['payload'].doc.id;
//     }
//   });;
// }
// }

// async presentAlert() {
// const alert = await this.alertController.create({
//   header: 'Введите ID КСК',
//   inputs: [
//     {
//       name: 'ID',
//       type: 'text',
//       placeholder: 'ID'
//     }],
//   buttons: [
//     {
//       text: 'Отмена',
//       role: 'cancel',
//       cssClass: 'secondary',
//       handler: () => {
//         console.log('Confirm Cancel');
//       }
//     }, {
//       text: 'Подтвердить',
//       handler: (data) => {
//         this.registerHorseInClub(this.horse.id, data.ID);
//       }
//     }
//   ]
// });

// await alert.present();
// }

// async registerHorseInClub(horse_id: string, club_id: string){
// this.horseService.createRequestInClub(horse_id, club_id);
// this.horseService.updateHorse({
//   "isResident": "request",
// }, this.horse.id);
// }

// ngDoCheck(){
// //  console.log(this.horseService.checkResident(this.horse.id));
// //  //.subscribe( data => {
// // //   console.log(data);
// // // });
// }

// cancelRequest() {
// this.horseService.deleteRequestInClub(this.horse, this.request_id);
// }

// goToCarePage(){
// this.router.navigateByUrl("/home/profile/care");
// }

// editHorse(horse_id: string){
// console.log(horse_id)
// }