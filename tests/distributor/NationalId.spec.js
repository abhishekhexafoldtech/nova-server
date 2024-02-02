import { shallowMount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { pinia } from "@/tests/mockpinia";
import { useNavStore } from "@/stores/NavStore";
import NationalId from "@/pages/distributor/add-distributor/national-id.vue";

describe("NationalId Component", () => {
  const navStore = useNavStore(pinia);
  const wrapper = shallowMount(NationalId);
  //check save button present or not
  it("renders the Save and cancel button", async () => {
    const wrapper = shallowMount(NationalId);

    // Check if the "save" button is present
    await wrapper.find(".btn-primary").trigger('click')
    expect(wrapper.find(".btn-primary").text()).toBe("Save");

    //cancel button 
    await wrapper.find(".btn-default").trigger('click')
    expect(wrapper.find(".btn-default").text()).toBe("Cancel");

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders the SingleFileUpload Component", () => {
    const wrapper = shallowMount(NationalId);
     // Find the <SingleFileUpload> component within the parent component
    const singleFileUpload = wrapper.findComponent({ name: 'SingleFileUpload' });

    // Assert that the SingleFileUpload component exists within the parent component
    expect(singleFileUpload.exists()).toBe(true);
  });

  it('renders national id component', () => {
    const wrapper = shallowMount(NationalId);

    // Find the SingleFileUpload component based on its id
    const singleFileUpload = wrapper.find('#national_id');

    // Use assertions to verify that the SingleFileUpload component exists
    expect(singleFileUpload.exists()).toBe(true);
  });
});
