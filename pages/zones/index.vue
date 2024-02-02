<template>
  <PhoneOtp @getMobileOtpData="getMobileOtpData" :isOtpNotCurrected="isOtpNotCurrected"/>
  <EmailOtp @getEmailOtpData="getEmailOtpData" :isOtpNotCurrected="isOtpNotCurrected"/>
  <EmailAndPhoneOtp @emailAndPhoneOtp="emailAndPhoneOtp" :isOtpNotCurrected="isOtpNotCurrected"/>
  
  <br>
  <div>
      <el-table
          :data="tableData"
          row-key="id"
      >
          <el-table-column prop="date" label="Date" sortable />
          <el-table-column prop="name" label="Name" sortable />
          <el-table-column prop="address" label="Address" sortable />
      </el-table>
  
      <br><br>
      <Table 
          tableHeading="Testing" 
          :addButtonVisibility="false" 
          addButtonText="Add Product"
          :tableConfig="tableConfig" 
          :tableData="listData" 
          :tableQuery="listQuery" 
          :tableCheckBoxVisibility="false"
      />
      <br/>
      <section style="height:500px;text-align:center;margin-top:200px;">
        <DatePicker placeholder="Birth date" :disablePast="true"/>
      </section>
      </div>
  
  </template>
  <script setup>
  import PhoneOtp from '~/components/otp/PhoneOtp.vue';
  import EmailOtp from '~/components/otp/EmailOtp.vue';
  import EmailAndPhoneOtp from '~/components/otp/EmailAndPhoneOtp.vue';
  import Table from "@/components/tables/Table.vue";
  import DatePicker from "@/components/DatePicker.vue"
  

  const isOtpNotCurrected=ref(false);
  
  const holidays = ref([
    "04-11-2023",
    "11-11-2023",
    "18-11-2023",
    "25-11-2023",
  ])
  
  function getMobileOtpData(data){
  console.log("Mobile OTP:",data)
  }
  function getEmailOtpData(data){
      console.log("Email OTP:",data)
  }
  function emailAndPhoneOtp(mobile,email){
      console.log("Mobile OTP:",mobile)
      console.log("Email OTP:",email)
  }
  
  function resendOtp(){
      console.log("Resend OTP:",)
  }
  
  provide('resendOtp',resendOtp)
  
  
  
  
  
  let tableConfig = reactive([
      {
        label: "date",
        prop: "date",
        width: "",
        sortable: "sortable",
        className: "blueFont",
      },
      {
          label: "Name",
          prop: "name",
          width: "",
          sortable: "sortable",
          className: "redFont",
      },
      {
          label: "address",
          prop: "address",
          width: "",
          sortable: "",
          className: "blueFont",
      },
  ]);
  
  let listData = reactive({
    items: [
      {
        id: 1,
        date: '2016-05-02',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        id: 2,
        date: '2016-05-04',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        id: 3,
        date: '2016-05-01',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
        children: [
          {
            id: 31,
            date: '2016-05-01',
            name: 'wangxiaohu',
            address: 'No. 189, Grove St, Los Angeles',
          },
          {
            id: 32,
            date: '2016-05-01',
            name: 'wangxiaohu',
            address: 'No. 189, Grove St, Los Angeles',
          },
        ],
      },
      {
        id: 4,
        date: '2016-05-03',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
      },
      ],
      page: 1,
      pages: 1,
      size: 10,
      total: 60
  })
  
  let listQuery = {
    page: 1,
    limit: 10,
    search: "",
    searchJoin: "or",
    orderBy: "created_at",
    sortedBy: "desc",
  };
  
  const tableData = [
  {
      id: 1,
      date: '2016-05-02',
      name: 'wangxiaohu',
      address: 'No. 189, Grove St, Los Angeles',
  },
  {
      id: 2,
      date: '2016-05-04',
      name: 'wangxiaohu',
      address: 'No. 189, Grove St, Los Angeles',
  },
  {
      id: 3,
      date: '2016-05-01',
      name: 'wangxiaohu',
      address: 'No. 189, Grove St, Los Angeles',
      children: [
      {
          id: 31,
          date: '2016-05-01',
          name: 'wangxiaohu',
          address: 'No. 189, Grove St, Los Angeles',
      },
      {
          id: 32,
          date: '2016-05-01',
          name: 'wangxiaohu',
          address: 'No. 189, Grove St, Los Angeles',
      },
      ],
  },
  {
      id: 4,
      date: '2016-05-03',
      name: 'wangxiaohu',
      address: 'No. 189, Grove St, Los Angeles',
  },
  ]
    
  
  
  
  </script>
  