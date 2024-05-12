<template>
  <div
    class="rounded-border flex-column gap-1"
    v-for="asset of assets"
    :key="asset.key"
  >
    <div class="flex-row gap-1 justify-beetwen">
      <div class="flex-row gap-1">
        <el-icon class="icon-box">
          <QuestionFilled />
        </el-icon>
        <el-link type="primary" @click="editDrawer(asset.key)" class="flex-1">
          {{ asset.title }}
        </el-link>
      </div>
      <span class="status-pending">{{ asset.Status }}</span>
    </div>

    <div class="flex-row gap-1">
      <el-icon class="icon-box"> <Avatar /> </el-icon
      >{{ formatDateByDistance(asset.InDate) }} by {{ asset.InUser }}
    </div>
    <div class="flex-row gap-1">
      <el-icon class="icon-box">
        <View />
      </el-icon>
      {{ asset.ReviewUser }} reviewed
      {{ formatDateByDistance(asset.ReviewDate) }}
    </div>
    <div class="flex-row gap-1">
      <el-icon>
        <CollectionTag />
      </el-icon>
      <el-tag type="primary">YCT-1</el-tag>
      <el-tag type="success">HSKPractice</el-tag>
    </div>
  </div>
  <el-empty :image-size="200" v-if="!hasData" />
</template>
<script lang="ts" setup>
import type { CardItem } from "@/types";

import { computed } from "vue";
import { formatDateByDistance } from "@/utils/biz-utils";
import {  QuestionFilled, Avatar, CollectionTag, View  } from '@element-plus/icons-vue';
const props = withDefaults(
  defineProps<{
    assets?: CardItem[];
  }>(),
  {}
);
const emits = defineEmits<{
  (event: "edit", data?:string): void
}>();
const assets = computed(() => props.assets);
const hasData = computed(() => props.assets && props.assets.length>0);

const editDrawer = (id:string) => {
  emits("edit", id);
};

</script>
<style scoped>
.wrap-box {
  padding: 1rem;
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
.tab-section {
  position: relative;
}
.rounded-border {
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
}
.flex-row {
  display: flex;
  align-items: center;
  width: 100%;
}
.gap-1 {
  gap: 0.5rem;
}
.justify-beetwen {
  justify-content: space-between;
}
.flex-column {
  max-width: 100%;
  display: flex;
  flex-direction: column;
}

.status-pending {
  color: #f90;
}
.icon-box {
  width: 1rem;
}

</style>
