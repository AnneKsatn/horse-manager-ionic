import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ManegeTimeTableService } from 'src/app/shared/services/manege-time-table-service.service';


@Component({
  selector: 'app-manege',
  templateUrl: './manege.page.html',
  styleUrls: ['./manege.page.scss'],
})
export class ManegePage implements OnInit {

  data = [
    {
      "id": 1,
      "title": "Конкурный день",
      "start": "2020-05-27"
    },
    {
      "id": 2,
      "title": "Корда х 1. Манеж \n Корда х 1. Бочка",
      "start": "2020-05-27T13:30:00",
      "end": "2020-05-27T14:30:00"
    },
    {
      "id": 4,
      "title": "Тренировка Х 2. Манеж открытый конкурный. \n Тренировка Х 1. Манеж крытый",
      "start": "2020-05-27T13:15:00"
    },
    {
      "id": 4,
      "title": "Старт смены х 5. Крытый манеж",
      "start": "2020-05-27T13:00:00",
      "end": "2020-05-27T13:10:00"
    },
    {
      "id": 3,
      "title": "Тренировка Х 1 \n Старт смены х 5. Крытый манеж",
      "start": "2020-05-27T13:45:00"
    },
    {
      "id": 3,
      "title": "Тренировка Х 1",
      "start": "2020-05-27T14:00:00"
    },
    {
      "id": 3,
      "title": "Тренировка Х 1",
      "start": "2020-05-27T14:15:00"
    },
  ]



  timetable: any;
  options: any;
          
  constructor(private manegeTimeTableService: ManegeTimeTableService) { 
    console.log("Loading")
    this.manegeTimeTableService.getTimeTable("TACVHkze6Kc2J15sBykZ2BWReOP2");
  }


  async ngOnInit() {
      
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

      // this.timetable =  await this.manegeTimeTableService.timetable;

      this.timetable = await this.manegeTimeTableService.timetable;
      console.log(this.timetable )
      
  }

}
