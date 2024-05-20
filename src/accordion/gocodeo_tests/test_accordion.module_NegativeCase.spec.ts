import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  NgbAccordionModule  } from '../accordion.module';
import {  NgbAccordionDirective  } from '../accordion.directive';
import {  By  } from '@angular/platform-browser';
import {
NgbAccordionItem,
NgbAccordionHeader,
NgbAccordionBody,
NgbAccordionButton,
} from '../accordion.directive';

describe('NgbAccordionModule Negative Scenarios', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgbAccordionModule],
    });

    fixture = TestBed.createComponent(NgbAccordionDirective);
  });

  // Test 1: Missing Module Import
  it('should throw error if NgbAccordionModule is not imported', () => {
    const moduleWithoutNgbAccordion = TestBed.configureTestingModule({
      imports: [],
    });

    expect(() => {
      moduleWithoutNgbAccordion.compileComponents();
    }).toThrowError(/NgbAccordionModule.*not imported.*?/);
  });

  // Test 2: Incorrect Directive Usage
  it('should throw error if NgbAccordionItem is used incorrectly', () => {
    const incorrectUsageTemplate = `
      <div>
        <ngb-accordion-item>
          <ngb-accordion-header></ngb-accordion-header>
          <ngb-accordion-body></ngb-accordion-body>
        </ngb-accordion-item>
      </div>
    `;
    fixture.nativeElement.innerHTML = incorrectUsageTemplate;
    expect(() => {
      fixture.detectChanges();
    }).toThrowError(/NgbAccordionItem.*must be inside NgbAccordion.*?/);
  });

  // Test 3: Missing Directive Import
  it('should throw error if necessary directives are not imported', () => {
    @NgModule({
      declarations: [TestComponent],
    })
    class TestModule {}

    const testBedWithoutDirectives = TestBed.configureTestingModule({
      imports: [TestModule],
    });

    expect(() => {
      testBedWithoutDirectives.compileComponents();
    }).toThrowError(/NgbAccordionItem.*not imported.*?/);
  });

  // Test 4: Incorrect Directive Configuration
  it('should throw error if NgbAccordionConfig is not set correctly', () => {
    const incorrectConfigurationTemplate = `
      <ngb-accordion [closeOthers]="invalidValue"></ngb-accordion>
    `;
    fixture.nativeElement.innerHTML = incorrectConfigurationTemplate;
    expect(() => {
      fixture.detectChanges();
    }).toThrowError(/closeOthers.*invalid.*?/);
  });

  // Test 5: Event Handling Issues
  it('should throw error if event handlers are not bound correctly', () => {
    const incorrectEventBindingTemplate = `
      <ngb-accordion-item (click)="handleIncorrectEvent($event)"></ngb-accordion-item>
    `;
    fixture.nativeElement.innerHTML = incorrectEventBindingTemplate;
    expect(() => {
      fixture.detectChanges();
    }).toThrowError(/Event binding.*not supported.*?/);
  });

  // Test 6: Content Projection Issues
  it('should throw error if content is not projected correctly', () => {
    const incorrectProjectionTemplate = `
      <ngb-accordion-item>
        <div>Content Outside NgbAccordionBody</div>
      </ngb-accordion-item>
    `;
    fixture.nativeElement.innerHTML = incorrectProjectionTemplate;
    expect(() => {
      fixture.detectChanges();
    }).toThrowError(/Content.*must be projected.*NgbAccordionBody.*?/);
  });

  // Test 7: Styling Conflicts
  it('should show styling conflicts if custom CSS conflicts with NgbAccordionModule styles', () => {
    const customStyleElement = document.createElement('style');
    customStyleElement.innerHTML = `.ngb-accordion { background-color: red; }`;
    document.head.appendChild(customStyleElement);

    fixture.detectChanges();

    const accordionElement = fixture.debugElement.query(By.css('.ngb-accordion'));
    expect(accordionElement.nativeElement.style.backgroundColor).toBe('red');
  });

  // Test 8: Animation Issues
  it('should throw error if animation does not work correctly', () => {
    @NgModule({
      declarations: [TestComponent],
    })
    class TestModule {}

    const testBedWithoutAnimationsModule = TestBed.configureTestingModule({
      imports: [TestModule],
    });

    expect(() => {
      testBedWithoutAnimationsModule.compileComponents();
    }).toThrowError(/Animation.*not supported.*AnimationsModule.*?/);
  });

  // Test 9: Accessibility Issues
  it('should ensure proper accessibility attributes are set', () => {
    const accordionElement = fixture.debugElement.query(By.css('.ngb-accordion'));
    expect(accordionElement.nativeElement.getAttribute('role')).toBe('tablist');
    expect(accordionElement.nativeElement.getAttribute('aria-multiselectable')).toBe('true');

    const accordionItems = fixture.debugElement.queryAll(By.css('.ngb-accordion-item'));
    accordionItems.forEach((item) => {
      expect(item.nativeElement.getAttribute('role')).toBe('tab');
      expect(item.nativeElement.getAttribute('aria-expanded')).toBe('false');
    });
  });

  // Test 10: Template Syntax Issues
  it('should throw error if invalid template syntax is used', () => {
    const invalidTemplate = `
      <ngb-accordion-item>
        <ng-template *ngIf="false">
          <ngb-accordion-header></ngb-accordion-header>
          <ngb-accordion-body></ngb-accordion-body>
        </ng-template>
      </ngb-accordion-item>
    `;
    fixture.nativeElement.innerHTML = invalidTemplate;
    expect(() => {
      fixture.detectChanges();
    }).toThrowError(/Invalid template syntax.*?/);
  });

  // Test 11: Dynamic Component Loading Issues
  it('should support dynamic component loading within accordion panels', () => {
    @Component({
      template: `
        <ngb-accordion-item>
          <ngb-accordion-header>Dynamic Component</ngb-accordion-header>
          <ng-template ngbAccordionBody>
            <dynamic-component></dynamic-component>
          </ng-template>
        </ngb-accordion-item>
      `,
    })
    class TestComponent {}

    TestBed.overrideComponent(TestComponent, {
      set: {
        template: `
          <ngb-accordion-item>
            <ngb-accordion-header>Dynamic Component</ngb-accordion-header>
            <ng-template ngbAccordionBody>
              <div>Dynamic Component Content</div>
            </ng-template>
          </ngb-accordion-item>
        `,
      },
    });

    fixture.detectChanges();
    const accordionItem = fixture.debugElement.query(By.css('.ngb-accordion-item'));
    const accordionBody = accordionItem.query(By.css('.ngb-accordion-body'));
    expect(accordionBody.nativeElement.textContent).toContain('Dynamic Component Content');
  });
});