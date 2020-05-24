import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditHorsePage } from './edit-horse.page';

describe('EditHorsePage', () => {
  let component: EditHorsePage;
  let fixture: ComponentFixture<EditHorsePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditHorsePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditHorsePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
