<template>
  <div class="latest_order" >
    <div class="lo_header">
      <h3>Latest Order</h3>
      <ul>
        <li>Order placed:<span>{{(order?.created_at?.split("T")[0].split("-").join("/")) || "-"}}</span></li>
        <li>Order ID:<span>{{(order?.order_unique_number) || '-'}}</span></li>
      </ul>
    </div>
    <div class="lo_body" v-if="props.order">
      <div class="lo_item">  
        <div class="item_top">
          <p>
            Order delivered:<span>{{ (order?.delivery_status ? "Delivered" : "Pending") }}</span>
          </p>
          <button class="btn btn-primary" @click="viewRecept">
            View receipt
          </button>
        </div>
        <div class="item_main" v-if="order.order_items">
          <img :src="order?.order_items[0]?.thumbnail_image ? order.order_items[0].thumbnail_image : ''" alt="Product Image" @error="handleImageError(`latest_order`)"/>
          <div class="item_des">
            <h3>{{ (order?.order_items[0]?.style_name) || "-" }}</h3>
            <ul>
              <li>
                Diposit Cost:<span>{{ (order?.order_items[0]?.deposit) || "-" }}</span>
              </li>
              <li>
                Cost:<span>{{ (order?.order_items[0]?.gas_cost) || "-" }}</span>
              </li>
              <li>
                Quantity:<span>{{ (order?.order_items[0]?.quantity) || "-" }}</span>
              </li>
            </ul>
            <span
              class="status"
              :class="
                order?.delivery_status ? 'bg-success' : 'bg-danger'
              "
              >{{ order?.delivery_status ? "Delevered" : "Pending" }}</span
            >
          </div>
          <div class="item_total">
            <button
              class="btn"
              v-if="order?.delivery_status === 'delivered'"
              @click="exchange"
            >
              Exchange
            </button>
            <p>Order Total<span>GHs {{(order?.order_items[0]?.total_cost) || "-"}}</span></p>
          </div>
        </div>
      </div>
    </div>
    <ViewReceipt
        :dialogVisible="viewReceiptVisibility"
        @handleSendReceiptEmail="handleSendReceiptEmail"
        @handleReceiptClose="handleReceiptClose"
      />
  </div>
</template>
<script setup>
import gas from "@/assets/img/card-visa.jpg";
import ViewReceipt from "@/components/Dialog/ViewReceipt.vue";

const props = defineProps(
  {
    order : {
      type: Array,
      default: [],
      required: true
    }
  }
)

function handleImageError(data){
  if(data === 'latest_order'){
    props.order.order_items[0].thumbnail_image = "https://via.placeholder.com/300x200"
  }
}

const viewReceiptVisibility=ref(false)

//viewRecept
const viewRecept = () => {
 viewReceiptVisibility.value=true;
};

// handleSendReceiptEmail
const handleSendReceiptEmail=()=>{

}

// handleReceiptClose
const handleReceiptClose=()=>{
  viewReceiptVisibility.value=false;

}

//exchange
const exchange = () => {
  console.log("exchange");
};




</script>
