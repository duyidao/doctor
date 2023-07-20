<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getHospitalApi } from '@/apis/home/index.ts'
import type { Content, HospitalResponseType } from '@/apis/home/type.ts'
// 引入轮播图组件
import HomeCarousel from "./carousel/index.vue";
// 引入搜索组件
import HomeSearch from "./search/index.vue";
// 引入医院等级组件
import HomeLevel from "./level/index.vue";
// 引入地区选择组件
import HomeRegion from "./region/index.vue";
// 引入医院组件
import HomeCard from "./card/index.vue";

const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(0);
const hospitalList = ref<Content[]>([])
// 获取医院列表数据
const getHospitalFn = async () => {
  const res: HospitalResponseType = await getHospitalApi(currentPage.value, pageSize.value)
  if(res.code === 200) {
    hospitalList.value = res.data.content
    total.value = res.data.totalElements
  }
}
onMounted(() => getHospitalFn())

// 分页器修改分页
const handleCurrentChange = (e: number) => {
  currentPage.value = e
  getHospitalFn()
};
const handleSizeChange = (e: number) => {
  pageSize.value = e
  getHospitalFn()
};
</script>

<template>
  <div class="home">
    <!-- 轮播图 -->
    <HomeCarousel />

    <!-- 自动补全搜索 -->
    <HomeSearch />

    <!-- 底部展示医院结构 -->
    <el-row>
      <el-col :span="20">
        <!-- 等级 -->
        <HomeLevel />
        <!-- 地区 -->
        <HomeRegion />
        <!-- 医院 -->
        <div class="card">
          <HomeCard v-for="item in hospitalList" :key="item.id" :item="item" class="item" />
        </div>
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          :background="true"
          layout="prev, pager, next, jumper, ->, total, sizes"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
        
      </el-col>
      <el-col :span="4"> </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .item {
    width: 48%;
    margin: 10px 0;
  }
}

.el-pagination {
  margin-bottom: 20px;
}
</style>
