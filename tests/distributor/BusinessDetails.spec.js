import { shallowMount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { pinia } from "@/tests/mockpinia";
import { useNavStore } from "@/stores/NavStore";
import BusinessDetails from "@/pages/distributor/add-distributor/business-details.vue";

describe("BusinessDetails Component", () => {
  const navStore = useNavStore(pinia);
  it("renders all input fields", () => {
    const wrapper = shallowMount(BusinessDetails);

    //  BusinessDetails component uses Element Plus UI elements, you can use specific queries to check for the presence of those elements.

    //  Check if an Element Plus input element with a label name is present
    expect(wrapper.find('[label="Name of Business"]').exists()).toBe(true);

    expect(wrapper.find('[label="Company Registration Number"]').exists()).toBe(true);

    expect(wrapper.find('[label="House No. / Street"]').exists()).toBe(true);

    expect(wrapper.find('[label="GPS Code"]').exists()).toBe(true);

    expect(wrapper.find('[label="Area"]').exists()).toBe(true);

    expect(wrapper.find('[label="Region"]').exists()).toBe(true);

    expect(wrapper.find('[label="District"]').exists()).toBe(true);

    expect(wrapper.find('[label="Post Code"]').exists()).toBe(true);

    expect(wrapper.find('[label="GPS Address"]').exists()).toBe(true);

    // Assert that the rendered HTML matches a file snapshot if you're using snapshot testing.
    expect(wrapper.html()).toMatchSnapshot();
  });

  //check save button present or not 
  it("renders the Save button",async () => {
    const wrapper = shallowMount(BusinessDetails);

    // Check if the "Continue" button is present
    expect(wrapper.find(".btn-primary").text()).toBe("Save");
   await wrapper.find(".btn-primary").trigger('click')
  });

  it("renders the SingleFileUpload Component", () => {
    const wrapper = shallowMount(BusinessDetails);
     // Find the <SingleFileUpload> component within the parent component
    const singleFileUpload = wrapper.findComponent({ name: 'SingleFileUpload' });

    // Assert that the SingleFileUpload component exists within the parent component
    expect(singleFileUpload.exists()).toBe(true);
  });

  it('renders the Certificate Of registration component', () => {
    const wrapper = shallowMount(BusinessDetails); 

    // Find the SingleFileUpload component based on its id
    const singleFileUpload = wrapper.find('#CertificateOfregistration');

    // Use assertions to verify that the SingleFileUpload component exists
    expect(singleFileUpload.exists()).toBe(true);
  });

  it('renders the Certificate Of Commencement', () => {
    const wrapper = shallowMount(BusinessDetails); 

    // Find the SingleFileUpload component based on its id
    const singleFileUpload = wrapper.find('#CertificateOfCommencement');

    // Use assertions to verify that the SingleFileUpload component exists
    expect(singleFileUpload.exists()).toBe(true);
  });

});



