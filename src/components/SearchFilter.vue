<template>
  <div class="hello">
    <el-form label-position="top" :model="conditionForm" ref="conditionFormRef">
      <el-form-item label="Create Date:">
        <el-date-picker v-model="conditionForm.createDateRange" type="daterange" unlink-panels range-separator="To"
          start-placeholder="Start date" end-placeholder="End date" :shortcuts="shortcuts" />
      </el-form-item>
      <el-form-item label="Author:">
        <el-select v-model="conditionForm.author" 
          placeholder="Select" style="width: 100%">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="Review User:">
        <el-select v-model="conditionForm.reviewUser"  placeholder="Select" style="width: 100%">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="Tag">
        <el-checkbox-group v-model="conditionForm.status">
          <el-checkbox-button v-for="status in statusList" :key="status.code" :value="status.code">
            {{ status.desc }}
          </el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(conditionFormRef)">Search</el-button>
        <el-button @click="resetForm(conditionFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, defineEmits } from "vue";
const conditionFormRef = ref();
const conditionForm = reactive({
  createDateRange: "",
  author: "",
  reviewUser: "",
  status: [],
});
const emits = defineEmits(['startSearch']);

const submitForm = (formEl: any) => {
  if (!formEl) return;
  emits('startSearch', conditionForm);
};
const resetForm = (formEl: { clearValidate: () => void; }) => {
  if (!formEl) return;
  formEl.clearValidate();
  conditionForm.createDateRange = "";
  conditionForm.author = "";
  conditionForm.reviewUser = "";
  conditionForm.status = [];
};
const options = [
  {
    value: "001",
    label: "Zhang San",
  },
  {
    value: "002",
    label: "Yang BaoQaing",
  },
  {
    value: "003",
    label: "Mou DaBao",
  },
  {
    value: "004",
    label: "Fu XiaoMing",
  },
];
const statusList = [
 {code:0, desc:"Pending"} ,{code:1, desc:"Passed"}, {code:2, desc:"NotPassed"}
];
const shortcuts = [
  {
    text: "Last week",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    },
  },
  {
    text: "Last month",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    },
  },
  {
    text: "Last 3 months",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      return [start, end];
    },
  },
];
</script>
