<script setup lang="ts">
import { ref } from "vue";
import { InfoFilled } from "@element-plus/icons-vue";

const fileList = ref([]);
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
      v-if="false"
      :column="1"
      border
      style="margin: 25px 0"
      size="small"
    >
      <el-descriptions-item align="center" label="用户姓名"
        >kooriookami</el-descriptions-item
      >
      <el-descriptions-item align="center" label="证件类型"
        >18100000000</el-descriptions-item
      >
      <el-descriptions-item align="center" label="证件号码"
        >Suzhou</el-descriptions-item
      >
    </el-descriptions>

    <el-form v-else style="margin: 30px auto; width: 60%" label-width="100">
      <el-form-item label="用户姓名">
        <el-input placeholder="请输入用户姓名"></el-input>
      </el-form-item>
      <el-form-item label="证件类型">
        <el-select style="width: 100%" placeholder="请选择证件类型">
          <el-option>户口本</el-option>
          <el-option>身份证</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件号码">
        <el-input placeholder="请输入证件号码"></el-input>
      </el-form-item>
      <el-form-item label="证件上传">
        <el-upload
          v-model:file-list="fileList"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          list-type="picture-card"
        >
          <img
            style="width: 100%; height: 100%"
            src="../../../assets/images/auth_example.png"
            alt=""
          />
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">提交</el-button>
        <el-button>重写</el-button>
      </el-form-item>
    </el-form>
  </el-card>
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
