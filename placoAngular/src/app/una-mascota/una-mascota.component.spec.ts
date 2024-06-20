import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnaMascotaComponent } from './una-mascota.component';

describe('UnaMascotaComponent', () => {
  let component: UnaMascotaComponent;
  let fixture: ComponentFixture<UnaMascotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnaMascotaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnaMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
