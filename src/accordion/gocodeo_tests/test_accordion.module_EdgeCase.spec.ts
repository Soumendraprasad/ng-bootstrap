import {  render, screen  } from '@testing-library/react';

// Import React Testing Library and the component to be tested
import NgbAccordion from './accordion.component';

// Group related tests under a single describe block
describe('NgbAccordion Unit Tests', () => {
  // Test case 1: Checking if the accordion component renders correctly
  it('EdgeCase 1: Renders the accordion component', () => {
    // Render the component
    render(<NgbAccordion />);

    // Assert that the component is rendered
    expect(screen.getByRole('button', { name: /Toggle accordion/i })).toBeInTheDocument();
  });

  // Test case 2: Checking if the accordion header is clickable
  it('EdgeCase 2: Accordion header is clickable', () => {
    // Render the component
    render(<NgbAccordion />);

    // Find the accordion header
    const accordionHeader = screen.getByRole('button', { name: /Toggle accordion/i });

    // Simulate a click on the header
    fireEvent.click(accordionHeader);

    // Assert that the accordion body is visible
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  // Test case 3: Checking if the accordion body collapses when the header is clicked again
  it('EdgeCase 3: Accordion body collapses when header is clicked again', () => {
    // Render the component
    render(<NgbAccordion />);

    // Find the accordion header
    const accordionHeader = screen.getByRole('button', { name: /Toggle accordion/i });

    // Simulate a click on the header
    fireEvent.click(accordionHeader);

    // Simulate a click on the header again
    fireEvent.click(accordionHeader);

    // Assert that the accordion body is hidden
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
  });

  // Additional test cases can be added here...
});