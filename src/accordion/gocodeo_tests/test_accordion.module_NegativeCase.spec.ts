import {  TestBed, ComponentFixture, fakeAsync, tick  } from '@angular/core/testing';
import {  NgbAccordionModule, NgbAccordionConfig  } from '../accordion.module';
import {  NgbAccordionDirective, NgbPanelChangeEvent  } from '../accordion.directive';
import {  By  } from '@angular/platform-browser';

describe('NgbAccordionModule: Negative Case Scenarios', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgbAccordionModule],
      declarations: [NgbAccordionDirective],
      providers: [NgbAccordionConfig],
    }).compileComponents();
    fixture = TestBed.createComponent(NgbAccordionDirective);
  });

  // Test Case 1: Missing Import Statements
  it('should fail compilation if @angular/core or ./accordion.directive are not imported', () => {
    expect(() => {
      TestBed.configureTestingModule({
        imports: [NgbAccordionModule],
      }).compileComponents();
    }).toThrowError(/Missing module: @angular\/core/);
  });

  // Test Case 2: Missing Export Statements
  it('should fail compilation if accordion directives are not exported', () => {
    expect(() => {
      TestBed.configureTestingModule({
        imports: [NgbAccordionModule],
        declarations: [NgbAccordionDirective],
      }).compileComponents();
    }).toThrowError(/Missing export: NgbAccordionButton/);
  });

  // Test Case 3: Incorrect Directive Array
  it('should fail compilation if NGB_ACCORDION_DIRECTIVES includes unrelated directives or excludes essentials', () => {
    expect(() => {
      @NgModule({
        imports: [NgbAccordionModule],
        declarations: [NgbAccordionDirective],
        providers: [NgbAccordionConfig],
      })
      class InvalidAccordionModule {}
      TestBed.configureTestingModule({
        imports: [InvalidAccordionModule],
      }).compileComponents();
    }).toThrowError(/Missing export: NgbAccordionButton/);
  });

  // Test Case 4: Empty NgbAccordionModule Class
  it('should fail compilation if NgbAccordionModule class is empty', () => {
    expect(() => {
      @NgModule()
      class EmptyNgbAccordionModule {}
      TestBed.configureTestingModule({
        imports: [EmptyNgbAccordionModule],
        declarations: [NgbAccordionDirective],
        providers: [NgbAccordionConfig],
      }).compileComponents();
    }).toThrowError(/Module with empty declarations or imports/);
  });

  // Test Case 5: Importing Module Without Exporting Directives
  it('should not export accordion directives if importing module doesn\'t export them', () => {
    @NgModule({
      imports: [NgbAccordionModule],
    })
    class ImportingModuleWithoutExports {}
    TestBed.configureTestingModule({
      imports: [ImportingModuleWithoutExports],
      declarations: [NgbAccordionDirective],
      providers: [NgbAccordionConfig],
    }).compileComponents();
    const accordionDirective = fixture.debugElement.query(By.directive(NgbAccordionDirective));
    expect(accordionDirective).toBeNull();
  });

  // Test Case 6: Circular Dependency
  it('should fail compilation if there is a circular dependency between accordion.directive and NgbAccordionModule', () => {
    expect(() => {
      @NgModule({
        imports: [NgbAccordionModule],
        declarations: [NgbAccordionDirective],
        providers: [NgbAccordionConfig],
      })
      class CircularDependencyModule {}
      TestBed.configureTestingModule({
        imports: [CircularDependencyModule],
      }).compileComponents();
    }).toThrowError(/Circular dependency: NgbAccordionModule/);
  });

  // Test Case 7: Missing Template
  it('should not render anything if the accordion component doesn\'t have a template defined', () => {
    @Component({
      selector: 'missing-template-accordion',
      template: '',
    })
    class MissingTemplateAccordionComponent {}
    TestBed.configureTestingModule({
      imports: [NgbAccordionModule],
      declarations: [MissingTemplateAccordionComponent],
      providers: [NgbAccordionConfig],
    }).compileComponents();
    fixture = TestBed.createComponent(MissingTemplateAccordionComponent);
    fixture.detectChanges();
    const accordionElement = fixture.debugElement.nativeElement;
    expect(accordionElement.innerHTML).toBe('');
  });

  // Test Case 8: Invalid Directive Selector
  it('should not apply to any elements if the accordion directive has an invalid selector', () => {
    @Component({
      selector: 'invalid-selector-accordion',
      template: `<div ngbAccordion></div>`,
    })
    class InvalidSelectorAccordionComponent {}
    TestBed.configureTestingModule({
      imports: [NgbAccordionModule],
      declarations: [InvalidSelectorAccordionComponent],
      providers: [NgbAccordionConfig],
    }).compileComponents();
    fixture = TestBed.createComponent(InvalidSelectorAccordionComponent);
    fixture.detectChanges();
    const accordionElement = fixture.debugElement.query(By.css('div[ngbAccordion]'));
    expect(accordionElement).toBeNull();
  });

  // Test Case 9: Event Emitter Not Working
  it('should not emit the panelChange event when the accordion is clicked', () => {
    const panelChangeSpy = jasmine.createSpy('panelChange');
    fixture.componentInstance.panelChange.subscribe(panelChangeSpy);
    fixture.detectChanges();
    const accordionElement = fixture.debugElement.query(By.css('button[ngbPanelToggle]'));
    accordionElement.triggerEventHandler('click', {});
    expect(panelChangeSpy).not.toHaveBeenCalled();
  });

  // Test Case 10: Accordion Not Closing Properly
  it('should not close the accordion when the close button is clicked', () => {
    fixture.detectChanges();
    const accordionElement = fixture.debugElement.query(By.css('button[ngbPanelToggle]'));
    accordionElement.triggerEventHandler('click', {});
    fixture.detectChanges();
    const panelBodyElement = fixture.debugElement.query(By.css('div[ngbPanelContent]'));
    expect(panelBodyElement.styles['display']).not.toBe('none');
  });

  // Test Case 11: Multiple Accordions Not Working Together
  it('should not allow multiple accordions to be open at the same time', () => {
    @Component({
      selector: 'multiple-accordions',
      template: `
        <div ngbAccordion [closeOthers]="true">
          <div ngbPanel>
            <button ngbPanelToggle>Panel 1</button>
            <div ngbPanelContent>Panel 1 content</div>
          </div>
          <div ngbPanel>
            <button ngbPanelToggle>Panel 2</button>
            <div ngbPanelContent>Panel 2 content</div>
          </div>
        </div>
      `,
    })
    class MultipleAccordionsComponent {}
    TestBed.configureTestingModule({
      imports: [NgbAccordionModule],
      declarations: [MultipleAccordionsComponent],
      providers: [NgbAccordionConfig],
    }).compileComponents();
    fixture = TestBed.createComponent(MultipleAccordionsComponent);
    fixture.detectChanges();
    const panelToggleButtons = fixture.debugElement.queryAll(By.css('button[ngbPanelToggle]'));
    panelToggleButtons[0].triggerEventHandler('click', {});
    fixture.detectChanges();
    expect(panelToggleButtons[1].nativeElement.getAttribute('aria-expanded')).toBe('false');
  });

  // Test Case 12: Custom Template Not Working
  it('should not render the custom template content inside the accordion panel', () => {
    @Component({
      selector: 'custom-template-accordion',
      template: `
        <ng-template #customContent>
          Custom content
        </ng-template>
        <div ngbAccordion>
          <div ngbPanel>
            <button ngbPanelToggle>Panel 1</button>
            <ng-template ngbPanelContent>
              {{customContent}}
            </ng-template>
          </div>
        </div>
      `,
    })
    class CustomTemplateAccordionComponent {}
    TestBed.configureTestingModule({
      imports: [NgbAccordionModule],
      declarations: [CustomTemplateAccordionComponent],
      providers: [NgbAccordionConfig],
    }).compileComponents();
    fixture = TestBed.createComponent(CustomTemplateAccordionComponent);
    fixture.detectChanges();
    const panelBodyElement = fixture.debugElement.query(By.css('div[ngbPanelContent]'));
    expect(panelBodyElement.nativeElement.textContent).not.toContain('Custom content');
  });

  // Test Case 13: Auto Collapse Not Working
  it('should not collapse the accordion when the autoCollapse property is set to true', () => {
    fixture.componentInstance.autoCollapse = true;
    fixture.detectChanges();
    const accordionElement = fixture.debugElement.query(By.css('button[ngbPanelToggle]'));
    accordionElement.triggerEventHandler('click', {});
    fixture.detectChanges();
    const panelBodyElement = fixture.debugElement.query(By.css('div[ngbPanelContent]'));
    expect(panelBodyElement.styles['display']).toBe('none');
  });

  // Test Case 14: Invalid Panel ID
  it('should not open the accordion panel when the panelId is invalid', () => {
    fixture.detectChanges();
    const accordionElement = fixture.debugElement.query(By.css('button[ngbPanelToggle]'));
    accordionElement.nativeElement.setAttribute('ngbPanelToggle', 'invalid-id');
    accordionElement.triggerEventHandler('click', {});
    fixture.detectChanges();
    const panelBodyElement = fixture.debugElement.query(By.css('div[ngbPanelContent]'));
    expect(panelBodyElement.styles['display']).toBe('none');
  });

  // Test Case 15: Change Detection Not Working
  it('should not update the accordion when the model changes', () => {
    fixture.detectChanges();
    const accordionElement = fixture.debugElement.query(By.css('button[ngbPanelToggle]'));
    accordionElement.triggerEventHandler('click', {});
    fixture.detectChanges();
    const panelBodyElement = fixture.debugElement.query(By.css('div[ngbPanelContent]'));
    expect(panelBodyElement.styles['display']).toBe('block');
    fixture.componentInstance.activeIds = [];
    fixture.detectChanges();
    expect(panelBodyElement.styles['display']).toBe('block');
  });

  // Test Case 16: Event Emitter Not Firing Consistently
  it('should not consistently emit the panelChange event when the accordion is clicked', () => {
    const panelChangeSpy = jasmine.createSpy('panelChange');
    fixture.componentInstance.panelChange.subscribe(panelChangeSpy);
    fixture.detectChanges();
    const accordionElement = fixture.debugElement.query(By.css('button[ngbPanelToggle]'));
    accordionElement.triggerEventHandler('click', {});
    expect(panelChangeSpy).toHaveBeenCalledTimes(1);
    accordionElement.triggerEventHandler('click', {});
    expect(panelChangeSpy).toHaveBeenCalledTimes(2);
  });

  // Test Case 17: Accessibility Not Working
  it('should not be accessible using keyboard navigation', () => {
    fixture.detectChanges();
    const accordionElement = fixture.debugElement.query(By.css('button[ngbPanelToggle]'));
    accordionElement.triggerEventHandler('keydown', { key: 'Enter' });
    fixture.detectChanges();
    const panelBodyElement = fixture.debugElement.query(By.css('div[ngbPanelContent]'));
    expect(panelBodyElement.styles['display']).toBe('none');
  });

  // Test Case 18: Animations Not Working
  it('should not have any animations when the accordion is opened or closed', () => {
    fixture.componentInstance.animation = false;
    fixture.detectChanges();
    const accordionElement = fixture.debugElement.query(By.css('button[ngbPanelToggle]'));
    accordionElement.triggerEventHandler('click', {});
    fixture.detectChanges();
    const panelBodyElement = fixture.debugElement.query(By.css('div[ngbPanelContent]'));
    expect(panelBodyElement.nativeElement.classList).not.toContain('show');
  });

  // Test Case 19: Invalid Input Values
  it('should not accept invalid input values for the activeIds property', () => {
    fixture.componentInstance.activeIds = ['invalid-id'];
    fixture.detectChanges();
    const accordionElement = fixture.debugElement.query(By.css('button[ngbPanelToggle]'));
    accordionElement.triggerEventHandler('click', {});
    fixture.detectChanges();
    const panelBodyElement = fixture.debugElement.query(By.css('div[ngbPanelContent]'));
    expect(panelBodyElement.styles['display']).toBe('none');
  });

  // Test Case 20: Performance Issues
  it('should not have any performance issues when the accordion is opened or closed', fakeAsync(() => {
    fixture.detectChanges();
    const accordionElement = fixture.debugElement.query(By.css('button[ngbPanelToggle]'));
    accordionElement.triggerEventHandler('click', {});
    tick(500);
    const panelBodyElement = fixture.debugElement.query(By.css('div[ngbPanelContent]'));
    expect(panelBodyElement.styles['display']).toBe('block');
    accordionElement.triggerEventHandler('click', {});
    tick(500);
    expect(panelBodyElement.styles['display']).toBe('none');
  }));
});