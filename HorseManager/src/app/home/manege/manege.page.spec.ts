import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManegePage } from './manege.page';

describe('ManegePage', () => {
  let component: ManegePage;
  let fixture: ComponentFixture<ManegePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManegePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManegePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
