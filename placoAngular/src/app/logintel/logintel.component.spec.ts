import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogintelComponent } from './logintel.component';

describe('LogintelComponent', () => {
  let component: LogintelComponent;
  let fixture: ComponentFixture<LogintelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogintelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogintelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
