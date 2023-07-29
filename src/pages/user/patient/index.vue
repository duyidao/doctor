<script setup lang="ts">
import { ref, onMounted } from "vue";
import { User } from "@element-plus/icons-vue";
import { findAllUserApi } from "@/apis/hospital/index.ts";
import { getCertifiteTypeApi, getCityApi } from "@/apis/user/index.ts";
import type {
  CertifiteResponseType,
  CertifiteItemType,
} from "@/apis/user/type.ts";
import Visitor from "@/pages/hospital/register/components/visitor.vue";
import type { CascaderProps } from "element-plus";

// 获取就诊人信息与医生信息
const userList = ref<any[]>([]);
const getUserListFn = async () => {
  const res = await findAllUserApi();
  userList.value = res.data;
};

const choseUserIndex = ref<number>(-1);

// 获取证件类型
const certifiteTypeList = ref<CertifiteItemType[]>([]);
const getCertifiteTypeFn = async () => {
  const res: CertifiteResponseType = await getCertifiteTypeApi();
  console.log(res);
  if (res.code === 200) {
    certifiteTypeList.value = res.data;
  }
};

// 获取城市数据
const props: CascaderProps = {
  lazy: true,
  async lazyLoad(node: any, resolve: any) {
    const res = await getCityApi(node.data.id || "86");
    let showData = [];
    if (res.data === 200) {
      // 整理数据
      showData = res.data.map((item: any) => ({
        id: item.id,
        label: item.name,
        value: item.value,
        leaf: !item.hasChildren,
      }));
    }

    // 注入数据
    resolve(showData);
  },
};

onMounted(() => {
  getUserListFn();
  getCertifiteTypeFn();
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
      <el-form style="margin: 25px auto; width: 80%">
        <el-form-item label="用户姓名">
          <el-input placeholder="请输入用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="证件类型">
          <el-select placeholder="请选择证件类型" style="width: 100%">
            <el-option
              v-for="item in certifiteTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.value"
            ></el-option>
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
      <el-form style="margin: 25px auto; width: 80%">
        <el-form-item label="婚姻状况">
          <el-radio-group>
            <el-radio label="1" size="large">已婚</el-radio>
            <el-radio label="0" size="large">未婚</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="自费/医保">
          <el-radio-group>
            <el-radio label="1" size="large">自费</el-radio>
            <el-radio label="0" size="large">医保</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="当前住址">
          <el-cascader :props="props" />
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input placeholder="请输入详细地址"></el-input>
        </el-form-item>
      </el-form>

      <el-divider content-position="left">联系人信息（选填）</el-divider>
      <el-form style="margin: 25px auto; width: 80%" label-width="80">
        <el-form-item label="用户姓名">
          <el-input placeholder="请输入用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="证件类型">
          <el-select placeholder="请选择证件类型" style="width: 100%">
            <el-option
              v-for="item in certifiteTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码">
          <el-input placeholder="请输入证件号码"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">提交</el-button>
          <el-button>重置</el-button>
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
