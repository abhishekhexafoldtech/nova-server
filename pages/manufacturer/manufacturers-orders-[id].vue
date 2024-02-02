<template>
  <div class="container-area">
    <div class="od_box">
      <h4>Orders</h4>
      <h5>{{ orderId.hash }}</h5>
      <p>
        Delivery status:
        <span class="text-dark">Delivery pending</span>
      </p>
      <span class="pay_status">PAID</span>
    </div>

    <el-row :gutter="30">
      <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
        <div class="ods_box info_box">
          <ul class="info_box_left">
            <li>Order placed:<span>2023/12/28</span></li>
            <li>Order ID:<span>{{ orderId.hash }}</span></li>
          </ul>
          <ul class="info_box_right">
            <li>Order Total:<span>75</span></li>
            <li><button @click="viewRecept" class="btn btn-primary">View Receipt</button></li>
          </ul>
        </div>

        <div class="ods_box latest_order">
          <div class="lo_body">
            <h5>Products</h5>
            <div class="lo_item" v-for="(item, index) in orders" :key="index">
              <div class="item_top">
                <div>
                  <p>
                    Order delivered:<span>{{ item.order_delivered }}</span>
                  </p>
                  <p v-if="item.order_status === 'pending'">
                    Estimated delivery:<span>{{
                      item.estimated_delivery
                    }}</span>
                  </p>
                </div>
              </div>
              <!-- cards -->
              <div class="item_main">
                <img :src="item.cylinder_img" alt="Product Image" />
                <div class="item_des">
                  <h3>{{ item.cylinder_type }}</h3>
                  <ul>
                    <li>
                      Diposit Cost:<span>{{ item.deposit_cost }}</span>
                    </li>
                    <li>
                      Cost:<span>{{ item.gas_cost }}</span>
                    </li>
                    <li>
                      Quantity:<span>{{ item.quantity }}</span>
                    </li>
                  </ul>
                  <span class="status" :class="item.order_status === 'pending'
                    ? 'bg-danger'
                    : 'bg-success'
                    ">{{ item.order_status }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
        <div class="ods_box">
          <h4 class="ods_title">Payment details</h4>
          <ul class="ods_ul">
            <li>Payment type:<span>{{ paymentDetails.payment_type }}</span></li>
            <li>Billed to:<span>{{ paymentDetails.billed_to }}</span></li>
            <li>Billed from:<span>{{ paymentDetails.billed_from }}</span></li>
          </ul>
        </div>
      </el-col>
    </el-row>

    <!-- Receipt Dialog  -->
    <OrderBillReceipt :dialogVisible="viewReceiptVisibility" @handleSendReceiptEmail="handleSendReceiptEmail"
      @handleReceiptClose="handleReceiptClose" />
  </div>
</template>
<script setup>
import { ref } from "vue"
import { useNavStore } from "@/stores/NavStore";
const navStore = useNavStore();
import OrderBillReceipt from "@/components/orders/OrderBillReceipt";
import gas from "@/assets/img/card-visa.jpg";
import { useRoute } from 'vue-router'

const orderId = useRoute()

const viewReceiptVisibility = ref(false)

// roles
const roles = ref([])

//customer details
const customerDetails = reactive({
  name: "Derrick Nwafor",
  zone: "Northern",
  phone_number: "9125486954",
  email: "derricknwafor@gmail.com"
})

//payment details
const paymentDetails = reactive({
  payment_type: "Bank card",
  billed_to: "Yaw graham",
  billed_from: "Derrick nwafor"
})

// orders
const orders = ref([
  {
    order_placed: "2023/02/12",
    estimated_delivery: "2023/02/12",
    order_id: "1101",
    order_delivered: "pending",
    cylinder_type: "6kg Steel cylinder",
    cylinder_img: gas,
    deposit_cost: "GHs 35",
    gas_cost: "GHs 40",
    quantity: "1",
    order_total: "GHs 75",
    order_status: "pending",
  },
  {
    order_placed: "2023/02/12",
    estimated_delivery: "2023/02/12",
    order_id: "1101",
    order_delivered: "pending",
    cylinder_type: "6kg Steel cylinder",
    cylinder_img: gas,
    deposit_cost: "GHs 35",
    gas_cost: "GHs 40",
    quantity: "1",
    order_total: "GHs 75",
    order_status: "pending",
  },
  {
    order_placed: "2023/03/12",
    order_id: "1101",
    order_delivered: "2023/01/12",
    cylinder_type: "3kg Steel cylinder",
    cylinder_img: gas,
    deposit_cost: "GHs 35",
    gas_cost: "GHs 40",
    quantity: "1",
    order_total: "GHs 75",
    order_status: "delivered",
  },
]);

//viewRecept
const viewRecept = () => {
  console.log("viewRecept");
  viewReceiptVisibility.value = true
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


onMounted(() => {
  navStore.setBreadCrumbs('Manufacturer / Orders / Details')
})



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
    color: #8392AB;

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
    color: #0A7B37;
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
  }

  .ods_ul {
    padding-inline-start: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;

    li {
      display: block;
      color: #7B809A;
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
      color: #7B809A;
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
      color: #7B809A;
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
  