export const tableConfig = {
    depot_Manger: [
      {
        label: "ID",
        width: "120",
        sortable: true,
        prop: "id",
        popover: true,
      },
      {
        label: "Depot Manager Name",
        width: "200",
        sortable: true,
        prop: "depot_manager_name",
      },
      {
        label: "Depot Name",
        width: "200",
        sortable: true,
        prop: "depot_name",
      },
      {
        label: "Email",
        width: "220",
        sortable: true,
        prop: "email",
      },
      {
        label: "Phone Number",
        width: "150",
        sortable: true,
        prop: "phone_number",
      },
      {
        label: "Status",
        width: "100",
        sortable: false,
        prop: "status",
      },
    ],
  };
  
  //filter data action
  export const filterAllOrders = [
    {
      id: 1,
      label: "Zone",
      children: [
        {
          id: 1.1,
          label: "Northen",
        },
        {
          id: 1.2,
          label: "Western",
        },
      ],
    },
    {
      id: 2,
      label: "Sub zone",
      children: [
        {
          id: 2.2,
          label: "N12",
        },
        {
          id: 2.3,
          label: "W12",
        },
      ],
    },
    {
      id: 3,
      label: "Status",
      children: [
        {
          id: 3.1,
          label: "Active",
        },
        {
          id: 3.2,
          label: "Inactive",
        },
      ],
    },
    {
      id: 4,
      label: "Distributor name",
      children: [
        {
          id: 4.1,
          label: "Yaw Graham",
        },
        {
          id: 4.2,
          label: "Derric Nwafor",
        },
        {
          id: 4.3,
          label: "Yaw Graham",
        },
        {
          id: 4.4,
          label: "Derric Nwafor",
        },
      ],
    },
  ];
  
  //get orders table data
  export const getDepotTableData = async (name) => {
    fetch(`api/${name}`)
      .then((res) => {
        // do something with responce
      })
      .catch((err) => {
        // do something with error
      });
  
    sessionStorage.setItem("depot_data", JSON.stringify(depot_Manger));
  };
  export const depot_Manger = {
    items: [
    {
      id: "#A123",
      depot_manager_name: "Yaw Maxmiller",
      depot_name:"Gas agency",
      email: "yaw&maxmiller101@gmail.com",
      phone_number: "+23335679078",
      
       status: [
      {
        status: true,
        content: "Active",
      },
    ],
    },
    {
      id: "#A123",
      depot_manager_name: "Yaw Maxmiller",
      depot_name:"Mg Gas agency",
      email: "yaw&maxmiller101@gmail.com",
      phone_number: "+23335679078",
       status: [
      {
        status: true,
        content: "Active",
      },
    ],
    },
    {
      id: "#A123",
      depot_manager_name: "Yaw Maxmiller",
      depot_name:"Mg Gas agency",
      email: "yaw&maxmiller101@gmail.com",
      phone_number: "+23335679078",
      
       status: [
      {
        status: false,
        content: "Inactive",
      },
    ],
    },
    {
      id: "#A123",
      depot_manager_name: "Yaw Maxmiller",
      depot_name:"Gas agency",
      email: "yaw&maxmiller101@gmail.com",
      phone_number: "+23335679078",
      
       status: [
      {
        status: true,
        content: "Active",
      },
    ],
    },
  ],
  page: 1,
  pages: 1,
  size: 10,
  total: 60
  }
  