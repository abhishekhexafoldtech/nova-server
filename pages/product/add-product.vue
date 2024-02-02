<template>
  <section  v-loading="loading" class="edit_mang_wrap">
    <div class="mang_inner add_admin pb-1 mb-4">
      <div class="mang_title">
        <h3>Product</h3>
        <p>Add details of product.</p>
      </div>
      <el-form
        label-position="top"
        label-width="100px"
        :model="formData"
        :rules="formValidationRules"
        ref="formRef"
        @submit.prevent=""
        v-if="formData"
      >
        <el-row :gutter="50">
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="fieldrow">
              <el-form-item label="Product Name" prop="name">
                <el-input
                  v-model="formData.name"
                  placeholder="Product Name"
                />
              </el-form-item>
            </div>
            <div class="fieldrow">
              <el-form-item
                label="Product Subcategory"
                prop="product_subcategory"
              >
                <el-select
                  v-model="formData.subcategory"
                  filterable
                  placeholder="Select Product Subcategory"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="fieldrow big_textarea">
              <el-form-item label="Description" prop="description">
                <el-input
                  v-model="formData.description"
                  type="textarea"
                  placeholder="Description"
                />
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="mang_inner add_admin">
      <div class="all_heading">
        <h4 class="page_heading m-0">List of product style</h4>
        <button type="button" class="btn btn-primary" @click="handleAddstyle()">
          <i class="ri-add-line"></i>Add Style
        </button>
      </div>
      <Table
        class="no_padding_table"
        :addButtonVisibility="false"
        :actionVisibility="true"
        :tableCheckBoxVisibility="true"
        :tableSearchVisibility="false"
        :export="false"
        :filter="false"
        :filterData="filterAllOrders"
        :refresh="false"
        :tableConfig="tableConfig"
        :tableData="listOfProducts"
        :tableQuery="listQuery"
        @view="handleView"
        @pagination="handlePagination()"
        @multipleSelection="handleMultipleSelection($event)"
        :heading-row-reverse="true"
      />

      <div class="perm_footer">
        <button class="btn btn-default" @click="handleCancel">Cancel</button>
        <button class="btn btn-primary" @click.prevent="handleSave" :disabled="saveShow">
          Save
        </button>
      </div>
    </div>
  </section>
</template>
<script setup>
import { reactive, ref, onMounted } from "vue";
import { nameRule, selectBoxRule } from "@/rules/all-rules";
import Table from "@/components/tables/Table.vue";
import { useRouter } from "vue-router";
import { flashNotification } from "@/composables/useNotification.js";
import { useNavStore } from "@/stores/NavStore";
import { AdminProduct, ProductSubCategory, ProductsByProductId } from "~/api/product/product";
const navStore = useNavStore();
const router = useRouter();
const formRef = ref(null);
const productId = ref("");
const saveShow = ref(true);
const loading = ref(false)
const listOfProducts = ref({
  items: []
});

//form data
const formData = reactive({
  name: ' ',
  category:"",
  // subcategory:"",
  description:""
});
const options = ref([
  
]);

const tableConfig = [
  {
    label: "Product",
    sortable: true,
    prop: "name",
  },
  {
    label: "Product Weight",
    sortable: true,
    prop: "weight",
  },
  {
    label: "Product Dimension",
    sortable: true,
    prop: "dimension",
  },
  {
    label: "Product Base Price",
    sortable: true,
    prop: "cost",
  },
  {
    label: "Product Discount Price",
    sortable: true,
    prop: "strikethrough_cost",
  },
  {
    label: "Discount in %",
    sortable: true,
    prop: "strikethrough_cost_in_percentage",
  },
];

//validation rules
const formValidationRules = reactive({
  name: nameRule("product name"),
  description: nameRule("description"),
  subcategory: selectBoxRule(""),
});

//call api with form data
const handleSave = () => {
  router.push("/product");
};

const handleCancel = () => {
  router?.push("/product");
};

function handleAddstyle(){
  if(!saveShow.value){
    let r = "add-style";
          router.push(`/product/${r}`);
          return 
  }
  handleCreate();
}
// Handle the creation of a new distributor
function handleCreate() {
  loading.value = true;
  if(formRef && formRef.value.validate){
    formRef?.value?.validate((valid) => {
      if(valid){
      /*
      Product sucategory is optional
      */
      // if(!formData.subcategory){
      //   flashNotification("warning","Please select a subcategory");
      //   return
      // };
      AdminProduct(formData)
      .then((res) => {
        // router.productId = res.data.id;
        sessionStorage.setItem("product",JSON.stringify(res.data.id));
        flashNotification("success", `${formData.name} details requested.`);
          let r = "add-style";
          router.push(`/product/${r}`);
      })
      .catch((err) => {
        loading.value = false;
        flashNotification("error","Something went wrong please try again later.")
        return;
      })
      .finally(() => {
        // do something
        });
    }else{
      flashNotification("warning","Please fill all the required details.");
      loading.value = false;
    }
  })
  }
};
onMounted(() => {
  navStore.setBreadCrumbs("Product / Add-product");
  let category  = (JSON.parse(sessionStorage.getItem("cat")))?.filter((e)=>{
    return e.state
  });
  if (category) {
    formData.category = category[0].id;
    ProductSubCategory({},"get","").then((res) => {
      res.data.items.map((el) => {
        if (el.category === formData.category) {
            options.value.push({
            value: el.id,
            label: el.sub_category,
          });
        }
      });
    });
  }
  const productStoredId = JSON.parse(sessionStorage.getItem("product"));
  if(productStoredId){
    productId.value = productStoredId;
    ProductsByProductId({},"get",productStoredId).then((res)=>{
      if(res.data.styles.length){  
        saveShow.value = false;
        res.data.styles.map((e,index)=>{
          listOfProducts.value.items[index] = {
            name: [
                    {
                        content: e.name || "-",
                        url: e.images[0].image_url
                    }
                ],
            weight: e.weight,
            dimension: e.dimension ? e.dimension : "-",
            cost: e.cost.cost,
            strikethrough_cost: e.cost.strikethrough_cost,
            strikethrough_cost_in_percentage: e.cost.strikethrough_cost_in_percentage
          };
        })
        // listOfProducts.value.items = [...res.data.styles];
      }
      if(res.status === 200){
        formData.name = res.data.name;
        formData.description = res.data.description;
        formData.subcategory = res.data.sub_category_id;
      }


      //
    }).catch((err)=>{
      saveShow.value = true;
    })
  }else{
  }
});


</script>

<style scoped lang="scss">
.edit_mang_wrap .mang_inner {
  min-height: auto;
}
.fieldrow {
  margin-bottom: 25px;
}
.all_heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  padding-bottom: 20px;
  .page_heading {
    padding-top: 10px;
  }
  button {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    padding: 8px 20px;
    padding-bottom: 6px;
    gap: 8px;
  }
}
.edit_mang_wrap .mang_inner .perm_footer {
  margin-top: 50px;

  button {
    height: 41px;
    padding: 8px;
  }
}
</style>


