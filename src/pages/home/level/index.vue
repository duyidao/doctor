<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getHospitalDictCodeApi } from '@/apis/home/index.ts'
import type { DictCodeResponseType, DictCodeType } from '@/apis/home/type.ts'

const hospitalLevelArr = ref<DictCodeType[]>([])
// 获取医院等级
const getHospitalDictCodeFn = async () => {
  const res: DictCodeResponseType = await getHospitalDictCodeApi('HosType')
  if(res.code === 200) {
    hospitalLevelArr.value = res.data
  }
}
onMounted(() => getHospitalDictCodeFn())

// 点击改变医院等级
const levelActive = ref('')
const changeLevelFn = (e: string = '') => {
  levelActive.value = e
}
</script>

<template>
  <div class="level">
    <h1>医院</h1>
    <div class="content">
      <div class="left">等级：</div>
      <ul>
        <li :class="{'active': levelActive === ''}">全部</li>
        <li :class="{'active': levelActive === item.value}" v-for="item in hospitalLevelArr" :key="item.value" @click="changeLevelFn(item.value)">{{ item.name }}</li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.level {
  color: #7f7f7f;
  margin-top: 10px;
  h1 {
    font-weight: 900;
    margin-bottom: 20px;
  }

  .content {
    display: flex;

    .left {
      margin-right: 15px;
    }

    ul {
      display: flex;

      li {
        margin-right: 15px;
        cursor: pointer;

        &.active {
          color: #55a6fe;
        }

        &:hover {
          color: #55a6fe;
        }
      }
    }
  }
}
</style>
