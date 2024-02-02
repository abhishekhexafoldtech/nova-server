import AdminCompleteOnboarding from "@/pages/onboarding/add-admin/[slug].vue";
import { mount } from "@vue/test-utils";
import { test, describe, expect } from "vitest";
import { pinia } from "@/tests/mockpinia";
import { useNavStore } from "~/stores/NavStore";
describe("AdminCompleteOnboarding", () => {
  const navStore = useNavStore(pinia);
  const wrapper = mount(AdminCompleteOnboarding);
  //  form existing
  test("displays form existance : ", () => {
    const form = wrapper.findAll("el-form");
    expect(form).toHaveLength(1);
  });
  //  date input
  test("displays in form for entering Date of birth : ", () => {
    const dateInput = wrapper.findAll("el-date-picker");
    expect(dateInput).toHaveLength(1);
  });
  //  radio toggle & radio group
  test("displays in form radio group and buttons : ", () => {
    const radioGroup = wrapper.findAll("el-radio-group");
    const radioFilds = wrapper.findAll("el-radio");
    expect(radioGroup).toHaveLength(1);
    expect(radioFilds).toHaveLength(2);
  });
  //   all input fields
  test("displays in form for all input details : ", () => {
    const inputFields = wrapper.findAll("el-input");
    expect(inputFields).toHaveLength(11);
  });
  //   anchor link
  test("displays in form  redirect links : ", async () => {
    const nuxtRedirectLink = wrapper.find("nuxt-link");
    await nuxtRedirectLink.trigger("click");
    expect(nuxtRedirectLink.text()).toBe("Cancel");
  });
  //   dialog box
  test("displays in form for entering Date of birth : ", () => {
    const popupDialog = wrapper.findAll("el-dialog");
    expect(popupDialog).toHaveLength(1);
  });
  //   form submit button
  test("displays in form  Submit or Click button : ", async () => {
    const finalSubmitButton = wrapper.find("el-button");
    await finalSubmitButton.trigger("click");
    expect(finalSubmitButton.text()).toBe("Continue");
  });
});

