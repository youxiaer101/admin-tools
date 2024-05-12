<template>
  <div>
    <el-switch
    v-model="status"
    active-text="PASS"
    inactive-text="NOT PASS"
  />
  <el-form-item label="tag">
    <el-input  
    v-model="inputValue"  
    placeholder="Please enter multiple values, separated by commas."  
    @input="updateTags"  
  ></el-input> 
    </el-form-item>
    <el-upload
      v-model:file-list="fileList"
      action="/api/admin/upload"
      :limit="4"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
    >
      <el-icon><Plus /></el-icon>
    </el-upload>

    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
    <div style="flex: auto">
        <el-button @click="cancelClick">Cancel</el-button>
        <el-button type="primary" @click="saveClick">Confirm</el-button>
      </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from "vue";
import { Plus } from "@element-plus/icons-vue";
import type { UploadProps } from "element-plus";
import { Card } from "../types/response-types";

const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const status=ref(1)
const props = withDefaults(
  defineProps<{
    data: Card;
  }>(),
  {}
);
const fileList = ref(transformData(props.data));

const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};
const tag = ref<string[]>([]);  
tag.value =props.data.Tags ?props.data.Tags :[];  
const inputValue = ref('');  
const emits = defineEmits(['cancel','save']);

const saveClick =()=>{
    emits('save', {
        tags: tag.value,
        status:status.value,
        fileList: fileList.value
    });
}
const cancelClick =()=>{
    emits('cancel');
}

function updateTags() {  
  const newTags = inputValue.value.split(',').filter(Boolean).map(tag => tag.trim());  
  tag.value = newTags;  
}  
function transformData(json: Card): Array<{ name: string; url: string }> {
  // 确保json结构是正确的
  if (
    !json.Asset ||
    !json.Asset.Data ||
    !json.Asset.Data.Options ||
    !json.Asset.Data.BaseUrl
  ) {
    throw new Error("Invalid input JSON");
  }

  const baseUrl = json.Asset.Data.BaseUrl;
  const options = json.Asset.Data.Options;

  return options.map((option: string) => {
    return {
      name: option,
      url: `${baseUrl}/${option}`,
      status: json.Asset.Data.Answer ==  option ? "success" : "ready"
    };
  });
}
</script>
