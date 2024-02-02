<template>
  <div class="container-area">
    <div class="cd_header">
      <div class="header_inner">
        <!-- <img src="@/assets/img/product_img.png" alt="Profile" /> -->
        <div class="h_right">
          <div class="h_name">
            <h4>{{ styles?.items?.name }}</h4>
          </div>
          <div class="h_info">
            <div>
              <p>{{ styles?.items?.category_name}}</p>
            </div>
          </div>  
        </div>
      </div>
      <div class="cd_header_tabs">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="Product Details" name="p_detail"></el-tab-pane>
          <el-tab-pane label="Product Style" name="p_style"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!-- conditional rendering -->
    <h4 class="page_heading mt-4 mb-3">{{ tableName }}</h4>
    <div>
      <ProductDetails
        v-if="activeName === 'p_detail'"
        :details="styles.items"
      />
      <ProductStyle v-if="activeName === 'p_style'" :data="styles.items.styles" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { useRoute } from "vue-router";
import ProductStyle from "@/components/products/ProductStyle.vue";
import ProductDetails from "@/components/products/ProductDetails.vue";
import { flashNotification } from "@/composables/useNotification";
import { ProductCategory, ProductSubCategory, ProductsByProductId } from "~/api/product/product";

const activeName = ref("p_detail");

const styles = reactive({
  items: {},
});
const route = useRoute();
//change component afetr calling
const handleClick = (tab, event) => {
  activeName.value = tab.props.name;
};



onMounted(async() => {
  try{
    const res =await ProductsByProductId({},"get",route.params.slug);
    styles.items = res.data;
    const category_details = await ProductCategory({},"get",styles.items.category_id);
    styles.items.category_name = category_details.data.name;
    if(styles.items.sub_category_id){
      const sub_details = await ProductSubCategory({},"get",styles.items.sub_category_id);
      styles.items.sub_category_name = sub_details.data.sub_category;
    }
  }catch(err){
    flashNotification("warning","unable to fetch some data, please try again later.")
  }
});
</script>
<style scoped>
.cd_header .header_inner img {
  object-fit: contain;
  background-color: #97e0a9;
}
</style>
