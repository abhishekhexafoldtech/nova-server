<template>
  <div>
    <el-row :gutter="30">
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <div class="cd_box h265">
          <h4 class="cd_heading">Rating</h4>
          <ul class="ratings">
            <li class="full">
              <i class="ri-star-s-line"></i>
              <i class="ri-star-half-s-fill"></i>
              <i class="ri-star-s-fill"></i>
            </li>
            <li class="full">
              <i class="ri-star-s-line"></i>
              <i class="ri-star-half-s-fill"></i>
              <i class="ri-star-s-fill"></i>
            </li>
            <li class="full">
              <i class="ri-star-s-line"></i>
              <i class="ri-star-half-s-fill"></i>
              <i class="ri-star-s-fill"></i>
            </li>
            <li class="half">
              <i class="ri-star-s-line"></i>
              <i class="ri-star-half-s-fill"></i>
              <i class="ri-star-s-fill"></i>
            </li>
            <li>
              <i class="ri-star-s-line"></i>
              <i class="ri-star-half-s-fill"></i>
              <i class="ri-star-s-fill"></i>
            </li>
            <li>({{ data.rating }})</li>
          </ul>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <div class="cd_box h265">
          <h5 class="cd_heading">Feedback</h5>
          <div class="feed_progress" v-for="feed in data.feedback">
            <p class="feed_text"><span>{{ feed.title }}</span><span>{{ feed.percentage }}%</span></p>
            <el-progress :color="feed?.color" :percentage="feed.percentage" :show-text="false">
            </el-progress>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const data = reactive({
  rating: 4,
  feedback: [
    {
      title: "Issues to be improbved",
      color: "rgba(243, 63, 34, 1)",
      percentage: 10,
    },
    {
      title: "Complaints",
      color: "rgba(10, 123, 55, 1)",
      percentage: 90,
    },
  ],
});


const ratingStyle = computed(() => {
  return `width:${data.rating * 2 * 10}%`;
});
</script>

<style lang="scss" scoped>
.cd_box.h265 {
  min-height: 265px;
}
.ratings {
  padding-inline-start: 0;
  margin: 0;
  display: flex;
  align-items: center;
  margin-left: -3px;

  li {
    display: block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    color: #FF7A00;
    font-size: 30px;
    font-weight: normal;

    i {

      &.ri-star-half-s-fill,
      &.ri-star-s-fill {
        display: none;
      }
    }

    &:last-child {
      color: #7B809A;
      font-size: 20px;
      font-weight: 700;
      line-height: 32px;
      width: auto;
      height: auto;
      margin-left: 10px;
    }

    &.full {
      i {

        &.ri-star-s-line,
        &.ri-star-half-s-fill {
          display: none;
        }

        &.ri-star-s-fill {
          display: block;
        }
      }
    }

    &.half {
      i {

        &.ri-star-s-line,
        &.ri-star-s-fill {
          display: none;
        }

        &.ri-star-half-s-fill {
          display: block;
        }
      }
    }
  }
}

.feed_progress {
  margin-bottom: 30px;

  .feed_text {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;

    color: #7B809A;
    font-size: 15px;
    font-weight: 400;
    line-height: 20px;

    span {
      &:last-child {
        font-size: 16px;
        font-weight: 600;
      }
    }
  }

  &:last-child {
    margin: 0;
  }
}
</style>
