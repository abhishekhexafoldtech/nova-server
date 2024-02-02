<template>
  <div>
    <CardsEmptyManager
      :icon="empty_product"
      heading="No product category added"
      description="You haven't added any product category."
      description2=" Start by adding first product category."
      button="+ Add product category"
      @doSomething="showAddNewCategory"
      v-if="!tabs?.data?.length"
    />
    <div class="add_pr_category">
      <DialogStatus
        :dialog-visible="addNewCategory?.newCategoryFormPopup"
        dialog-title="Add product catogery"
        leftButtonName="Cancel"
        right-button-name="+ Add"
        @dialogVisible="handleCloseAddCategoryDialog"
        @handleLeftButton="handleCloseAddCategoryDialog"
        @handleRightButton="handleAddNewCategory"
      >
        <el-form
          :model="addNewCategory"
          ref="newCategoryForm"
          label-position="top"
          :rules="addNewCategoryRules"
          @submit.prevent="handleAddNewCategory"
        >
          <div class="fieldrow">
            <el-form-item
              v-if="addNewCategory"
              label="Product category"
              prop="category"
            >
              <el-input
                class="form_input"
                v-model="addNewCategory.category"
                placeholder="Enter product category"
              />
            </el-form-item>
          </div>
        </el-form>
      </DialogStatus>
    </div>
  </div>
  <div class="container-area" v-if="tabs?.data?.length">
    <h4 class="page_heading">List of Products</h4>
    <div class="table_header">
      <div class="header_btn">
        <el-button type="button" class="btn_add" @click="handleCreate()"
          ><span class="text-white"><i>+</i>Add Product</span>
        </el-button>
        <button class="pr_setting_btn" @click="goToSettingsPage">
          <i class="ri-settings-5-fill"></i>
        </button>
      </div>
      <el-tabs
        v-model="activeName"
        class="demo-tabs"
        @tab-click="handleClick"
        style="text-transform: capitalize;"
      >
        <el-tab-pane
          v-for="tab in tabs.data"
          :key="tab.id"
          :label="tab.name"
          :name="tab.name"
        >
          <div class="table-area">
            <div>
              <CardsEmptyManager
                :icon="empty_box"
                heading="No product added"
                description="You haven't added any product."
                description2="Start by adding first product."
                :sub-empty-manager="true"
                v-if="!listData?.items?.length"
              />
            </div>
            <Table
              :tableHeading="tab.name.split(' ')[0]"
              tableSubHeading=""
              :addButtonVisibility="false"
              addButtonText="Add Product"
              :tableConfig="tableConfig"
              :tableData="listData"
              :tableQuery="listQuery"
              :tableCheckBoxVisibility="false"
              @pagination="handlePagination()"
              @edit="handleEdit($event)"
              @view="handleView"
              @multipleSelection="handleMultipleSelection($event)"
              :delete-button-visibility="false"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeMount, watch } from "vue";
import Table from "@/components/tables/ProductTable.vue";
import { useRouter } from "vue-router";
import { useNavStore } from "@/stores/NavStore";
import empty_product from "@/assets/svg/empty_product.svg";
import CardsEmptyManager from "@/components/cards/EmptyManager.vue";
import empty_box from "@/assets/svg/empty_box.svg";
import DialogStatus from "@/components/Dialog/Status.vue";
import { nameRule } from "~/rules/all-rules";
import { ProductCategory } from "~/api/product/product";
const navStore = useNavStore();
const router = useRouter();
const activeName = ref("");
const newCategoryForm = ref(null);
const activeCategory = ref("");
const tabs = reactive({
  data: [],
  items: [],
});

const addNewCategory = reactive({
  category: "",
  newCategoryFormPopup: false,
});

let tableConfig = reactive([
  {
    label: "PRODUCT",
    prop: "product",
    width: "",
    sortable: "",
    className: "redFont",
    popover: true,
  },
  {
    label: "STYLE",
    list: [
      {
        label: "Name",
        prop: "product_name",
        popover: true,
      },
      {
        label: "Weight",
        prop: "product_weight",
      },
      {
        label: "Material",
        prop: "material_type",
      },
      {
        label: "Product price",
        prop: "product_price",
      },
      {
        label: "Status",
        prop: "product_status",
      },
    ],
  },
]);

let listData = reactive({
  items: [],
  page: 1,
  pages: 1,
  size: 10,
  total: 3,
});

let listQuery = {
  page: 1,
  limit: 10,
  search: "",
  searchJoin: "or",
  orderBy: "created_at",
  sortedBy: "desc",
};

// go to settings page
function goToSettingsPage() {
  router.push(`product/settings`);
}

// pagination
function handlePagination(data) {
  getList();
}

// handleView

function handleView(data) {
  router.push(`product/${data.product_id}`);
}

// add
function handleCreate() {
  tabs.data.map((e) => {
    if (e.name === activeName.value) {
      e.state = true;
      return;
    }
  });
  sessionStorage.setItem("cat", JSON.stringify(tabs.data));
  let r = "add-product";
  router.push(`product/${r}`);
}

// edit
function handleEdit(data) {
  let r = data.id;
  router.push(`product/${r}`);
}

// get list
function getList() {
  // API CALL MADE
}

// adding new category popup
function showAddNewCategory() {
  addNewCategory.newCategoryFormPopup = true;
}

// closing the add new category dialog box
function handleCloseAddCategoryDialog() {
  addNewCategory.newCategoryFormPopup = false;
}

// adding new category
function handleAddNewCategory() {
  if (newCategoryForm.value.validate) {
    newCategoryForm.value.validate((valid) => {
      if (valid) {
        if (tabs.data.includes(addNewCategory.category)) {
          flashNotification(
            "warning",
            "This category already exists please provide new category."
          );
          addNewCategory.category = "";
          return;
        }
        ProductCategory(
          {
            name: addNewCategory.category,
            is_active: true,
          },
          "post",
          ""
        )
          .then((res) => {
            console.log("product sub category add reposce", res);
            getAllCategories(addNewCategory.category);
          })
          .catch((err) => {
            if (err.response.data.message.startsWith("duplicate")) {
              flashNotification(
                "warning",
                `Duplicate category, ${addNewCategory.category} already exists`
              );
              return;
            }
            flashNotification(
              "warning",
              "Something went wrong please wait for sometime or try again later."
            );
          })
          .finally(() => {
            addNewCategory.newCategoryFormPopup = false;
          });
      }
    });
  }
}

// get all the categories
async function getAllCategories(data) {
  if (sessionStorage.getItem("cat")) {
    tabs.data = JSON.parse(sessionStorage.getItem("cat"));
    activeName.value = tabs.data[0].name;
    await dataArrange();
  }
  try {
    const res = await ProductCategory({}, "get", "");
    tabs.data = res.data.items;
    const newData = tabs.data.map((e) => {
      const name = `${e.name} (${e.products.length || 0})`;
      return { ...e, name };
    });
    tabs.data = newData;
    sessionStorage.setItem("cat", JSON.stringify(tabs.data));
    activeName.value = tabs.data[0].name;
    await dataArrange();
  } catch (err) {
    console.log(err);
    flashNotification(
      "warning",
      "Something went wrong please wait for sometime or try again later."
    );
  } finally {
    if (addNewCategory.category) {
      activeName.value = addNewCategory.category;
      addNewCategory.category = "";
    } else if (tabs.data.length) {
    }
    addNewCategory.category = "";
  }
}

// rules for validating categoty
const addNewCategoryRules = {
  category: nameRule("a category"),
};

function handleMultipleSelection(data) {
  // console.log(data);
}

async function dataArrange() {
  if (sessionStorage.getItem("cat")) {
    let item = JSON.parse(sessionStorage.getItem("cat"));
    const currentItem = await item.filter((e) => e.name == activeName.value);
    activeCategory.value = currentItem[0].id;

    const list = currentItem[0].products;
    const n_list = list.map((e) => {
      return {
        product: e.name,
        id: e.id,
        list: e.styles.map((style) => {
          return {
            product_id: style.id,
            product_name: style.name || "undefined",
            product_weight: `${style.weight || "0"} ${
              style.measuring_unit || "kg"
            }`,
            material_type: style.material_type || "undefined",
            product_price: `${style?.cost?.cost || 0} GHS`,
            product_status: {
              status: style.is_active || false,
              content: style.is_active ? "Active" : "Inactive",
            },
          };
        }),
      };
    });
    listData.items = n_list;
  }
}

watch(activeName, async () => {
  await dataArrange();
});

onMounted(async () => {
  navStore.setBreadCrumbs("Products");
  await getAllCategories();
});

onBeforeMount(() => {
  if (sessionStorage.getItem("product")) {
    sessionStorage.removeItem("product");
  }
});

onUnmounted(() => {
  if (sessionStorage.getItem("cat")) {
    sessionStorage.removeItem("cat");
  }
})
</script>

<style scoped lang="scss">
.header_btn {
  position: absolute;
  top: 5px;
  right: 0;
  display: flex;
  gap: 25px;
  align-items: center;
  z-index: 1;
}

.table_header .btn_add {
  position: relative;
  top: auto;
  right: auto;
}

.table_header .pr_setting_btn {
  background-color: transparent;
  border: none;
  color: rgb(0 0 0 / 60%);
  font-size: 20px;
  transition: all 300ms ease-in-out;
  outline: none;

  &:hover {
    color: var(--violet);
  }
}
</style>
