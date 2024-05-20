import {
Component,
DebugElement,
Input,
OnInit,
TemplateRef,
ViewChild,
} from '@angular/core';
import {
async,
ComponentFixture,
TestBed,
fakeAsync,
tick,
} from '@angular/core/testing';
import {
NgbAccordion,
NgbAccordionItem,
NgbAccordionToggle,
} from '../accordion.directive';

describe('NgbAccordion', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let accordion: NgbAccordion;
  let accordionItems: DebugElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, NgbAccordion, NgbAccordionItem, NgbAccordionToggle],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    accordion = fixture.debugElement.query(By.directive(NgbAccordion)).componentInstance;
    accordionItems = fixture.debugElement.queryAll(By.directive(NgbAccordionItem));
    fixture.detectChanges();
  });

  it('should expand and collapse items', () => {
    expect(accordionItems[0].nativeElement.classList).toContain('collapsed');
    component.toggleItem(0);
    fixture.detectChanges();
    expect(accordionItems[0].nativeElement.classList).not.toContain('collapsed');
    component.toggleItem(0);
    fixture.detectChanges();
    expect(accordionItems[0].nativeElement.classList).toContain('collapsed');
  });

  it('should expand and collapse items with closeOthers', () => {
    component.closeOthers = true;
    fixture.detectChanges();

    component.toggleItem(0);
    fixture.detectChanges();
    expect(accordionItems[0].nativeElement.classList).not.toContain('collapsed');
    expect(accordionItems[1].nativeElement.classList).toContain('collapsed');

    component.toggleItem(1);
    fixture.detectChanges();
    expect(accordionItems[0].nativeElement.classList).toContain('collapsed');
    expect(accordionItems[1].nativeElement.classList).not.toContain('collapsed');
  });

  it('should destroy item body on hide', fakeAsync(() => {
    component.destroyOnHide = true;
    component.toggleItem(0);
    fixture.detectChanges();

    expect(accordionItems[0].nativeElement.querySelector('div')).toBeTruthy();

    component.toggleItem(0);
    fixture.detectChanges();

    tick(500); // wait for the animation to finish
    expect(accordionItems[0].nativeElement.querySelector('div')).toBeFalsy();
  }));

  it('should use custom item IDs', () => {
    component.customItemIds = true;
    component.toggleItem(0);
    fixture.detectChanges();

    expect(accordionItems[0].nativeElement.id).toBe('item-1');
    expect(accordionItems[1].nativeElement.id).toBe('item-2');
  });

  it('should disable items', () => {
    component.disableItem1 = true;
    fixture.detectChanges();

    accordionItems[0].query(By.css('button')).nativeElement.click();
    fixture.detectChanges();

    expect(accordionItems[0].nativeElement.classList).toContain('collapsed');
    expect(accordionItems[1].nativeElement.classList).not.toContain('collapsed');
  });

  it('should animate items', () => {
    component.animation = true;
    component.toggleItem(0);
    fixture.detectChanges();

    expect(accordionItems[0].nativeElement.classList).toContain('collapsing');

    setTimeout(() => {
      expect(accordionItems[0].nativeElement.classList).not.toContain('collapsing');
      expect(accordionItems[0].nativeElement.classList).not.toContain('collapsed');
    }, 500); // wait for the animation to finish
  });

  it('should fire events', () => {
    const showSpy = jasmine.createSpy('show');
    const shownSpy = jasmine.createSpy('shown');
    const hideSpy = jasmine.createSpy('hide');
    const hiddenSpy = jasmine.createSpy('hidden');
    accordion.show.subscribe(showSpy);
    accordion.shown.subscribe(shownSpy);
    accordion.hide.subscribe(hideSpy);
    accordion.hidden.subscribe(hiddenSpy);

    component.toggleItem(0);
    fixture.detectChanges();

    expect(showSpy).toHaveBeenCalledTimes(1);
    expect(shownSpy).toHaveBeenCalledTimes(1);
    expect(hideSpy).not.toHaveBeenCalled();
    expect(hiddenSpy).not.toHaveBeenCalled();

    component.toggleItem(0);
    fixture.detectChanges();

    expect(showSpy).toHaveBeenCalledTimes(2);
    expect(shownSpy).toHaveBeenCalledTimes(2);
    expect(hideSpy).toHaveBeenCalledTimes(1);
    expect(hiddenSpy).toHaveBeenCalledTimes(1);
  });
});

@Component({
  template: `
    <ngb-accordion [closeOthers]="closeOthers" [destroyOnHide]="destroyOnHide" [animation]="animation">
      <ngb-accordion-item *ngFor="let item of items; let i = index" [id]="customItemIds ? 'item-' + (i + 1) : ''">
        <ng-template ngbAccordionHeader>
          <button ngbAccordionToggle type="button">
            {{ item.header }}
          </button>
        </ng-template>
        <div ngbAccordionBody>
          {{ item.body }}
        </div>
      </ngb-accordion-item>
    </ngb-accordion>
  `,
})
class TestComponent implements OnInit {
  @Input() closeOthers = false;
  @Input() destroyOnHide = false;
  @Input() animation = false;
  @Input() customItemIds = false;
  @Input() disableItem1 = false;

  items = [
    { header: 'Item 1', body: 'Content of item 1' },
    { header: 'Item 2', body: 'Content of item 2' },
  ];

  ngOnInit() {
    if (this.disableItem1) {
      this.items[0].disabled = true;
    }
  }

  toggleItem(index: number) {
    accordionItems[index].query(By.css('button')).nativeElement.click();
  }

  disableItem(index: number) {
    this.items[index].disabled = true;
  }
}