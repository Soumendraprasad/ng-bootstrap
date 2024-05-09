import {  ComponentFixture, TestBed, tick, fakeAsync  } from '@angular/core/testing';
import {  NgbAccordionModule, NgbAccordionItem, NgbAccordion  } from '../accordion.module';
import {  By  } from '@angular/platform-browser';

describe('NgbAccordionModule', () => {
  let fixture: ComponentFixture<NgbAccordion>;
  let accordion: NgbAccordion;
  let accordionItemHeaders: HTMLElement[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgbAccordionModule],
    });

    fixture = TestBed.createComponent(NgbAccordion);
    accordion = fixture.componentInstance;
    fixture.detectChanges();

    accordionItemHeaders = fixture.debugElement.queryAll(By.css('.accordion-header')).map(element => element.nativeElement);
  });

  it('should render the accordion properly', () => {
    // Assert that the accordion is rendered with 3 accordion items.
    expect(accordionItemHeaders.length).toBe(3);
    expect(accordionItemHeaders[0].textContent).toContain('Item 1');
    expect(accordionItemHeaders[1].textContent).toContain('Item 2');
    expect(accordionItemHeaders[2].textContent).toContain('Item 3');
  });

  it('should toggle the visibility of accordion content on header click', () => {
    // Assert that the content of the first accordion item is initially hidden.
    const firstAccordionItemContent = fixture.debugElement.query(By.css('.accordion-item:first-child .accordion-body')).nativeElement;
    expect(firstAccordionItemContent.classList.contains('show')).toBeFalsy();

    // Simulate a click on the first accordion header.
    accordionItemHeaders[0].dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // Assert that the content of the first accordion item is now visible.
    expect(firstAccordionItemContent.classList.contains('show')).toBeTruthy();

    // Simulate a click on the first accordion header again.
    accordionItemHeaders[0].dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // Assert that the content of the first accordion item is now hidden again.
    expect(firstAccordionItemContent.classList.contains('show')).toBeFalsy();
  });

  it('should allow multiple accordions on the same page', () => {
    // Create a second accordion.
    const secondAccordion = fixture.debugElement.query(By.css('ngb-accordion:nth-child(2)')).nativeElement;
    const secondAccordionItemHeaders = fixture.debugElement.queryAll(By.css('ngb-accordion:nth-child(2) .accordion-header')).map(element => element.nativeElement);

    // Assert that the second accordion is rendered with 2 accordion items.
    expect(secondAccordionItemHeaders.length).toBe(2);
    expect(secondAccordionItemHeaders[0].textContent).toContain('Item 4');
    expect(secondAccordionItemHeaders[1].textContent).toContain('Item 5');

    // Simulate a click on the first header of the second accordion.
    secondAccordionItemHeaders[0].dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // Assert that the content of the first accordion item of the second accordion is now visible.
    const firstAccordionItemContentOfSecondAccordion = secondAccordion.querySelector('.accordion-item:first-child .accordion-body');
    expect(firstAccordionItemContentOfSecondAccordion.classList.contains('show')).toBeTruthy();

    // Assert that the content of the first accordion item of the first accordion is still hidden.
    const firstAccordionItemContentOfFirstAccordion = fixture.debugElement.query(By.css('.accordion-item:first-child .accordion-body')).nativeElement;
    expect(firstAccordionItemContentOfFirstAccordion.classList.contains('show')).toBeFalsy();
  });

  it('should disable accordion items', () => {
    // Disable the second accordion item.
    accordion.items[1].disabled = true;
    fixture.detectChanges();

    // Assert that the second accordion item is disabled.
    expect(accordionItemHeaders[1].classList.contains('disabled')).toBeTruthy();

    // Simulate a click on the header of the disabled accordion item.
    accordionItemHeaders[1].dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // Assert that the content of the disabled accordion item is not toggled.
    const secondAccordionItemContent = fixture.debugElement.query(By.css('.accordion-item:nth-child(2) .accordion-body')).nativeElement;
    expect(secondAccordionItemContent.classList.contains('show')).toBeFalsy();
  });

  it('should support keyboard navigation', () => {
    // Focus the first accordion header.
    accordionItemHeaders[0].focus();

    // Simulate a down arrow key press.
    accordionItemHeaders[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    fixture.detectChanges();

    // Assert that the focus moved to the second accordion header.
    expect(document.activeElement).toBe(accordionItemHeaders[1]);

    // Simulate a right arrow key press.
    accordionItemHeaders[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    fixture.detectChanges();

    // Assert that the content of the second accordion item is now visible.
    const secondAccordionItemContent = fixture.debugElement.query(By.css('.accordion-item:nth-child(2) .accordion-body')).nativeElement;
    expect(secondAccordionItemContent.classList.contains('show')).toBeTruthy();

    // Simulate a space key press.
    accordionItemHeaders[1].dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    fixture.detectChanges();

    // Assert that the content of the second accordion item is now hidden.
    expect(secondAccordionItemContent.classList.contains('show')).toBeFalsy();
  });

  it('should be accessible to assistive technologies', () => {
    // Assert that the accordion has the appropriate ARIA attributes.
    const accordionElement = fixture.debugElement.query(By.css('ngb-accordion')).nativeElement;
    expect(accordionElement.getAttribute('role')).toBe('tablist');
    expect(accordionElement.getAttribute('aria-multiselectable')).toBe('true');

    const accordionItemHeadersWithAriaExpanded = accordionItemHeaders.filter(header => header.getAttribute('aria-expanded') !== null);
    expect(accordionItemHeadersWithAriaExpanded.length).toBe(3);
    expect(accordionItemHeadersWithAriaExpanded[0].getAttribute('aria-expanded')).toBe('false');
    expect(accordionItemHeadersWithAriaExpanded[1].getAttribute('aria-expanded')).toBe('false');
    expect(accordionItemHeadersWithAriaExpanded[2].getAttribute('aria-expanded')).toBe('false');

    // Assert that the accordion items have the appropriate ARIA attributes.
    const accordionItems = fixture.debugElement.queryAll(By.css('.accordion-item'));
    expect(accordionItems.length).toBe(3);
    accordionItems.forEach((accordionItem, index) => {
      expect(accordionItem.nativeElement.getAttribute('role')).toBe('tabpanel');
      expect(accordionItem.nativeElement.getAttribute('aria-labelledby')).toBe(`accordion-header-${index + 1}`);
    });

    // Simulate a click on the first accordion header.
    accordionItemHeaders[0].dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // Assert that the aria-expanded attribute of the first accordion header is now true.
    expect(accordionItemHeaders[0].getAttribute('aria-expanded')).toBe('true');

    // Assert that the aria-hidden attribute of the first accordion item is now false.
    const firstAccordionItemContent = fixture.debugElement.query(By.css('.accordion-item:first-child .accordion-body')).nativeElement;
    expect(firstAccordionItemContent.getAttribute('aria-hidden')).toBe('false');
  });

  it('should fire events when items are expanded or collapsed', () => {
    // Spy on the expand and collapse events.
    const expandSpy = jasmine.createSpy('expand');
    const collapseSpy = jasmine.createSpy('collapse');
    accordion.expandChange.subscribe(expandSpy);
    accordion.collapseChange.subscribe(collapseSpy);

    // Simulate a click on the first accordion header.
    accordionItemHeaders[0].dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // Assert that the expand event was fired.
    expect(expandSpy).toHaveBeenCalledWith(accordion.items[0]);

    // Assert that the collapse event was not fired.
    expect(collapseSpy).not.toHaveBeenCalled();

    // Simulate a click on the first accordion header again.
    accordionItemHeaders[0].dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // Assert that the expand event was not fired.
    expect(expandSpy).toHaveBeenCalledTimes(1);

    // Assert that the collapse event was fired.
    expect(collapseSpy).toHaveBeenCalledWith(accordion.items[0]);
  });

  it('should allow multiple accordions to be opened at the same time', () => {
    // Simulate a click on the first and second accordion headers.
    accordionItemHeaders[0].dispatchEvent(new Event('click'));
    accordionItemHeaders[1].dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // Assert that the content of the first and second accordion items is now visible.
    const firstAccordionItemContent = fixture.debugElement.query(By.css('.accordion-item:first-child .accordion-body')).nativeElement;
    const secondAccordionItemContent = fixture.debugElement.query(By.css('.accordion-item:nth-child(2) .accordion-body')).nativeElement;
    expect(firstAccordionItemContent.classList.contains('show')).toBeTruthy();
    expect(secondAccordionItemContent.classList.contains('show')).toBeTruthy();
  });

  it('should close all other accordions when one is opened', () => {
    // Simulate a click on the first accordion header.
    accordionItemHeaders[0].dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // Assert that the content of the first accordion item is now visible.
    const firstAccordionItemContent = fixture.debugElement.query(By.css('.accordion-item:first-child .accordion-body')).nativeElement;
    expect(firstAccordionItemContent.classList.contains('show')).toBeTruthy();

    // Simulate a click on the second accordion header.
    accordionItemHeaders[1].dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // Assert that the content of the first accordion item is now hidden.
    expect(firstAccordionItemContent.classList.contains('show')).toBeFalsy();

    // Assert that the content of the second accordion item is now visible.
    const secondAccordionItemContent = fixture.debugElement.query(By.css('.accordion-item:nth-child(2) .accordion-body')).nativeElement;
    expect(secondAccordionItemContent.classList.contains('show')).toBeTruthy();
  });

  it('should not close an accordion if its `closeOthers` property is set to false', () => {
    // Set the `closeOthers` property of the first accordion to false.
    accordion.items[0].closeOthers = false;

    // Simulate a click on the first accordion header.
    accordionItemHeaders[0].dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // Assert that the content of the first accordion item is now visible.
    const firstAccordionItemContent = fixture.debugElement.query(By.css('.accordion-item:first-child .accordion-body')).nativeElement;
    expect(firstAccordionItemContent.classList.contains('show')).toBeTruthy();

    // Simulate a click on the second accordion header.
    accordionItemHeaders[1].dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // Assert that the content of the first accordion item is still visible.
    expect(firstAccordionItemContent.classList.contains('show')).toBeTruthy();

    // Assert that the content of the second accordion item is now visible.
    const secondAccordionItemContent = fixture.debugElement.query(By.css('.accordion-item:nth-child(2) .accordion-body')).nativeElement;
    expect(secondAccordionItemContent.classList.contains('show')).toBeTruthy();
  });
});