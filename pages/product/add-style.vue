<template>
  <div>
    <section  v-loading="loading" class="edit_mang_wrap">
      <div class="mang_inner comp_inner pb-1 mb-4">
        <div class="mang_title">
          <h3>Product styles</h3>
          <p>Add details styles.</p>
        </div>
        <el-form label-position="top" label-width="100px" :model="formData" :rules="formValidationRules" ref="formRef"
          @submit.prevent="" v-if="formData">
          <el-row :gutter="50">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <div class="fieldrow">
                <el-form-item label="Product Weight" prop="weight">
                  <el-input v-model="formData.weight" placeholder="Enter product weight" />
                </el-form-item>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <div class="fieldrow">
                <el-form-item prop="dimension">
                  <label class="form_label">
                    Product Dimensions
                    <el-tooltip placement="right" effect="customized">
                      <template #content>Measurements of<br />the product size</template>
                      <span class="tool_tip"><i class="fa fa-info"></i></span>
                    </el-tooltip>
                  </label>
                  <el-input v-model="formData.dimension" placeholder="Enter product dimensions" />
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
                <el-form-item prop="base_price">
                  <label class="form_label">
                    Product MRP
                    <el-tooltip placement="right" effect="customized">
                      <template #content>Maximum retail<br />price of product</template>
                      <span class="tool_tip"><i class="fa fa-info"></i></span>
                    </el-tooltip>
                  </label>
                  <el-input v-model="formData.base_price" placeholder="Enter product base price" />
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
                <el-form-item prop="discount_price">
                  <label class="form_label">
                    Product price
                    <el-tooltip placement="right" effect="customized">
                      <template #content>Selling price for a<br />product or service</template>
                      <span class="tool_tip"><i class="fa fa-info"></i></span>
                    </el-tooltip>
                  </label>
                  <el-input v-model="formData.discount_price" placeholder="Enter product price" />
                </el-form-item>
              </div>
              <div class="fieldrow">
                <el-form-item prop="discount_percent">
                  <label class="form_label">
                    Discount in %
                    <el-tooltip placement="right" effect="customized">
                      <template #content>Percentage off<br />original price</template>
                      <span class="tool_tip"><i class="fa fa-info"></i></span>
                    </el-tooltip>
                  </label>
                  <el-input v-model="formData.discount_percent" placeholder="Enter discount in %" />
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
          
          <el-upload list-type="picture-card" :auto-upload="false" v-model:file-list="files">
            <el-icon>
              <Plus />
            </el-icon>
            <template #file="{ file }">
              <div>
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                <span class="el-upload-list__item-actions">
                  <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                    <el-icon><ZoomIn /></el-icon>
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

<script  setup>
import { reactive, ref, watch, onMounted } from "vue";
import { nameRule, numberRule } from "@/rules/all-rules";
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)
import { flashNotification } from "@/composables/useNotification.js";
import { useNavStore } from "@/stores/NavStore";
import { ProductStyleAdmin} from "~/api/product/product";
import { uploadDocument } from "~/api/upload";
import { useRouter } from "vue-router";
const navStore = useNavStore();
const router = useRouter();
const formRef = ref()
const files = ref([]);
const preSignedUrls = ref([]);
const loading = ref(false)
const handleRemove = (file) => {
  files.value = files.value.filter((el)=>{
    return el.raw.uid != file.raw.uid;
  });
}
const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}
const handleDownload = (file) => {
  // console.log(files.value,"file",file)
}
//form data
const formData = reactive({
  product_id: "",
  name: "string",
  weight: 0,
  measuring_unit: "kg",
  base_price: 0,
  product_material: "",
  discount_price: 0,
  dimension: "",
  discount_percent: 0,
  // product_description: "",
  images: 0
});
//validation rules
const formValidationRules = reactive({
  weight: numberRule("product weight"),
  base_price: numberRule("product base price"),
  product_material: nameRule("product material"),
  discount_price: numberRule("product price"),
  dimension: nameRule("product dimension"),
  // product_description: nameRule("product description"),
  discount_percent: numberRule("product discount"),
});
//call api with form data
const handleSave = () => {
  loading.value = true;
  if(formRef && formRef.value.validate){
    formRef.value.validate((valid)=>{
      if(valid){
        if(!files.value.length){
          flashNotification("warning","Please upload atleast an image.");
          return;
        };
        ProductStyleAdmin(formData).then((res)=>{
          preSignedUrls.value = res.data.pre_signed_urls;
           uploadImages();
          flashNotification("success","product style added successfully.")
        }).catch((err)=>{
          flashNotification("warning","Something went wrong please try again later.");
          loading.value = false;
        }).finally(()=>{
          // do something
        })
      }else{
        loading.value = true;
        flashNotification("warning","Please fill all the required fields.")
      }
    })
  }
};
// uploading images
 function uploadImages(){
  preSignedUrls.value.map((el,index)=>{
     uploadDocument(files.value[index].raw,el).then((res)=>{
     }).catch((err)=>{
      flashNotification("error","Somethong went wrong while uploading image documents to servers please try again later.");
      loading.value = false;
      return;
     }).finally(()=>{
    })
    loading.value = false;
    router.push("/product/add-product");
  })
}
const handleCancel = () => {
  router?.push("/product/add-product");
};
// watch methods
watch(files,()=>{
  formData.images = files.value.length;
});
onMounted(() => {
  navStore.setBreadCrumbs('Product / Add-style');
  const id  = JSON.parse(sessionStorage.getItem("product"));
  if(id){
    formData.product_id = id;
  }
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