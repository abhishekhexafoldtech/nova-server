<template>
  <section class="container-area">
    <div>
      <el-skeleton :loading="loading" effect="pulse" animation="wave" :rows="16"
        :width="['100%', '80%', '60%', '40%', '20%']" :class="{ 'custom-skeleton-class': true }">
      </el-skeleton>
    </div>

    <div v-if="adminDetailsData">
      <div class="od_box">
        <h4>Orders</h4>
        <h5>{{ adminDetailsData[0].order_number }}</h5>
        <p>
          Delivery status:
          <!-- <span class="text-dark">{{ router.order_details.delivery_status === 'pending' ? 'Delivery pending' :
          'Delivered' }}</span> -->
          <span class="text-dark">{{
            adminDetailsData[0].delivery_status
          }}</span>
        </p>
      </div>
      <el-row :gutter="30">
        <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
          <div class="ods_box info_box">
            <!-- {{ JSON.stringify(router.order_details) }} -->
            <ul class="info_box_left">
              <li>
                Order placed:<span>{{
                  format(
                    parseISO(adminDetailsData[0].created_date),
                    "yyyy/mm/dd"
                  )
                }}</span>
              </li>
              <li>
                Order ID:<span>{{ adminDetailsData[0].order_number }}</span>
              </li>
            </ul>
            <ul class="info_box_right">
              <li>
                Order Total:<span>{{ adminDetailsData[0].order_total }}</span>
              </li>
              <li>
                <button @click="viewRecept" class="btn btn-primary">
                  View Receipt
                </button>
              </li>
            </ul>
          </div>

          <div class="ods_box latest_order">
            <div class="lo_body">
              <h5>Products</h5>
              <div class="lo_item" v-for="(item, index) in adminDetailsData[0].product_details" :key="index">
                <!-- <div class="item_top">
                <div>
                  <p>
                    Order delivered:<span>{{ item.order_delivered }}</span>
                  </p>
                  <p v-if="adminDetailsData[0].delivery_status === 'pending'">
                    Estimated delivery:<span>{{
                      "asdasd"
                    }}</span>
                  </p>
                </div> 
              </div> -->
                <!-- cards -->
                <div class="item_main">
                  <img
                    src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg"
                    alt="Product Image" />
                  <div class="item_des">
                    <h3>{{ item.name }}</h3>
                    <ul>
                      <li>
                        Deposit Cost:<span>GHs {{ item.deposit }}</span>
                      </li>
                      <li>
                        Cost:<span>GHs {{ item.gas_cost }}</span>
                      </li>
                      <li>
                        Quantity:<span>{{ item.quantity }}</span>
                      </li>
                    </ul>
                    <!-- <span
                    class="status"
                    :class="
                      adminDetailsData[0].delivery_status == 'pending'
                        ? 'bg-danger'
                        : 'bg-success'
                    "
                    >{{ adminDetailsData[0].delivery_status }}</span
                  > -->
                  </div>
                  <div class="item_total">
                    <!-- <h1> {{ item }}h</h1> -->
                    <button class="btn" v-if="adminDetailsData[0].delivery_status == 'delivered'" @click="exchange">
                      Exchange
                    </button>
                    <p>
                      Total: <span>GHs {{ item.total }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
          <!-- Assign order to distributor -->
          <!-- v-if="router.order_details.delivery_status === 'pending'" -->
          <div class="ods_box">
            <h4 class="ods_title">Assign order to distributor</h4>
            <div class="ods_select">
              <el-select placeholder="Plese select role">
                <el-option v-for="item in roles" :key="item.value" :label="item.name" :value="item.id" />
              </el-select>
              <button class="btn btn-primary" @click="handleAssign">
                Assign
              </button>
            </div>
          </div>

          <!-- Assigned Distributor -->
          <!-- v-if="router.order_details.delivery_status === 'Delivered'" -->
          <div class="ods_box">
            <h4 class="ods_title">Assigned Distributor</h4>
            <ul class="ods_ul">
              <li>
                Name:<span>{{ customerDetails.name }}</span>
              </li>
              <li>
                Zone:<span>{{ customerDetails.zone }}</span>
              </li>
              <li>
                Phone number:<span>{{ customerDetails.phone_number }}</span>
              </li>
              <li>
                Email:<span>{{ customerDetails.email }}</span>
              </li>
            </ul>
          </div>

          <!-- Customer details -->
          <div class="ods_box">
            <h4 class="ods_title">Customer details</h4>
            <ul class="ods_ul">
              <li>
                Name:<span>{{
                  `${adminDetailsData[0].customer_details[0].first_name}
                                  ${adminDetailsData[0].customer_details[0].last_name}`
                }}</span>
              </li>
              <li>
                Zone:<span>{{
                  adminDetailsData[0].customer_details[0].zone_name
                }}</span>
              </li>
              <li>
                Phone number:<span>{{
                  adminDetailsData[0].customer_details[0].phone
                }}</span>
              </li>
              <li>
                Email:<span>{{
                  adminDetailsData[0].customer_details[0].email
                }}</span>
              </li>
            </ul>
          </div>

          <!-- Delivery agent -->
          <!-- v-if="router.order_details.delivery_status === 'Delivered'" -->
          <div class="ods_box">
            <h4 class="ods_title">Delivery agent</h4>
            <ul class="ods_ul">
              <li>
                Name:<span>{{ customerDetails.name }}</span>
              </li>
              <li>
                Zone:<span>{{ customerDetails.zone }}</span>
              </li>
              <li>
                Phone number:<span>{{ customerDetails.phone_number }}</span>
              </li>
              <li>
                Email:<span>{{ customerDetails.email }}</span>
              </li>
            </ul>
          </div>
          <div class="ods_box">
            <h4 class="ods_title">Delivery location</h4>
            <ul class="ods_ul">
              <li><span class="m-0">Atomic GS-0757-3391</span></li>
              <li>
                <span class="m-0">Agbogba-ashongman road, Ghana, Northern zone</span>
              </li>
            </ul>
          </div>

          <!--  Payment details -->
          <div class="ods_box">
            <h4 class="ods_title with_status">
              Payment details
              <!-- <span class="pay_status">{{ router.order_details.payment_status }}</span> -->
            </h4>
            <ul class="ods_ul">
              <span class="float-end" v-if="adminDetailsData[0].payment_details[0].payment_status == 'paid'">Paid</span>
              <span class="float-end"
                v-if="adminDetailsData[0].payment_details[0].payment_status == 'unpaid'">Unpaid</span>
              <li>
                Payment type:<span>{{
                  adminDetailsData[0].payment_details[0].pyment_type
                }}</span>
              </li>
              <li>
                Billed to:<span>{{
                  adminDetailsData[0].payment_details[0].billed_to
                }}</span>
              </li>
              <li>
                Billed from:<span>{{
                  adminDetailsData[0].payment_details[0].billed_from
                }}</span>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>

      <!-- Receipt Dialog  -->
      <!-- <OrderBillReceipt :dialogVisible="viewReceiptVisibility" @handleSendReceiptEmail="handleSendReceiptEmail"
        @handleReceiptClose="handleReceiptClose" /> -->
    </div>
  </section>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { format, parseISO } from "date-fns";
import { useNavStore } from "@/stores/NavStore";
import { getAdminDetails } from "@/api/orders/AdminDetails.js";
// import OrderBillReceipt from "@/components/orders/OrderBillReceipt.vue";
import { useRouter } from "vue-router";
const navStore = useNavStore();

let loading = ref(false);
const orderId = ref("");
const adminDetailsData = ref(null);
const router = useRouter();
const viewReceiptVisibility = ref(false);

// roles
const roles = ref([]);

//customer details
const customerDetails = reactive({
  name: "Derrick Nwafor",
  zone: "Northern",
  phone_number: "9125486954",
  email: "derricknwafor@gmail.com",
});

//viewRecept
const viewRecept = () => {
  console.log("viewRecept");
  viewReceiptVisibility.value = true;
};

// handleReceiptClose
function handleReceiptClose() {
  viewReceiptVisibility.value = false;
}

// handleSendReceiptEmail
function handleSendReceiptEmail() {
  viewReceiptVisibility.value = false;
  flashNotification("success", "Email sented.");
}

// handleAssign
const handleAssign = () => {
  console.log("handleAssign");
};

const exchange = () => {
  console.log("exchange");
};

//get admin details
async function adminDetails() {
  // get admin details
  loading.value = true;
  await getAdminDetails(orderId.value)
    .then((res) => {
      if (res.status == 200) {
        loading.value = false;
        adminDetailsData.value = res.data.data;
      }
    })
    .catch((error) => {
      // loading.value = false;
      if (error.message == "Request aborted") {
        flashNotification("error", "Request aborted.");
      } else if (error.response.status === 422) {
        flashNotification("error", "Validation Error.");
      } else if (error.response.status === 400) {
        if (error.response.data.error == "ValidationException") {
          flashNotification("error", "Validation Error.");
        } else {
          flashNotification("error", "Signature has expired.");
        }
      } else {
        flashNotification("error", "Unable to fetch order data.");
      }
    });
}

onMounted(async () => {
  navStore.setBreadCrumbs("Orders / Order details");
  orderId.value = router.currentRoute.value.params.orderdetails;
  adminDetails();
});

</script>
<style scoped lang="scss">
/**** Styles for Order Details ****/
.od_box {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 30px;
  position: relative;
  width: 100%;
  max-width: 295px;

  h4 {
    color: var(--black);
    font-family: Montserrat;
    font-size: 20px;
    font-weight: 600;
    line-height: 27.4px;
    margin: 0;
    width: 100%;
    max-width: 200px;
  }

  h5,
  p,
  .pay_status {
    color: var(--black);
    font-family: Montserrat;
    font-size: 16px;
    font-weight: 400;
    line-height: 21.92px;
    margin: 0;
  }

  p {
    color: #8392ab;

    span {
      display: inline-block;
      font-weight: 500;
      color: var(--black);
      margin-left: 5px;
    }
  }

  .pay_status {
    position: absolute;
    top: 4px;
    right: 0;
    color: #0a7b37;
    font-size: 15px;
    font-weight: 600;
  }
}

.ods_box {
  padding: 20px 25px;
  padding-top: 17px;
  background-color: var(--white);
  border-radius: 12px;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-width: 100%;
  margin-bottom: 15px;

  &:last-child {
    margin: 0;
  }

  .ods_title {
    color: var(--black);
    font-size: 20px;
    font-weight: 600;
    line-height: 32.5px;
    margin: 0;
    margin-bottom: 10px;

    &.with_status {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .pay_status {
        color: #0a7b37;
        font-family: Montserrat;
        font-size: 15px;
        font-weight: 700;
        line-height: 30.14px;
        text-transform: uppercase;
        letter-spacing: 0px;
      }
    }
  }

  .ods_ul {
    padding-inline-start: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;

    li {
      display: block;
      color: #7b809a;
      font-size: 14px;
      font-weight: 400;
      line-height: 21px;

      span {
        display: inline-block;
        margin-left: 5px;
        font-weight: 500;
        color: var(--black);
      }
    }
  }

  .ods_select {
    display: flex;
    align-items: center;
    gap: 25px;

    button {
      margin: 0;
      height: 40px;
      width: 105px;
      padding: 6px 10px;
    }
  }
}

.info_box {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .info_box_left {
    padding-inline-start: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;

    li {
      display: block;
      color: #7b809a;
      font-size: 14px;
      font-weight: 400;
      line-height: 21px;

      span {
        display: inline-block;
        font-weight: 500;
        color: var(--black);
        margin-left: 5px;
      }
    }
  }

  .info_box_right {
    padding-inline-start: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: right;

    li {
      display: block;
      color: #7b809a;
      font-size: 18px;
      font-weight: 400;
      line-height: 27px;

      span {
        display: inline-block;
        font-weight: 500;
        color: var(--black);
        margin-left: 5px;
      }

      button {
        margin: 0;
        width: 142px;
        height: 30px;
        font-size: 12px;
        font-weight: 700;
        padding: 6px 32px;
        border-radius: 8px;
        letter-spacing: 0;
      }
    }
  }
}

@media (max-width: 992px) {
  .el-row {
    gap: 15px;
  }
}

@media (max-width: 768px) {
  .info_box {
    flex-wrap: wrap;
    gap: 15px;

    .info_box_right {
      text-align: left;
    }
  }
}

.lo_body {
  h5 {
    color: var(--black);
    font-size: 20px;
    font-weight: 600;
    line-height: 32.5px;
    margin: 0;
    margin-bottom: 15px;
  }
}

.latest_order .lo_body .lo_item .item_main .item_total p span {
  display: inline-block;
}
</style>
