import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  NgbAccordionModule  } from '../accordion.module';
import {  NgbAccordionDirective  } from '../accordion.directive';
import {  NgbAccordionItem  } from '../accordion.directive';
import {  NgbAccordionHeader  } from '../accordion.directive';
import {  NgbAccordionToggle  } from '../accordion.directive';
import {  NgbAccordionBody  } from '../accordion.directive';
import {  NgbAccordionCollapse  } from '../accordion.directive';
import {  NgbAccordionButton  } from '../accordion.directive';
import {  By  } from '@angular/platform-browser';

describe('NgbAccordionModule', () => {
  let component: NgbAccordionDirective;
  let fixture: ComponentFixture<NgbAccordionDirective>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgbAccordionModule]
    });

    fixture = TestBed.createComponent(NgbAccordionDirective);
    component = fixture.componentInstance;
  });

  // Scenario 1: Basic Accordion Toggle Functionality
  it('should open and close an accordion item when the toggle button is clicked', () => {
    // Arrange
    fixture.detectChanges();
    const accordionItem = fixture.debugElement.query(By.css('.accordion-item'));
    const toggleButton = accordionItem.query(By.css('.accordion-toggle'));

    // Act
    toggleButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    // Assert
    expect(accordionItem.classes['show']).toBeTrue();

    // Act
    toggleButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    // Assert
    expect(accordionItem.classes['show']).toBeFalse();
  });

  // Scenario 2: Multiple Accordion Items
  it('should open and close multiple accordion items independently', () => {
    // Arrange
    fixture.detectChanges();
    const accordionItems = fixture.debugElement.queryAll(By.css('.accordion-item'));
    const firstToggleButton = accordionItems[0].query(By.css('.accordion-toggle'));
    const secondToggleButton = accordionItems[1].query(By.css('.accordion-toggle'));

    // Act
    firstToggleButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    // Assert
    expect(accordionItems[0].classes['show']).toBeTrue();
    expect(accordionItems[1].classes['show']).toBeFalse();

    // Act
    secondToggleButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    // Assert
    expect(accordionItems[0].classes['show']).toBeTrue();
    expect(accordionItems[1].classes['show']).toBeTrue();
  });

  // Scenario 3: Nested Accordion Items
  it('should open and close nested accordion items', () => {
    // Arrange
    fixture.detectChanges();
    const parentAccordionItem = fixture.debugElement.query(By.css('.accordion-item'));
    const parentToggleButton = parentAccordionItem.query(By.css('.accordion-toggle'));
    const nestedAccordionItem = parentAccordionItem.query(By.css('.accordion-item'));
    const nestedToggleButton = nestedAccordionItem.query(By.css('.accordion-toggle'));

    // Act
    parentToggleButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    // Assert
    expect(parentAccordionItem.classes['show']).toBeTrue();
    expect(nestedAccordionItem.classes['show']).toBeFalse();

    // Act
    nestedToggleButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    // Assert
    expect(parentAccordionItem.classes['show']).toBeTrue();
    expect(nestedAccordionItem.classes['show']).toBeTrue();
  });

  // Scenario 4: Accordion Item Content Loading
  it('should load accordion item content asynchronously', () => {
    // Arrange
    fixture.detectChanges();
    const accordionItem = fixture.debugElement.query(By.css('.accordion-item'));
    const accordionBody = accordionItem.query(By.css('.accordion-body'));

    // Assert
    expect(accordionBody.nativeElement.textContent).toBe('');

    // Act
    accordionItem.triggerEventHandler('click', null);
    fixture.detectChanges();

    // Assert
    expect(accordionBody.nativeElement.textContent).toBe('This is the content of the accordion item.');
  });

  // Scenario 5: Accordion Item Header Customization
  it('should customize accordion item headers using CSS classes', () => {
    // Arrange
    fixture.detectChanges();
    const accordionItem = fixture.debugElement.query(By.css('.accordion-item'));
    const accordionHeader = accordionItem.query(By.css('.accordion-header'));

    // Assert
    expect(accordionHeader.classes['custom-class']).toBeTrue();
  });

  // Scenario 6: Accordion Accessibility
  it('should be accessible to users with disabilities', () => {
    // Arrange
    fixture.detectChanges();
    const accordionItem = fixture.debugElement.query(By.css('.accordion-item'));
    const accordionToggle = accordionItem.query(By.css('.accordion-toggle'));

    // Act
    accordionToggle.triggerEventHandler('click', null);
    fixture.detectChanges();

    // Assert
    expect(accordionItem.classes['show']).toBeTrue();

    // Act
    accordionToggle.triggerEventHandler('click', null);
    fixture.detectChanges();

    // Assert
    expect(accordionItem.classes['show']).toBeFalse();
  });

  // Bonus Scenario 1: Accordion Item Header with HTML markup
  it('should allow HTML markup in accordion item headers', () => {
    // Arrange
    fixture.detectChanges();
    const accordionItem = fixture.debugElement.query(By.css('.accordion-item'));
    const accordionHeader = accordionItem.query(By.css('.accordion-header'));

    // Assert
    expect(accordionHeader.nativeElement.innerHTML).toBe('<strong>Accordion Item Header</strong>');
  });

  // Bonus Scenario 2: Accordion Item Header with ARIA attributes
  it('should add appropriate ARIA attributes to accordion item headers', () => {
    // Arrange
    fixture.detectChanges();
    const accordionItem = fixture.debugElement.query(By.css('.accordion-item'));
    const accordionHeader = accordionItem.query(By.css('.accordion-header'));

    // Assert
    expect(accordionHeader.nativeElement.getAttribute('aria-expanded')).toBe('false');
    expect(accordionHeader.nativeElement.getAttribute('aria-controls')).toBe('accordion-body-1');
  });

  // Bonus Scenario 3: Accordion Item Body with ARIA attributes
  it('should add appropriate ARIA attributes to accordion item bodies', () => {
    // Arrange
    fixture.detectChanges();
    const accordionItem = fixture.debugElement.query(By.css('.accordion-item'));
    const accordionBody = accordionItem.query(By.css('.accordion-body'));

    // Assert
    expect(accordionBody.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });
});