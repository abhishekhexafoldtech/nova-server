export const exchangeTableConfig = [
  {
    label: "ID",
    width: "100",
    sortable: true,
    prop: "id",
  },
  {
    label: "Exchange point",
    width: "150",
    sortable: true,
    prop: "exchange_point",
    popover: true,
  },
  {
    label: "Exchange point officer",
    width: "150",
    sortable: true,
    prop: "exchange_point_officer",
    popover: true,
  },
  {
    label: "Exchange point Address",
    width: "200",
    sortable: true,
    prop: "exchange_point_address",
  },
  {
    label: "Phone Number",
    width: "160",
    prop: "phone_number",
    sortable: true,
  },
  {
    label: "status",
    width: "120",
    prop: "status",
  },
];

export const exchangeTableData = {
  items: [
    {
      id:"101",
      exchange_point: "Accra",
      exchange_point_officer: [
        {
          content: "John doe",
          url: "https://upload.wikimedia.org/wikipedia/commons/3/3a/M%C3%BCnster%2C_LVM%2C_B%C3%BCrogeb%C3%A4ude_--_2013_--_5149-51.jpg",
        },
      ],
      exchange_point_address: "Agbogba-ashongman road",
      email: "kamaldeen@gmail.com",
      phone_number: "0277400000",
      status: "Active",
    },
  ],
};
