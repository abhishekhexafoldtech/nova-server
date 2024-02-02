<template>
  <div>
    <el-dialog
      v-model="props.dialogVisible"
      :before-close="handleClose"
      :show-close="false"
      align-center
      class="view_receipt_modal"
    >
      <template #header>
        <div>
          <h4>Hi, {{ dynamicContent.name }}</h4>
          <p>Thanks for your order!</p>
        </div>
        <figure>
          <img :src="Newgas" alt="logo" />
        </figure>
      </template>
      <el-row class="vr_info">
        <el-col :xs="6" :sm="6" :md="4" :lg="4">
          <p>
            <span>Invoice number</span>
            #{{ dynamicContent.orderNumber }}
          </p>
        </el-col>
        <el-col :xs="6" :sm="6" :md="4" :lg="4">
          <p>
            <span>Order ID</span>
            {{ dynamicContent.orderID }}
          </p>
        </el-col>
        <el-col :xs="6" :sm="6" :md="4" :lg="4">
          <p>
            <span>Order date</span>
            {{ dynamicContent.orderDate }}
          </p>
        </el-col>
        <el-col :xs="6" :sm="6" :md="6" :lg="6">
          <p>
            <span> Billed from: {{ dynamicContent.billedFrom.name }} </span>
            {{ dynamicContent.billedFrom.address }}
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
        <el-table
          :data="dynamicContent.tableData"
          :summary-method="getSummaries"
          show-summary
        >
          <el-table-column prop="item" width="500" label="ITEM" />
          <el-table-column prop="quantity" label="QUANTITY" />
          <el-table-column prop="price" label="PRODUCT/PRICE" />
        </el-table>
        <p>
          Payment type:<span>{{ dynamicContent.paymentType }}</span>
        </p>
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
// import * as pdfFonts from "pdfmake/build/vfs_fonts";/
// pdfMake.vfs = pdfFonts.pdfMake.vfs;
import 'pdfmake/build/vfs_fonts';

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
  name: "Yaw Graham",
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
    { item: "3kg Steel cylinder", quantity: "01", price: " 50" },
    { item: "6kg Steel cylinder", quantity: "02", price: " 40" },
    { item: "6kg Steel cylinder", quantity: "01", price: " 30" },
    { item: "Delivery charge", quantity: "01", price: " 25" },
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
      margin: [0, 0, 0, 10],
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
  const billingContent = [
    {
      columns: [
        {
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
        widths: ["55%", "*", "*"],
        body: [
          [
            { text: "Item", style: "tableHeader" },
            { text: "Quantity", style: "tableHeader" },
            { text: "Price", style: "tableHeader" },
          ],
          ...dynamicContent.tableData.map((item) => [
            { text: item.item, style: "tableBody" },
            { text: item.quantity, style: "tableBody" },
            { text: item.price, style: "tableBody" },
          ]),
        ],
      },
      layout: "lightHorizontalLines",
    },
    {
      columns: [
        {
          table: {
            widths: ["55%", "*", "*"],
            body: [
              [
                { text: "Total", style: "table_footer" },
                {
                  text: ``, // Add '0' prefix if less than 10
                  style: "table_footer",
                },
                {
                  text: `GHs ${dynamicContent.tableData
                    .reduce((total, item) => total + parseFloat(item.price), 0)
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
    {
      text: `Payment Type: ${dynamicContent.paymentType}`,
      style: "infoLabel",
    },
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

const getSummaries = (param) => {
  const { columns, data } = param;
  const sums = [];

  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = "Total";
      return;
    }
    const values = data.map((item) => Number(item[column.property]));

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
      sums[2] = "GHs " + formattedSum;
      // sums[1] = formattedSum;
    }
  });

  return sums;
};

const handleClose = (done) => {
  emit("handleReceiptClose");
};
const handleSendEmail = () => {
  emit("handleSendReceiptEmail");
};
onMounted(() => {
  console.log("receipt popup");
});
</script>

<style scoped lang="scss"></style>
