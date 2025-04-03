import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableprojetsComponent } from './tableprojets.component';

describe('TableprojetsComponent', () => {
  let component: TableprojetsComponent;
  let fixture: ComponentFixture<TableprojetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableprojetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableprojetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
