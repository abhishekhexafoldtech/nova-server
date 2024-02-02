export const allManufacturersConfig = [
  {
    label: "Manufacturer Code",
    width: "200",
    sortable: true,
    prop: "manufacturer_code",
    popover: true,
  },
  {
    label: "Manufacturer",
    width: "150",
    sortable: true,
    prop: "manufacturer",
  },
  {
    label: "Phone Number",
    width: "150",
    sortable: true,
    prop: "phone",
  },
  {
    label: "Email",
    width: "200",
    sortable: true,
    prop: "email",
  },
  {
    label: "Manufacture Cylinder",
    width: "200",
    sortable: true,
    prop: "manufacture_cylinder",
  },
  {
    label: "Cylinder Types",
    width: "160",
    sortable: true,
    prop: "cylinder_type",
  },
  {
    label: "Verification Status",
    width: "200",
    sortable: true,
    prop: "verification_status",
  },
];

export const allManufacturers = {
  items: [
    {
      manufacturer_code: 101,
      manufacturer: "Mg gas ltd",
      phone: "123-456-7890",
      email: "manufacturer@example.com",
      manufacture_cylinder: "Steel",
      cylinder_type: "3kg, 6kg, 12kg",
      verification_status: [
        {
          status: "Pending",
        },
      ],
    },
    {
      manufacturer_code: 101,
      manufacturer: "Mg gas ltd",
      phone: "123-456-7890",
      email: "manufacturer@example.com",
      manufacture_cylinder: "Steel",
      cylinder_type: "3kg, 6kg, 12kg",
      verification_status: [
        {
          status: "Approve",
        },
      ],
    },
    {
      manufacturer_code: 101,
      manufacturer: "Mg gas ltd",
      phone: "123-456-7890",
      email: "manufacturer@example.com",
      manufacture_cylinder: "Steel",
      cylinder_type: "3kg, 6kg, 12kg",
      verification_status: [
        {
          status: "Approve",
        },
      ],
    },
    {
      manufacturer_code: 101,
      manufacturer: "Mg gas ltd",
      phone: "123-456-7890",
      email: "manufacturer@example.com",
      manufacture_cylinder: "Steel",
      cylinder_type: "3kg, 6kg, 12kg",
      verification_status: [
        {
          status: "Pending",
        },
      ],
    },
    {
      manufacturer_code: 101,
      manufacturer: "Mg gas ltd",
      phone: "123-456-7890",
      email: "manufacturer@example.com",
      manufacture_cylinder: "Steel",
      cylinder_type: "3kg, 6kg, 12kg",
      verification_status: [
        {
          status: "Pending",
        },
      ],
    },
  ],
  page: 1,
  pages: 1,
  size: 10,
  total: 60,
};

export const stockReqConfig = [
  {
    label: "PO",
    width: "100",
    sortable: true,
    prop: "po",
    popover: true,
  },
  {
    label: "Manufacturer",
    width: "175",
    sortable: true,
    prop: "manufacturer",
  },
  {
    label: "Ordered Date",
    width: "175",
    sortable: true,
    prop: "ordered_date",
  },
  {
    label: "Product Name",
    width: "200",
    sortable: true,
    prop: "product_name",
  },
  {
    label: "Ordered QTY",
    width: "160",
    sortable: true,
    prop: "ordered_qyt",
  },
  {
    label: "Unit Value",
    width: "160",
    sortable: true,
    prop: "unit_value",
  },
  {
    label: "Total Value",
    width: "160",
    sortable: true,
    prop: "total_value",
  },
  {
    label: "Ordered Status",
    width: "200",
    sortable: true,
    prop: "ordered_status",
  },
  {
    label: "Invoice",
    width: "200",
    sortable: true,
    prop: "invoice",
  },
];

export const stockReq = {
  items: [
    {
      po: 101,
      manufacturer: "Mg gas ltd",
      ordered_date: "2023-01-01",
      product_name: "3kg | steel",
      ordered_qyt: "1000",
      unit_value: "GHs 65",
      total_value: "GHs 15000",
      ordered_status: [
        {
          status: "Pending",
        },
      ],
      invoice: 104,
    },
    {
      po: 101,
      manufacturer: "Mg gas ltd",
      ordered_date: "2023-01-01",
      product_name: "3kg | steel",
      ordered_qyt: "1000",
      unit_value: "GHs 65",
      total_value: "GHs 15000",
      ordered_status: [
        {
          status: "Pending",
        },
      ],
      invoice: 104,
    },
    {
      po: 101,
      manufacturer: "Mg gas ltd",
      ordered_date: "2023-01-01",
      product_name: "3kg | steel",
      ordered_qyt: "1000",
      unit_value: "GHs 65",
      total_value: "GHs 15000",
      ordered_status: [
        {
          status: "Approve",
        },
      ],
      invoice: 104,
    },
    {
      po: 101,
      manufacturer: "Mg gas ltd",
      ordered_date: "2023-01-01",
      product_name: "3kg | steel",
      ordered_qyt: "1000",
      unit_value: "GHs 65",
      total_value: "GHs 15000",
      ordered_status: [
        {
          status: "Approve",
        },
      ],
      invoice: 104,
    },
  ],
};

export const returnOrderConfig = [
  {
    label: "PO",
    width: "75",
    sortable: true,
    prop: "po",
    popover: true,
  },
  {
    label: "Manufacturer",
    width: "175",
    sortable: true,
    prop: "manufacturer",
  },
  {
    label: "Ordered Date",
    width: "150",
    sortable: true,
    prop: "ordered_date",
  },
  {
    label: "Product",
    width: "120",
    sortable: true,
    prop: "product_name",
  },
  {
    label: "Cylinder ID",
    width: "150",
    sortable: true,
    prop: "cylinder_id",
  },
  {
    label: "Type of Issue",
    width: "150",
    sortable: true,
    prop: "type_of_issue",
  },
  {
    label: "Return Date",
    width: "150",
    sortable: true,
    prop: "return_date",
  },
  {
    label: "Ordered Status",
    width: "200",
    sortable: true,
    prop: "ordered_status",
  },
  {
    label: "Replacement Date",
    width: "200",
    sortable: true,
    prop: "replacement_date",
  },
];

export const returnOrder = {
  items: [
    {
      po: 101,
      manufacturer: "Mg gas ltd",
      ordered_date: "2023-01-01",
      product_name: "3kg | steel",
      cylinder_id: " NDHDI3773664N",
      type_of_issue: " Leak",
      return_date: "2023-01-01",
      ordered_status: [
        {
          status: "Approve",
        },
      ],
      replacement_date: "2023-01-01",
    },
    {
      po: 101,
      manufacturer: "Mg gas ltd",
      ordered_date: "2023-01-01",
      product_name: "3kg | steel",
      cylinder_id: " NDHDI3773664N",
      type_of_issue: " Leak",
      return_date: "2023-01-01",
      ordered_status: [
        {
          status: "Approve",
        },
      ],
      replacement_date: "2023-01-01",
    },
    {
      po: 101,
      manufacturer: "Mg gas ltd",
      ordered_date: "2023-01-01",
      product_name: "3kg | steel",
      cylinder_id: " NDHDI3773664N",
      type_of_issue: " Leak",
      return_date: "2023-01-01",
      ordered_status: [
        {
          status: "Pending",
        },
      ],
      replacement_date: "2023-01-01",
    },
    {
      po: 101,
      manufacturer: "Mg gas ltd",
      ordered_date: "2023-01-01",
      product_name: "3kg | steel",
      cylinder_id: " NDHDI3773664N",
      type_of_issue: " Leak",
      return_date: "2023-01-01",
      ordered_status: [
        {
          status: "Pending",
        },
      ],
      replacement_date: "2023-01-01",
    },
    {
      po: 101,
      manufacturer: "Mg gas ltd",
      ordered_date: "2023-01-01",
      product_name: "3kg | steel",
      cylinder_id: " NDHDI3773664N",
      type_of_issue: " Leak",
      return_date: "2023-01-01",
      ordered_status: [
        {
          status: "Pending",
        },
      ],
      replacement_date: "2023-01-01",
    },
  ],
};
