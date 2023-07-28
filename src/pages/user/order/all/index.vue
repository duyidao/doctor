<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  getUserOrderListApi,
  getAllUserApi,
  getAllOrderStatusApi,
} from "@/apis/user/index.ts";
import type {
  OrderListResponseType,
  OrderItemType,
  AllUserResponseType,
  AllUserItemType,
  OrderStatuResponseType,
  OrderStatuItemType,
} from "@/apis/user/type.ts";

const router = useRouter();

const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(100);

const handleSizeChange = (e: number) => {
  pageSize.value = e;
  getUserOrderListFn();
};
const handleCurrentChange = (e: number) => {
  currentPage.value = e;
  getUserOrderListFn();
};

const patientId = ref<string>("");
const orderStatus = ref<string>("");

// 获取列表数据
const orderList = ref<OrderItemType[]>([]);
const loading = ref<boolean>(false);
const getUserOrderListFn = async () => {
  loading.value = true;
  const res: OrderListResponseType = await getUserOrderListApi(
    currentPage.value,
    pageSize.value,
    patientId.value,
    orderStatus.value
  );
  if (res.code === 200) {
    orderList.value = res.data.records;
    total.value = res.data.total;
    loading.value = false;
  }
};

// 点击详情按钮
const handleDetileFn = (e: OrderItemType) => {
  router.push({
    path: "/doctor/user/order",
    query: {
      orderId: e.id,
    },
  });
};

// 获取就诊人信息和订单状态信息
const allUserList = ref<AllUserItemType[]>([]);
const getAllUserFn = async () => {
  const res: AllUserResponseType = await getAllUserApi();
  console.log(res);
  if (res.code === 200) {
    allUserList.value = res.data;
  }
};
const orderStatusList = ref<OrderStatuItemType[]>([]);
const getAllOrderStatusFn = async () => {
  const res: OrderStatuResponseType = await getAllOrderStatusApi();
  console.log(res);
  if (res.code === 200) {
    orderStatusList.value = res.data;
  }
};

onMounted(() => {
  getUserOrderListFn();
  getAllUserFn();
  getAllOrderStatusFn();
});

// 切换
const onChnageFn = () => {
  getUserOrderListFn();
};
</script>

<template>
  <div class="list">
    <el-card>
      <template #header>
        <div>挂号订单</div>
      </template>

      <!-- 用户选择下拉模块 -->
      <el-form inline>
        <el-form-item label="就诊人">
          <el-select
            v-model="patientId"
            placeholder="请选择就诊人"
            @change="onChnageFn"
          >
            <el-option label="所有就诊人" value=""></el-option>
            <el-option
              v-for="item in allUserList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select
            v-model="orderStatus"
            placeholder="请选择订单状态"
            @change="onChnageFn"
          >
            <el-option label="所有订单状态" value=""></el-option>
            <el-option
              v-for="item in orderStatusList"
              :key="item.status"
              :label="item.comment"
              :value="item.status"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <!-- 订单数据展示 -->
      <el-table
        v-loading="loading"
        :data="orderList"
        border
        style="margin: 20px 0"
      >
        <el-table-column prop="reserveDate" label="就诊时间"></el-table-column>
        <el-table-column prop="hosname" label="医院"></el-table-column>
        <el-table-column prop="depname" label="科室"></el-table-column>
        <el-table-column prop="title" label="医生"></el-table-column>
        <el-table-column prop="amount" label="服务费"></el-table-column>
        <el-table-column
          prop="param.orderStatusString"
          label="订单状态"
        ></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="text" @click="handleDetileFn(row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :small="true"
        :background="true"
        layout="prev, pager, next, jumper, ->, total, sizes"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<style scoped></style>
