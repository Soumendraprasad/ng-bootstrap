//@ts-nocheck
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
	Component,
	Directive,
	ElementRef,
	EventEmitter,
	Input,
	Output,
	TemplateRef,
	ViewContainerRef,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { NgbAccordionDirective, NgbAccordionItem, NgbAccordionCollapse } from '../accordion.directive';
import { NgbCollapse } from '../../collapse/collapse';

@Directive({
	selector: '[ngbAccordionCollapse]',
	host: { class: 'accordion-collapse' },
})
class MockNgbAccordionCollapse {
	@Input() item: any;
	ngbCollapse = {};
}

@Directive({
	selector: '[ngbAccordionItem]',
	host: { class: 'accordion-item' },
})
class MockNgbAccordionItem {
	@Input() id: string;
	@Input() destroyOnHide: boolean;
	@Input() disabled: boolean;
	@Input() collapsed: boolean;
	@Output() show = new EventEmitter<void>();
	@Output() shown = new EventEmitter<void>();
	@Output() hide = new EventEmitter<void>();
	@Output() hidden = new EventEmitter<void>();

	expand() {
		this.collapsed = false;
		this.show.emit();
		this.shown.emit();
	}

	collapse() {
		this.collapsed = true;
		this.hide.emit();
		this.hidden.emit();
	}
}

@Component({
	selector: 'test-component',
	template: `
		<div ngbAccordion>
			<div ngbAccordionItem id="item1">Item 1</div>
			<div ngbAccordionItem id="item2">Item 2</div>
			<div ngbAccordionItem id="item3">Item 3</div>
		</div>
	`,
})
class TestComponent {}

describe('NgbAccordionDirective', () => {
	let fixture: ComponentFixture<TestComponent>;
	let accordion: NgbAccordionDirective;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				TestComponent,
				MockNgbAccordionItem,
				MockNgbAccordionCollapse,
				NgbCollapse, // Importing the actual NgbCollapse as it is not mocked
			],
		});

		fixture = TestBed.createComponent(TestComponent);
		fixture.detectChanges();
		accordion = fixture.debugElement.query(By.directive(NgbAccordionDirective)).injector.get(NgbAccordionDirective);
	});

	it('should toggle an item with a custom ID', () => {
		const item1 = fixture.debugElement.query(By.css('#item1')).injector.get(MockNgbAccordionItem);
		const item2 = fixture.debugElement.query(By.css('#item2')).injector.get(MockNgbAccordionItem);

		item1.collapsed = true;
		item2.collapsed = true;

		accordion.toggle('item1');
		expect(item1.collapsed).toBe(false);
		expect(item2.collapsed).toBe(true);

		accordion.toggle('item2');
		expect(item1.collapsed).toBe(false);
		expect(item2.collapsed).toBe(false);
	});

	it('should expand all items', () => {
		const item1 = fixture.debugElement.query(By.css('#item1')).injector.get(MockNgbAccordionItem);
		const item2 = fixture.debugElement.query(By.css('#item2')).injector.get(MockNgbAccordionItem);
		const item3 = fixture.debugElement.query(By.css('#item3')).injector.get(MockNgbAccordionItem);

		item1.collapsed = true;
		item2.collapsed = true;
		item3.collapsed = true;

		accordion.expandAll();
		expect(item1.collapsed).toBe(false);
		expect(item2.collapsed).toBe(false);
		expect(item3.collapsed).toBe(false);
	});

	it('should collapse all items', () => {
		const item1 = fixture.debugElement.query(By.css('#item1')).injector.get(MockNgbAccordionItem);
		const item2 = fixture.debugElement.query(By.css('#item2')).injector.get(MockNgbAccordionItem);
		const item3 = fixture.debugElement.query(By.css('#item3')).injector.get(MockNgbAccordionItem);

		item1.collapsed = false;
		item2.collapsed = false;
		item3.collapsed = false;

		accordion.collapseAll();
		expect(item1.collapsed).toBe(true);
		expect(item2.collapsed).toBe(true);
		expect(item3.collapsed).toBe(true);
	});

	it('should expand an item with closeOthers set to true', () => {
		accordion.closeOthers = true;
		const item1 = fixture.debugElement.query(By.css('#item1')).injector.get(MockNgbAccordionItem);
		const item2 = fixture.debugElement.query(By.css('#item2')).injector.get(MockNgbAccordionItem);
		const item3 = fixture.debugElement.query(By.css('#item3')).injector.get(MockNgbAccordionItem);

		item1.collapsed = false;
		item2.collapsed = true;
		item3.collapsed = true;

		accordion.expand('item2');
		expect(item1.collapsed).toBe(true);
		expect(item2.collapsed).toBe(false);
		expect(item3.collapsed).toBe(true);
	});

	it('should expand an item with destroyOnHide set to true', () => {
		const item1 = fixture.debugElement.query(By.css('#item1')).injector.get(MockNgbAccordionItem);
		const item2 = fixture.debugElement.query(By.css('#item2')).injector.get(MockNgbAccordionItem);
		const item3 = fixture.debugElement.query(By.css('#item3')).injector.get(MockNgbAccordionItem);

		item1.collapsed = true;
		item2.collapsed = true;
		item3.collapsed = true;

		item2.destroyOnHide = true;
		accordion.expand('item2');
		expect(fixture.debugElement.query(By.css('#item2 .accordion-collapse'))).toBeTruthy();
	});

	it('should collapse an item with destroyOnHide set to true', () => {
		const item1 = fixture.debugElement.query(By.css('#item1')).injector.get(MockNgbAccordionItem);
		const item2 = fixture.debugElement.query(By.css('#item2')).injector.get(MockNgbAccordionItem);
		const item3 = fixture.debugElement.query(By.css('#item3')).injector.get(MockNgbAccordionItem);

		item1.collapsed = true;
		item2.collapsed = false;
		item3.collapsed = true;

		item2.destroyOnHide = true;
		accordion.collapse('item2');
		expect(fixture.debugElement.query(By.css('#item2 .accordion-collapse'))).toBeFalsy();
	});

	it('should properly handle disabled items', () => {
		const item1 = fixture.debugElement.query(By.css('#item1')).injector.get(MockNgbAccordionItem);
		const item2 = fixture.debugElement.query(By.css('#item2')).injector.get(MockNgbAccordionItem);
		const item3 = fixture.debugElement.query(By.css('#item3')).injector.get(MockNgbAccordionItem);

		item1.disabled = true;
		item2.disabled = false;
		item3.disabled = false;

		// Try to toggle a disabled item
		accordion.toggle('item1');
		expect(item1.collapsed).toBe(true);
		expect(item2.collapsed).toBe(true);
		expect(item3.collapsed).toBe(true);

		// Try to expand a disabled item
		accordion.expand('item1');
		expect(item1.collapsed).toBe(true);
		expect(item2.collapsed).toBe(true);
		expect(item3.collapsed).toBe(true);

		// Try to collapse a disabled item
		item2.collapsed = false;
		item3.collapsed = false;
		accordion.collapse('item1');
		expect(item1.collapsed).toBe(true);
		expect(item2.collapsed).toBe(false);
		expect(item3.collapsed).toBe(false);
	});

	it('should emit show and shown events when expanding an item', () => {
		const item1 = fixture.debugElement.query(By.css('#item1')).injector.get(MockNgbAccordionItem);
		const item2 = fixture.debugElement.query(By.css('#item2')).injector.get(MockNgbAccordionItem);

		let showSpy = jasmine.createSpy('showSpy');
		let shownSpy = jasmine.createSpy('shownSpy');
		accordion.show.subscribe(showSpy);
		accordion.shown.subscribe(shownSpy);

		item1.collapsed = true;
		item2.collapsed = true;

		accordion.toggle('item1');

		expect(showSpy).toHaveBeenCalledTimes(1);
		expect(shownSpy).toHaveBeenCalledTimes(1);
	});

	it('should emit hide and hidden events when collapsing an item', () => {
		const item1 = fixture.debugElement.query(By.css('#item1')).injector.get(MockNgbAccordionItem);
		const item2 = fixture.debugElement.query(By.css('#item2')).injector.get(MockNgbAccordionItem);

		let hideSpy = jasmine.createSpy('hideSpy');
		let hiddenSpy = jasmine.createSpy('hiddenSpy');
		accordion.hide.subscribe(hideSpy);
		accordion.hidden.subscribe(hiddenSpy);

		item1.collapsed = false;
		item2.collapsed = false;

		accordion.toggle('item1');

		expect(hideSpy).toHaveBeenCalledTimes(1);
		expect(hiddenSpy).toHaveBeenCalledTimes(1);
	});
});
