import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateActivityPage } from './create-activity.page';

describe('CreateActivityPage', () => {
  let component: CreateActivityPage;
  let fixture: ComponentFixture<CreateActivityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateActivityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateActivityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
