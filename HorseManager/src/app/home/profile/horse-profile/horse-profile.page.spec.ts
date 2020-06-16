import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HorseProfilePage } from './horse-profile.page';

describe('HorseProfilePage', () => {
  let component: HorseProfilePage;
  let fixture: ComponentFixture<HorseProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorseProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HorseProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
