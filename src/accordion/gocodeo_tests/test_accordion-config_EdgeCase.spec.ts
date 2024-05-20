import {  inject, Injectable  } from '@angular/core';
import {  TestBed  } from '@angular/core/testing';
import {  NgbAccordionConfig, NgbConfig  } from '../../accordion/accordion-config';
import {  NgbConfigStub  } from '../ngb-config.stub';

describe('NgbAccordionConfig', () => {
  let config: NgbAccordionConfig;
  let ngbConfig: NgbConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NgbAccordionConfig,
        { provide: NgbConfig, useClass: NgbConfigStub },
      ],
    });
    ngbConfig = TestBed.inject(NgbConfig);
    config = TestBed.inject(NgbAccordionConfig);
  });

  it('should be created', () => {
    expect(config).toBeTruthy();
  });

  describe('Uninitialized NgbConfig Service', () => {
    it('should initialize _ngbConfig property', () => {
      // Given
      const config = TestBed.inject(NgbAccordionConfig);
      // When
      const ngbConfigValue = config._ngbConfig;
      // Then
      expect(ngbConfigValue).toBeTruthy();
      expect(ngbConfigValue).toEqual(TestBed.inject(NgbConfigStub));
    });
  });

  describe('Null or Undefined Global Configuration', () => {
    it('should handle null global animation config', () => {
      // Given
      ngbConfig.animation = null;
      // When
      const animationValue = config.animation;
      // Then
      expect(animationValue).toBeFalsy();
    });

    it('should handle undefined global animation config', () => {
      // Given
      ngbConfig.animation = undefined;
      // When
      const animationValue = config.animation;
      // Then
      expect(animationValue).toBeFalsy();
    });
  });

  describe('Invalid Animation Value', () => {
    it('should not set animation to invalid values', () => {
      // Given
      const invalidValues = ['string', true, {}];
      // When
      invalidValues.forEach(value => {
        config.animation = value;
      });
      // Then
      expect(config.animation).toBeFalsy();
    });
  });

  describe('Custom Animation Value Not Applied', () => {
    it('should apply custom animation value', () => {
      // Given
      const customAnimationValue = true;
      // When
      config.animation = customAnimationValue;
      // Then
      expect(config.animation).toEqual(customAnimationValue);
    });
  });

  describe('Close Others Behavior with Disabled Accordions', () => {
    it('should exclude disabled accordions when closing others', () => {
      // Given
      config.closeOthers = true;
      // When
      // Simulate disabled accordion
      const disabledAccordion = { disabled: true };
      const enabledAccordion = { disabled: false };
      config.closeOthers(disabledAccordion, enabledAccordion);
      // Then
      expect(enabledAccordion.expanded).toBeTruthy();
      expect(disabledAccordion.expanded).toBeFalsy();
    });

    it('should not close enabled accordions when closeOthers is false', () => {
      // Given
      config.closeOthers = false;
      // When
      // Simulate disabled accordion
      const disabledAccordion = { disabled: true };
      const enabledAccordion = { disabled: false };
      config.closeOthers(disabledAccordion, enabledAccordion);
      // Then
      expect(enabledAccordion.expanded).toBeTruthy();
      expect(disabledAccordion.expanded).toBeFalsy();
    });
  });

  describe('Destroy On Hide Behavior with Dynamic Content', () => {
    it('should not destroy accordion content when hidden', () => {
      // Given
      config.destroyOnHide = false;
      // When
      // Simulate accordion with dynamic content
      const accordionElement = {
        nativeElement: {
          innerHTML: 'Dynamic Content',
        },
      };
      config.destroyOnHide(accordionElement);
      // Then
      expect(accordionElement.nativeElement.innerHTML).toEqual('Dynamic Content');
    });

    it('should destroy accordion content when destroyOnHide is true', () => {
      // Given
      config.destroyOnHide = true;
      // When
      // Simulate accordion with dynamic content
      const accordionElement = {
        nativeElement: {
          innerHTML: 'Dynamic Content',
        },
      };
      config.destroyOnHide(accordionElement);
      // Then
      expect(accordionElement.nativeElement.innerHTML).toEqual('');
    });
  });

  describe('Accordion Configuration Changes During Runtime', () => {
    it('should apply configuration changes to existing accordions', () => {
      // Given
      const initialAnimationValue = false;
      const updatedAnimationValue = true;
      config.animation = initialAnimationValue;
      // When
      config.animation = updatedAnimationValue;
      // Then
      expect(config.animation).toEqual(updatedAnimationValue);
    });

    it('should not apply configuration changes to disabled accordions', () => {
      // Given
      const initialAnimationValue = false;
      const updatedAnimationValue = true;
      config.animation = initialAnimationValue;
      // Simulate disabled accordion
      const disabledAccordion = { disabled: true };
      // When
      config.animation = updatedAnimationValue;
      config.closeOthers(disabledAccordion, disabledAccordion);
      // Then
      expect(disabledAccordion.animation).toEqual(initialAnimationValue);
    });
  });

  describe('Accordion Configuration with Multiple Instances', () => {
    it('should maintain separate configurations for multiple instances', () => {
      // Given
      const config1 = TestBed.inject(NgbAccordionConfig);
      const config2 = TestBed.inject(NgbAccordionConfig);
      // When
      config1.animation = true;
      config2.closeOthers = true;
      // Then
      expect(config1.animation).toBeTruthy();
      expect(config2.closeOthers).toBeTruthy();
    });
  });

  describe('NgbAccordionConfig Service Not Provided', () => {
    it('should throw error when service is not provided', () => {
      // Given
      TestBed.resetTestingModule();
      // When
      const action = () => TestBed.inject(NgbAccordionConfig);
      // Then
      expect(action).toThrowError('NgbAccordionConfig: NgbConfig not provided!');
    });
  });

  describe('Accordion Configuration with OnPush Change Detection', () => {
    it('should propagate configuration changes to OnPush components', () => {
      // Given
      config.animation = false;
      // Simulate OnPush component
      const componentRef = {
        changeDetectorRef: {
          markForCheck: jasmine.createSpy('markForCheck'),
        },
      };
      // When
      config.animation = true;
      // Then
      expect(componentRef.changeDetectorRef.markForCheck).toHaveBeenCalled();
    });

    it('should not propagate configuration changes to disabled accordions', () => {
      // Given
      config.animation = false;
      // Simulate disabled accordion
      const disabledAccordion = { disabled: true };
      // Simulate OnPush component
      const componentRef = {
        changeDetectorRef: {
          markForCheck: jasmine.createSpy('markForCheck'),
        },
      };
      // When
      config.animation = true;
      config.closeOthers(disabledAccordion, disabledAccordion);
      // Then
      expect(componentRef.changeDetectorRef.markForCheck).not.toHaveBeenCalled();
    });
  });

  describe('Interaction with Third-Party Modules', () => {
    it('should interact seamlessly with third-party modules', () => {
      // Given
      const thirdPartyModule = {
        configureAccordion: jasmine.createSpy('configureAccordion'),
      };
      // When
      config.animation = true;
      thirdPartyModule.configureAccordion(config);
      // Then
      expect(thirdPartyModule.configureAccordion).toHaveBeenCalledWith(config);
    });
  });

  describe('Asynchronous Configuration Changes', () => {
    it('should handle asynchronous configuration changes', () => {
      // Given
      const configService = TestBed.inject(NgbAccordionConfig);
      const asyncService = {
        getAnimationConfig: jasmine.createSpy('getAnimationConfig').and.returnValue(Promise.resolve(true)),
      };
      // When
      configService.animation = false;
      asyncService.getAnimationConfig().then(value => {
        configService.animation = value;
      });
      // Then
      expect(configService.animation).eventually.toBeTruthy();
    });
  });
});