import { Component, OnInit, Input } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ManegeTimeTableService } from 'src/app/shared/services/manege-time-table-service.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import * as moment from 'moment/moment';


@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.scss'],
})
export class TimeTableComponent implements OnInit {

  data = [];

  events: any;
  options: any;
          
  constructor(private manegeTimeTableService: ManegeTimeTableService) { }


  async ngOnInit() {

    var today = moment().day();

      this.options = {
        defaultView: 'dayGridDay',
        duration: { days: 1 },
        plugins: [dayGridPlugin, interactionPlugin],

          header: {
              left: '',
              center: 'title',
              right: 'prev,next'
          },
          firstDay: today,
          height: "parent",
          locale: 'ru',
          eventClick: (info) =>  {
            console.log(info.event.title);
        }
      }

      this.manegeTimeTableService.getTimeTable("3").subscribe(data => {
        this.data = data;
      })
  }

}
