import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomVetPage } from './custom-vet.page';

describe('CustomVetPage', () => {
  let component: CustomVetPage;
  let fixture: ComponentFixture<CustomVetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomVetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomVetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
