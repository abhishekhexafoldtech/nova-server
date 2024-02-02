import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import OrderListing from "~/pages/orders/index.vue";
import { pinia } from "@/tests/mockpinia";
import { useNavStore } from "@/stores/NavStore";

describe("OrderListing", () => {
  const navStore = useNavStore(pinia);
  it("checked table is rendered", () => {
    const wrapper = shallowMount(OrderListing);
    const singleFileUpload = wrapper.findComponent({ name: "Table" });
    expect(singleFileUpload.exists()).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });
});