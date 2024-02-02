import { shallowMount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { pinia } from "@/tests/mockpinia";
import { useNavStore } from "@/stores/NavStore";
import InsuranceDetails from "@/pages/distributor/add-distributor/insurence-details.vue";

describe("InsuranceDetails Component", () => {
  const navStore = useNavStore(pinia);
  it("renders all input fields", () => {
    const wrapper = shallowMount(InsuranceDetails);
    //  InsuranceDetails component uses Element Plus UI elements, you can use specific queries to check for the presence of those elements.
    //  Check if an Element Plus input element with a label name is present
    expect(wrapper.find('[placeholder="Name of insurance company"]').exists()).toBe(true);
    expect(wrapper.find('[placeholder="Policy number"]').exists()).toBe(true);
    expect(wrapper.find('[placeholder="Expiry of insurance"]').exists()).toBe(true );

    // Assert that the rendered HTML matches a file snapshot if you're using snapshot testing.
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders the SingleFileUpload Component", () => {
    const wrapper = shallowMount(InsuranceDetails);
    // Find the <SingleFileUpload> component within the parent component
    const singleFileUpload = wrapper.findComponent({
      name: "SingleFileUpload",
    });

    // Assert that the SingleFileUpload component exists within the parent component
    expect(singleFileUpload.exists()).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders insurance card component", () => {
    const wrapper = shallowMount(InsuranceDetails);

    // Find the SingleFileUpload component based on its id
    const singleFileUpload = wrapper.find("#insurance_card");

    // Use assertions to verify that the SingleFileUpload component exists
    expect(singleFileUpload.exists()).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });

  //check save button present or not
  it("renders the Save button", async () => {
    const wrapper = shallowMount(InsuranceDetails);

    // Check if the "Continue" button is present
    expect(wrapper.find(".btn-primary").text()).toBe("Save");
    await wrapper.find(".btn-primary").trigger("click");
    expect(wrapper.html()).toMatchSnapshot();
  });
});
