/**
 * Enable `@testing-library/jest-dom` matchers such as toHaveTextContent or toHaveAttribute.
 */
import '@testing-library/jest-dom';

beforeEach(() => {
  document.getElementById('chakra-toast-portal')?.remove();
});
