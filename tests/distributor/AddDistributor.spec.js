import { describe, it, expect } from "vitest";
import { mount, shallowMount } from "@vue/test-utils";
import AddDistributor from "@/pages/distributor/add-distributor/index.vue";
import { pinia } from "@/tests/mockpinia";
import { useNavStore } from "@/stores/NavStore";

describe("AddNewDistributor", () => {
  const navStore = useNavStore(pinia);
  it("renders all input fields", () => {
    const wrapper =shallowMount(AddDistributor);

    // Check if the First Name input field is present
    expect(wrapper.find('[placeholder="First name"]').exists()).toBe(true);

    // Check if the Last Name input field is present
    expect(wrapper.find('[placeholder="Last name"]').exists()).toBe(true);

    // Check if the Phone Number input field is present
    expect(wrapper.find('[placeholder="Phone number"]').exists()).toBe(true);

    // Check if the Email input field is present
    expect(wrapper.find('[placeholder="Email"]').exists()).toBe(true);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders the Continue button", () => {
    const wrapper = shallowMount(AddDistributor);

    // Check if the "Continue" button is present
    expect(wrapper.find(".btn-primary").text()).toBe("Continue");
  });
});
