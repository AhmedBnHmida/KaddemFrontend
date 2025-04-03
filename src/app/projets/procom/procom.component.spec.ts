import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcomComponent } from './procom.component';

describe('ProcomComponent', () => {
  let component: ProcomComponent;
  let fixture: ComponentFixture<ProcomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
