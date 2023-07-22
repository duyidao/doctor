<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getHospitalInfoApi } from "@/apis/home/index.ts";
import type { HospitalByNameResponseType, HospiatlByNameType } from "@/apis/home/type.ts";
// 引入图标
import { Search } from "@element-plus/icons-vue";

const router = useRouter()

const hosname = ref<string>('')
const hospitalArr = ref<HospiatlByNameType[]>([])

// 获取顶部组件回调
const fetchFn = async (e: string, callback: any) => {
  const res: HospitalByNameResponseType = await getHospitalInfoApi(e)
  console.log(res);
  if(res.code === 200) {
    // 整理数据
    hospitalArr.value = res.data.map(item => ({...item, value: item.hosname}))
    callback(hospitalArr.value)
  }
}

// 选择要搜索的详情
const handleSearchFn = (e) => {
  console.log(e);
  // 进入医院详情
  router.push({
    path: '/doctor/hospital'
  })
}

// 点击搜索按钮
const onSearchFn = async () => {
  console.log(hosname.value);
  
}
</script>

<template>
  <div class="search">
    <el-autocomplete
      v-model="hosname"
      :fetch-suggestions="fetchFn"
      :trigger-on-focus="false"
      clearable
      class="form"
      placeholder="请输入要查询的医院名称"
      @select="handleSearchFn"
    />
    <el-button type="primary" size="default" :icon="Search" @click="onSearchFn"></el-button>
  </div>
</template>

<style lang="scss" scoped>
.search {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  margin: 10px 0;

  :deep(.form) {
    width: 600px;
    margin-right: 15px;
  }
}
</style>
