import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CarePagePage } from './care-page.page';

describe('CarePagePage', () => {
  let component: CarePagePage;
  let fixture: ComponentFixture<CarePagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarePagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CarePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
