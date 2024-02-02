<template>
  <div>
    <el-dialog v-model="props.dialogVisible" :before-close="handleClose" :show-close="true" align-center
      class="view_receipt_modal center_heading">
      <template #header class="center_align">
        <div>
          <h4>{{ dynamicContent.name }}</h4>
          <p class="text-center">
            review and send the invoice to the distributor
          </p>
        </div>
      </template>
      <el-row class="vr_info d-flex justify-content-between px-3">
        <el-col :xs="6" :sm="6" :md="4" :lg="4">
          <p>
            <span>Invoice number</span>
            #{{ dynamicContent.orderNumber }}
          </p>
        </el-col>

        <el-col :xs="6" :sm="6" :md="4" :lg="4">
          <p>
            <span>Invoice date</span>
            {{ dynamicContent.orderDate }}
          </p>
        </el-col>

        <el-col :xs="6" :sm="6" :md="6" :lg="6">
          <p>
            <span> Billed to: {{ dynamicContent.billedTo.name }} </span>
            {{ dynamicContent.billedTo.address }}
          </p>
        </el-col>
      </el-row>
      <div class="vr_table">
        <el-table :data="dynamicContent.tableData" :summary-method="getSummaries" show-summary>
          <el-table-column prop="item" width="350" label="ITEM" />
          <el-table-column prop="quantity" label="QUANTITY" />
          <el-table-column prop="price" label="PRODUCT/PRICE" />
          <el-table-column prop="total" label="TOTAL" />
        </el-table>
        <!-- <p>
          Payment type:<span>{{ dynamicContent.paymentType }}</span>
        </p> -->
      </div>

      <template #footer>
        <el-row>
          <el-col :xs="24" :sm="24" :md="10" :lg="10">
            <div class="vr_f_info">
              <h4>Thank you!</h4>
              <p>
                If you encounter any issues related to the invoice you can
                contact us at:
              </p>
              <h5>email:<span>support@nova.com</span></h5>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="14" :lg="14">
            <div class="vr_action">
              <button class="btn text-primary" @click="handleEditInvoice">
                Edit invoice
              </button>

              <button class="btn btn_email" @click="handleSendEmail">
                <i class="ri-mail-line"></i>
                Send as Email
              </button>

              <button class="btn btn-primary" @click="generatePDF">
                <i class="ri-download-2-line"></i>
                Download
              </button>
            </div>
          </el-col>
        </el-row>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import Newgas from "@/assets/svg/newgas.png";
import * as pdfMake from "pdfmake/build/pdfmake";
import 'pdfmake/build/vfs_fonts';
// import * as pdfFonts from "pdfmake/build/vfs_fonts";
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits();

// Define your dynamic content
const dynamicContent = {
  name: "Assigned zone successfully !",
  orderNumber: "41233",
  orderID: "101",
  orderDate: "2023/12/15",
  billedFrom: {
    name: "Derrick Graham",
    address: "Agbogba-as, hongman road,\nGhana Northern zone",
  },
  billedTo: {
    name: "Yaw Graham",
    address: "Agbogba-as, hongman road,\nGhana Northern zone",
  },
  tableData: [
    {
      item: "3kg Steel cylinder",
      quantity: "100",
      price: " 25",
      total: " 2500",
    },
    {
      item: "6kg Steel cylinder",
      quantity: "200",
      price: " 75",
      total: " 2300",
    },
    {
      item: "12kg Steel cylinder",
      quantity: "250",
      price: " 115",
      total: " 3523",
    },
    {
      item: "6kg Steel cylinder",
      quantity: "300",
      price: " 125",
      total: " 3523",
    },
    {
      item: "12kg Steel cylinder",
      quantity: "300",
      price: " 55",
      total: " 3523",
    },
    {
      item: "Table top burners(2burners)",
      quantity: "100",
      price: " 175",
      total: " 3523",
    },
    {
      item: "Houses",
      quantity: "100",
      price: " 95",
      total: " 3523"
    },
    {
      item: "Regulators",
      quantity: "101",
      price: " 35",
      total: " 3523",
    },
    // Add more dummy data rows as needed
  ],
  paymentType: "Bank card",
};


//convert image into base6
const loadImageAndConvertToDataUrl = async (imagePath) => {
  try {
    const response = await fetch(imagePath);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error loading image:", error);
    return null;
  }
};

//generate pdf function
const generatePDF = async () => {
  const pdfStyles = {
    header: {
      fontSize: "15",
      bold: true,
      margin: [0, 0, 0, 5],
    },
    tableHeader: {
      fontSize: "11",
      lineHeight: "1.5",
      fillColor: "#eff1fc",
      color: "#333",
      margin: [5, 5, 0, 0],
    },
    tableBody: {
      fontSize: "11",
      lineHeight: "1.5",
      color: "#333",
      margin: [5, 5, 0, 0],
    },
    table_footer: {
      fontSize: "11",
      lineHeight: "1.5",
      fillColor: "#eff1fc",
      color: "#333",
      margin: [5, 5, 0, 0],
    },
    infoLabel: {
      margin: [0, 10, 0, 30],
      fontSize: "10",
      color: "#666f80",
    },
    thankYou: {
      margin: [0,30, 0, 10],
      fontSize: "15",
      bold: true,
      color: "#333",
    },
    contactInfoLabel: {
      fontSize: "10",
      lineHeight: "1.3",
      color: "#666f80",
    },
    email_label: {
      fontSize: "10",
      lineHeight: "1.3",
      color: "#333",
    },
  };
  const logoImageDataUrl = await loadImageAndConvertToDataUrl(Newgas);

  // Check if the image loaded successfully
  if (!logoImageDataUrl) {
    console.error("Image loading failed.");
    return;
  }

  // billingContent
  const billingContent = [
    {
      columns: [
        {
          width: "70%",
          stack: [
            {
              text: `Invoice for ${dynamicContent.name}`,
              style: "header",
            },
            {
              text: `Invoice number: ${dynamicContent.orderNumber}`,
              fontSize: "11",
              lineHeight: "1.3",
            },
            {
              text: `Order Id: ${dynamicContent.orderID}`,
              fontSize: "11",
              lineHeight: "1.3",
            },
            {
              text: `Order Date: ${dynamicContent.orderDate}`,
              fontSize: "11",
              lineHeight: "1.3",
            },
          ],
        },
        {
          width: "30%",
          image: logoImageDataUrl, // Replace with the path to your logo image
          alignment: "right",
          fit: [60, 80],
        },
      ],
      margin: [0, 0, 0, 20],
    },

    {
      columns: [
        {
          width: "*",
          stack: [
            {
              text: `Billed from: ${dynamicContent.billedFrom.name}`,
              fontSize: "11",
              lineHeight: "1.3",
              bold: true,
            },
            {
              text: `${dynamicContent.orderDate}`,
              fontSize: "11",
              lineHeight: "1.3",
            },
          ],
        },
        {
          width: "*",
          stack: [
            {
              text: `Billed To: ${dynamicContent.billedTo.name}`,
              fontSize: "11",
              lineHeight: "1.3",
              bold: true,
            },
            {
              text: dynamicContent.billedTo.address,
              fontSize: "11",
              lineHeight: "1.3",
              width: "*",
            },
          ],
        },
      ],
      margin: [0, 0, 0, 20],
    },
    {
      table: {
        widths: ["55%", "*", "*", "*"],
        body: [
          [
            { text: "Item", style: "tableHeader" },
            { text: "Quantity", style: "tableHeader" },
            { text: "Price", style: "tableHeader" },
            { text: "Total", style: "tableHeader" },
          ],
          ...dynamicContent.tableData.map((item) => [
            { text: item.item, style: "tableBody" },
            { text: item.quantity, style: "tableBody" },
            { text: item.price, style: "tableBody" },
            { text: item.total, style: "tableBody" },
          ]),
        ],
      },
      layout: "lightHorizontalLines",
    },
    {
      columns: [
        {
          table: {
            widths: ["55%", "*", "*", "20%"],
            body: [
              [
                { text: "Total", style: "table_footer" },
                {
                  text: `${dynamicContent.tableData
                    .reduce(
                      (total, item) => total + parseFloat(item.quantity),
                      0
                    )
                    .toString()
                    .padStart(2, "0")}`, // Add '0' prefix if less than 10
                  style: "table_footer",
                },
                { text: "", style: "table_footer" },
                {
                  text: `GHs ${dynamicContent.tableData
                    .reduce((total, item) => total + parseFloat(item.total), 0)
                    .toString()
                    .padStart(2, "0")}`,
                  style: "table_footer",
                },
              ],
            ],
          },
          layout: "noBorders",
        },
      ],
    },
    // {
    //   text: `Payment Type: ${dynamicContent.paymentType}`,
    //   style: "infoLabel",
    // },
    {
      text: "Thank you!",
      style: "thankYou",
    },
    {
      text: "If you encounter any issues related to the invoice, you can contact us at:",
      style: "contactInfoLabel",
    },
    {
      text: "email: support@nova.com",
      style: "email_label",
    },
  ];
  const pdfDefinition = {
    content: billingContent,
    styles: pdfStyles,
  };

  const pdfDoc = await pdfMake.createPdf(pdfDefinition);
  pdfDoc.open();

  emit("handleReceiptClose");
};

// getSummaries
const getSummaries = (param) => {
  const { columns, data } = param;
  const sums = [];

  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = "Total";
      return;
    }
    const values = data.map((item) => Number(item.total));

    if (!values.every((value) => Number.isNaN(value))) {
      const sum = values.reduce((prev, curr) => {
        const value = Number(curr);
        if (!isNaN(value)) {
          return prev + value;
        } else {
          return prev;
        }
      }, 0);

      const formattedSum = sum < 10 ? "0" + sum.toString() : sum.toString();
      sums[3] = "GHs " + formattedSum;
      // sums[1] = formattedSum;
    }
  });

  return sums;
};

// handleEditInvoice
const handleEditInvoice = () => {
  console.log("Edit Invoice");
};

// handleClose
const handleClose = (done) => {
  emit("handleReceiptClose");
};

// handleSendEmail
const handleSendEmail = () => {
  emit("handleSendReceiptEmail");
};

onMounted(() => {
  console.log("receipt popup");
});
</script>

<style scoped lang="scss">
.view_receipt_modal.el-dialog.is-align-center .el-dialog__body .vr_table {
  max-width: 100%;
  max-height: 300px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ddd
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
}
</style>
