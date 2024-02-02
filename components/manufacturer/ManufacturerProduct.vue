<template>
  <div class="m_prod">
    <h4 class="prod_title">Steel</h4>
    <el-row>
      <el-col :xs="12" :sm="8" :md="6" :lg="4">
        <div class="prod_item">
          <img src="@/assets/img/profile-layout-header.jpg" alt="" />
          <span>3kg|Steel</span>
        </div>
      </el-col>
      <el-col :xs="12" :sm="8" :md="6" :lg="4">
        <div class="prod_item">
          <img src="@/assets/img/profile-layout-header.jpg" alt="" />
          <span>6kg|Steel</span>
        </div>
      </el-col>
      <el-col :xs="12" :sm="8" :md="6" :lg="4">
        <div class="prod_item">
          <img src="@/assets/img/profile-layout-header.jpg" alt="" />
          <span>12kg|Steel</span>
        </div>
      </el-col>
    </el-row>
  </div>
  <div class="m_prod">
    <h4 class="prod_title">Composite</h4>
    <el-row>
      <el-col :xs="12" :sm="8" :md="6" :lg="4">
        <div class="prod_item">
          <img src="@/assets/img/profile-layout-header.jpg" alt="" />
          <span>3kg|Steel</span>
        </div>
      </el-col>
      <el-col :xs="12" :sm="8" :md="6" :lg="4">
        <div class="prod_item">
          <img src="@/assets/img/profile-layout-header.jpg" alt="" />
          <span>6kg|Steel</span>
        </div>
      </el-col>
      <el-col :xs="12" :sm="8" :md="6" :lg="4">
        <div class="prod_item">
          <img src="@/assets/img/profile-layout-header.jpg" alt="" />
          <span>12kg|Steel</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.m_prod {
  margin-top: 35px;

  .prod_title {
    color: var(--black);
    font-size: 20px;
    font-weight: 600;
    line-height: 27.4px;
    margin: 0;
    margin-bottom: 20px;
  }

  .prod_item {
    display: block;
    text-align: center;

    img {
      width: 100%;
      height: 165px;
      object-fit: cover;
      object-position: center;
      border-radius: 12px;
      overflow: hidden;
    }

    span {
      display: block;
      color: #656565;
      font-size: 16px;
      font-weight: 500;
      line-height: 22px;
      margin-top: 10px;
    }
  }

  &:last-child {
    margin-bottom: 0;
  }

  .el-row {
    margin: -20px;

    .el-col {
      padding: 20px;
    }
  }
}
</style>
