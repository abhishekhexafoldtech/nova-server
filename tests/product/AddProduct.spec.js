import { test, describe, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { pinia } from "@/tests/mockpinia";
import AddProduct from "@/pages/product/add-product.vue";
import { useNavStore } from "~/stores/NavStore";
import Table from "@/components/tables/Table.vue";
// import { definePageMeta } from '#imports'

describe("AddingProduct", () => {
    const navStore = useNavStore(pinia);
    const wrapper = mount(AddProduct);
    test("rendering  add product component :",() => {
        expect(wrapper.exists()).toBe(true)
    })
    test("renders add form elements : ",async()=>{
        const formElement = wrapper.findAll("el-form");
        expect(formElement).toHaveLength(1);

        const formInput = wrapper.findAll("el-input");
        expect(formInput).toHaveLength(2);

        const formSelect = wrapper.findAll("el-select");
        expect(formSelect).toHaveLength(1);
    })
    test("renders child components: ",()=>{
        const tableComponent = wrapper.findComponent(Table);
        expect(tableComponent.exists()).toBe(true);
    })
    test("buttons clickable and renders:",async()=>{
        const buttons = wrapper.findAll(".btn");
        expect(buttons).toHaveLength(3)
       

        buttons.map(async(e)=>{
            await e.trigger("click")
        })
        expect(buttons[0].text()).toBe("Add Style");
        expect(buttons[1].text()).toBe("Cancel");
        expect(buttons[2].text()).toBe("Save");
    })
    test("render placeholder text match",()=>{
        expect(wrapper.find("[ placeholder='Product Name'"));
        expect(wrapper.find("[placeholder='Select Product Subcategory']"));
        expect(wrapper.find("[placeholder='Description']"));
    })
    test("heading title",()=>{
        expect(wrapper.find("h3").text()).toBe("Product");
        expect(wrapper.find("p").text()).toBe("Add details of product.");
        expect(wrapper.find("h4").text()).toBe("List of product style");
    })
});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
