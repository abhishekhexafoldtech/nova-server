export const tableConfig = {
  complaints: [
    {
      label: "Complaint No",
      sortable: true,
      prop: "complaint_no",
      popover: true,
    },
    {
      label: "Date",
      sortable: true,
      prop: "date",
    },
    {
      label: "Customer Id",
      sortable: true,
      prop: "id",
    },
    {
      label: "Name",
      sortable: true,
      prop: "name",
    },
    {
      label: "Zone",
      sortable: true,
      prop: "zone",
    },
    {
      label: "Order ID",
      sortable: true,
      prop: "order_id",
    },
    {
      label: "Type",
      sortable: true,
      prop: "type_of_complaint",
    },
    {
      label: "Status",
      sortable: true,
      prop: "complaint_status",
    },
    {
      label: "Case Priority",
      sortable: true,
      prop: "case_priority",
    },
  ],
};

export const deliveryAgentAllOrdersConfig = [
  {
    label: "Order ID",
    sortable: true,
    prop: "order_id",
    width: "120",
  },
  {
    label: "Order Date",
    sortable: true,
    prop: "order_date",
    width: "130",
  },
  {
    label: "Ordered Product",
    sortable: true,
    prop: "ordered_product",
    width: "180",
  },
  {
    label: "Order Total",
    sortable: true,
    prop: "order_total",
    width: "140",
  },
  {
    label: "Order By",
    sortable: true,
    prop: "order_by",
    width: "120",
  },
  {
    label: "Payment Method",
    sortable: true,
    prop: "payment_method",
    width: "170",
  },
  {
    label: "Location",
    sortable: true,
    prop: "location",
    width: "150",
  },
  {
    label: "Status",
    sortable: true,
    prop: "status",
    width: "130",
  },
  {
    label: "Assigned Vehicle",
    sortable: true,
    prop: "assigned_vehicle",
    width: "170",
  },
  {
    label: "Vehicle passing no.",
    sortable: true,
    prop: "vehicle_passing_no",
    width: "190",
  },
];

export const deliveryAgentComplaintsConfig = [
  {
    label: "Complaint No.",
    sortable: true,
    prop: "complaint_no",
    width: "130",
    popover:true
  },
  {
    label: "Date",
    sortable: true,
    prop: "date",
    width: "120",
  },
  {
    label: "Type Of Complaint",
    sortable: true,
    prop: "complaint_type",
    width: "160",
  },
  {
    label: "Status",
    sortable: true,
    prop: "status",
    width: "120",
  },
  {
    label: "Case Priority",
    sortable: true,
    prop: "case_priority",
    width: "130",
  },
];

export const deliveryAgentComplaints = {
  items: [
    {
      complaint_no: "C101",
      date: "2020/12/15",
      complaint_type: "Cylonder damage",
      status: "Resolved",
      case_priority: "High",
    },
    {
      complaint_no: "C102",
      date: "2020/12/15",
      complaint_type: "Deley delivery",
      status: "Unresolved",
      case_priority: "Medium",
    },
    {
      complaint_no: "C103",
      date: "2020/12/15",
      complaint_type: "Refund issue",
      status: "Unresolved",
      case_priority: "Loe",
    },
  ],
  page: 1,
  pages: 1,
  size: 10,
  total: 60,
};

export const deliveryAgentAllOrders = {
  items: [
    {
      order_id: 101,
      order_date: "2023/12/15",
      ordered_product: "3kg|steel,6kg|steel(2)",
      order_total: "GHs 190",
      order_by: "John Doe",
      payment_method: "Bank card",
      location: "Atomic GS-0757-3391",
      status: [
        {
          status: "Delivered",
          date: "2023/12/28",
        },
      ],
      assigned_vehicle: "Mini truck",
      vehicle_passing_no: "GH02774",
    },
    {
      order_id: 101,
      order_date: "2023/12/15",
      ordered_product: "3kg|steel,6kg|steel(2)",
      order_total: "GHs 190",
      order_by: "John Doe",
      payment_method: "Bank card",
      location: "Atomic GS-0757-3391",
      status: [
        {
          status: "Shipped",
        },
      ],
      assigned_vehicle: "Mini truck",
      vehicle_passing_no: "GH02774",
    },
    {
      order_id: 101,
      order_date: "2023/12/15",
      ordered_product: "3kg|steel,6kg|steel(2)",
      order_total: "GHs 190",
      order_by: "John Doe",
      payment_method: "Bank card",
      location: "Atomic GS-0757-3391",
      status: [
        {
          status: "Shipped",
        },
      ],
      assigned_vehicle: "Mini truck",
      vehicle_passing_no: "GH02774",
    },
    {
      order_id: 101,
      order_date: "2023/12/15",
      ordered_product: "3kg|steel,6kg|steel(2)",
      order_total: "GHs 190",
      order_by: "John Doe",
      payment_method: "Bank card",
      location: "Atomic GS-0757-3391",
      status: [
        {
          status:"Pending"
        },
      ],
      assigned_vehicle: "Mini truck",
      vehicle_passing_no: "GH02774",
    },
    {
      order_id: 101,
      order_date: "2023/12/15",
      ordered_product: "3kg|steel,6kg|steel(2)",
      order_total: "GHs 190",
      order_by: "John Doe",
      payment_method: "Bank card",
      location: "Atomic GS-0757-3391",
      status: [
        {
          status: "Delivered",
          date: "2023/12/28",
        },
      ],
      assigned_vehicle: "Mini truck",
      vehicle_passing_no: "GH02774",
    },
    {
      order_id: 101,
      order_date: "2023/12/15",
      ordered_product: "3kg|steel,6kg|steel(2)",
      order_total: "GHs 190",
      order_by: "John Doe",
      payment_method: "Bank card",
      location: "Atomic GS-0757-3391",
      status: [
        {
          status:"Pending"
        },
      ],
      assigned_vehicle: "Mini truck",
      vehicle_passing_no: "GH02774",
    },
  ],
  page: 1,
  pages: 1,
  size: 10,
  total: 60,
};

export const complaints = {
  items: [
    {
      id: "101",
      name: [
        {
          content: "Yaw Graham",
          url: "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/short/linkedin-profile-picture-maker/dummy_image/thumb/004.webp",
        },
      ],
      zone: "Northen",
      status: [
        {
          order_status: false,
          content: "Pending",
        },
      ],
      date: "2023/12/05",
      order_id: "AA1234",
      complaint_status: "Resolved",
      complaint_no: "c101",
      type_of_complaint: "Delay delivery",
      case_priority: "High",
    },
    {
      id: "102",
      name: [
        {
          content: "Derric Nwafor",
          url: "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/short/linkedin-profile-picture-maker/dummy_image/thumb/004.webp",
        },
      ],
      zone: "Northen",
      date: "2023/08/05",
      order_id: "AA1234",
      complaint_status: "Unresolved",
      complaint_no: "c102",
      type_of_complaint: "Delay delivery",
      case_priority: "High",
    },
    {
      id: "103",
      name: [
        {
          content: "KamalDev Sulley Graham",
          url: "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/short/linkedin-profile-picture-maker/dummy_image/thumb/004.webp",
        },
      ],
      zone: "Western",
      date: "2023/08/05",
      order_id: "AA1234",
      complaint_status: "Resolved",
      complaint_no: "c103",
      type_of_complaint: "Delay delivery",
      case_priority: "High",
    },
    {
      id: "104",
      name: [
        {
          content: "Yaw Boafo",
          url: "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/short/linkedin-profile-picture-maker/dummy_image/thumb/004.webp",
        },
      ],
      zone: "Northen",
      date: "2023/12/05",
      order_id: "AA1234",
      complaint_status: "Unresolves",
      complaint_no: "c104",
      type_of_complaint: "Delay delivery",
      case_priority: "High",
    },
  ],
  page: 1,
  pages: 1,
  size: 10,
  total: 60,
};

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
        label: "Delivered",
      },
      {
        id: 3.2,
        label: "Pending",
      },
      {
        id: 3.3,
        label: "Shipped",
      },
    ],
  },
];

export const filterComplaints = [
  {
    id: 1,
    label: "Case priority",
    children: [
      {
        id: 1.1,
        label: "High",
      },
      {
        id: 1.2,
        label: "Medium",
      },
      {
        id: 1.3,
        label: "Low",
      },
    ],
  },
  {
    id: 2,
    label: "Status",
    children: [
      {
        id: 2.1,
        label: "Resolved",
      },
      {
        id: 2.2,
        label: "Unresolved",
      },
    ],
  },
  {
    id: 3,
    label: "type of complaint",
    children: [
      {
        id: 3.1,
        label: "Cylinder damage",
      },
      {
        id: 3.2,
        label: "Salary delay",
      },
      {
        id: 3.3,
        label: "Incomplete order",
      },
    ],
  },
];

export let listQuery = reactive({
  page: 1,
  limit: 10,
  search: "",
  searchJoin: "or",
  orderBy: "created_at",
  sortedBy: "desc",
});

// export const getCustomersTableData = async (name) => {
//   fetch(`api/${name}`)
//     .then((res) => {
//       // do something with responce
//     })
//     .catch((err) => {
//       // do something with error
//     });

//   if (name == "orders") {
//     sessionStorage.setItem(
//       "customers_orders_data",
//       JSON.stringify(deliveryAgentAllOrders)
//     );
//   } else if (name == "complaints") {
//     sessionStorage.setItem("customer_complaints", JSON.stringify(complaints));
//   }
// };
