import {  TestBed, inject  } from '@angular/core/testing';
import {  NgbAccordionConfig, NgbConfig  } from '../../accordion/accordion-config';

describe('NgbAccordionConfig', () => {
  let config: NgbAccordionConfig;
  let ngbConfig: NgbConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgbAccordionConfig, { provide: NgbConfig, useValue: { animation: true } }]
    });

    config = TestBed.inject(NgbAccordionConfig);
    ngbConfig = TestBed.inject(NgbConfig);
  });

  describe('Scenario 1: Default Configuration', () => {
    it('should have default values', () => {
      expect(config.closeOthers).toBe(false);
      expect(config.destroyOnHide).toBe(true);
      expect(config.animation).toBe(true);
    });
  });

  describe('Scenario 2: Customizing Animation', () => {
    it('should allow customizing animation', () => {
      config.animation = false;
      expect(config.animation).toBe(false);
    });
  });

  describe('Scenario 3: Enabling Close Others', () => {
    it('should allow enabling close others', () => {
      config.closeOthers = true;
      expect(config.closeOthers).toBe(true);
    });
  });

  describe('Scenario 4: Disabling Destroy on Hide', () => {
    it('should allow disabling destroy on hide', () => {
      config.destroyOnHide = false;
      expect(config.destroyOnHide).toBe(false);
    });
  });

  describe('Scenario 5: Combined Configuration', () => {
    it('should allow combined configuration', () => {
      config.closeOthers = true;
      config.destroyOnHide = false;
      config.animation = false;

      expect(config.closeOthers).toBe(true);
      expect(config.destroyOnHide).toBe(false);
      expect(config.animation).toBe(false);
    });
  });

  describe('Scenario 6: Injecting Service and Configuration', () => {
    it('should allow injecting the service and accessing configurations', () => {
      const component = TestBed.createComponent(TestComponent);
      expect(component.componentInstance.config.closeOthers).toBe(true);
      expect(component.componentInstance.config.destroyOnHide).toBe(false);
      expect(component.componentInstance.config.animation).toBe(false);
    });
  });

  describe('Scenario 7: Inheriting Animation from NgbConfig', () => {
    it('should inherit animation from NgbConfig', () => {
      ngbConfig.animation = false;
      expect(config.animation).toBe(false);
    });
  });

  describe('Scenario 8: Overriding Animation from NgbConfig', () => {
    it('should allow overriding animation from NgbConfig', () => {
      ngbConfig.animation = false;
      config.animation = true;
      expect(config.animation).toBe(true);
    });
  });
});

@Component({
  template: ''
})
class TestComponent {
  constructor(public config: NgbAccordionConfig) {}
}