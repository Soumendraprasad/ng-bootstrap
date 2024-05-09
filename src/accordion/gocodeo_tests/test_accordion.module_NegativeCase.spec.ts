import {  render  } from '@testing-library/react';

import React from 'react';
import NgbAccordionModule from './NgbAccordionModule';

test('NgbAccordionModule imports NgbAccordionDirective incorrectly', () => {
  const mockNgbAccordionDirective = jest.fn(() => {
    throw new Error('Incorrect configuration or missing dependencies');
  });

  jest.mock('./accordion.directive', () => ({
    NgbAccordionDirective: mockNgbAccordionDirective,
  }));

  expect(() => render(<NgbAccordionModule />)).toThrowError();
  expect(mockNgbAccordionDirective).toHaveBeenCalledTimes(1);
});