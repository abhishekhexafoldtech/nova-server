<template>
  <div class="cd_box">
    <div class="prod_heading">
      <h4 class="cd_heading">Product Details</h4>
      <button @click="handleEdit()">
        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
      </button>
    </div>
    <div class="prod_info">
      <el-row :gutter="60">
        <el-col :xs="24" :sm="24" :md="10" :lg="10">
          <div class="prod_inner">
            <div class="prod_item">
              <img :src="ProductName" alt="icon" />
              <h4>
                Product name:<span>{{ props.details.name }}</span>
              </h4>
            </div>
            <div class="prod_item">
              <img :src="ProductCategory" alt="icon" />
              <h4>
                Product category:
                <span>{{ props.details?.category_name }}</span>
              </h4>
            </div>
            <div class="prod_item" v-if="props.details.sub_category_name">
              <img :src="ProductSubcategory" alt="icon" />
              <h4>
                Product subcategory:<span>{{
                  props.details?.sub_category_name
                }}</span>
              </h4>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="14" :lg="14">
          <div class="prod_inner">
            <div class="prod_item">
              <img :src="ProductDescription" alt="icon" />
              <h4>
                Description:
                <span>
                  {{ props.details?.description }}
                </span>
              </h4>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script setup>
import ProductName from "@/assets/svg/pr_name.svg";
import ProductCategory from "@/assets/svg/pr_category.svg";
import ProductSubcategory from "@/assets/svg/pr_subcategory.svg";
import ProductDescription from "@/assets/svg/pr_description.svg";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  details: {
    type: Object,
    default: {
      name: "-",
      product: {
        name: "-",
        subcategory: {
          sub_category: "-",
        },
      },
      description: "-",
    },
  },
});
// Handle edit event
function handleEdit(data) {
  console.log("data");
  // customerEdit.value = true;
  // let r = "edit-product";
  router.push(`edit-product`);
  // router.push(`product/${r}-${data.id}`);
}
</script>

<style lang="scss" scoped>
.cd_box {
  min-height: calc(100vh - 360px);

  .prod_info {
    width: 100%;
    max-width: 900px;

    .prod_inner {
      display: flex;
      flex-direction: column;
      gap: 25px;

      .prod_item {
        img {
          width: 18px;
          height: 18px;
          display: inline-block;
          vertical-align: top;
          margin-top: 4px;
        }

        h4 {
          display: inline-block;
          vertical-align: top;
          color: var(--grey);
          font-size: 16px;
          font-weight: 400;
          line-height: 28px;
          width: calc(100% - 18px);
          padding-left: 15px;
          margin: 0;
          letter-spacing: 0px;

          span {
            display: block;
            color: var(--black);
            font-weight: 600;
          }
        }
      }
    }
  }
}

.prod_heading {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 30px;

  .cd_heading {
    margin: 0;
  }

  button {
    background-color: transparent;
    color: var(--violet);
    font-size: 16px;
    width: 26px;
    height: 26px;
    line-height: 24px;
    padding: 0;
    padding-left: 2px;
    text-align: center;
    border: none;
    border-radius: 3px;
    margin-top: 3px;
    transition: all 200ms ease-in-out;

    &:hover {
      background-color: var(--violet);
      color: var(--white);
    }
  }
}

@media (max-width: 992px) {
  .prod_info {
    .el-row {
      gap: 25px;
    }
  }
}
</style>
