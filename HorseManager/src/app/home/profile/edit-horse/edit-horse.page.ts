import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {HorseService} from '../../../shared/services/horse.service'

@Component({
  selector: 'app-edit-horse',
  templateUrl: './edit-horse.page.html',
  styleUrls: ['./edit-horse.page.scss'],
})
export class EditHorsePage implements OnInit {

  constructor(private route: ActivatedRoute, private horseService: HorseService, private router: Router) { }

  public horse_id;

  horse_info = {
    birth: "",
    name: "",
    gender: "",
    id: "",
    isResident: "",
    club_id: "",
  };


  ngOnInit() {
    this.horse_id =this.route.snapshot.queryParams['horse_id']
    console.log(this.horse_id)

    this.horseService.getHorseInfo(this.horse_id).subscribe( doc => {
      console.log(new Date(doc.data().bith_date.seconds))
      this.horse_info = {
        birth: doc.data().bith_date.toDate().getFullYear(),
        name: doc.data().name,
        gender: doc.data().sex,
        id: doc.id,
        isResident: doc.data().isResident,
        club_id: doc.data().club_id
      }
    })

  }

  updateHorse(form){
    console.log(form.value.birth)

    const name = form.value.name;
    const birth = form.value.birth;
    const timest = new Date(birth);
    const sex = form.value.sex

    let horse = {
      bith_date: timest,
      name: name,
      sex: sex
    }

    this.horseService.updateHorse(horse, this.horse_id);
    this.router.navigateByUrl("/home/profile")
  }

  deleteHorse(){
    this.horseService.delteHorse(this.horse_id,  this.horse_info.club_id);
    this.router.navigateByUrl("/home/profile")
  }

  leaveHorseClub(){
    this.horseService.leaveHorseClub(this.horse_info.id, this.horse_info.club_id)
    this.router.navigateByUrl("/home/profile")
  }
}
