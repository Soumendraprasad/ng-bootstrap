import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {
DebugElement,
ElementRef,
ViewContainerRef,
} from '@angular/core';
import {
AfterContentChecked,
AfterContentInit,
ChangeDetectorRef,
ContentChild,
ContentChildren,
DestroyRef,
Directive,
EventEmitter,
Input,
OnDestroy,
Output,
QueryList,
TemplateRef,
} from '@angular/core';
import {  NgbAccordionBody  } from '../accordion-body';
import {  NgbAccordionCollapse  } from '../accordion-collapse';
import {  NgbAccordionConfig  } from '../accordion-config';
import {  NgbAccordionDirective  } from '../accordion.directive';
import {  NgbAccordionHeader  } from '../accordion-header';
import {  NgbAccordionItem  } from '../accordion-item';
import {  NgbAccordionToggle  } from '../accordion-toggle';
import {  NgbCollapse  } from '../../collapse/collapse';
import {  isString  } from '../../util/util';

describe('NgbAccordion', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let accordionDirective: NgbAccordionDirective;
  let accordionItemDirective: NgbAccordionItem;
  let accordionItemHeaderDirective: NgbAccordionHeader;
  let accordionItemBodyDirective: NgbAccordionBody;
  let accordionItemToggleDirective: NgbAccordionToggle;
  let accordionItemCollapseDirective: NgbAccordionCollapse;
  let changeDetectorRef: ChangeDetectorRef;
  let viewContainerRef: ViewContainerRef;
  let elementRef: ElementRef;
  let destroyRef: DestroyRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        NgbAccordionDirective,
        NgbAccordionItem,
        NgbAccordionHeader,
        NgbAccordionBody,
        NgbAccordionToggle,
        NgbAccordionCollapse,
      ],
      providers: [
        { provide: ChangeDetectorRef, useValue: {} },
        { provide: ViewContainerRef, useValue: {} },
        { provide: ElementRef, useValue: {} },
        { provide: DestroyRef, useValue: {} },
        { provide: NgbAccordionConfig, useValue: new NgbAccordionConfig() },
      ],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    accordionDirective = component.accordionDirective;
    accordionItemDirective = component.accordionItemDirective;
    accordionItemHeaderDirective = component.accordionItemHeaderDirective;
    accordionItemBodyDirective = component.accordionItemBodyDirective;
    accordionItemToggleDirective = component.accordionItemToggleDirective;
    accordionItemCollapseDirective = component.accordionItemCollapseDirective;
    changeDetectorRef = fixture.debugElement.injector.get(ChangeDetectorRef);
    viewContainerRef = fixture.debugElement.injector.get(ViewContainerRef);
    elementRef = fixture.debugElement.injector.get(ElementRef);
    destroyRef = fixture.debugElement.injector.get(DestroyRef);
  });

  it('should not be used without a template reference variable', () => {
    const debugElement: DebugElement = fixture.debugElement.query(
      (de) => de.componentInstance instanceof NgbAccordionBody
    );
    expect(debugElement).toBeNull();
  });

  it('should not be used without a parent NgbAccordionItem directive', () => {
    const debugElement: DebugElement = fixture.debugElement.query(
      (de) => de.componentInstance instanceof NgbAccordionCollapse
    );
    expect(debugElement).toBeNull();
  });

  it('should not be used without a parent NgbAccordionItem directive', () => {
    const debugElement: DebugElement = fixture.debugElement.query(
      (de) => de.componentInstance instanceof NgbAccordionToggle
    );
    expect(debugElement).toBeNull();
  });

  it('should not be used without an ngbAccordion attribute', () => {
    const debugElement: DebugElement = fixture.debugElement.query(
      (de) => de.componentInstance instanceof NgbAccordionItem
    );
    expect(debugElement).toBeNull();
  });

  it('should not be used without at least one NgbAccordionItem directive', () => {
    expect(accordionDirective.items).toBeUndefined();
  });

  it('should not be used with an invalid animation value (e.g. false or none)', () => {
    accordionDirective.animation = false;
    expect(() => fixture.detectChanges()).toThrowError();

    accordionDirective.animation = 'none';
    expect(() => fixture.detectChanges()).toThrowError();
  });

  it('should not be used with an invalid closeOthers value (e.g. false or none)', () => {
    accordionDirective.closeOthers = false;
    expect(() => fixture.detectChanges()).toThrowError();

    accordionDirective.closeOthers = 'none';
    expect(() => fixture.detectChanges()).toThrowError();
  });

  it('should not be used with an invalid destroyOnHide value (e.g. false or none)', () => {
    accordionDirective.destroyOnHide = false;
    expect(() => fixture.detectChanges()).toThrowError();

    accordionDirective.destroyOnHide = 'none';
    expect(() => fixture.detectChanges()).toThrowError();
  });

  it('should not throw if the accordion has no items', () => {
    expect(() => fixture.detectChanges()).not.toThrow();
  });

  it('should not throw if the accordion has an item without a header', () => {
    accordionItemHeaderDirective = null;
    fixture.detectChanges();
  });

  it('should not throw if the accordion has an item without a body', () => {
    accordionItemBodyDirective = null;
    fixture.detectChanges();
  });

  it('should not throw if the accordion has an item without a toggle', () => {
    accordionItemToggleDirective = null;
    fixture.detectChanges();
  });
});

@Component({
  template: `
    <ngb-accordion [animation]="animation" [closeOthers]="closeOthers" [destroyOnHide]="destroyOnHide">
      <ngb-accordion-item [ngbAccordionItem]="id">
        <ngb-accordion-header>Header</ngb-accordion-header>
        <ngb-accordion-body>Body</ngb-accordion-body>
      </ngb-accordion-item>
    </ngb-accordion>
  `,
})
class TestComponent {
  animation = true;
  closeOthers = true;
  destroyOnHide = true;
  id = 'test-id';

  @ContentChild(NgbAccordionDirective) accordionDirective!: NgbAccordionDirective;
  @ContentChild(NgbAccordionItem) accordionItemDirective!: NgbAccordionItem;
  @ContentChild(NgbAccordionHeader) accordionItemHeaderDirective!: NgbAccordionHeader;
  @ContentChild(NgbAccordionBody) accordionItemBodyDirective!: NgbAccordionBody;
  @ContentChild(NgbAccordionToggle) accordionItemToggleDirective!: NgbAccordionToggle;
  @ContentChild(NgbAccordionCollapse) accordionItemCollapseDirective!: NgbAccordionCollapse;
}