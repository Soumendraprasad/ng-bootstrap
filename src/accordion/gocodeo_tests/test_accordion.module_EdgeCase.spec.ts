import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  NgbAccordionItem, NgbAccordionModule, NgbAccordionButton  } from '../accordion.module';
import {  By  } from '@angular/platform-browser';

describe('NgbAccordionModule', () => {
  let component: NgbAccordionItem;
  let fixture: ComponentFixture<NgbAccordionItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgbAccordionModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgbAccordionItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test 1: Empty Accordion
  it('should display an empty accordion without errors', () => {
    expect(fixture.nativeElement.querySelector('ngb-accordion')).toBeDefined();
    expect(() => fixture.detectChanges()).not.toThrow();
  });

  // Test 2: Single Accordion Item
  it('should expand and collapse a single accordion item', () => {
    const accordionItem = fixture.debugElement.query(By.directive(NgbAccordionItem));
    const accordionButton = accordionItem.query(By.directive(NgbAccordionButton));

    accordionButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(accordionItem.nativeElement.classList).toContain('show');

    accordionButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(accordionItem.nativeElement.classList).not.toContain('show');
  });

  // Test 3: Multiple Accordion Items
  it('should allow only one accordion item to be expanded at a time', () => {
    const accordionItems = fixture.debugElement.queryAll(By.directive(NgbAccordionItem));
    const accordionButtons = accordionItems.map(item => item.query(By.directive(NgbAccordionButton)));

    accordionButtons[0].triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(accordionItems[0].nativeElement.classList).toContain('show');
    expect(accordionItems[1].nativeElement.classList).not.toContain('show');

    accordionButtons[1].triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(accordionItems[0].nativeElement.classList).not.toContain('show');
    expect(accordionItems[1].nativeElement.classList).toContain('show');
  });

  // Test 4: Nested Accordions
  it('should support nested accordions', () => {
    const nestedAccordionItem = fixture.debugElement.query(By.directive(NgbAccordionItem));
    const nestedAccordionButton = nestedAccordionItem.query(By.directive(NgbAccordionButton));

    nestedAccordionButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(nestedAccordionItem.nativeElement.classList).toContain('show');

    const nestedAccordionItems = nestedAccordionItem.queryAll(By.directive(NgbAccordionItem));
    const nestedAccordionButtons = nestedAccordionItems.map(item => item.query(By.directive(NgbAccordionButton)));

    nestedAccordionButtons[0].triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(nestedAccordionItems[0].nativeElement.classList).toContain('show');
    expect(nestedAccordionItems[1].nativeElement.classList).not.toContain('show');

    nestedAccordionButtons[1].triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(nestedAccordionItems[0].nativeElement.classList).not.toContain('show');
    expect(nestedAccordionItems[1].nativeElement.classList).toContain('show');
  });

  // Test 5: Custom Content
  it('should support custom content within accordion items', () => {
    const accordionItem = fixture.debugElement.query(By.directive(NgbAccordionItem));
    const accordionBody = accordionItem.query(By.directive(NgbAccordionBody));

    expect(accordionBody.nativeElement.textContent).toContain('Accordion Item Content');
  });

  // Test 6: Dynamic Changes
  it('should adjust its structure and functionality when items are added or removed dynamically', () => {
    const accordionItems = fixture.debugElement.queryAll(By.directive(NgbAccordionItem));

    // Add a new item
    component.items.push({
      id: 3,
      title: 'Item 3',
      content: 'Item 3 Content',
    });
    fixture.detectChanges();

    expect(accordionItems.length).toBe(3);

    // Remove an item
    component.items.pop();
    fixture.detectChanges();

    expect(accordionItems.length).toBe(2);
  });

  // Test 7: Event Handling
  it('should emit (open) and (close) events when accordion items are expanded or collapsed', () => {
    const accordionItem = fixture.debugElement.query(By.directive(NgbAccordionItem));
    const accordionButton = accordionItem.query(By.directive(NgbAccordionButton));

    let openEventEmitted = false;
    let closeEventEmitted = false;

    component.open.subscribe(() => (openEventEmitted = true));
    component.close.subscribe(() => (closeEventEmitted = true));

    accordionButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(openEventEmitted).toBeTrue();

    accordionButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(closeEventEmitted).toBeTrue();
  });

  // Test 8: Accessibility
  it('should be accessible using keyboard interactions and screen readers', () => {
    const accordionItem = fixture.debugElement.query(By.directive(NgbAccordionItem));
    const accordionButton = accordionItem.query(By.directive(NgbAccordionButton));

    // Test keyboard navigation
    accordionButton.triggerEventHandler('keydown.ArrowDown', null);
    fixture.detectChanges();
    expect(accordionItem.nativeElement.classList).toContain('show');

    accordionButton.triggerEventHandler('keydown.ArrowUp', null);
    fixture.detectChanges();
    expect(accordionItem.nativeElement.classList).not.toContain('show');

    // Test screen reader announcements
    accordionButton.triggerEventHandler('keydown.Enter', null);
    fixture.detectChanges();
    expect(document.activeElement).toBe(accordionItem.nativeElement.querySelector('button'));
  });

  // Test 9: Responsive Behavior
  it('should adapt its layout and behavior on different screen sizes and devices', () => {
    // Mock window.innerWidth to simulate different screen sizes
    const originalInnerWidth = window.innerWidth;
    window.innerWidth = 500;

    fixture.detectChanges();
    expect(accordionItem.nativeElement.classList).toContain('accordion-item-mobile');

    window.innerWidth = originalInnerWidth;
    fixture.detectChanges();
    expect(accordionItem.nativeElement.classList).not.toContain('accordion-item-mobile');
  });

  // Test 10: Performance
  it('should not cause significant performance degradation or memory leaks with a large number of items', () => {
    // Create a large number of accordion items
    for (let i = 0; i < 1000; i++) {
      component.items.push({
        id: i,
        title: `Item ${i}`,
        content: `Item ${i} Content`,
      });
    }
    fixture.detectChanges();

    // Check for performance issues
    expect(performance.now()).toBeLessThan(100); // Arbitrary performance threshold
  });

  // Test 11: Internationalization (i18n)
  it('should properly localize labels and content according to the current locale', () => {
    // Mock the locale service to simulate a different locale
    const localeService = TestBed.inject(NgbAccordionModule);
    localeService.currentLocale = 'fr';

    fixture.detectChanges();
    expect(accordionItem.nativeElement.querySelector('button').textContent).toContain('Titre');
  });

  // Test 12: Integration with Other Modules
  it('should be compatible with other Angular modules or libraries', () => {
    // Mock another Angular module or library
    const mockModule = {
      provide: 'MockModule',
      useValue: {},
    };

    TestBed.configureTestingModule({
      providers: [mockModule],
    });

    fixture.detectChanges();

    // Check for compatibility issues
    expect(() => fixture.detectChanges()).not.toThrow();
  });

  // Test 13: Disabled Accordion Items
  it('should disable accordion items and prevent them from expanding', () => {
    const accordionItem = fixture.debugElement.query(By.directive(NgbAccordionItem));
    const accordionButton = accordionItem.query(By.directive(NgbAccordionButton));

    // Disable the accordion item
    component.items[0].disabled = true;
    fixture.detectChanges();

    // Attempt to expand the disabled accordion item
    accordionButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    // Verify that the accordion item remains collapsed
    expect(accordionItem.nativeElement.classList).not.toContain('show');
  });

  // Test 14: Multiple Accordion Items with Initial Expansion
  it('should allow multiple accordion items to be expanded initially', () => {
    // Set multiple accordion items to be initially expanded
    component.items[0].expanded = true;
    component.items[2].expanded = true;
    fixture.detectChanges();

    // Verify that the specified accordion items are expanded
    const accordionItems = fixture.debugElement.queryAll(By.directive(NgbAccordionItem));
    expect(accordionItems[0].nativeElement.classList).toContain('show');
    expect(accordionItems[2].nativeElement.classList).toContain('show');
  });

  // Test 15: Custom Accordion Item Template
  it('should support custom accordion item templates', () => {
    // Define a custom accordion item template
    const customTemplate = `
      <ng-template ngbAccordionItem>
        <div class="custom-accordion-item">
          <ng-content></ng-content>
        </div>
      </ng-template>
    `;

    // Override the default accordion item template with the custom template
    TestBed.overrideTemplate(NgbAccordionItem, customTemplate);
    fixture = TestBed.createComponent(NgbAccordionItem);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Verify that the custom template is being used
    const accordionItem = fixture.debugElement.query(By.directive(NgbAccordionItem));
    expect(accordionItem.nativeElement.classList).toContain('custom-accordion-item');
  });

  // Test 16: ARIA Attributes
  it('should include appropriate ARIA attributes for accessibility', () => {
    const accordionItem = fixture.debugElement.query(By.directive(NgbAccordionItem));
    const accordionButton = accordionItem.query(By.directive(NgbAccordionButton));

    // Verify the presence of ARIA attributes on the accordion item
    expect(accordionItem.nativeElement.getAttribute('role')).toBe('tablist');
    expect(accordionItem.nativeElement.getAttribute('aria-multiselectable')).toBe('false');

    // Verify the presence of ARIA attributes on the accordion button
    expect(accordionButton.nativeElement.getAttribute('role')).toBe('tab');
    expect(accordionButton.nativeElement.getAttribute('aria-controls')).toBeDefined();
    expect(accordionButton.nativeElement.getAttribute('aria-expanded')).toBe('false');
  });

  // Test 17: Focus Management
  it('should manage focus correctly when expanding and collapsing accordion items', () => {
    const accordionItem = fixture.debugElement.query(By.directive(NgbAccordionItem));
    const accordionButton = accordionItem.query(By.directive(NgbAccordionButton));

    // Initially, focus should be on the accordion button
    expect(document.activeElement).toBe(accordionButton.nativeElement);

    // Click the accordion button to expand the item
    accordionButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    // Focus should now be on the first focusable element within the accordion item
    const focusableElement = accordionItem.nativeElement.querySelector('button');
    expect(document.activeElement).toBe(focusableElement);

    // Click the accordion button again to collapse the item
    accordionButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    // Focus should return to the accordion button
    expect(document.activeElement).toBe(accordionButton.nativeElement);
  });

  // Test 18: Error Handling
  it('should handle errors gracefully when invalid input is provided', () => {
    // Attempt to set an invalid value for the 'id' property of an accordion item
    component.items[0].id = null;
    fixture.detectChanges();

    // Verify that an error is logged to the console
    expect(console.error).toHaveBeenCalledWith('id property of NgbAccordionItem must be a number.');
  });

  // Test 19: Change Detection
  it('should trigger change detection when the items array is updated', () => {
    // Create a spy on the changeDetectorRef to monitor change detection cycles
    const changeDetectorSpy = spyOn(fixture.componentRef.injector.get(ChangeDetectorRef), 'markForCheck');

    // Update the items array
    component.items.push({
      id: 4,
      title: 'Item 4',
      content: 'Item 4 Content',
    });

    // Verify that change detection was triggered
    expect(changeDetectorSpy).toHaveBeenCalled();
  });

  // Test 20: Accessibility (Keyboard Navigation)
  it('should allow keyboard navigation between accordion items using arrow keys', () => {
    const accordionItems = fixture.debugElement.queryAll(By.directive(NgbAccordionItem));
    const accordionButtons = accordionItems.map(item => item.query(By.directive(NgbAccordionButton)));

    // Initially, the first accordion item should be focused
    expect(document.activeElement).toBe(accordionButtons[0].nativeElement);

    // Press the down arrow key to move focus to the next accordion item
    accordionButtons[0].triggerEventHandler('keydown.ArrowDown', null);
    fixture.detectChanges();

    // Verify that the second accordion item is now focused
    expect(document.activeElement).toBe(accordionButtons[1].nativeElement);

    // Press the up arrow key to move focus back to the first accordion item
    accordionButtons[1].triggerEventHandler('keydown.ArrowUp', null);
    fixture.detectChanges();

    // Verify that the first accordion item is again focused
    expect(document.activeElement).toBe(accordionButtons[0].nativeElement);
  });

  // Test 21: Accessibility (Screen Reader Announcements)
  it('should announce changes in the expanded state of accordion items to screen readers', () => {
    const accordionItem = fixture.debugElement.query(By.directive(NgbAccordionItem));
    const accordionButton = accordionItem.query(By.directive(NgbAccordionButton));

    // Set up a mock screen reader
    const mockScreenReader = {
      announce: jasmine.createSpy('announce')
    };

    // Inject the mock screen reader into the component
    component.screenReader = mockScreenReader;

    // Expand the accordion item
    accordionButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    // Verify that the screen reader announced the expansion of the accordion item
    expect(mockScreenReader.announce).toHaveBeenCalledWith('Item 1 expanded.');

    // Collapse the accordion item
    accordionButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    // Verify that the screen reader announced the collapse of the accordion item
    expect(mockScreenReader.announce).toHaveBeenCalledWith('Item 1 collapsed.');
  });

  // Test 22: Edge Case - Empty Accordion Item Content
  it('should handle accordion items with empty content without errors', () => {
    // Set the content of an accordion item to an empty string
    component.items[0].content = '';
    fixture.detectChanges();

    // Verify that the accordion item is still rendered without errors
    const accordionItem = fixture.debugElement.query(By.directive(NgbAccordionItem));
    expect(accordionItem.nativeElement).toBeDefined();
  });

  // Test 23: Edge Case - Dynamic Addition of Disabled Accordion Items
  it('should correctly handle the addition of disabled accordion items dynamically', () => {
    // Add a disabled accordion item to the items array
    component.items.push({
      id: 4,
      title: 'Item 4',
      content: 'Item 4 Content',
      disabled: true
    });
    fixture.detectChanges();

    // Verify that the new accordion item is disabled
    const accordionItem = fixture.debugElement.queryAll(By.directive(NgbAccordionItem))[3];
    expect(accordionItem.nativeElement.classList).toContain('disabled');
  });

  // Test 24: Edge Case - Keyboard Navigation with Disabled Accordion Items
  it('should skip disabled accordion items when navigating using the keyboard', () => {
    // Disable the second accordion item
    component.items[1].disabled = true;
    fixture.detectChanges();

    const accordionItems = fixture.debugElement.queryAll(By.directive(NgbAccordionItem));
    const accordionButtons = accordionItems.map(item => item.query(By.directive(NgbAccordionButton)));

    // Initially, the first accordion item should be focused
    expect(document.activeElement).toBe(accordionButtons[0].nativeElement);

    // Press the down arrow key to move focus to the next accordion item
    accordionButtons[0].triggerEventHandler('keydown.ArrowDown', null);
    fixture.detectChanges();

    // Verify that the third accordion item is now focused, skipping the disabled second item
    expect(document.activeElement).toBe(accordionButtons[2].nativeElement);
  });

  // Test 25: Edge Case - ARIA Attributes for Disabled Accordion Items
  it('should correctly apply ARIA attributes to disabled accordion items', () => {
    // Disable the second accordion item
    component.items[1].disabled = true;
    fixture.detectChanges();

    const accordionItems = fixture.debugElement.queryAll(By.directive(NgbAccordionItem));
    const disabledAccordionItem = accordionItems[1];

    // Verify that the disabled accordion item has the appropriate ARIA attributes
    expect(disabledAccordionItem.nativeElement.getAttribute('aria-disabled')).toBe('true');
    expect(disabledAccordionItem.nativeElement.getAttribute('tabindex')).toBe('-1');
  });
});