<template>
  <div class="container-area">
    <div class="all_heading pt-0">
      <h4 class="page_heading m-0">Product Settings</h4>
      <button
        type="button"
        class="btn btn-primary"
        @click="openAddCategoryPopup"
      >
        <i class="ri-add-line"></i>Add Product Category & Subcategory
      </button>
    </div>
    <div class="pr_style_table">
      <Table
        :table-config="tableConfig"
        :table-data="tableData"
        :tableSearchVisibility="false"
        :table-loading-status="loading"
        @edit="handleEditProduct"
        @delete="handleDeleteCategory"
      />
    </div>
    <DialogStatus
      :dialogVisible="showPopup"
      dialogTitle="Add product category & subcategory"
      @dialogVisible="dialogVisible"
      class="add_product_category_subcategory"
    >
      <template #default>
        <el-form label-position="top" @submit.prevent="">
          <div class="form_inner">
            <div class="fieldrow">
              <el-form-item
                v-if="productDetails"
                label="Product category"
                prop="category"
              >
                <el-input
                  class="form_input"
                  v-model="productDetails.category"
                  placeholder="Enter product category"
                  @keydown="handleAddInputBox"
                />
              </el-form-item>       
            </div>
            <div class="fieldrow with_btn m-0">
              <el-form-item
                v-if="productDetails"
                label="Product subcategory"
                prop="subCategory"
              >
                <el-input
                  class="form_input"
                  v-model="productDetails.subCategory"
                  placeholder="Enter product category"
                />
                <button @click="addSubCategory">
                  <i class="ri-add-line"></i>Add
                </button>
              </el-form-item>
            </div>
            <ul class="added_category">
              <li
                v-for="(item, index) in productDetails?.subCategoryList"
                :key="index"
              >
                {{ item }}
                <button @click="handleRemoveSubCategory(item, index)">
                  <i class="ri-close-line"></i>
                </button>
              </li>
            </ul>
          </div>
          <div class="pc_footer">
            <button class="btn btn-default" @click.prevent="dialogVisible">
              Cancel
            </button>
            <button class="btn btn-primary" @click.prevent="handleSaveProduct">
              Save
            </button>
          </div>
        </el-form>
      </template>
    </DialogStatus>
  </div>
</template>

<script setup>
import Table from "@/components/tables/Table.vue";
import { useNavStore } from "@/stores/NavStore";
import DialogStatus from "@/components/Dialog/Status.vue";
import {
  ProductCategory,
  ProductSubCategory,
} from "@/api/product/product";
import {
  ref,
  reactive,
  onMounted,

} from "vue"
const navStore = useNavStore();
const showPopup = ref(false);
const loading = ref(false)
const productDetails = reactive({
  category: "",
  subCategory: "",
  subCategoryList: [],
  edit: false,
  categoryId: "",
  subCategoryIdList: [],
});
const tableConfig = reactive([
  {
    label: "Product",
    prop: "product",
    sortable: true,
  },
]);
const tableData = reactive({
  items: [],
});

// open popup
function openAddCategoryPopup() {
  showPopup.value = true;
};
// close dialog visible
// on closing the dialog box reseting the all data parameters to intial state.
function dialogVisible(data) {
  handleClearProductDetails();
};
// get all the categories
function getAllCategories() {
  ProductCategory({},"get","")
    .then((res) => {
      sessionStorage.setItem("cat", JSON.stringify(res.data.items));
      arrangeData();
      getSubCategories();
      loading.value = false;
    })
    .catch((err) => {
      flashNotification(
        "warning",
        "Something went wrong please wait for sometime or try again later."
      );
      loading.value = false;
    })
    .finally(() => {
      // do something
    });
};
// get all the subcategoriees
function getSubCategories() {
  let data = JSON.parse(sessionStorage.getItem("cat"));
  ProductSubCategory({},"get","")
    .then((res) => {
      data.map((cat) => {
        cat.children = [];
        res.data.items.map((sub) => {
          if (sub.category === cat.id) {
            cat.children.push(sub);
          }
        });
      });
      sessionStorage.setItem("cat", JSON.stringify(data));
      arrangeData();
    })
    .catch((err) => {
      flashNotification(
        "warning",
        "Something went wrong please wait for sometime or try again later."
      );
    });
};
// post or put product category , post subcategory(non-editmode)
async function handleSaveProduct() {
  if (!productDetails.category.length) {
    flashNotification("warning", "Please fill  category details.");
    return;
  }
  // adding a product category in database
  try {
    const postCat = await ProductCategory(
      {
        name: productDetails.category,
      },
      productDetails.edit ? "put" : "post",
      productDetails.edit ? productDetails.categoryId : ""
    );
    flashNotification("success", "Product information is saved.");
    if (postCat.data && !productDetails.edit) {
      productDetails.subCategoryList.map(async (el) => {
        try {
          // adding product subcategories for the first time
          const postSub = await ProductSubCategory(
            {
              category: postCat.data.id,
              sub_category: el,
              is_active: true,
            },
            "post",
            ""
          );
        } catch (err) {
          // do something
          if (err.response.data.message.startsWith("duplicate")) {
            flashNotification(
              "warning",
              `Product subcategory ${el} already exists.`
            );
          } else {
            flashNotification("error", "Network error please try again later");
          };
        };
      });
    };
  } catch (err) {
    if (err.response.data.message.startsWith("duplicate")) {
      flashNotification(
        "warning",
        `Product category ${productDetails.category} already exists.`
      );
      handleClearProductDetails();
      return;
    };
    flashNotification("error", "Network error please try again later");
    handleClearProductDetails();
    return;
  };
  getAllCategories();
  handleClearProductDetails();
};
// post and put sub category
// if the category is added for the first time subcategory data will be managed at the local level;
// if it's in edit mode subcategory data is managed on database end.
async function addSubCategory() {
  if (!productDetails.subCategory) {
    flashNotification("warning", "Please fill the sub category.");
    return;
  };
  if (productDetails.edit) {
    try {
      const addNewSub = await ProductSubCategory(
        {
          category: productDetails.categoryId,
          sub_category: productDetails.subCategory,
          is_active: true,
        },
        "post",
        ""
      );
      flashNotification("success", "Added new subcatregory");
    } catch (err) {
      if (err.response.data.message.startsWith("duplicate")) {
        flashNotification(
          "warning",
          `Subcategory ${productDetails.subCategory} alredy exists.`
        );
        productDetails.subCategory = "";
        return;
      };
      // do something
    };
  };
  productDetails.subCategoryList = [
    ...productDetails.subCategoryList,
    productDetails.subCategory,
  ];
  productDetails.subCategory = "";
}
// deleting a product category
function handleDeleteCategory(data) {
  ElMessageBox.confirm(
    'This will permanently delete the file. Continue?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(() => {
      ProductCategory({},"delete",data.id).then(() => {
        ElMessage({
          type: 'success',
          message: 'Delete completed',
        })
        getAllCategories()
      })

    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
    
}
// delete sub category
// subcategory data will be removed at local level on non-edit mode.
// subcategory data will be removed at the database level on edit mode.

async function handleRemoveSubCategory(item, index) {
  console.log("removed");
  if (productDetails.edit) {
    try {
      const rmSub = await ProductSubCategory(
        {},
        "delete",
        productDetails.subCategoryIdList[index]
      );
      flashNotification("success", "Removed");
      productDetails.subCategoryIdList.splice(index, 1);
    } catch (err) {
      // do something;
      flashNotification("warning", "Server error please try again later");
      return;
    };
  };
  productDetails.subCategoryList.splice(index, 1);
};
// handle edit product
// setting the data to requied parameters for the edit mode.
function handleEditProduct(data) {
  productDetails.category = data.product;
  productDetails.categoryId = data.id;
  productDetails.subCategoryIdList = [];
  if (data.children) {
    data.children.map((e, index) => {
      productDetails.subCategoryList.push(e.product);
      productDetails.subCategoryIdList.push(data.children[index].id);
    });
  };
  productDetails.edit = true;
  showPopup.value = true;
};
// arrange the all category and sub category details into table formate;
function arrangeData() {
  tableData.items = [];
  let newdata = JSON.parse(sessionStorage.getItem("cat"));
  let data= newdata.map((e)=>{
    let name = e.name.split(" ").pop();
    return {...e,name}
  })
  if(data){
    loading.value = false;
  }
  data?.map((el) => {
    tableData.items.push({
      id: el.id,
      product: el.name,
      children: el.children?.length
        ? el.children.map((sub) => {
            return {
              id: sub.id,
              product: sub.sub_category,
              child: true,
            };
          })
        : [],
    });
  });
};
// clear product details
function handleClearProductDetails() {
  productDetails.category = "";
  productDetails.subCategory = "";
  productDetails.subCategoryList = [];
  productDetails.categoryId = "";
  productDetails.subCategoryIdList = [];
  productDetails.edit = false;
  showPopup.value = false;
};
// adding basic input enter functionality for to experience smoothly.
function handleAddInputBox(el) {
  if (el.key === "Enter") {
    handleSaveProduct();
    el.preventDefault();
  };
};
onMounted(() => {
  loading.value = true;
  navStore.setBreadCrumbs("Product / Settings");
  getAllCategories();
});
</script>

<style scoped lang="scss">
.all_heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 0;
  padding-bottom: 20px;

  .page_heading {
    padding-top: 5px;
  }

  button {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 5px;
    box-shadow: none;
    font-size: 12px;
  }
}

.fieldrow {
  position: relative;
  margin-bottom: 25px;

  &.with_btn {
    button {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1;
      background-color: var(--violet);
      color: var(--white);
      font-family: Montserrat;
      font-size: 13px;
      font-weight: 700;
      line-height: 18px;
      padding: 10px 22px;
      height: 100%;
      border: none;
      display: flex;
      align-items: center;
      gap: 5px;
      outline: none;

      i {
        font-size: 20px;
        font-weight: normal;
      }
    }
  }
}

.added_category {
  padding-inline-start: 0;
  margin: 0;
  margin-top: 15px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;

  li {
    display: block;
    border-radius: 24px;
    background: #7b809a;
    color: var(--white);
    font-family: Montserrat;
    font-size: 13px;
    font-weight: 500;
    line-height: 18px;
    padding: 3px 15px;

    button {
      padding: 0;
      border: none;
      background-color: transparent;
      font-size: 20px;
      vertical-align: text-top;
      color: var(--white);
      margin-right: -10px;
      border-left: solid 1px #fff;
      padding-left: 3px;
      margin-left: 3px;
    }
  }
}
</style>
