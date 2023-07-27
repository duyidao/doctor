<script setup lang="ts">
import { ref, onMounted } from "vue";
import { findAllUserApi, getDoctorApi } from "@/apis/hospital/index.ts";
import type {
  DoctorItemType,
  DoctorInfoResponseType,
} from "@/apis/hospital/type.ts";
import Visitor from "./components/visitor.vue";
import { User } from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router";
import { submitOrderApi } from "@/apis/user/index";
import { ElMessage } from "element-plus";

const route = useRoute();
const router = useRouter();

// 获取就诊人信息与医生信息
const userList = ref<any[]>([]);
const getUserListFn = async () => {
  const res = await findAllUserApi();
  console.log(res);
  userList.value = res.data;
};

const doctorInfo = ref<DoctorItemType>({});
const getDoctorInfotFn = async () => {
  const res: DoctorInfoResponseType = await getDoctorApi(
    route.query.id as string
  );
  console.log(res);
  doctorInfo.value = res.data;
};

onMounted(() => {
  getUserListFn();
  getDoctorInfotFn();
});

// 存储用户选择就诊人的索引值
const choseUserIndex = ref<number>(-1);

const changeUserFn = (i: number) => {
  choseUserIndex.value = i;
};

// 获取订单
const getOrderFn = async () => {
  const res = await submitOrderApi(
    doctorInfo.value.hoscode as string,
    doctorInfo.value.id as string,
    userList.value[choseUserIndex.value].id as number
  );

  if (res.code === 200) {
    router.push({
      path: "/doctor/user/order",
      query: {
        orderId: res.data,
      },
    });
  } else {
    ElMessage.error(res.message);
  }
};
</script>

<template>
  <div class="register_info">
    <h1 class="tip">确认挂号信息</h1>

    <!-- 卡片：就诊人信息 -->
    <el-card>
      <template #header>
        <div class="card-header">
          <span>请选择就诊人</span>
          <el-button :icon="User" type="primary">添加就诊人</el-button>
        </div>
      </template>
      <!-- 就诊人信息 -->
      <div class="user">
        <el-empty
          style="margin: 0 auto"
          v-if="userList.length <= 0"
          description="暂无就诊人信息"
        />
        <template v-else>
          <Visitor
            class="visitor-item"
            v-for="(item, index) in userList"
            :key="item.id"
            :item="item"
            :hasChose="choseUserIndex === index"
            @click="changeUserFn(index)"
          />
        </template>
      </div>
    </el-card>

    <!-- 卡片：医生信息 -->
    <el-card>
      <template #header>
        <div class="card-header">
          <span>挂号信息</span>
        </div>
      </template>
      <!-- 卡片表格内容 -->
      <el-descriptions :column="2" border>
        <el-descriptions-item label="就诊日期">{{
          doctorInfo.workDate
        }}</el-descriptions-item>
        <el-descriptions-item label="就诊医院">{{
          doctorInfo.param?.hosname
        }}</el-descriptions-item>
        <el-descriptions-item label="就诊科室">{{
          doctorInfo.param?.depname
        }}</el-descriptions-item>
        <el-descriptions-item label="医生名字">{{
          doctorInfo.docname
        }}</el-descriptions-item>
        <el-descriptions-item label="医生职称">{{
          doctorInfo.title
        }}</el-descriptions-item>
        <el-descriptions-item label="医生专长">{{
          doctorInfo.skill
        }}</el-descriptions-item>
        <el-descriptions-item label="服务费">{{
          doctorInfo.amount
        }}</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <div style="width: 100%; text-align: center">
      <el-button
        @click="getOrderFn"
        :disabled="choseUserIndex === -1"
        type="primary"
        >确认就诊人</el-button
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.register_info {
  h1 {
    height: 80px;
    line-height: 80px;
    font-weight: 900;
    color: #7f7f7f;
    font-size: 28px;
  }

  :deep(.el-card) {
    margin-bottom: 20px;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .user {
    display: flex;
    flex-wrap: wrap;

    .visitor-item {
      width: 32%;
      margin: 0 16px 20px 0;

      &:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
}
</style>
