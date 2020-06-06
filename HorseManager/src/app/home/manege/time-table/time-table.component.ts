import { Component, OnInit, Input } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ManegeTimeTableService } from 'src/app/shared/services/manege-time-table-service.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';


@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.scss'],
})
export class TimeTableComponent implements OnInit {

  @Input('events') events: any;

  timetable: any;
  options: any;
          
  constructor(private manegeTimeTableService: ManegeTimeTableService) { }


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

      this.timetable =  await this.manegeTimeTableService.timetable;

      // this.manegeTimeTableService.getTimeTable("TACVHkze6Kc2J15sBykZ2BWReOP2").subscribe(data => {
      //   console.log("here")
      //   console.log(data);
      // });
      
  }

}
