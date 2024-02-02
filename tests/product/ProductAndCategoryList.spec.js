import { test, describe, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { pinia } from "@/tests/mockpinia";
import Product from "@/pages/product/index.vue";
import { useNavStore } from "~/stores/NavStore";
import CardsEmptyManager from "@/components/cards/EmptyManager.vue";
import DialogStatus from "@/components/Dialog/Status.vue";
import Table from "@/components/tables/ProductTable.vue";

describe("getListOfProductStylesAndCategoryList", () => {
  const navStore = useNavStore(pinia);
  const wrapper = mount(Product);
  test("renders without error : ", () => {
    // Assertions
    expect(wrapper.exists()).toBe(true);
  });
  // child component existamce
  test("rendering the child component:", () => {
    const emptyCardComponent = wrapper.findComponent(CardsEmptyManager);
    expect(emptyCardComponent.exists()).toBe(true);

    const categoryAddPopup = wrapper.findComponent(DialogStatus);
    expect(categoryAddPopup.exists()).toBe(true);

    // const tableComponent = wrapper.findComponent(Table);
    // expect(tableComponent.exists()).toBe(true)
  })
  //   input form for adding a category when category list is empty
  test("displays form, form input details and rules: ", () => {
    const formElement = wrapper.findAll("el-form");
    const formRuleElement = wrapper.findAll("el-form");
    const inputFields = wrapper.findAll("el-input");

    expect(inputFields).toHaveLength(1);
    expect(formElement).toHaveLength(1);
    expect(formRuleElement).toHaveLength(1);
    // new category add input 
    expect(wrapper.find('[placeholder="Enter product category"]').exists()).toBe(true);
  });


 
});
