// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Products from './Products';

const mockedUseQuery = vi.hoisted(() => vi.fn());

vi.mock('react-query', () => ({
  useQuery: mockedUseQuery,
}));

vi.mock('../../../context/ThemeContext', () => ({
  useTheme: () => ({ darkMode: false }),
}));

describe('Products accessibility', () => {
  beforeEach(() => {
    mockedUseQuery.mockReturnValue({
      data: [
        {
          productId: 1,
          name: 'Keyboard Friendly Product',
          description: 'Open me from the image button',
          price: 12.5,
          imgName: 'demo.png',
          sku: 'SKU-1',
          unit: 'EA',
          supplierId: 9,
        },
      ],
      isLoading: false,
      error: null,
    });
  });

  it('opens product details from keyboard on the image control', async () => {
    const user = userEvent.setup();
    render(<Products />);

    const detailsButton = screen.getByRole('button', { name: /view details for keyboard friendly product/i });
    detailsButton.focus();
    await user.keyboard('{Enter}');

    expect(screen.getAllByText('Open me from the image button')).toHaveLength(2);
  });
});
