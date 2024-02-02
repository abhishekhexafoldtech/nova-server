<template>
  <el-card>
    <div class="table-component">
      <!-- table heading  -->
      <el-row
        class="align-items-center"
        :class="
          headingRowReverse ? 'table_filter' : 'table_filter reverse_filter'
        "
      >
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <input
            class="filter_search"
            v-if="tableSearchVisibility"
            v-model="search"
            @input="handleSearch"
            placeholder="Search..."
          />
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <div style="margin-right: 20px">
            <h5
              class="m-0"
              v-if="tableHeading"
              style="text-transform: capitalize"
            >
              {{ tableHeading }}
            </h5>
            <p v-if="tableSubHeading">{{ tableSubHeading }}</p>
          </div>
          <div class="filter_right">
            <ul>
              <li>
                <button
                  class="btn_filter"
                  v-if="props.export"
                  @click="handleExport"
                >
                  <i class="exp_icon ri-upload-2-line"></i>Export
                </button>
              </li>
              <li>
                <div class="filter_wrap" v-if="filter">
                  <button
                    class="btn_filter dropdown-toggle"
                    type="button"
                    @click="uiStore.updateStateValue('showFilterBar', true)"
                  >
                    Filter
                  </button>
                  <div v-if="uiStore.showFilterBar">
                    <!-- <span @click="uiStore.updateStateValue('showFilterBar',false)"> -->
                    <Tree :data="filterData" />
                    <!-- </span> -->
                  </div>
                </div>
              </li>
              <li>
                <button v-if="refresh">
                  <i class="sync_icon ri-loop-right-fill"></i>
                </button>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>

      <!-- skeleton  -->
      <el-skeleton
        :throttle="100"
        :loading="tableLoadingStatus"
        :rows="3"
        :count="5"
        animated
      >
        <!-- Table -->
        <el-table
          class="theme_table product_table"
          :data="tableDataItems"
          row-key="id"
          @selection-change="handleMultipleSelectionChange"
        >
          <!-- CHECKBOX  -->
          <el-table-column
            v-if="tableCheckBoxVisibility"
            type="selection"
            :selectable="isTableCheckBoxVisibilityRowWise"
          >
          </el-table-column>

          <el-table-column
            v-for="(config, key) in props.tableConfig"
            :label="config.label"
            :prop="config.prop"
            :width="config.width"
            :sortable="config.sortable ? config.sortable : false"
            :class-name="config.className"
            :key="key"
          >
            <template #default="scope">
              <!-- for sub product category -->
              <el-table-column
                v-for="subConfig in config.list"
                :label="subConfig.label"
                :prop="subConfig.prop"
                :key="subConfig.prop"
                v-if="config.list"
              >
                <template #default="scope">
                  <div class="colspan_wrap">
                    <span
                      class="colspan_item"
                      v-if="scope.row.list"
                      v-for="item in scope.row.list"
                    >
                      <!-- for status view -->
                      <div class="p-0" v-if="item[subConfig.prop].content">
                        <span
                          :class="
                            item[subConfig.prop].status
                              ? 'text-success'
                              : 'text-warning'
                          "
                          >{{ item[subConfig.prop].content }}</span
                        >
                      </div>
                      <div class="p-0" v-if="!item[subConfig.prop].content">
                        <!-- popover -->
                        <span v-if="subConfig.popover">
                          <el-link
                            type="primary"
                            @click="handleProductView(item)"
                            :underline="false"
                          >
                            {{ item[subConfig.prop] }}
                          </el-link>
                        </span>
                        <span v-else>
                          {{ item[subConfig.prop] }}
                        </span>
                      </div>
                    </span>
                  </div>
                </template>
              </el-table-column>
              <!-- FOR IMAGE  -->
              <span v-if="typeof scope.row[config.prop] === 'object'">
                <span
                  v-for="(item, index) in scope.row[config.prop]"
                  :key="index"
                >
                  <!-- for image and name -->
                  <span
                    v-if="
                      scope.row[config.prop] &&
                      scope.row[config.prop].length &&
                      'url' in scope.row[config.prop][0]
                    "
                  >
                    <span v-if="scope.row[config.prop][0].url">
                      <span
                        v-for="(item, index) in scope.row[config.prop]"
                        :key="index"
                      >
                        <el-image
                          :src="item.url"
                          :preview-src-list="[item.url]"
                          :class="item.content ? 'circle_img' : 'square_img'"
                        >
                        </el-image>
                        <span>{{ item?.content ? item.content : "" }}</span>
                      </span>
                    </span>
                  </span>
                  <!-- for active and inactive status -->
                  <span
                    v-if="
                      scope.row[config.prop] &&
                      scope.row[config.prop].length &&
                      'status' in scope.row[config.prop][0]
                    "
                  >
                    <span v-if="scope.row[config.prop][0].content">
                      <span
                        v-for="(item, index) in scope.row[config.prop]"
                        :key="index"
                      >
                        <span class="act_status"
                          ><i
                            :class="
                              item.status
                                ? 'fa fa-circle text-success'
                                : 'fa fa-circle text-warning'
                            "
                            aria-hidden="true"
                          ></i>
                        </span>
                        <span>{{ item?.content ? item.content : "" }}</span>
                      </span>
                    </span>
                  </span>

                  <!-- for delevery status - if delevery? show date : 'red color show for pending' -->
                  <span
                    v-if="
                      scope.row[config.prop] &&
                      scope.row[config.prop].length &&
                      'status' in scope.row[config.prop][0]
                    "
                  >
                    <span v-if="scope.row[config.prop][0].status">
                      <span
                        v-for="(item, index) in scope.row[config.prop]"
                        :key="index"
                      >
                        <span v-if="item.status == 'Delivered'">
                          <span class="text-success">{{
                            item ? item.status : ""
                          }}</span>
                          <br />on {{ item ? item.date : "" }}
                        </span>
                        <span v-if="item.status == 'Approve'">
                          <span class="text-success">{{
                            item ? item.status : ""
                          }}</span></span
                        >
                        <span v-if="item.status == 'Pending'">
                          <span class="text-danger">{{
                            item ? item.status : ""
                          }}</span></span
                        >
                      </span>
                    </span>
                  </span>

                  <!-- customer order status delivery pending -->
                  <span
                    v-if="
                      scope.row[config.prop] &&
                      scope.row[config.prop].length &&
                      'order_status' in scope.row[config.prop][0]
                    "
                  >
                    <span v-if="scope.row[config.prop][0]">
                      <span
                        v-for="(item, index) in scope.row[config.prop]"
                        :key="index"
                        class="order_status"
                      >
                        <span v-if="item.completed" class="text-primary">
                          shipped
                        </span>
                        <span
                          v-else
                          :class="
                            item.order_status ? 'text-success' : 'text-warning'
                          "
                          >{{ item?.content ? item.content : "" }}
                          <p class="del_date" v-if="item.order_status">
                            on 2020/12/16
                          </p>
                        </span>
                        <span v-if="!item.order_status" class="text-warning"
                          >Pending</span
                        >
                        <!-- <span>{{ item?.content ? item.content : "" }}</span>   -->
                      </span>
                    </span>
                  </span>
                </span>
              </span>

              <span v-else>
                <!-- if popover is on for the column -->
                <span v-if="config.popover">
                  <span>
                    <el-link
                      type="primary"
                      @click="handleView(scope.row)"
                      :underline="false"
                    >
                      {{ scope.row[config.prop] }}
                    </el-link>
                  </span>
                </span>
                <span v-else>
                  {{ scope.row[config.prop] }}
                </span>
              </span>
            </template>
          </el-table-column>

          <!-- ACTIONS -->
          <el-table-column v-if="actionVisibility" width="150" label="ACTIONS">
            <template #default="scope">
              <span
                class="table-icon"
                v-if="viewButtonVisibility"
                @click="handleView(scope.row)"
              >
                <i class="fa fa-eye" aria-hidden="true"></i>
              </span>
              <span
                class="table-icon edit_btn"
                v-if="editButtonVisibility"
                @click="handleEdit(scope.row)"
              >
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
              </span>
              <span
                class="table-icon delete_btn"
                v-if="deleteButtonVisibility"
                @click="handleDelete(scope.row)"
              >
                <i class="fa fa-trash-o" aria-hidden="true"></i>
              </span>
              <!-- view receipt  -->
              <span
                class="table-icon view_rec"
                v-if="downloadLinkContent"
                @click="handleViewReceipt(scope.$index, scope.row)"
              >
                {{ downloadLinkContent }}
              </span>
              <!-- download icon -->
              <span
                class="table-icon dnld_btn"
                v-if="downloadVisibility"
                @click="handleDownload(scope.$index, scope.row)"
              >
                <i class="ri-download-2-line"></i>
              </span>
              <el-dropdown
                class="table-icon more_btn"
                v-if="moreActionsVisibility"
              >
                <span class="el-dropdown-link">
                  <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                </span>
                <!-- lists of other option -->
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      v-if="resetPasswordVisibility"
                      @click="handleResetPassword(scope.row)"
                      >Reset password</el-dropdown-item
                    >

                    <el-dropdown-item
                      v-if="roleAndPermissionVisibility"
                      @click="handleAssignRolesAndPermissions(scope.row)"
                      >Assign roles & permissions</el-dropdown-item
                    >

                    <el-dropdown-item
                      v-if="approveRequestsVisibility"
                      @click="handleApproveRequest(scope.row)"
                    >
                      Approve request</el-dropdown-item
                    >

                    <el-dropdown-item
                      v-if="declineRequestsVisibility"
                      @click="handleDeclineRequest(scope.row)"
                      >Decline request</el-dropdown-item
                    >

                    <el-dropdown-item
                      v-if="viewOnboardingFormVisibility"
                      @click="handleViewOnboardingForm(scope.row)"
                      >View onboarding form</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>

        <!-- // PAGINATION status-->
        <el-pagination
          class="px-0"
          v-if="tableDataTotal"
          :total="tableDataTotal"
          :page-size="props.tableQuery.limit"
          v-model:current-page="props.tableQuery.page"
          layout="prev, pager, next"
          @size-change="handlePagination()"
          @current-change="handlePagination()"
          background
        />
      </el-skeleton>
    </div>
  </el-card>
</template>

<script setup>
import { useUIStore } from "@/stores/uiStore";
import { downloadCSVFromJson } from "@/composables/useDownloadCsv";
import Tree from "./Tree.vue";

const uiStore = useUIStore();

let emit = defineEmits();

let multipleSelection = reactive([]);

let search = ref("");

onMounted(() => {
  // do something
});

// watch(search, () => {
//   handleSearch();
// });

function handleSearch() {
  emit("search", search);
}

function handleExport() {
  downloadCSVFromJson("name.csv", props.tableData);
}

let props = defineProps({
  tableConfig: {},
  tableData: {},
  tableQuery: {},

  tableHeading: {
    type: String,
    default: "",
  },

  headingRowReverse: {
    type: Boolean,
    required: false,
    default: false,
  },
  tableLoadingStatus: {
    type: Boolean,
    default: false,
  },

  tableSubHeading: {
    type: String,
    default: "",
  },

  tableSearchVisibility: {
    type: Boolean,
    default: true,
  },

  actionVisibility: {
    type: Boolean,
    default: true,
  },

  viewButtonVisibility: {
    type: Boolean,
    default: false,
  },

  editButtonVisibility: {
    type: Boolean,
    default: true,
  },

  deleteButtonVisibility: {
    type: Boolean,
    default: true,
  },

  moreActionsVisibility: {
    type: Boolean,
    default: false,
  },
  resetPasswordVisibility: {
    type: Boolean,
    default: true,
  },
  // pending distributor
  approveRequestsVisibility: {
    type: Boolean,
    default: false,
  },
  declineRequestsVisibility: {
    type: Boolean,
    default: false,
  },
  viewOnboardingFormVisibility: {
    type: Boolean,
    default: false,
  },

  roleAndPermissionVisibility: {
    type: Boolean,
    default: true,
  },

  tableCheckBoxVisibility: {
    type: Boolean,
    default: false,
  },

  tableSearchVisibility: {
    type: Boolean,
    default: true,
  },
  export: {
    type: Boolean,
    default: false,
  },
  refresh: {
    type: Boolean,
    default: false,
  },
  filter: {
    type: Boolean,
    default: false,
  },
  filterData: {
    type: Array,
    default: [],
    required: false,
  },
  downloadVisibility: {
    type: Boolean,
    default: false,
  },
  downloadLinkContent: {
    type: String,
    required: false,
    default: "",
  },
});

let tableDataItems = computed(() => {
  return props.tableData ? props.tableData.items : [];
});

let tableDataTotal = computed(() => {
  return props.tableData ? props.tableData.total : 0;
});

function handleProductView(item) {
  emit("handleProductView", item);
}

function handleDownload(index, row) {
  emit("handleDownload", row);
}
function handleViewReceipt(row) {
  emit("handleViewReceipt", row);
}
function handleResetPassword(row) {
  emit("resetPassword", row);
}

function handleAssignRolesAndPermissions(row) {
  emit("rolePermission", row);
}

function handlePagination() {
  emit("pagination");
}

function handleView(data) {
  emit("view", data);
}

function handleAdd() {
  emit("add");
}
function handleEdit(row) {
  emit("edit", row);
}

function handleDelete(row) {
  emit("delete", row);
}

function handleMultipleSelectionChange(val) {
  multipleSelection = val;
  emit("multipleSelection", multipleSelection);
}
</script>

<style scoped lang="scss">
.filter_wrap {
  position: relative;
}
</style>
