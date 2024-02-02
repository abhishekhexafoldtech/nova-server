import { it, describe, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import { pinia } from "@/tests/mockpinia";
import { useNavStore } from "@/stores/NavStore";
import OnboardDepot from "@/pages/distributor/add-distributor/onboard-depot.vue";
describe("Onboard depot", () => {
  const navStore = useNavStore(pinia);
  const wrapper = shallowMount(OnboardDepot);
  it("renders the input field correctly", () => {
    expect(wrapper.find('[placeholder="Name of depot"]').exists()).toBe(true);

    expect(wrapper.find('[placeholder="GPS address"]').exists()).toBe(true);

    expect(
      wrapper.find('[placeholder="Name of insurance company"]').exists()
    ).toBe(true);

    expect(wrapper.find('[placeholder="Policy number"]').exists()).toBe(true);

    expect(wrapper.find('[placeholder="Expiry of insurance"]').exists()).toBe(
      true
    );
  });

  it("renders the SingleFileUpload Component", () => {
    // Find the <SingleFileUpload> component within the parent component
    const singleFileUpload = wrapper.findComponent({
      name: "SingleFileUpload",
    });

    // Assert that the SingleFileUpload component exists within the parent component
    expect(singleFileUpload.exists()).toBe(true);
  });

  it("renders the Fire certificate Component", () => {
    const singleFileUpload = wrapper.find("#FireCertificate");

    expect(singleFileUpload.exists()).toBe(true);
  });

  it("renders the Proof of tenancy Component", () => {
    const singleFileUpload = wrapper.find("#ProofOfTenancy");
    expect(singleFileUpload.exists()).toBe(true);
  });

  it("renders the Insurance Card Component", () => {
    const singleFileUpload = wrapper.find("#InsurenceCard");
    expect(singleFileUpload.exists()).toBe(true);
  });

  //check save button present or not 
  it("renders the Save button",async () => {
    // Check if the "Continue" button is present
    expect(wrapper.find(".btn-primary").text()).toBe("Save");
  });

    //check save button present or not 
    it("renders the Save button",async () => {
      // Check if the "Continue" button is present
      expect(wrapper.find(".btn-default").text()).toBe("Cancel");
    });
});
