export const DepotTableConfig = [
  {
    label: "ID",
    width: "100",
    sortable: true,
    prop: "id",
  },
  {
    label: "Depot Name",
    width: "150",
    sortable: true,
    prop: "depot_name",
    popover: true,
  },
  {
    label: "Depot Manager Name",
    width: "200",
    sortable: true,
    prop: "depot_manager_name",
    popover: true,
  },
  {
    label: "Depot Address",
    width: "200",
    sortable: true,
    prop: "depot_address",
  },
  {
    label: "Depot Email",
    width: "200",
    prop: "email",
    sortable: true,
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

export const depotData = {
  items: [
    {
      id: "101",
      depot_name: "Gas agency",
      depot_manager_name: [
        {
          content: "Yaw Graham",
          url: "https://upload.wikimedia.org/wikipedia/commons/3/3a/M%C3%BCnster%2C_LVM%2C_B%C3%BCrogeb%C3%A4ude_--_2013_--_5149-51.jpg",
        },
      ],
      depot_address: "Agbogba-ashongman road",
      email: "kamaldeen@gmail.com",
      phone_number: "0277400000",
      status: "Active",
    },
    {
      id: "102",
      depot_name: "Mg gas agency",
      depot_manager_name: [
        {
          content: "Kamaldeen sulley",
          url: "https://upload.wikimedia.org/wikipedia/commons/3/3a/M%C3%BCnster%2C_LVM%2C_B%C3%BCrogeb%C3%A4ude_--_2013_--_5149-51.jpg",
        },
      ],
      depot_address: "Agbogba-ashongman road",
      email: "kamaldeen@gmail.com",
      phone_number: "0277400000",
      status: "Inactive",
    },
    {
      id: "103",
      depot_name: "Gas agency",
      depot_manager_name: [
        {
          content: "Derrick Nwafor",
          url: "https://upload.wikimedia.org/wikipedia/commons/3/3a/M%C3%BCnster%2C_LVM%2C_B%C3%BCrogeb%C3%A4ude_--_2013_--_5149-51.jpg",
        },
      ],
      depot_address: "Agbogba-ashongman road",
      email: "kamaldeen@gmail.com",
      phone_number: "0277400000",
      status: "Active",
    },
    {
      id: "104",
      depot_name: "Gas agency",
      depot_manager_name: [
        {
          content: "Yaw boafo",
          url: "https://upload.wikimedia.org/wikipedia/commons/3/3a/M%C3%BCnster%2C_LVM%2C_B%C3%BCrogeb%C3%A4ude_--_2013_--_5149-51.jpg",
        },
      ],
      depot_address: "Agbogba-ashongman road",
      email: "kamaldeen@gmail.com",
      phone_number: "0277400000",
      status: "Inactive",
    },
  ],
};
