<template>
  <div class="main_div">
    <el-row :gutter="30" class="main_row">
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <div class="cd_box h265">
          <h4 class="cd_heading">Rating</h4>
          <ul class="ratings">
            <li
              v-for="star in data.ratingStars"
              :key="star"
              :class="{ full: star === 'full', half: star === 'half' }"
            >
              <i v-if="star === 'full'" class="ri-star-s-fill"></i>
              <i v-else-if="star === 'half'" class="ri-star-half-s-fill"></i>
              <i v-else class="ri-star-s-line"></i>
            </li>
            <li>({{ data.rating }})</li>
          </ul>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <div class="cd_box h265">
          <h5 class="cd_heading">Feedback</h5>
          <div class="feed_progress" v-for="feed in data.feedback" :key="feed">
            <p class="feed_text">
              <span>{{ feed.title }}</span
              ><span>{{ feed.percentage }}%</span>
            </p>
            <el-progress
              :color="feed?.color"
              :percentage="feed.percentage"
              :show-text="false"
            >
            </el-progress>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { useNavStore } from "@/stores/NavStore";
const navStore = useNavStore();

const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
});

const data = reactive({
  rating: 0,
  ratingStars: [],
  feedback: [
    {
      title: "Issues to be improved",
      color: "rgba(243, 63, 34, 1)",
      percentage: 0,
    },
    {
      title: "Complaints",
      color: "rgba(10, 123, 55, 1)",
      percentage: 0,
    },
  ],
});

watch(() => props.data, (newData) => {
    if (newData) {
      data.rating = newData[0].avg_rating;
      data.ratingStars = generateRatingStars(data.rating);
      data.feedback[0].percentage = newData[0].negative_feedback_percentage;
      data.feedback[1].percentage = newData[0].positive_feedback_percentage;
    }
  }
);

function generateRatingStars(rating) {
  const stars = [];
  let fullStars = Math.floor(rating);

  const isInteger = rating % 1 === 0;

  let hasHalfStar = rating % 1 >= 0.5 ? 0 : 1;

  for (let i = 0; i < fullStars; i++) {
    stars.push("full");
  }

  if (isInteger) {
    hasHalfStar -= 1;
  } else if (hasHalfStar === 1) {
    stars.push("half");
  } else {
    stars.push("full");
    fullStars += 1;
  }

  for (let i = fullStars + hasHalfStar; i < 5; i++) {
    stars.push("empty");
  }

  return stars;
}

onMounted(() => {
  navStore.setBreadCrumbs(
    "Distributor / Delivery vehicles & agents / Service agent / Rating");
});

</script>


<style lang="scss" scoped>
.main_div {
  margin-top: 40px;
}

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
    color: #ff7a00;
    font-size: 30px;
    font-weight: normal;

    i {
      &.ri-star-half-s-fill,
      &.ri-star-s-fill {
        display: none;
      }
    }

    &:last-child {
      color: #7b809a;
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

    color: #7b809a;
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

@media (max-width: 992px) {
  .main_row {
    gap: 30px;
  }

  .cd_box.h265 {
    min-height: auto;
  }
}
</style>
