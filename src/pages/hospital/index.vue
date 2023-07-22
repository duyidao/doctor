<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  Document,
  ChatDotSquare,
  House,
  Bell,
  MessageBox,
  Search,
} from "@element-plus/icons-vue";
import useDetailStore from "@/store/modules/hospitalDetail";
const { getHospDetailFn } = useDetailStore();

const route = useRoute();
const router = useRouter();
// 点击前往首页按钮
const handleHomeFn = () => {
  router.push({
    path: "/doctor/home",
  });
};

// 组件挂载完毕，调用pinia仓库内的函数调用接口获取数据
onMounted(() => getHospDetailFn(route.query.code));
</script>

<template>
  <div class="hospital">
    <!-- 左侧导航区域 -->
    <div class="menu">
      <div class="top" @click="handleHomeFn">
        <el-icon><House /></el-icon>
        <span>首页</span>
      </div>
      <el-menu
        :default-active="route.path"
        router
        class="el-menu-vertical-demo"
      >
        <el-menu-item index="/doctor/hospital/register">
          <el-icon><ChatDotSquare /></el-icon>
          <span>预约挂号</span>
        </el-menu-item>
        <el-menu-item index="/doctor/hospital/detail">
          <el-icon><document /></el-icon>
          <span>医院详情</span>
        </el-menu-item>
        <el-menu-item index="/doctor/hospital/notice">
          <el-icon><Bell /></el-icon>
          <span>预约通知</span>
        </el-menu-item>
        <el-menu-item index="/doctor/hospital/close">
          <el-icon><MessageBox /></el-icon>
          <span>停诊信息</span>
        </el-menu-item>
        <el-menu-item index="/doctor/hospital/search">
          <el-icon><Search /></el-icon>
          <span>查询/取消</span>
        </el-menu-item>
      </el-menu>
    </div>

    <!-- 右侧内容展示区域 -->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hospital {
  display: flex;
  justify-content: space-between;

  .menu {
    flex: 2;

    .top {
      display: flex;
      align-items: center;
      height: 56px;
      padding: 0 25px;
      font-size: 14px;
      cursor: pointer;
      border-right: solid 1px var(--el-menu-border-color);

      &:hover {
        background-color: #ecf5ff;
      }

      span {
        margin-left: 15px;
      }
    }
  }

  .content {
    flex: 8;
    padding: 30px;
    box-sizing: border-box;
  }
}
</style>
