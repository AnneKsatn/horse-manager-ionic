import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ManegeTimeTableService } from 'src/app/shared/services/manege-time-table-service.service';
import { Router } from '@angular/router';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {

  constructor(private manegeTimeTableService: ManegeTimeTableService, private router: Router) { }

  DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';

  ngOnInit() {
  }

  addHorse(form: NgForm){

    const date =  new Date(form.value.date);
    const start =  new Date(form.value.start);
    const end = new Date(form.value.end);

    start.setDate(date.getDate());
    start.setMonth(date.getMonth());

    end.setDate(date.getDate());
    end.setMonth(date.getMonth());

    let event = {
      'title': form.value.type,
      'start': start.toISOString(),
      'end': end.toISOString()
    }

    this.manegeTimeTableService.postEvent(event);
    form.reset();
    
    this.router.navigateByUrl("/home/manege");
  }


  private createFromForm(form: NgForm) {
    // return {
    //   ...new Horse(),
    //   id: undefined,
    //   name: form.value.name,
    //   birth: form.value.birth!.value ? moment(form.value.birth!.value, this.DATE_TIME_FORMAT) : undefined,
    //   gender: form.value.sex,
    //   color: undefined,
    //   ownerId: 1
    // };
  }

  
  // protected subscribeToSaveResponse(result: Observable<HttpResponse<IHorse>>): void {
  //   result.subscribe( 
  //     (resp) => {
  //     console.log("OK")
  //     this.router.navigateByUrl("/home");

  //   },
  //      (err) =>{
  //       console.log(err)
  //       this.router.navigateByUrl("/home");
  //      }
  //   );
  // }
}
