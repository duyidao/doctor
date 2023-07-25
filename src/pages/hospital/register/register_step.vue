<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getbookingApi } from '@/apis/hospital/index.ts'
import type { BookingResponseType, BaseMap, BookingScheduleList } from '@/apis/hospital/type.ts'

const route = useRoute()

const total = ref<number>(0)
const pageSize = ref<number>(6)
const currentPage = ref<number>(1)
const workData = ref<BaseMap>({}) // 科室数据
const bookingList = ref<BookingScheduleList[]>([]) // 排版数组

const getListFn = async () => {
  const res: BookingResponseType = await getbookingApi(currentPage.value, pageSize.value, route.query.code as string, route.query.depcode as string)

  console.log(res)
  total.value = res.data.total
  workData.value = res.data.baseMap
  bookingList.value = res.data.bookingScheduleList
}
onMounted(() => getListFn())

const handleSizeChange = (e: number) => {
  pageSize.value = e
  getListFn()
}
const handleCurrentChange = (e: number) => {
  currentPage.value = e
  getListFn()
}
</script>

<template>
  <div class="step">
    <div class="top">
      <div class="hosname">{{ workData.hosname }}</div>
      <div class="line"></div>
      <div>{{ workData.bigname }}</div>
      <div class="dot">·</div>
      <div class="hosdepartment">{{ workData.depname }}</div>
    </div>

    <div class="center">
      <h1>{{ workData.workDateString }}</h1>
      <div class="container">
        <div class="item" :class="{ 'active': item.status === 0 && item.availableNumber > 0 }" v-for="(item, index) in bookingList" :key="index">
          <div class="time">{{ item.workDate }}-{{ item.dayOfWeek }}</div>
          <div class="name">{{ item.status === 1 ? '即将放号' : item.status === -1 ? '停止挂号' : item.status === 0 && item.availableNumber > 0 ? '有号' : '无号' }}</div>
        </div>
      </div>
    </div>

    <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[6, 12, 18, 24]"
            :background="true"
            layout="prev, pager, next, jumper, ->, total, sizes"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
  </div>
</template>

<style lang="scss" scoped>
.step {
  .top {
    display: flex;
    align-items: center;
    color: #7f7f7f;
    font-size: 14px;

    .line {
      width: 1px;
      height: 18px;
      margin: 0 15px;
      background-color: #7f7f7f;
    }

    .dot {
      margin: 0 15px;
    }
  }

  .center {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px 0;

    h1 {
      font-weight: 900;
    }

    .container {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      margin-top: 30px;

      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 15%;
        height: 106px;
        font-size: 14px;
        color: #7f7f7f;
        margin: 0 18px 15px 0;
        border: 1px solid #7f7f7f;
        cursor: pointer;

        &:nth-child(6n) {
          margin: 0;
        }

        &.active {
          border: 1px solid skyblue;
          color: skyblue;
        }

        .time {
          width: 100%;
          height: 50px;
          text-align: center;
          line-height: 50px;
          background-color: #eee;
        }

        .name {
          padding: 20px 15px;
          box-sizing: border-box;
        }
      }
    }
  }
}
</style>