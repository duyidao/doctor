<script setup lang="ts">
import { ref, onMounted } from "vue";
import { User } from "@element-plus/icons-vue";
import { findAllUserApi } from "@/apis/hospital/index.ts";
import Visitor from "@/pages/hospital/register/components/visitor.vue";

// 获取就诊人信息与医生信息
const userList = ref<any[]>([]);
const getUserListFn = async () => {
  const res = await findAllUserApi();
  userList.value = res.data;
};

const choseUserIndex = ref<number>(-1);

onMounted(() => {
  getUserListFn();
});

const changeUserFn = (i: number) => {
  choseUserIndex.value = i;
};

const showForm = ref<boolean>(false);

// 点击添加就诊人按钮
const onClickBtnFn = (e: any = {}) => {
  showForm.value = true;
  console.log(e);
};
</script>

<template>
  <el-card>
    <template #header>
      <div class="header">
        <div>就诊人管理</div>
        <el-button type="primary" :icon="User" @click="onClickBtnFn"
          >添加就诊人</el-button
        >
      </div>
    </template>

    <!-- 就诊人列表 -->
    <div class="user" v-if="!showForm">
      <Visitor
        class="visitor-item"
        v-for="(item, index) in userList"
        :key="item.id"
        :item="item"
        :hasChose="choseUserIndex === index"
        hasDelete
        @click="changeUserFn(index)"
        @onEdit="onClickBtnFn"
      />
    </div>

    <!-- 添加、修改就诊人 -->
    <div class="form" v-else>
      <el-divider content-position="left">就诊人信息</el-divider>
      <el-form style="margin: 25px 0; width: 80%">
        <el-form-item label="用户姓名">
          <el-input placeholder="请输入用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="证件类型">
          <el-select placeholder="请选择证件类型" style="width: 100%">
            <el-option label="户口本"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码">
          <el-input placeholder="请输入证件号码"></el-input>
        </el-form-item>
        <el-form-item label="用户性别">
          <el-radio-group>
            <el-radio label="1" size="large">男</el-radio>
            <el-radio label="0" size="large">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker
            type="date"
            placeholder="请选择出生日期"
            size="default"
          />
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input placeholder="请输入手机号码"></el-input>
        </el-form-item>
      </el-form>

      <el-divider content-position="left"
        >建档信息（完善后部分医院首次就诊不排队建档）</el-divider
      >
      <el-form style="margin: 25px 0; width: 80%">
        <el-form-item label="婚姻状况">
          <el-radio-group>
            <el-radio label="1" size="large">已婚</el-radio>
            <el-radio label="0" size="large">未婚</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.header {
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
</style>
