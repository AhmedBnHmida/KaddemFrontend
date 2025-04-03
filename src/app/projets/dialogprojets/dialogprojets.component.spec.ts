import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogprojetsComponent } from './dialogprojets.component';

describe('DialogprojetsComponent', () => {
  let component: DialogprojetsComponent;
  let fixture: ComponentFixture<DialogprojetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogprojetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogprojetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
