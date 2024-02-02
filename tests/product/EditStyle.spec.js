import { test, describe, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { pinia } from "@/tests/mockpinia";
import EditStyle from "@/pages/product/edit-style.vue";
import { useNavStore } from "~/stores/NavStore";
// import { definePageMeta } from '#imports'

describe("Edit style", () => {
    const navStore = useNavStore(pinia);
    const wrapper = mount(EditStyle);
    test("rendering  add product component :",() => {
        expect(wrapper.exists()).toBe(true)
    })
    test("renders headers text :",() => {
        const headers = wrapper.findAll("h3")
        expect(headers[0].text()).toBe("Edit product styles");
        expect(headers[1].text()).toBe("Product Images")
    })
    test("renders sub headers text :",() => {
        const subHeaders = wrapper.findAll("p")
        expect(subHeaders[0].text()).toBe("Edit details styles.");
        expect(subHeaders[1].text()).toBe("Add minimum 1 image.")
    })
    test("renders element plus elements :",() => {
        const formElement = wrapper.find("el-form")
        expect(formElement.exists()).toBe(true);

        const formElementRow = wrapper.find("el-row")
        expect(formElementRow.exists()).toBe(true);

        const formElementColumn = wrapper.findAll("el-col")
        expect(formElementColumn).toHaveLength(6);

        const formElementFormItems = wrapper.findAll("el-form-item")
        expect(formElementFormItems).toHaveLength(7);

        const formElementInput = wrapper.findAll("el-input")
        expect(formElementInput).toHaveLength(7);

        const formElementUpload = wrapper.findAll("el-upload")
        expect(formElementUpload).toHaveLength(1);

        const formElementDialog = wrapper.findAll("el-dialog")
        expect(formElementDialog).toHaveLength(1);
    })

    test("renders buttons, text and clickable  :",async() => {
        const buttons = wrapper.findAll(".btn");
        console.log("buttons",buttons[1].text())
        expect(buttons).toHaveLength(2)
 
        expect(buttons[0].text()).toBe("Cancel");
        expect(buttons[1].text()).toBe("Save");
    })

    test("renders uploaded document static text :",() => {
        const staticText = wrapper.find(".upload_text");
       
        expect(staticText.text()).toBe("Add Image files(png, jpg, jpeg), Videos and 3d models are accepted. Maximum file size 5MB");
    })
});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
