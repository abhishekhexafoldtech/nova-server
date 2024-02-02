<template>
    <div>
      <section class="edit_mang_wrap">
        <div class="mang_inner comp_inner pb-1 mb-4">
          <div class="mang_title">
            <h3>Edit product styles</h3>
            <p>Edit details styles.</p>
          </div>
          <el-form label-position="top" label-width="100px" :model="formData" :rules="formValidationRules" ref="formRef"
            @submit.prevent="" v-if="formData">
            <el-row :gutter="50">
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="fieldrow">
                  <el-form-item label="Product Weight" prop="product_weight">
                    <el-input v-model="formData.product_weight" placeholder="Enter product weight" />
                  </el-form-item>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="fieldrow">
                  <el-form-item prop="product_dimension">
                    <label class="form_label">
                      Product Dimensions
                      <el-tooltip placement="right" effect="customized">
                        <template #content>Measurements of<br />the product size</template>
                        <span class="tool_tip"><i class="fa fa-info"></i></span>
                      </el-tooltip>
                    </label>
                    <el-input v-model="formData.product_dimension" placeholder="Enter product dimensions" />
                  </el-form-item>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="fieldrow">
                  <el-form-item label="Product material" prop="product_material">
                    <el-input v-model="formData.product_material" placeholder="Enter product material" />
                  </el-form-item>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="fieldrow">
                  <el-form-item prop="product_bPrice">
                    <label class="form_label">
                      Product MRP
                      <el-tooltip placement="right" effect="customized">
                        <template #content>Maximum retail<br />price of product</template>
                        <span class="tool_tip"><i class="fa fa-info"></i></span>
                      </el-tooltip>
                    </label>
                    <el-input v-model="formData.product_bPrice" placeholder="Enter product base price" />
                  </el-form-item>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="fieldrow big_textarea">
                  <el-form-item label="Product Description" prop="product_description">
                    <el-input v-model="formData.product_description" type="textarea" placeholder="Product Description" />
                  </el-form-item>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="fieldrow">
                  <el-form-item prop="product_price">
                    <label class="form_label">
                      Product price
                      <el-tooltip placement="right" effect="customized">
                        <template #content>Selling price for a<br />product or service</template>
                        <span class="tool_tip"><i class="fa fa-info"></i></span>
                      </el-tooltip>
                    </label>
                    <el-input v-model="formData.product_price" placeholder="Enter product price" />
                  </el-form-item>
                </div>
                <div class="fieldrow">
                  <el-form-item prop="product_pDisccount">
                    <label class="form_label">
                      Discount in %
                      <el-tooltip placement="right" effect="customized">
                        <template #content>Percentage off<br />original price</template>
                        <span class="tool_tip"><i class="fa fa-info"></i></span>
                      </el-tooltip>
                    </label>
                    <el-input v-model="formData.product_pDisccount" placeholder="Enter discount in %" />
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="mang_inner comp_inner">
          <div class="mang_title">
            <h3>Product Images</h3>
            <p>Add minimum 1 image.</p>
          </div>
  
          <div class="product_upload">
            <el-upload list-type="picture-card" :auto-upload="false">
              <el-icon>
                <Plus />
              </el-icon>
              <template #file="{ file }">
                <div>
                  <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                  <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                      <el-icon><zoom-in /></el-icon>
                    </span>
                    <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                      <el-icon>
                        <Download />
                      </el-icon>
                    </span>
                    <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                      <el-icon>
                        <Delete />
                      </el-icon>
                    </span>
                  </span>
                </div>
              </template>
              <p class="upload_text">
                Add Image files(png, jpg, jpeg), Videos and 3d models are accepted. Maximum file size 5MB
              </p>
            </el-upload>
          </div>
  
          <el-dialog v-model="dialogVisible" class="product_uploaded_preview">
            <img class="preview_img" :src="dialogImageUrl" alt="Preview Image" />
          </el-dialog>
  
          <div class="perm_footer">
            <button class="btn btn-default" @click="handleCancel">Cancel</button>
            <button class="btn btn-primary" @click.prevent="handleSave">
              Save
            </button>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { reactive } from "vue";
  import { nameRule, numberRule } from "@/rules/all-rules";
  import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
  import type { UploadFile } from 'element-plus'
  import { flashNotification } from "@/composables/useNotification.js";
  import { useNavStore } from "@/stores/NavStore";
  import {
    ref,
    onMounted
  } from "vue";
  import { useRouter} from "vue-router"
  const dialogImageUrl = ref('')
  const dialogVisible = ref(false)
  const disabled = ref(false)
  const navStore = useNavStore();
  const router = useRouter();
  
  
  const handleRemove = (file: UploadFile) => {
    console.log(file)
  }
  
  const handlePictureCardPreview = (file: UploadFile) => {
    dialogImageUrl.value = file.url!
    dialogVisible.value = true
  }
  
  const handleDownload = (file: UploadFile) => {
    console.log(file)
  }
  
  
  
  //form data
  const formData = reactive({
    product_weight: "",
    product_bPrice: "",
    product_material: "",
    product_price: "",
    product_dimension: "",
    product_pDisccount: "",
    product_description: "",
  });
  
  //validation rules
  const formValidationRules = reactive({
    product_weight: numberRule("product weight"),
    product_bPrice: numberRule("product base price"),
    product_material: nameRule("product material"),
    product_price: numberRule("product price"),
    product_dimension: numberRule("product dimension"),
    product_description: numberRule("product description"),
  });
  
  //call api with form data
  const handleSave = () => {
    for (const [key, value] of Object.entries(formData)) {
      if (value === null || value === undefined) {
        flashNotification("warning", "Please fill all the fields");
        return false;
      }
  
      // Check for an empty object
      if (typeof value === "object" && Object.keys(value).length === 0) {
        flashNotification("warning", "Please fill all the fields");
        return false;
      }
  
      // Check for an empty string
      if (typeof value === "string" && value.trim() === "") {
        flashNotification("warning", "Please fill all the fields");
        return false;
      }
  
      // Check for false
      if (typeof value === "boolean" && value === false) {
        flashNotification("warning", "Please fill all the fields");
        return false;
      }
    }
  
    flashNotification("success", `details requested.`);
    //   flashNotification("success", `${formData.product_name} details requested.`);
    // router.push("/product");
  };
  
  const handleCancel = () => {
    router.push("/product/product-details");
  };
  
  onMounted(() => {
    navStore.setBreadCrumbs('Product / Edit-style')
  })
  
  </script>
  
  <style scoped lang="scss">
  .edit_mang_wrap .mang_inner {
    min-height: auto;
  }
  
  .fieldrow {
    margin-bottom: 25px;
  }
  
  .edit_mang_wrap .mang_inner .perm_footer {
    margin-top: 50px;
  
    button {
      height: 41px;
      padding: 8px;
    }
  }
  
  
  .preview_img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  </style>