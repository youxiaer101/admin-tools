<template>
    <el-input v-model="inputValue" style="max-width: 600px" placeholder="Please input" class="input-with-select">
      <template #prepend>
        <el-select v-model="selectedValue" placeholder="Select" style="width: 200px">
          <el-option
            v-for="option in options"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          ></el-option>
        </el-select>
      </template>
      <template #append>
        <el-button :icon="searchIcon" />
      </template>
    </el-input>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { ElSelect, ElOption, ElInput, ElButton } from 'element-plus';
  import {Search} from '@element-plus/icons-vue';
  
  const inputValue = ref('');
  const selectedValue = ref('1');
  const options = ref([
    { value: '1', label: 'Select Picture From Text' }
  ]);

  const searchIcon = ref(Search);
  </script>
  
  <style scoped>
  .input-with-select {
    position: relative;
  }
  
  .input-with-select .el-input__inner {
    padding-left: 130px; /* Adjust based on the select width */
  }
  </style>