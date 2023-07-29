<script setup lang="ts">
import { Edit, Delete } from "@element-plus/icons-vue";

defineProps<{
  item: any;
  hasChose?: boolean;
  hasDelete?: boolean;
}>();

const emit = defineEmits(["onEdit"]);

const onEditFn = (item: any) => {
  emit("onEdit", item);
};
</script>

<template>
  <div class="visitor">
    <div class="top">
      <div class="left">
        <div class="free">{{ item.isInsure === 1 ? "医保" : "自费" }}</div>
        <div class="username">{{ item.name }}</div>
      </div>
      <div class="right">
        <el-button
          type="primary"
          :icon="Edit"
          circle
          @click="onEditFn(item)"
        ></el-button>
        <el-button
          v-if="hasDelete"
          type="danger"
          :icon="Delete"
          circle
        ></el-button>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom-item">
        证件号码：{{ item.param.certificatesTypeString }}
      </div>
      <div class="bottom-item">证件类型：{{ item.certificatesNo }}</div>
      <div class="bottom-item">
        用户性别：{{ item.sex === 1 ? "男" : "女" }}
      </div>
      <div class="bottom-item">出生日期：{{ item.birthdate }}</div>
      <div class="bottom-item">手机号码：{{ item.phone }}</div>
      <div class="bottom-item">
        婚姻状况：{{ item.isMarry === 0 ? "未婚" : "已婚" }}
      </div>
      <div class="bottom-item">
        当前住处：{{ item.param.provinceString }}/{{ item.param.cityString }}/{{
          item.param.regionString
        }}
      </div>
      <div class="bottom-item">详细地址：{{ item.param.fullAddress }}</div>

      <!-- 已选择 -->
      <transition name="chose">
        <div v-if="hasChose" class="has_chose">已选择</div>
      </transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.visitor {
  box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.3);
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    line-height: 60px;
    background-color: #e2e2e2;
    color: #7f7f7f;
    padding: 0 25px;
    box-sizing: border-box;

    .left {
      display: flex;
      align-items: center;

      .free {
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
        font-size: 12px;
        background-color: #fff;
        margin-right: 10px;
        box-sizing: border-box;
        border-radius: 10px;
      }
    }
  }

  .bottom {
    position: relative;
    padding: 20px;

    .bottom-item {
      line-height: 30px;
    }

    .chose-enter-from {
      transform: scale(1);
    }
    .chose-enter-active {
      transition: all 0.3s;
    }
    .chose-enter-to {
      transform: scale(1.2);
    }

    .has_chose {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
      width: 200px;
      height: 200px;
      color: red;
      border-radius: 50%;
      border: 1px solid red;
      text-align: center;
      line-height: 200px;
      font-weight: bold;
      opacity: 0.5;
    }
  }
}
</style>
