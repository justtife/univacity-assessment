import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgramSearchPage } from './program-search.page';

describe('ProgramSearchPage', () => {
  let component: ProgramSearchPage;
  let fixture: ComponentFixture<ProgramSearchPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
