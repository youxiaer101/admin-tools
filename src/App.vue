<template>
  <div class="card-wrapper">
    <div class="filter-section">
      <InputWithSelect />

      <el-button  :icon="Filter" circle @click="toggleFilterDrawer" />
    </div>

    <div class="tab-section">
      <el-tabs v-model="selectedTab" class="card-tabs" @tab-change="handleTabChange">
        <el-tab-pane v-for="tab in tabs" :key="tab.name" :label="tab.label" :name="tab.name"
          v-infinite-scroll="() => loadMoreCards()" :infinite-scroll-distance="tab.infiniteScrollDistance">
          <Cards :assets="cards" @edit="openEditDrawer" />
          <div v-if="isLoading" class="loading-tip">Loading...</div>
        </el-tab-pane>
      </el-tabs>
      <el-icon class="refresh" @click="refresh" style="cursor: pointer;"><RefreshRight /></el-icon>
    </div>

    <el-drawer v-model="isEditDrawerOpen" :show-close="false" size="370px">
      <template #header>
       {{singleCard.Title}}
      </template>
      
      <el-skeleton v-if="cardDetailLoading" :rows="6" animated />
      <EditCard :data="singleCard" @cancel="cancelClick" @save="saveClick" v-else/>

    </el-drawer>

    <el-drawer v-model="isFilterDrawerOpen" size="395px">
      <SearchFilter @startSearch="searchCards" />
    </el-drawer>
  </div>
</template>

<script setup>
import InputWithSelect from "./components/InputWithSelect.vue";
import Cards from "./components/Cards.vue";
import SearchFilter from "./components/SearchFilter.vue";
import { ref, onBeforeMount } from "vue";
import { queryCardList, getCardDetail } from "./services/card.service";
import EditCard from "./components/EditCard.vue";
import {
  Filter,
  QuestionFilled,
  RefreshRight,
  Avatar,
  CollectionTag,
  View,
} from "@element-plus/icons-vue";
import { ReviewStatus } from "./types/enums";
//import { convertISODateToTimeStamp } from "@/utils/biz-utils";

const isFilterDrawerOpen = ref(false);
const isEditDrawerOpen = ref(false);
const cards = ref([]);
const isLoading = ref(false);
const cardDetailLoading = ref(false);
const selectedTab = ref("-1");
const currentPage = ref(1);
const singleCard =ref({});
const editDrawerTitle = ref({});
const pageSize = 5;
let hasNextPage = true;

const tabs = [
  { name: "-1", label: "ALL", infiniteScrollDistance: pageSize },
  { name: "0", label: "PENDING", infiniteScrollDistance: pageSize },
  { name: "1", label: "PASSED", infiniteScrollDistance: pageSize },
  { name: "2", label: "NOTPASS", infiniteScrollDistance: pageSize }
];

const handleTabChange = () => {
  cards.value.length = 0;
  currentPage.value = 1;
  hasNextPage = true;
  loadCards();
};

const loadMoreCards = () => {
  if (!isLoading.value && hasNextPage) {
    loadCards();
  }
};

const loadCards = async () => {
  if (!isLoading.value && hasNextPage) {
    isLoading.value = true;
    const offset = (currentPage.value - 1) * pageSize;
    const req = {
      AType: "Choose_C-I",
      offset: offset,
      size: pageSize,
      ...(selectedTab.value !== "-1" && { ReviewStatus: [parseInt(selectedTab.value)] })
    };
    const [newCards, total] = await queryCardList(req);
    hasNextPage = currentPage.value * pageSize < total;
    cards.value.push(...newCards);
    isLoading.value = false;
    currentPage.value++;
  }
};

const refresh = () => {
  handleTabChange();
};

const openEditDrawer = (id) => {
  cardDetailLoading.value=true;
  isEditDrawerOpen.value = true;
  getCardDetail(id).then((data)=>{
    console.log("showEdit")
    singleCard.value =data;
    cardDetailLoading.value=false;
  });

};

const toggleFilterDrawer = () => {
  isFilterDrawerOpen.value = !isFilterDrawerOpen.value;
};

const searchCards = (queryData) => {
  //convertISODateToTimeStamp();
  loadCards(queryData);
};
const saveClick =(data)=>{
  console.log(data);
}
const cancelClick =()=>{
  isEditDrawerOpen.value = false;
}
onBeforeMount(() => {
  handleTabChange();
});

</script>


<style scoped>
.card-wrapper {
  padding: 1rem;
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
.tab-section {
  position: relative;
}
.filter-section {
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.refresh {
  position: absolute;
  top: 0.8rem;
  right: 0;
  z-index: 10;
}
.infinite-list {
  /* 设置你的样式 */
  height: 500px;
  overflow-y: auto;

  padding: 10px;
}

.loading-tip {
  text-align: center;
  margin-top: 10px;
}
</style>
