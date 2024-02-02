export const allOrderConfig = [
    {
        label: "OrderID",
        width: "100",
        sortable: true,
        prop: "id",
        popover:true
    },
    {
        label: "PO",
        width: "70",
        sortable: true,
        prop: "po",
    },
    {
        label: "Ordered Date",
        width: "120",
        sortable: true,
        prop: "order_date"
    },
    {
        label: "Product Order",
        width: "150",
        sortable: true,
        prop: "product_order"
    },
    {
        label: "Total QTY",
        width: "100",
        sortable: true,
        prop: "total_qty"
    },
    {
        label: "Order Total",
        width: "120",
        sortable: true,
        prop: "order_total"
    },
    {
        label: "Delivery Status",
        width: "130",
        sortable: true,
        prop: "delivery_status"
    },
    {
        label: "Payment Type",
        width: "120",
        sortable: true,
        prop: "pay_type"
    },
    {
        label: "Payment Status",
        width: "140",
        sortable: true,
        prop: "pay_status"
    },
    {
        label: "Invoice",
        width: "100",
        sortable: true,
        prop: "invoice"
    },
    
  ];

  export const allOrder = {
    items: [
        {
        id: "101",
        po: "PO123",
        order_date: "2023-10-26",
        product_order: "3kg|steel, 6kg|steel (2)",
        total_qty: 100,
        order_total: "GHS 556",
        delivery_status:[
            {
             status:"Pending",
             date: "2023-10-26",
            }
         ],
        pay_type: "Cash on delivery",
        pay_status: "Unpaid",
        invoice: "INV001"
    },
        {
        id: "101",
        po: "PO123",
        order_date: "2023-10-26",
        product_order: "3kg|steel, 6kg|steel (2)",
        total_qty: 100,
        order_total: "GHS 556",
        delivery_status:[
            {
             status:"Pending",
             date: "2023-10-26",
            }
         ],
        pay_type: "Cash on delivery",
        pay_status: "Unpaid",
        invoice: "INV001"
    },
        {
        id: "101",
        po: "PO123",
        order_date: "2023-10-26",
        product_order: "3kg|steel, 6kg|steel (2)",
        total_qty: 100,
        order_total: "GHS 556",
        delivery_status:[
            {
             status:"Pending",
             date: "2023-10-26",
            }
         ],
        pay_type: "Cash on delivery",
        pay_status: "Unpaid",
        invoice: "INV001"
    },
        {
        id: "101",
        po: "PO123",
        order_date: "2023-10-26",
        product_order: "3kg|steel, 6kg|steel (2)",
        total_qty: 100,
        order_total: "GHS 556",
        delivery_status:[
            {
             status:"Delivered",
             date: "2023-10-26",
            }
         ],
        pay_type: "Credit Card",
        pay_status: "Paid",
        invoice: "INV001"
    },
        {
        id: "101",
        po: "PO123",
        order_date: "2023-10-26",
        product_order: "3kg|steel, 6kg|steel (2)",
        total_qty: 100,
        order_total: "GHS 556",
        delivery_status:[
            {
             status:"Delivered",
             date: "2023-10-26",
            }
         ],
        pay_type: "Credit Card",
        pay_status: "Paid",
        invoice: "INV001"
    },
],
    page: 1,
    pages: 1,
    size: 10,
    total: 60
  }