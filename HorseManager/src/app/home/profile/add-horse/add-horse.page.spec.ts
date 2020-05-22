import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddHorsePage } from './add-horse.page';

describe('AddHorsePage', () => {
  let component: AddHorsePage;
  let fixture: ComponentFixture<AddHorsePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHorsePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddHorsePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
