import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StableRegistrarionComponent } from './stable-registrarion.component';

describe('StableRegistrarionComponent', () => {
  let component: StableRegistrarionComponent;
  let fixture: ComponentFixture<StableRegistrarionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StableRegistrarionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StableRegistrarionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
