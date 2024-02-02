<template>
  <div>
    <div class="container overflow-hidden ">
      <div class="row gap-4 " >
        <div class="col-4 mb-2 card">
          <div class="p-3 card-body">
            <!-- 1st  -->
            <div class="d-flex flex-row p-2 justify-content-around ">
              <div class="d-flex px-2 py-1">
                <div>
                  <img
                    src="@/assets/img/team-1.jpg"
                    class="avatar avatar-lg me-3"
                  />
                </div>
              </div>
              <div class="align-middle">
                <slot name="profile"></slot>
              </div>
              <div class="h-25 d-flex flex-column pt-2 w-75">
                <span class="text-l h5" style="font-weight: 600">
                  Yaw Graham
                </span>
                <span
                  class="lh-1 text-muted fw-lighter text-sm font-weight-bold position-relative start-3"
                >
                  Distributor
                </span>
              </div>
              <div class="mt-0  pt-2  text-sm d-flex">
                <img
                  class="radio-icon-position"
                  src="@/assets/svg/active_item.svg"
                  alt=""
                />
                <span class="mt-3">Active</span>
              </div>
            </div>
          </div>
        </div>

        <div class="col-7 mb-2 card">
          <div class="p-3 card-body">
            <!-- 2st  -->
            <div class="text-md font-weight-bold">ID:101</div>
            <div class="row">
              <div class="col">
                <span class="text-sm text-muted">Joining since: </span>
                <span class="text-sm font-weight-bold">2020/12/15</span>
              </div>
              <div class="col">
                <span class="text-sm text-muted">Email: </span>
                <span class="text-sm font-weight-bold"
                  >yawgraham@gmail.com</span
                >
              </div>
              <div class="w-100"></div>
              <div class="col">
                <span class="text-sm text-muted">Phone number: </span>
                <span class="text-sm font-weight-bold">0277400000</span>
              </div>
              <div class="col">
                <span class="text-sm text-muted">Subzone: </span>
                <span class="text-sm font-weight-bold">N12</span>
              </div>
              <div class="w-100"></div>
              <div class="col">
                <span class="text-sm text-muted">Zone: </span>
                <span class="text-sm font-weight-bold">Northen</span>
              </div>
              <div class="col">
                <span class="text-sm text-muted"> Address: </span>
                <span class="text-sm font-weight-bold">Agbogra-Ashongman</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
