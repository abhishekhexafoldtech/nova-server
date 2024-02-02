<template>
  <section class="verification-section">
    <h3>Physical verification form</h3>
    <div class="verification-content">
      <el-form>
        <h4>Upload clicked images or pdfs of distributor outlet</h4>
        <!-- checkbox  -->
        <div class="verification__check-list">
          <p>
            Please confirm that you've verified the business following aspects
          </p>
          <div class="verification__checkbox">
            <label for="protocol">File protocol being followed</label>
            <el-checkbox type="checkbox" id="protocol" v-mode="formVerfication.fileProtocal"/>
          </div>
          <div class="verification__checkbox">
            <label for="ignition"
              >Are ignition sources controlled to reduce the chance of
              fire?</label
            >
            <el-checkbox type="checkbox" id="ignition" v-model="formVerfication.chanceOfFire"/>
          </div>
        </div>
        <div>
          <el-upload
          class="el-upload__file"
          drag
          multiple
          v-model:file-list="fileList"
          :on-progress="handleOnProgress"
          :on-success="handleOnSuccess"
          :before-upload="handleBeforeUpload"
          :on-error="handleOnError"
          :on-remove="handleReomve"
          :show-file-list="false"
          :progress="true"
          :with-credentials="true"
          >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            <div>Drop and drop files here or upload</div>
            <p>Accepted file types: JPEG, PDF, PNG</p>
            <p>Maximum upload size: 1.54MB</p>
          </div>
        </el-upload>
        <div class="uploaded-files">
          <el-progress
                color="green"
                class="uploaded-files__progress"
                v-if="fileList.length"
                v-for="file in fileList"
                :percentage="file.percentage"
                required
              >
                <div text>
                  <p><i class="fa fa-file-text-o" aria-hidden="true"> &nbsp; {{file.name}} &nbsp;&nbsp; {{(file.size/1048576).toFixed(3)}} MB</i></p>
                  <p>{{file.percentage}} %</p>
                </div>
                <span @click="handleReomve(file.uid)" class="uploaded-files__cross"><i class="fa fa-times-circle-o" aria-hidden="true"></i></span>
              </el-progress>
        </div>
        <div class="verification__checkbox display-flex-reverse">
          <label for="protocol">Please confirm that you have verified the distributor's outlet and upload your signature.</label>
          <el-checkbox type="checkbox" id="protocol" required v-model="formVerfication.signature"/>
        </div>
        </div>    
        <div class="signature mb-4 pt-3 d-flex flex-column">
          Inspector signature
          <img src="https://imgs.search.brave.com/Tu7rbo1haeUEZhvm74TQX1r3wntNtBIRPCcAad67JjU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuY2RuLndpc2Vz/dGFtcC5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMjAvMDgv/QmlsbC1DbGludG9u/LWhhbmQtc2lnbmF0/dXJlLTEucG5n" alt="" width="125" >
        </div>
          <div class="comp_footer d-flex gap-3">
            <button class="btn btn-default" @click.prevent="handleCancel">
              Cancel
            </button>
            <button
              class="btn btn-primary"
              type="primary"
              @click.prevent="handleSubmit"
            >
              Save
            </button>
          </div>
      </el-form>
    </div>
  </section>
</template>

<script setup>
import { UploadFilled } from '@element-plus/icons-vue';
const fileList = ref([]);
const formVerfication= reactive(
  {
    fileProtocal: false,
    chanceOfFire: false,
    signature: false
  }
)
function handleBeforeUpload(rawFile){
  if (rawFile.size / 1024 / 1024 > 1.54) {
      flashNotification("warning", "File size is too large.")
        return false
    }
    return true
}
function handleOnProgress(evt){
  //   console.log("progress", evt);
}
function handleOnSuccess(){
    // console.log(fileList.value)
}
function handleOnError(){
  flashNotification("Error", "Please check your network")
}
function handleReomve(uidToDelete){
  fileList.value = fileList.value.filter(obj => obj.uid !== uidToDelete);
}
function handleCancel(){
  console.log("handle cancel")
}
function handleSubmit(){
  if(!fileList.value.length){
    flashNotification("warning","Please upload atleast one file");
  }else if(!formVerfication.signature){
    flashNotification("warning","Please confirm you verified and uploaded signature.")
  }else{
    flashNotification("success", "Your physical verification details are now submitted, Thank you.")
  }
}
</script>

<style scoped lang="scss">
.verification {
  &-section {
    background-color: white;
    margin: 50px 20px;
    color: var(--black);
    border-radius: 20px;
    overflow: hidden;
    h3 {
      background: rgba(131, 146, 171, 0.2);
      text-align: center;
      height: 90px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 28px;
      border-radius: 0 0 20px 20px;
      overflow: hidden;
    }
  }
  &-content {
    margin: auto 70px;
    h4 {
      font-weight: 600;
      font-size: 20px;
      padding: 20px 0;
    }
  }
  &__check-list {
    border: 1px solid rgba(131, 146, 171, 0.4);
    border-radius: 15px;
    padding: 30px;
    margin-right: 150px;
  }
  &__checkbox {
    display: flex;
    justify-content: left;
    label {
      flex: 0.35;
      align-items: end;
      height: fit-content;
      font-weight: 400;
      font-size: 14px;
      line-height: 1.5;
      cursor: pointer;
    }
    .el-checkbox {
      display: flex;
      align-items: center;
      width:20px;
      height: 20px;
      cursor: pointer;
    }
  }
}
.el-upload {
    &__text{
        div {
            font-weight: 400;
            color: #8392AB;
            font-size: 12px;
            margin-bottom: 15px;
        }
        p{
            font-size: 10px;
            font-weight: 300;
            color: #8392AB;
            line-height: 0.8;
        }
    }
    &__file{
        margin:50px 150px 50px 0;
    }
}
.el-icon{
   font-size: 36px;
}
.uploaded-files{
  width:800px;
  &__progress {
    margin-top: 30px;
    margin-bottom: 20px;
    width: 100%;
    display: inline-block;
    div {
      width: 100%;
      left: 0px;
      top: 10px;
      position: absolute;
      display: inline-flex;
      justify-content: space-between;
      transform: translateY(-100%);
      font-size: 20px;
      p:not(:last-child){
        font-weight: 600;
        color: rgba(123, 128, 154, 1);
      }
    }
  }
  &__cross{
    text-align: right;
    display: block;
    position: absolute;
    right:-60px;
    bottom: 10px;
    font-size: 20px;
    cursor: pointer;
    display: inline-block;
  }
}
.display-flex-reverse{
  display: flex;
  margin-top: 30px;
  gap:10px;
  flex-direction: row-reverse;
  .el-checkbox{
    flex:0;
  }
  label{
    flex:1;
  }
}
.comp_footer{
  justify-content: end;
  margin-bottom: 50px;
  button{
    width: 211px;
  }
}
</style>


