// @vitest-environment jsdom
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import axios from 'axios';
import AdminProducts from './AdminProducts';
import { api } from '../../api/config';

vi.mock('axios');

vi.mock('../../context/AuthContext', () => ({
  useAuth: () => ({ isAdmin: true }),
}));

vi.mock('../../context/ThemeContext', () => ({
  useTheme: () => ({ darkMode: false }),
}));

vi.mock('../entity/product/ProductForm', () => ({
  default: () => null,
}));

const mockedAxios = vi.mocked(axios, true);

describe('AdminProducts accessibility', () => {
  beforeEach(() => {
    mockedAxios.get.mockImplementation((url: string) => {
      if (url === `${api.baseURL}${api.endpoints.products}`) {
        return Promise.resolve({
          data: [
            {
              productId: 1,
              supplierId: 10,
              name: 'Sample Product',
              description: 'Sample description',
              price: 22,
              sku: 'SKU-1',
              unit: 'EA',
              imgName: 'sample.png',
            },
          ],
        });
      }
      if (url === `${api.baseURL}${api.endpoints.suppliers}`) {
        return Promise.resolve({
          data: [
            {
              supplierId: 10,
              name: 'Sample Supplier',
              description: '',
              contactPerson: '',
              email: '',
              phone: '',
            },
          ],
        });
      }
      return Promise.resolve({
        data: {
          supplierId: 10,
          name: 'Sample Supplier',
          description: '',
          contactPerson: '',
          email: '',
          phone: '',
        },
      });
    });
  });

  it('uses focusable sort buttons and exposes active sort state', async () => {
    render(<AdminProducts />);

    await waitFor(() => {
      expect(screen.queryByText('Sample Product')).not.toBeNull();
    });

    const nameSortButton = screen.getByRole('button', { name: /sort by name/i });
    const priceSortButton = screen.getByRole('button', { name: /sort by price/i });
    const nameHeader = nameSortButton.closest('th');
    const priceHeader = priceSortButton.closest('th');

    expect(nameHeader?.getAttribute('aria-sort')).toBe('ascending');
    expect(priceHeader?.getAttribute('aria-sort')).toBe('none');

    fireEvent.click(priceSortButton);
    expect(priceHeader?.getAttribute('aria-sort')).toBe('ascending');

    fireEvent.click(priceSortButton);
    expect(priceHeader?.getAttribute('aria-sort')).toBe('descending');
  });
});
