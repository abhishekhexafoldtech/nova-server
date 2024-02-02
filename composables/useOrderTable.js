export const tableConfig = {
    allOrders: [
        {
            label: "Order ID",
            width: "120",
            sortable: true,
            prop: "order_id",
            popover: true,
        },
        {
            label: "Product Order",
            width: "200",
            sortable: true,
            prop: "product_order",
        },
        {
            label: "Order Date",
            width: "150",
            sortable: true,
            prop: "order_date",
        },
        {
            label: "Order Total",
            width: "120",
            sortable: true,
            prop: "order_total",
        },
        {
            label: "Customer Name",
            width: "220",
            sortable: true,
            prop: "customer_name",
        },
        {
            label: "Zone",
            width: "100",
            sortable: true,
            prop: "zone",
        },
        {
            label: "Delivery Location",
            width: "190",
            sortable: true,
            prop: "delivery_location",
        },
        {
            label: "Delivery status",
            width: "170",
            sortable: true,
            prop: "delivery_status",
        },
        {
            label: "Payment Type",
            width: "150",
            sortable: true,
            prop: "payment_type",
        },
        {
            label: "Payment Status",
            width: "170",
            sortable: true,
            prop: "payment_status",
        },
    ],
};

//filter data
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
export const getOrdersTableData = async (name) => {
    fetch(`api/${name}`)
        .then((res) => {
            // do something with responce
        })
        .catch((err) => {
            // do something with error
        });

    sessionStorage.setItem("orders_data", JSON.stringify(allOrders));
};
export const allOrders = {
    items: [
    {
        order_id: "#A123",
        product_order: "3kg|steel, 6kg|steel (2)",
        order_date: "2023/12/28",
        order_total:"GHS 556",   
        delivery_status:[
            {
             status:"Pending",
             date: "2023/12/28",
            }
         ],
        customer_name: [
            {
                content: "Yaw Graham",
                url: "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/short/linkedin-profile-picture-maker/dummy_image/thumb/004.webp",
            },
        ],
        zone:"Northern",
        delivery_location:"Atomic GS-0757-3391",
        delivery_status:[
            {
             status:"Pending",
             date: "2023/12/28",
            }
         ],
        payment_type:"Cash on delivery",        
        payment_status:"Unpaid",
        join_date: "2023/12/05",
    },
    {
        order_id: "#A123",
        product_order: "3kg|steel, 6kg|steel (2)",
        order_date: "2023/12/28",
        order_total:"GHS 556",   
               status: [
            {
                status: false,
                content: "Inactive",
            },
        ],
        customer_name: [
            {
                content: "Derric Nwafor",
                url: "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/short/linkedin-profile-picture-maker/dummy_image/thumb/004.webp",
            },
        ],
        zone:"Northern",
        delivery_location:"Atomic GS-0757-3391",
        delivery_status:[
            {
             status:"Delivered",
             date: "2023/12/28",
            }
         ],
        payment_type:"Bank card",        
        payment_status:"paid",
        join_date: "2023/08/05",
    },
    {
        order_id: "#A123",
        product_order: "3kg|steel, 6kg|steel (2)",
        order_date: "2023/12/28",
        order_total:"GHS 556",       
               status: [
            {
                status: false,
                content: "Inactive",
            },
        ],
        customer_name: [
            {
                content: "KamalDev Sulley Graham",
                url: "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/short/linkedin-profile-picture-maker/dummy_image/thumb/004.webp",
            },
        ],
        zone:"Northern",
        delivery_location:"Atomic GS-0757-3391",
        delivery_status:[
           {
            status:"Delivered",
            date: "2023/12/28",
           }
        ],
        payment_type:"Bank card",        
        payment_status:"Paid",
        join_date: "2023/08/05",
    },
    {
        order_id: "#A123",
        product_order: "3kg|steel, 6kg|steel (2)",
        order_date: "2023/12/28",
        order_total:"GHS 556",    
               status: [
            {
                status: true,
                content: "Active",
            },
        ],
        customer_name: [
            {
                content: "Yaw Boafo",
                url: "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/short/linkedin-profile-picture-maker/dummy_image/thumb/004.webp",
            },
        ],
        zone:"Northern",
        delivery_location:"Atomic GS-0757-3391",
        delivery_status:[
            {
             status:"Delivered",
             date: "2023/12/28",
            }
         ],
        payment_type:"Bank card",        
        payment_status:"Paid",
        join_date: "2023/12/05",
    },
    {
        order_id: "#A123",
        product_order: "3kg|steel, 6kg|steel (2)",
        order_date: "2023/12/28",
        order_total:"GHS 556",   
               status: [
            {
                status: false,
                content: "Inactive",
            },
        ],
        customer_name: [
            {
                content: "Dziedzorm Doe",
                url: "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/short/linkedin-profile-picture-maker/dummy_image/thumb/004.webp",
            },
        ],
        zone:"Northern",
        delivery_location:"Atomic GS-0757-3391",
        delivery_status:[
            {
             status:"Pending",
             date: "2023/12/28",
            }
         ],
        payment_type:"Mobile money",        
        payment_status:"Unpaid",
        join_date: "2023/08/05",
    },
    {
        order_id: "#A123",
        product_order: "3kg|steel, 6kg|steel (2)",
        order_date: "2023/12/28",
        order_total:"GHS 556",       
               status: [
            {
                status: false,
                content: "Inactive",
            },
        ],
        customer_name: [
            {
                content: "Yaw Boafo",
                url: "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/short/linkedin-profile-picture-maker/dummy_image/thumb/004.webp",
            },
        ],
        zone:"Northern",
        delivery_location:"Atomic GS-0757-3391",
        delivery_status:[
            {
             status:"Pending",
             date: "2023/12/28",
            }
         ],
        payment_type:"Mobile money",        
        payment_status:"Paid",
        join_date: "2023/08/05",
    },
    {
        order_id: "#A123",
        product_order: "3kg|steel, 6kg|steel (2)",
        order_date: "2023/12/28",
        order_total:"GHS 556",    
               status: [
            {
                status: true,
                content: "Active",
            },
        ],
        customer_name: [
            {
                content: "Kamal Deen",
                url: "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/short/linkedin-profile-picture-maker/dummy_image/thumb/004.webp",
            },
        ],
        zone:"Northern",
        delivery_location:"Atomic GS-0757-3391",
        delivery_status:[
            {
             status:"Pending",
             date: "2023/12/28",
            }
         ],
        payment_type:"Mobile money",        
        payment_status:"Paid",
        join_date: "2023/12/05",
    },
    {
        order_id: "#A123",
        product_order: "3kg|steel, 6kg|steel (2)",
        order_date: "2023/12/28",
        order_total:"GHS 556",   
               status: [
            {
                status: false,
                content: "Inactive",
            },
        ],
        customer_name: [
            {
                content: "Derric Nwafor",
                url: "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/short/linkedin-profile-picture-maker/dummy_image/thumb/004.webp",
            },
        ],
        zone:"Northern",
        delivery_location:"Atomic GS-0757-3391",
        delivery_status:[
            {
             status:"Delivered",
             date: "2023/12/28",
            }
         ],
        payment_type:"Cash on delivery",        
        payment_status:"Paid",
        join_date: "2023/08/05",
    },
    {
        order_id: "#A123",
        product_order: "3kg|steel, 6kg|steel (2)",
        order_date: "2023/12/28",
        order_total:"GHS 556",       
               status: [
            {
                status: false,
                content: "Inactive",
            },
        ],
        customer_name: [
            {
                content: "KamalDev Sulley Graham",
                url: "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/short/linkedin-profile-picture-maker/dummy_image/thumb/004.webp",
            },
        ],
        zone:"Northern",
        delivery_location:"Atomic GS-0757-3391",
        delivery_status:[
            {
             status:"Delivered",
             date: "2023/12/28",
            }
         ],
        payment_type:"Cash on delivery",        
        payment_status:"Paid",
        join_date: "2023/08/05",
    },
    {
        order_id: "#A123",
        product_order: "3kg|steel, 6kg|steel (2)",
        order_date: "2023/12/28",
        order_total:"GHS 556",    
               status: [
            {
                status: true,
                content: "Active",
            },
        ],
        customer_name: [
            {
                content: "Derric Nwafor",
                url: "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/short/linkedin-profile-picture-maker/dummy_image/thumb/004.webp",
            },
        ],
        zone:"Northern",
        delivery_location:"Atomic GS-0757-3391",
        delivery_status:[
            {
             status:"Pending",
             date: "2023/12/28",
            }
         ],
        payment_type:"Cash on delivery",        
        payment_status:"Paid",
        join_date: "2023/12/05",
    },
],
page: 1,
pages: 1,
size: 10,
total: 60
}
