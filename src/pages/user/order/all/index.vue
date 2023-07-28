<script setup lang="ts">
import { ref } from "vue";
const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(100);

const handleSizeChange = (e: number) => {};
const handleCurrentChange = (e: number) => {};
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
          <el-select placeholder="请选择就诊人">
            <el-option label="所有就诊人"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select placeholder="请选择订单状态">
            <el-option label="所有订单状态"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <!-- 订单数据展示 -->
      <el-table border style="margin: 20px 0">
        <el-table-column label="就诊时间"></el-table-column>
        <el-table-column label="医院"></el-table-column>
        <el-table-column label="科室"></el-table-column>
        <el-table-column label="医生"></el-table-column>
        <el-table-column label="服务费"></el-table-column>
        <el-table-column label="订单状态"></el-table-column>
        <el-table-column label="操作"></el-table-column>
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
