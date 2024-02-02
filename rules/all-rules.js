import { _ } from "vue-underscore";

//  * Validation Rules for FirstName

export function nameRule(fieldName, extraRule = {}) {
  let rules = [
    {
      message: `Please enter ${fieldName ? fieldName : ""}`,
      trigger: "blur",
      required: true,
    },
    {
      message: converToNormalCase(fieldName) + " should be minimum 2 character",
      trigger: "blur",
      min: 2,
    },
  ];
  return returnExtraRule(fieldName, extraRule, rules);
}

//  * Validation Rules for selectBoxRule
export function selectBoxRule(fieldName, extraRule = {}) {
  let rules = [
    {
      message: `Please select ${fieldName ? fieldName : ""}`,
      trigger: "blur",
      required: true,
    },
  ];
  return returnExtraRule(fieldName, extraRule, rules);
}

//  * Validation Rules for email Rules.

export function emailRule(fieldName, extraRule = []) {
  let rules = [
    {
      message: `Please enter valid ${fieldName ? fieldName : ""}`,
      trigger: "blur",
      type: "email",
      required: true,
    },
  ];
  return returnExtraRule(fieldName, extraRule, rules);
}

//  * Validation Rules for gpsCoordinatesRule.

export function gpsCoordinatesRule(fieldName, extraRule = []) {
  let rules = [
    {
      message: `Please enter ${fieldName ? fieldName : "the"}`,
      trigger: "blur",
      required: true,
    },
    // {
    //   message: `${converToNormalCase(fieldName)} latitude should be between -90 and 90 degrees`,
    //   trigger: "blur",
    //   validator: (rule, value, callback) => {
    //     const latitude = parseFloat(value);
    //     if (isNaN(latitude) || latitude < -90 || latitude > 90) {
    //       callback(new Error(`${converToNormalCase(fieldName)} latitude should be between -90 and 90 degrees`));
    //     } else {
    //       callback();
    //     }
    //   },
    // },
    // {
    //   message: `${converToNormalCase(fieldName)} longitude should be between -180 and 180 degrees`,
    //   trigger: "blur",
    //   validator: (rule, value, callback) => {
    //     const longitude = parseFloat(value);
    //     if (isNaN(longitude) || longitude < -180 || longitude > 180) {
    //       callback(new Error(`${converToNormalCase(fieldName)} longitude should be between -180 and 180 degrees`));
    //     } else {
    //       callback();
    //     }
    //   },
    // },
  ];

  return returnExtraRule(fieldName, extraRule, rules);
}

// * Validation Rules for strong  password Rules.

export function passwordRule(fieldName, extraRule = []) {
  let rules = [
    {
      message: `Please enter ${fieldName ? fieldName : ""} password`,
      trigger: "blur",
      required: true,
    },
    {
      message: `${
        fieldName ? fieldName : ""
      } password should be at least 8 characters`,
      trigger: "blur",
      min: "8",
    },
    {
      message: `${
        fieldName ? fieldName : ""
      } password should contain at least one uppercase letter, one lowercase letter, one number, and one special character`,
      trigger: "blur",
      pattern:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    },
    // Additional custom rules can be added here.
  ];
  return returnExtraRule(fieldName, extraRule, rules);
}

// * Validation Rules for product type

export function productTypeRule(fieldName, extraRule = {}) {
  let rules = [
    {
      message: `Please select ${fieldName ? fieldName : ""} type`,
      trigger: "blur",
      required: true,
    },
  ];
  return returnExtraRule(fieldName, extraRule, rules);
}

// * Validation Rules for product category.

export function productCategoryRule(fieldName, extraRule = {}) {
  let rules = [
    {
      message: `Please select ${fieldName ? fieldName : ""}`,
      trigger: "blur",
      required: true,
    },
  ];
  return returnExtraRule(fieldName, extraRule, rules);
}

//  * Validation Rules for Phone No.

export function phoneNoRule(fieldName, extraRule = []) {
  let rules = [
    {
      message: `Please enter ${fieldName ? fieldName : ""} number`,
      trigger: "blur",
      required: true,
    },
    {
      message: converToNormalCase(fieldName) + " should be numeric",
      trigger: "blur",
      pattern: /^\d*$/,
    },
    {
      message: `${converToNormalCase(fieldName)} should be 9 to 15 digits`,
      trigger: "change",
      required: true,
      min: 9,
      max: 15,
    },
  ];
  return returnExtraRule(fieldName, extraRule, rules);
}

//  * Validation Rules for Mobile No.

export function mobileNoRule(fieldName, extraRule = []) {
  let rules = [
    {
      message: `Please enter your ${fieldName ? fieldName : ""}`,
      trigger: "blur",
      required: true,
    },
    {
      message: converToNormalCase(fieldName) + " should be  10 digit",
      trigger: "blur",
      min: "10",
      max: "15",
    },
    {
      message: converToNormalCase(fieldName) + " should be numeric",
      trigger: "blur",
      pattern: /^\d*$/,
    },
  ];
  return returnExtraRule(fieldName, extraRule, rules);
}

//  * Validation Rules for User Name

export function userNameRule(fieldName, extraRule = []) {
  let rules = [
    {
      message: `Please enter ${fieldName ? fieldName : ""}`,
      trigger: "blur",
      required: true,
    },
  ];
  return returnExtraRule(fieldName, extraRule, rules);
}

//  * Validation Rules for Discount

// export function discountRule(fieldName, extraRule = []) {
//   let rules = [
//     {
//       message: `Please enter ${fieldName ? fieldName : ""}`,
//       trigger: "blur",
//     },
//     // {
//     //   message: converToNormalCase(fieldName) + " should be numeric",
//     //   trigger: "blur",
//     //   pattern: /^\d*$/,
//     // },
//   ];
//   return returnExtraRule(fieldName, extraRule, rules);
// }

//  * validation Rule For Number

export function numberRule(fieldName, extraRule = []) {
  let rules = [
    {
      message: `Please enter ${fieldName ? fieldName : ""}`,
      trigger: "blur",
      required: true,
    },
    {
      message: converToNormalCase(fieldName) + " should be numeric",
      trigger: "blur",
      pattern: /^\d*$/,
    },
  ];
  return returnExtraRule(fieldName, extraRule, rules);
}

//  * validation Rule For Float Number

export function floatRule(fieldName, extraRule = []) {
  let rules = [
    {
      message: converToNormalCase(fieldName) + " should be numeric",
      trigger: "blur",
      pattern: /^\d+\.+\d*$/,
    },
  ];
  return returnExtraRule(fieldName, extraRule, rules);
}

// * validation Rule For date

export function dateRule(fieldName, extraRule = []) {
  let rules = [
    {
      message: `Please select ${fieldName ? fieldName : ""}`,
      trigger: "blur",
      required: true,
    },
  ];
  return returnExtraRule(fieldName, extraRule, rules);
}

//  * Validation Rules for Required fields.

export function requiredRule(fieldName, extraRule = []) {
  let rules = [
    {
      message: genMessage(fieldName, "required"),
      trigger: "blur",
      required: true,
    },
  ];
  return returnExtraRule(fieldName, extraRule, rules);
}

//  * validation for Short Code

export function shortCodeRule(fieldName, extraRule = []) {
  let rules = [
    {
      message: converToNormalCase(fieldName) + " should be valid string",
      trigger: "blur",
      type: "string",
    },
    {
      message: converToNormalCase(fieldName) + " should be minimum 3 character",
      trigger: "blur",
      min: 2,
    },
  ];
  return returnExtraRule(fieldName, extraRule, rules);
}
/**
 * validation for Register Number
 * @param {*} fieldName
 * @param {*} extraRule
 * @returns
 */
export function registrationNumberRule(fieldName, extraRule = []) {
  let rules = [
    {
      message: `Please enter ${fieldName ? fieldName : ""}`,
      trigger: "blur",
      required: true,
    },
    {
      message: converToNormalCase(fieldName) + " should be valid string",
      trigger: "blur",
      type: "string",
    },
    {
      message: converToNormalCase(fieldName) + " should be minimum 3 character",
      trigger: "blur",
      min: 3,
    },
  ];
  return returnExtraRule(fieldName, extraRule, rules);
}
/**
 * validation for Pincode Validation
 * @param {*} fieldName
 * @param {*} extraRule
 * @returns
 */
export function pincodeRule(fieldName, extraRule = []) {
  let rules = [
    {
      message: `Please enter ${fieldName ? fieldName : ""}`,
      trigger: "blur",
      required: true,
    },
  ];
  return returnExtraRule(fieldName, extraRule, rules);
}
/**
 * validation for URl Validation
 * @param {*} fieldName
 * @param {*} extraRule
 * @returns
 */
export function urlRule(fieldName, extraRule = []) {
  let rules = [
    {
      message: `Please enter ${fieldName ? fieldName : ""}`,
      trigger: "blur",
    },
    {
      message: converToNormalCase(fieldName) + " should be in right format",
      trigger: "blur",
      pattern:
        /^(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i,
    },
  ];
  return returnExtraRule(fieldName, extraRule, rules);
}

/**
 *
 * @param {form Atribute Name} fieldName
 * @param {eg:required ,string} rule
 * @returns
 */
function genMessage(fieldName, rule) {
  return converToNormalCase(fieldName) + " should be " + rule;
}
/**
 *
 * @param {Form  Filed Name Atribute Name} fieldName
 * @param {eg : required,Type} extraRule
 * @param {pre define Rules} rules
 * @returns
 */
function returnExtraRule(fieldName, extraRule, rules) {
  if (extraRule.length) {
    if (_.contains(extraRule, "required")) {
      _.without(extraRule, "required");
    }
  }
  _.every(extraRule, function (value_rule) {
    let rule = {
      message: genMessage(fieldName, value_rule),
      trigger: "blur",
    };
    if (value_rule == "required") {
      rule[value_rule] = true;
    } else {
      rule["type"] = value_rule;
    }
    rules.push(rule);
  });
  return rules;
}
/**
 *
 * @param {camelCase} text
 * @returns Normal text
 */
function converToNormalCase(text) {
  // const result = text.replace(/([A-Z])/g, " $1");
  // const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  let result = text.split("_");
  result.forEach((w, index) => {
    result[index] = w.charAt(0).toUpperCase().concat(w.slice(1, w.length));
  });
  const finalResult = result.join(" ");
  return finalResult;
}

// /**
//  *
//  * @param {Normal Text} string
//  * @returns
//  */
// function toCapitalize(string) { return string.charAt(0).toUpperCase() + string.slice(1); }
