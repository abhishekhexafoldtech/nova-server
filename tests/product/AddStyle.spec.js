import { test, describe, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { pinia } from "@/tests/mockpinia";
import AddStyle from "@/pages/product/add-style.vue";
import { useNavStore } from "~/stores/NavStore";
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'

describe("AddingStyle", () => {
    const navStore = useNavStore(pinia);
    const wrapper = mount(AddStyle);
    test("rendering  add product style component :",() => {
        expect(wrapper.exists()).toBe(true)
    });
    test("renders headers text :",() => {
        const headers = wrapper.findAll("h3")
        expect(headers[0].text()).toBe("Product styles");
        expect(headers[1].text()).toBe("Product Images")
    })
    test("renders sub headers text :",() => {
        const subHeaders = wrapper.findAll("p")
        expect(subHeaders[0].text()).toBe("Add details styles.");
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

    test("renders buttons, text and clickable  :",() => {
        const buttons = wrapper.findAll(".btn");
        expect(buttons).toHaveLength(2)
       
        buttons.map(async(e)=>{
            await e.trigger("click")
        })

        expect(buttons[0].text()).toBe("Cancel");
        expect(buttons[1].text()).toBe("Save");
    })

    test("renders uploaded document static text :",() => {
        const staticText = wrapper.find(".upload_text");
       
        expect(staticText.text()).toBe("Add Image files(png, jpg, jpeg), Videos and 3d models are accepted. Maximum file size 5MB");
    })
});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
