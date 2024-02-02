import { it, describe, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import { pinia } from "@/tests/mockpinia";
import { useNavStore } from "@/stores/NavStore";
import DepotAssign from "@/pages/distributor/add-distributor/depot-assign.vue";
describe("Onboard depot", () => {
  const navStore = useNavStore(pinia);
  const wrapper = shallowMount(DepotAssign);
  it("renders the input field correctly", () => {
    expect(wrapper.find('[placeholder="Name of zone"]').exists()).toBe(true);

    expect(wrapper.find('[placeholder="Name of depot"]').exists()).toBe(true);
  });

  //check save button present or not 
  it("renders the Save button",async () => {
    // Check if the "Continue" button is present
    expect(wrapper.find(".btn-primary").text()).toBe("Continue");
  });

  //check save cancel present or not 
  it("renders the Save button",async () => {
    // Check if the "Continue" button is present
    expect(wrapper.find(".btn-default").text()).toBe("Cancel");
  });
});
