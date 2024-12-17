import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerNavbarComponent } from './worker-navbar.component';

describe('WorkerNavbarComponent', () => {
  let component: WorkerNavbarComponent;
  let fixture: ComponentFixture<WorkerNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
