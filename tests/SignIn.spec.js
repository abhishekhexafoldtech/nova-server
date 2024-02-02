import { test, describe,expect } from "vitest";
import { mount } from "@vue/test-utils";
import Login from "@/components/Login.vue";

describe("AddNewAdmin", () => {
  const wrapper = mount(Login);
  test("renders  input text fields", () => {
    // Check if the input text field exists
    const inputField = wrapper.findAll('input[type="text"]');
    expect(inputField.length).toBe(1);
  });
  test("renders  input password fields", () => {
    // Check if the input field exists
    const inputFieldPassword = wrapper.findAll('input[type="password"]');
    expect(inputFieldPassword.length).toBe(1);
  });
  test('renders a single "Sign In" button', () => {
    // Find all buttons in the component
    const buttons = wrapper.findAll("button");

    // Check if there's exactly one button
    expect(buttons.length).toBe(1);

    // Check if the button contains the text "Sign In"
    expect(buttons[0].text()).toBe("Sign In");
  });
});
