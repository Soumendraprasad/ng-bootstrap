import {  render  } from '@testing-library/react';
import {  NgbAccordionModule  } from '../accordion.module';

import React from 'react';
describe('NgbAccordionModule', () => {
  it('Scenario 1: Should import NgbAccordionModule and have all accordion directives available', () => {
    const { getAllByText } = render(<NgbAccordionModule />);

    const accordionDirectives = [
      'NgbAccordionButton',
      'NgbAccordionDirective',
      'NgbAccordionItem',
      'NgbAccordionHeader',
      'NgbAccordionToggle',
      'NgbAccordionBody',
      'NgbAccordionCollapse',
    ];

    accordionDirectives.forEach((directive) => {
      expect(getAllByText(directive).length).toBeGreaterThan(0);
    });
  });

  it('Scenario 2: Should export NgbAccordionConfig successfully', () => {
    const config = NgbAccordionModule.exports.find((e) => e === 'NgbAccordionConfig');

    expect(config).toBe('NgbAccordionConfig');
  });

  it('Scenario 3: Should properly export all accordion directives for use in component templates', () => {
    const { getAllByText } = render(
      <NgbAccordionModule>
        <div>
          <NgbAccordionButton />
          <NgbAccordionDirective />
          <NgbAccordionItem />
          <NgbAccordionHeader />
          <NgbAccordionToggle />
          <NgbAccordionBody />
          <NgbAccordionCollapse />
        </div>
      </NgbAccordionModule>
    );

    const accordionDirectives = [
      'NgbAccordionButton',
      'NgbAccordionDirective',
      'NgbAccordionItem',
      'NgbAccordionHeader',
      'NgbAccordionToggle',
      'NgbAccordionBody',
      'NgbAccordionCollapse',
    ];

    accordionDirectives.forEach((directive) => {
      expect(getAllByText(directive).length).toBeGreaterThan(0);
    });
  });

  it('Scenario 4: Should import and export NgbAccordionDirectives array without errors', () => {
    const directives = NgbAccordionModule.imports.includes(NgbAccordionDirectives) &&
      NgbAccordionModule.exports.includes(NgbAccordionDirectives);

    expect(directives).toBeTruthy();
  });

  it('Scenario 5: Should have all accordion directives accessible in component HTML template', () => {
    const { getAllByText } = render(
      <NgbAccordionModule>
        <div>
          <NgbAccordionButton />
          <NgbAccordionDirective />
          <NgbAccordionItem />
          <NgbAccordionHeader />
          <NgbAccordionToggle />
          <NgbAccordionBody />
          <NgbAccordionCollapse />
        </div>
      </NgbAccordionModule>
    );

    const accordionDirectives = [
      'NgbAccordionButton',
      'NgbAccordionDirective',
      'NgbAccordionItem',
      'NgbAccordionHeader',
      'NgbAccordionToggle',
      'NgbAccordionBody',
      'NgbAccordionCollapse',
    ];

    accordionDirectives.forEach((directive) => {
      expect(getAllByText(directive).length).toBeGreaterThan(0);
    });
  });

  it('Scenario 6: Should export all accordion directives for use in other modules and components', () => {
    const { getAllByText } = render(<NgbAccordionModule />);

    const accordionDirectives = [
      'NgbAccordionButton',
      'NgbAccordionDirective',
      'NgbAccordionItem',
      'NgbAccordionHeader',
      'NgbAccordionToggle',
      'NgbAccordionBody',
      'NgbAccordionCollapse',
    ];

    accordionDirectives.forEach((directive) => {
      expect(getAllByText(directive).length).toBeGreaterThan(0);
    });
  });
});