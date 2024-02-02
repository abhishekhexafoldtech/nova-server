import { test, describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import OrderDetails from '@/pages/orders/[order-details].vue';
import * as apiModule from '@/api/orders/AdminDetails.js';
import { pinia } from "@/tests/mockpinia";
import { useNavStore } from "~/stores/NavStore";

// Mock the API module
const mockData = {
  adminDetailsData: [
    {
      order_number: '12345',
      delivery_status: 'Delivered',
      product_details: [
        {
          name: 'Product 1',
          deposit: 50,
          gas_cost: 20,
          quantity: 2,
          total: 100,
        },
      ],
    },
  ],
};

// Mock the router
const mockRouter = {
  currentRoute: { value: { params: { orderdetails: '12345' } } },
};

vi.spyOn(apiModule, 'getAdminDetails').mockResolvedValue({ data: { data: mockData } });

describe('OrderDetails', () => {
  const navStore = useNavStore(pinia);
  it('renders loading skeleton', async () => {
    const wrapper = mount(OrderDetails);

    // Wait for the component to update after the API call
    await wrapper.vm.$nextTick();

    // Assert that the loading skeleton is present
    expect(wrapper.find('.custom-skeleton-class').exists()).toBe(true);
  });

  it('renders order details when adminDetailsData is available', async () => {
    const wrapper = mount(OrderDetails);

    // Wait for the component to update after the API call
    await wrapper.vm.$nextTick();


  });

  // Add more test cases as needed
});

