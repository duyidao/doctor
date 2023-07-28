<script setup lang="ts">
import { ref, onMounted } from "vue";
import { InfoFilled } from "@element-plus/icons-vue";
import {
  getUserInfoApi,
  getCertifiteTypeApi,
  userCertitionApi,
} from "@/apis/user/index.ts";
import type {
  UserInfoResponseType,
  UserType,
  CertifiteResponseType,
  CertifiteItemType,
} from "@/apis/user/type.ts";
import { ElMessage } from "element-plus";

const fileList = ref([]);

// 用户信息获取
const userInfo = ref<UserType>({});
const getUserInfoFn = async () => {
  const res: UserInfoResponseType = await getUserInfoApi();
  console.log(res);
  if (res.code === 200) {
    userInfo.value = res.data;
  }
};

// 获取身份类型
const certitionList = ref<CertifiteItemType[]>([]);
const getCertifiteTypeFn = async () => {
  const res: CertifiteResponseType = await getCertifiteTypeApi();
  console.log(res);
  if (res.code === 200) {
    certitionList.value = res.data;
  }
};

onMounted(() => {
  getUserInfoFn();
  getCertifiteTypeFn();
});

// 点击提交按钮
const onCerttionFn = async () => {
  const res = await userCertitionApi(userInfo.value);
  console.log(res);
  if (res.code === 200) {
    ElMessage.success("认证成功");
    getUserInfoFn();
  } else {
    ElMessage.error(res.message);
  }
};

// 照片墙超出数量
const onExceedFn = () => {
  ElMessage.warning("最多上传一张照片");
};

// 照片墙上传成功回调
const onSuccessFn = (res: any, _file: any, _files: any) => {
  userInfo.value.certificatesUrl = res.data; // 收集上传成功的图片
};

// 照片墙预览
const dialogPreviewShow = ref<boolean>(false);
const onPreviewFn = () => {
  dialogPreviewShow.value = true;
};

// 照片墙删除图片回调
const onRemoveFn = () => {
  userInfo.value.certificatesUrl = "";
};

// 点击重写按钮
const uploadRef = ref<any>(null);
const onResetFn = () => {
  userInfo.value = {};
  uploadRef.value.clearFiles();
};
</script>

<template>
  <el-card>
    <template #header>
      <div>实名信息</div>
    </template>

    <div class="tip">
      <p>
        <el-icon><InfoFilled /></el-icon
        >完成实名认证后才能添加就诊人信息，请先实名认证
      </p>
    </div>

    <!-- 认证成功的信息 -->
    <el-descriptions
      v-if="userInfo.authStatus !== 0"
      :column="1"
      border
      style="margin: 25px 0"
      size="small"
    >
      <el-descriptions-item align="center" label="用户姓名">{{
        userInfo.name
      }}</el-descriptions-item>
      <el-descriptions-item align="center" label="证件类型">{{
        userInfo.certificatesType === "10" ? "身份证" : "户口本"
      }}</el-descriptions-item>
      <el-descriptions-item align="center" label="证件号码">{{
        userInfo.certificatesNo
      }}</el-descriptions-item>
    </el-descriptions>

    <el-form
      :model="userInfo"
      v-else
      style="margin: 30px auto; width: 60%"
      label-width="100"
    >
      <el-form-item label="用户姓名">
        <el-input
          v-model="userInfo.name"
          placeholder="请输入用户姓名"
        ></el-input>
      </el-form-item>
      <el-form-item label="证件类型">
        <el-select
          v-model="userInfo.certificatesType"
          style="width: 100%"
          placeholder="请选择证件类型"
        >
          <el-option
            v-for="item in certitionList"
            :key="item.id"
            :value="item.value"
            :label="item.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="证件号码">
        <el-input
          v-model="userInfo.certificatesNo"
          placeholder="请输入证件号码"
        ></el-input>
      </el-form-item>
      <el-form-item label="证件上传">
        <el-upload
          ref="uploadRef"
          v-model:file-list="fileList"
          :limit="1"
          action="/api/oss/file/fileUpload?fileHost=userAuah"
          list-type="picture-card"
          :on-exceed="onExceedFn"
          :on-success="onSuccessFn"
          :on-preview="onPreviewFn"
          :on-remove="onRemoveFn"
        >
          <img
            style="width: 100%; height: 100%"
            src="../../../assets/images/auth_example.png"
            alt=""
          />
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onCerttionFn">提交</el-button>
        <el-button @click="onResetFn">重写</el-button>
      </el-form-item>
    </el-form>
  </el-card>

  <el-dialog v-model="dialogPreviewShow">
    <img style="width: 100%" w-full :src="userInfo.certificatesUrl" alt="" />
  </el-dialog>
</template>

<style lang="scss" scoped>
.tip {
  color: #7f7f7f;

  p {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

:deep(.el-descriptions__label) {
  width: 100px;
}
</style>
