import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VeterenaryPage } from './veterenary.page';

describe('VeterenaryPage', () => {
  let component: VeterenaryPage;
  let fixture: ComponentFixture<VeterenaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeterenaryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VeterenaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
