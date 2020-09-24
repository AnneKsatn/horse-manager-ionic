import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ManegeTimeTableService } from 'src/app/shared/services/manege-time-table-service.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-manege',
  templateUrl: './manege.page.html',
  styleUrls: ['./manege.page.scss'],
})
export class ManegePage implements OnInit {

  timetable: any;
  options: any;

  userEvents = [];
          
  constructor(public alertController: AlertController, private router: Router, private manegeTimeTableSerice: ManegeTimeTableService) {}


  async addEvent() {
    this.router.navigateByUrl("/home/manege/create-event");
  }


  async ngOnInit() {

    this.manegeTimeTableSerice.getEventsByUser("3").subscribe( data => {
      this.userEvents = data;
      console.log(this.userEvents)
    })
      
      this.options = {
          defaultView: 'timeGrid', 
          duration: { days: 1 },
          plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],

          header: {
              left: '',
              center: 'title',
              right: 'prev,next'
          },
          height: "parent",
          slotDuration: '00:05:00',
          minTime: "8:00:00",
          maxTime: "22:00:00",
          locale: 'ru',
          eventClick: (info) =>  {
            console.log(info.event.title);
        }
      }
      
  }

  delete(id: string){
    console.log(id)
    this.manegeTimeTableSerice.delete(id);
  }
}
