import {  TestBed, inject, tick, fakeAsync  } from '@angular/core/testing';
import {  NgbAccordionConfig  } from '../../ngb-config';
import {  NgbConfig  } from '../../ngb-config';

describe('NgbAccordionConfig', () => {
  let config: NgbAccordionConfig;
  let ngbConfig: NgbConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NgbAccordionConfig,
        { provide: NgbConfig, useValue: { animation: true } },
      ],
    });

    config = TestBed.inject(NgbAccordionConfig);
    ngbConfig = TestBed.inject(NgbConfig);
  });

  it('should have sensible default values', () => {
    expect(config.animation).toBeFalsy();
    expect(config.closeOthers).toBeFalsy();
    expect(config.destroyOnHide).toBeTruthy();
  });

  it('should inherit ngbConfig animation', () => {
    expect(config.animation).toBeTruthy();
  });

  it('should allow overriding ngbConfig animation', () => {
    config.animation = false;
    expect(config.animation).toBeFalsy();
  });

  it('should not allow invalid provider value', () => {
    expect(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: NgbAccordionConfig,
            useValue: { animation: true },
            providedIn: 'invalid-value',
          },
        ],
      }).compileComponents();
    }).toThrowError(/providedIn/);
  });

  it('should not allow invalid provider token', () => {
    expect(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: 'invalid-token',
            useValue: { animation: true },
            providedIn: 'root',
          },
        ],
      }).compileComponents();
    }).toThrowError(/invalid-token/);
  });

  it('should allow overriding default values', () => {
    config.closeOthers = true;
    config.destroyOnHide = false;
    expect(config.closeOthers).toBeTruthy();
    expect(config.destroyOnHide).toBeFalsy();
  });

  it('should be injectable', () => {
    const config = TestBed.inject(NgbAccordionConfig);
    expect(config).toBeTruthy();
  });

  // Negative Case Scenarios

  it('should throw an error if animation is set to a non-boolean value', () => {
    expect(() => {
      config.animation = 'invalid-value';
    }).toThrowError(/animation.*boolean/);
  });

  it('should throw an error if closeOthers is set to a non-boolean value', () => {
    expect(() => {
      config.closeOthers = 'invalid-value';
    }).toThrowError(/closeOthers.*boolean/);
  });

  it('should throw an error if destroyOnHide is set to a non-boolean value', () => {
    expect(() => {
      config.destroyOnHide = 'invalid-value';
    }).toThrowError(/destroyOnHide.*boolean/);
  });
});