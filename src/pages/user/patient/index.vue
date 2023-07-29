<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { User } from "@element-plus/icons-vue";
import { findAllUserApi } from "@/apis/hospital/index.ts";
import {
  getCertifiteTypeApi,
  getCityApi,
  addUserApi,
  updateUserApi,
} from "@/apis/user/index.ts";
import type {
  CertifiteResponseType,
  CertifiteItemType,
  AddUpdateDataType,
} from "@/apis/user/type.ts";
import Visitor from "@/pages/hospital/register/components/visitor.vue";
import { ElMessage, type CascaderProps } from "element-plus";

const route = useRoute();
const router = useRouter();

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
    if (res.code === 200) {
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

  // 判断从哪个页面来的
  if (route.query.type === "add") showForm.value = true;
});

const changeUserFn = (i: number) => {
  choseUserIndex.value = i;
};

const showForm = ref<boolean>(false);

// 点击添加就诊人按钮
const onClickBtnFn = (e: any = {}) => {
  showForm.value = true;
  userData.value = e;
};

const userData = ref<AddUpdateDataType>({} as AddUpdateDataType);

// 点击提交按钮
const onSubmitFn = async () => {
  let res = null;
  if (userData.value.id) {
    // 编辑操作
    res = await updateUserApi(userData.value);
  } else {
    // 新增操作
    res = await addUserApi(userData.value);
  }

  // 是否成功
  if (res.code === 200) {
    // 从别的页面过来的，返回回去
    if (route.query.type === "add") {
      router.back();
    } else {
      ElMessage.success("就诊人操作成功");
      getUserListFn();
    }
    showForm.value = false;
  } else {
    ElMessage.error(res.message);
  }
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
          hasDelete
          @click="changeUserFn(index)"
          @onEdit="onClickBtnFn"
        />
      </template>
    </div>

    <!-- 添加、修改就诊人 -->
    <div class="form" v-else>
      <el-divider content-position="left">就诊人信息</el-divider>
      <el-form style="margin: 25px auto; width: 80%">
        <el-form-item label="用户姓名">
          <el-input
            v-model="userData.name"
            placeholder="请输入用户姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="证件类型">
          <el-select
            v-model="userData.certificatesType"
            placeholder="请选择证件类型"
            style="width: 100%"
          >
            <el-option
              v-for="item in certifiteTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码">
          <el-input
            v-model="userData.certificatesNo"
            placeholder="请输入证件号码"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户性别">
          <el-radio-group v-model="userData.sex">
            <el-radio :label="1" size="large">男</el-radio>
            <el-radio :label="0" size="large">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker
            type="date"
            value-format="YYYY-MM-DD"
            v-model="userData.birthdate"
            placeholder="请选择出生日期"
            size="default"
          />
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input
            v-model="userData.phone"
            placeholder="请输入手机号码"
          ></el-input>
        </el-form-item>
      </el-form>

      <el-divider content-position="left"
        >建档信息（完善后部分医院首次就诊不排队建档）</el-divider
      >
      <el-form style="margin: 25px auto; width: 80%">
        <el-form-item label="婚姻状况">
          <el-radio-group v-model="userData.isMarry">
            <el-radio :label="1" size="large">已婚</el-radio>
            <el-radio :label="0" size="large">未婚</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="自费/医保">
          <el-radio-group v-model="userData.isInsure">
            <el-radio :label="1" size="large">自费</el-radio>
            <el-radio :label="0" size="large">医保</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="当前住址">
          <el-cascader v-model="userData.addressSelected" :props="props" />
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input
            v-model="userData.address"
            placeholder="请输入详细地址"
          ></el-input>
        </el-form-item>
      </el-form>

      <el-divider content-position="left">紧急联系人信息（选填）</el-divider>
      <el-form style="margin: 25px auto; width: 80%" label-width="80">
        <el-form-item label="用户姓名">
          <el-input
            v-model="userData.contactsName"
            placeholder="请输入用户姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="证件类型">
          <el-select
            v-model="userData.contactsCertificatesType"
            placeholder="请选择证件类型"
            style="width: 100%"
          >
            <el-option
              v-for="item in certifiteTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码">
          <el-input
            v-model="userData.contactsCertificatesNo"
            placeholder="请输入证件号码"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input
            v-model="userData.contactsPhone"
            placeholder="请输入手机号码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmitFn">提交</el-button>
          <el-button @click="userData = {}">重置</el-button>
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
