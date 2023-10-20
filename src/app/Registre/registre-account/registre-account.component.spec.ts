import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistreAccountComponent } from './registre-account.component';

describe('RegistreAccountComponent', () => {
  let component: RegistreAccountComponent;
  let fixture: ComponentFixture<RegistreAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistreAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistreAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
