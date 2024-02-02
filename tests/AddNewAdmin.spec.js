import { test, describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import AddAdmin from "@/pages/onboarding/add-admin/index.vue";
import * as apiModule from "@/api/role"; // Import the module to mock
import { pinia } from "@/tests/mockpinia";
import { useNavStore } from "~/stores/NavStore";
describe("AddNewAdmin", () => {
  const navStore = useNavStore(pinia);
  it("fetches admin roles correctly", async () => {
    // Mock the API response
    const mockData = [
      { id: 1, name: "Role 1" },
      { id: 2, name: "Role 2" },
    ];

    // Use spyOn to mock the getRoleDropdownList function
    const getRoleDropdownListSpy = vi.spyOn(apiModule, "getRoleDropdownList");
    getRoleDropdownListSpy.mockResolvedValue({ data: { data: mockData } });

    // Mount the component
    const wrapper = mount(AddAdmin);

    // Wait for the component to update after the API call
    await wrapper.vm.$nextTick();

    // Assert that the getRoleDropdownList function was called
    expect(getRoleDropdownListSpy).toHaveBeenCalled();

    // Clean up the spy after the test
    getRoleDropdownListSpy.mockRestore();
  });
  it("renders all input fields", () => {
    const wrapper = mount(AddAdmin);

    // Check if the First Name input field is present
    expect(wrapper.find('[placeholder="First name"]').exists()).toBe(true);

    // Check if the Last Name input field is present
    expect(wrapper.find('[placeholder="Last name"]').exists()).toBe(true);

    // Check if the Phone Number input field is present
    expect(wrapper.find('[placeholder="Phone number"]').exists()).toBe(true);

    // Check if the Email input field is present
    expect(wrapper.find('[placeholder="Email"]').exists()).toBe(true);

    // Check if the Role select input field is present
    expect(wrapper.find('[placeholder="please select role"]').exists()).toBe(
      true
    );
  });

  it("renders the Continue button", () => {
    const wrapper = mount(AddAdmin);

    // Check if the "Continue" button is present
    expect(wrapper.find(".btn-primary").text()).toBe("Continue");
  });
});
