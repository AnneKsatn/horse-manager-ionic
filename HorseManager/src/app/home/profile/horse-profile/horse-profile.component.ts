import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-horse-profile',
  templateUrl: './horse-profile.component.html',
  styleUrls: ['./horse-profile.component.scss'],
})
export class HorseProfileComponent implements OnInit {

  @Input('horseItem') horse: {
    name: string,
    isResident: string
  };

  constructor() { }

  ngOnInit() {}

}
