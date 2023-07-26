<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { getbookingApi, findScheduleListApi } from "@/apis/hospital/index.ts";
import type {
  BookingResponseType,
  BaseMap,
  BookingScheduleList,
  DoctorListResponseType,
  DoctorItemType,
} from "@/apis/hospital/type.ts";

const route = useRoute();

const total = ref<number>(0);
const pageSize = ref<number>(6);
const currentPage = ref<number>(1);
const workData = ref<BaseMap>({}); // 科室数据
const bookingList = ref<BookingScheduleList[]>([]); // 排版数组
const workTime = ref<string>('')

// 获取有无号列表
const getListFn = async () => {
  const res: BookingResponseType = await getbookingApi(
    currentPage.value,
    pageSize.value,
    route.query.code as string,
    route.query.depcode as string
  );

  total.value = res.data.total;
  workData.value = res.data.baseMap;
  bookingList.value = res.data.bookingScheduleList;

  workTime.value = bookingList.value[0].workDate
  handleDoctorChoseFn(bookingList.value[0])
};
onMounted(() => getListFn());

// 分页器
const handleSizeChange = (e: number) => {
  pageSize.value = e;
  getListFn();
};
const handleCurrentChange = (e: number) => {
  currentPage.value = e;
  getListFn();
};

const loading = ref<boolean>(false)
const doctorList = ref<DoctorItemType[]>([]);
// 点击选择获取医院排班列表
const handleDoctorChoseFn = async (e: any) => {
  workTime.value = e.workDate
  loading.value = true
  const res: DoctorListResponseType = await findScheduleListApi(
    route.query.code as string,
    route.query.depcode as string,
    e.workDate
  );
  doctorList.value = res.data;
  loading.value = false
};

// 计算上午医生列表
const morningList = computed(() => {
  return doctorList.value.filter(item => item.workTime === 0)
})
// 计算下午医生列表
const afternoonList = computed(() => {
  return doctorList.value.filter(item => item.workTime !== 0)
})
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

    <!-- 时间选择 -->
    <div class="center">
      <h1>{{ workData.workDateString }}</h1>
      <div class="container">
        <div
          class="item"
          :class="{ active: item.status === 0 && item.availableNumber > 0, cur: item.workDate === workTime }"
          v-for="(item, index) in bookingList"
          :key="index"
          @click="handleDoctorChoseFn(item)"
        >
          <div class="time">{{ item.workDate }}-{{ item.dayOfWeek }}</div>
          <div class="name">
            {{
              item.status === 1
                ? "即将放号"
                : item.status === -1
                ? "停止挂号"
                : item.status === 0 && item.availableNumber > 0
                ? "有号"
                : "无号"
            }}
          </div>
        </div>
      </div>
    </div>

    <!-- 分页 -->
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

    <!-- 医生选择 -->
    <div class="doctor-chose" v-loading="loading">
      <!-- 即将放号展示 -->
      <div class="will" v-if="doctorList.length <= 0"><span>{{ workTime }}</span>放号</div>
      <!-- 有号、无号展示 -->
      <div class="had" v-else>
        <div class="morning">
          <!-- 文字提示 -->
          <div class="tip">
            <svg
              t="1690338646821"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3652"
              width="32"
              height="32"
            >
              <path
                d="M752.41931153 240.7063601c8.36993432 0 15.62255883 3.08990502 21.72821045 9.16589356 6.1353147 6.08093262 9.18566918 13.3928833 9.18566918 21.73315382 0 8.55285621-3.05035376 15.85986352-9.18566918 21.94079614l-43.67394996 43.66900658c-5.93261719 5.97216773-13.17041016 8.95825195-21.72326709 8.95825195-8.87420678 0-16.20098901-2.98608422-22.08911085-8.75061035-5.88317847-5.87329102-8.80004906-13.2890625-8.80004906-22.14843774 0-8.54791283 2.95642114-15.75604272 8.91375732-21.72821044l43.66900659-43.67394996c6.14025879-6.07598853 13.44726539-9.16589356 21.98034668-9.16589356z m37.66223167 240.39459181h61.79809547c8.52813721 0 15.82031227 2.98608422 21.83697534 9.06207276C879.78271508 496.24395728 882.78857422 503.45208717 882.78857422 512c0 8.55285621-3.00585914 15.85986352-9.07196021 21.83697533-6.01666236 6.07598853-13.30883813 9.06207276-21.83697534 9.06207276h-61.79809547c-8.52813721 0-15.80053734-2.98608422-21.86663841-9.06207276-6.01666236-5.97711182-9.05712867-13.2890625-9.05712867-21.83697533 0-8.55285621 3.04046631-15.76098609 9.05712867-21.83697533 6.06610107-6.07598853 13.33850122-9.06207276 21.86663841-9.06207276zM512 141.21142578c8.52813721 0 15.79064917 3.08990502 21.85180688 9.06207276 6.02160645 6.08093262 9.05712867 13.3928833 9.05712867 21.83697533v61.79809546c0 8.55285621-3.03552222 15.85986352-9.0521853 21.83697534-6.06610107 6.07598853-13.32861305 9.16589356-21.85675025 9.16589355-8.53802467 0-15.80053734-3.08990502-21.86663842-9.16589355-6.01666236-5.97711182-9.0521853-13.2890625-9.05218458-21.83697534V172.11047387c0-8.44409203 3.03552222-15.76098609 9.05218458-21.83697533C496.20440674 144.3013308 503.46691871 141.21142578 512.00494408 141.21142578zM271.81304907 240.7063601c8.36499023 0 15.61267066 3.08990502 21.743042 9.16589356l43.66900659 43.67394996c6.14025879 6.07598853 9.17083764 13.38793922 9.17083764 21.72821044 0 8.55285621-3.01080323 15.86480689-9.05712938 21.83697534-6.03149391 6.08093262-13.30389404 9.06207276-21.85180617 9.06207275-8.69622827 0-16.02795386-2.98608422-21.95068359-8.85443115l-43.68383814-43.67395068c-5.97216773-5.97216773-8.92858886-13.28411842-8.92858886-22.03967284 0-8.55285621 3.00585914-15.76098609 9.07196021-21.83697462 6.01666236-5.97216773 13.30883813-9.06207276 21.85675096-9.06207276h-0.03955126z m436.93725586 436.91253615c8.36499023 0 15.60772729 2.98608422 21.72326709 9.16589355l43.67394995 43.67395067c6.1353147 6.17980933 9.18566918 13.38793922 9.18566919 21.93585205 0 8.34521461-3.05035376 15.65716529-9.18566919 21.73315382-6.1105957 6.17980933-13.35827613 9.16589356-21.72326636 9.16589356-8.52813721 0-15.84008789-2.98608422-21.98034668-9.16589356l-43.66900659-43.66900587c-5.95733618-5.87329102-8.91375732-13.1852417-8.91375732-21.73315453 0-8.55285621 3.01080323-15.86480689 9.05712866-21.94079614 6.03149391-6.07598853 13.32861305-9.16589356 21.85180689-9.16589355h-0.01977564zM512.00494408 388.40380836c-34.12243628 0-63.22192359 12.05310035-87.39239525 36.2532351-24.1358645 24.10125732-36.21368384 53.25018335-36.21368384 87.34295654 0 34.0927732 12.07782007 63.24169922 36.21368384 87.44677734C448.78796387 623.53814721 477.88250709 635.59619164 512 635.59619164c34.12243628 0 63.23181176-12.05310035 87.4072268-36.15435838C623.51837158 575.2466433 635.59619164 546.09771729 635.59619164 512c0-34.0927732-12.07782007-63.24169922-36.18896484-87.34295654C575.23181176 400.45690942 546.12243628 388.40380836 512 388.40380836zM172.12036133 481.10095191h61.79809547c8.53802467 0 15.80053734 2.98608422 21.86663841 9.06207276 6.01666236 6.08093262 9.05712867 13.2890625 9.05712867 21.83697533 0 8.55285621-3.04046631 15.85986352-9.05712867 21.83697533-6.06610107 6.07598853-13.32861305 9.06207276-21.86663841 9.06207276h-61.79809547c-8.52813721 0-15.81042481-2.98608422-21.83697534-9.06207276C144.21728492 527.85986352 141.21142578 520.54791283 141.21142578 512c0-8.55285621 3.00585914-15.76098609 9.07196021-21.83697533 6.03149391-6.07598853 13.30883813-9.06207276 21.83697534-9.06207276zM512.00494408 759.19238258c8.52813721 0 15.79064917 2.98608422 21.85180617 9.06207274 6.02160645 6.08093262 9.05712867 13.2890625 9.05712938 21.83697535v61.79809546c0 8.55285621-3.03552222 15.85986352-9.0521853 21.83697533C527.79559326 879.80249 520.53308129 882.78857422 512 882.78857422c-8.53802467 0-15.80053734-2.98608422-21.86663842-9.06207276-6.01666236-5.97711182-9.0521853-13.2890625-9.05218458-21.83697533v-61.79809546c0-8.55285621 3.03552222-15.76098609 9.05218458-21.83697534 6.06610107-6.07598853 13.32861305-9.06207276 21.86663842-9.06207275z m-196.47839379-81.57348633c8.5034182 0 15.80053734 2.98608422 21.84686279 9.16589355 6.03149391 6.08093262 9.07196021 13.3928833 9.07196021 21.94079614 0 8.44409203-3.08001685 15.65222192-9.19555664 21.72821044l-43.67394995 43.67394996c-6.10565162 6.17980933-13.34838867 9.16589356-21.72326637 9.16589356-8.54791283 0-15.84008789-2.98608422-21.85180687-8.96319533-6.07104516-6.07598853-9.0769043-13.38793922-9.0769043-21.93585205 0-8.65173364 2.95642114-15.96862769 8.92858887-21.94079614l43.68383813-43.66900658c6.10565162-6.17980933 13.44232202-9.16589356 21.95068359-9.16589355h0.03955054zM512 326.60571289c33.628052 0 64.6506958 8.34521461 93.0481565 24.81811547 28.42712378 16.69042992 50.92163109 39.1404419 67.4637456 67.56756568 16.57177758 28.32824708 24.86755347 59.32617188 24.86755347 93.00860596 0 33.68243408-8.27600098 64.68035888-24.86755347 93.10748267-16.58166504 28.32824708-39.08605981 50.77825904-67.4637456 67.4637456-28.36285424 16.58166504-59.37561059 24.82305884-93.0481565 24.82305884-33.66760254 0-64.67047143-8.24139381-93.05804468-24.81811547-28.37768578-16.69042992-50.86230492-39.14538598-67.46374487-67.46868897-16.58166504-28.42712378-24.86755347-59.42504859-24.86755348-93.10748267 0-33.68243408 8.31555152-64.68035888 24.86755348-93.00860596 16.55200195-28.42712378 39.03662109-50.87713647 67.46374487-67.56262231C447.35424828 334.94598413 478.371948 326.60571289 512 326.60571289z"
                p-id="3653"
                fill="#1296db"
              ></path>
            </svg>
            <span>上午号源</span>
          </div>
          <!-- 医生信息 -->
          <div class="info" v-for="item in morningList" :key="item.id">
            <div class="left">
              <div class="name">
                <span>{{ item.title }}</span>
                <span>|</span>
                <span>{{ item.docname || '' }}</span>
              </div>
              <div class="skill">{{ item.skill }}</div>
            </div>
            <div class="right">
              <div class="money">￥{{ item.amount }}</div>
              <el-button type="primary">剩余{{ item.availableNumber }}</el-button>
            </div>
          </div>
        </div>
        <div class="afternoon">
          <div class="tip">
            <svg
              t="1690338854065"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4926"
              width="32"
              height="32"
            >
              <path
                d="M244.9 601c12.3 0 22.3-10 22.3-22.3 0-135 109.8-244.9 244.9-244.9S757 443.6 757 578.7c0 12.3 10 22.3 22.3 22.3s22.3-10 22.3-22.3c0-159.6-129.8-289.4-289.4-289.4S222.6 419.2 222.6 578.8c0 12.3 10 22.2 22.3 22.2zM512 244.9c12.3 0 22.3-10 22.3-22.3V89c0-12.3-10-22.3-22.3-22.3s-22.3 10-22.3 22.3v133.6c0 12.3 10 22.3 22.3 22.3zM763.9 349.2c5.7 0 11.4-2.2 15.7-6.5l94.4-94.4c8.7-8.7 8.7-22.8 0-31.5s-22.8-8.7-31.5 0l-94.4 94.4c-8.7 8.7-8.7 22.8 0 31.5 4.4 4.3 10.1 6.5 15.8 6.5zM1001.7 556.5H868.2c-12.3 0-22.3 10-22.3 22.3s10 22.3 22.3 22.3h133.6c12.3 0 22.3-10 22.3-22.3s-10.1-22.3-22.4-22.3zM178.1 578.8c0-12.3-10-22.3-22.3-22.3H22.3C10 556.5 0 566.5 0 578.8S10 601 22.3 601h133.6c12.2 0 22.2-9.9 22.2-22.2zM244.4 342.7c4.3 4.3 10 6.5 15.7 6.5s11.4-2.2 15.7-6.5c8.7-8.7 8.7-22.8 0-31.5l-94.4-94.4c-8.7-8.7-22.8-8.7-31.5 0s-8.7 22.8 0 31.5l94.5 94.4zM935 734.6H89c-12.3 0-22.3 10-22.3 22.3s10 22.3 22.3 22.3h846c12.3 0 22.3-10 22.3-22.3s-10-22.3-22.3-22.3zM779.1 912.7H244.9c-12.3 0-22.3 10-22.3 22.3s10 22.3 22.3 22.3h534.3c12.3 0 22.3-10 22.3-22.3s-10.1-22.3-22.4-22.3z"
                fill="#1296db"
                p-id="4927"
              ></path>
            </svg>
            <span>下午号源</span>
          </div>
          <!-- 医生信息 -->
          <div class="info" v-for="item in afternoonList" :key="item.id">
            <div class="left">
              <div class="name">
                <span>{{ item.title }}</span>
                <span>|</span>
                <span>{{ item.docname || '' }}</span>
              </div>
              <div class="skill">{{ item.skill }}</div>
            </div>
            <div class="right">
              <div class="money">￥{{ item.amount }}</div>
              <el-button type="primary">剩余{{ item.availableNumber }}</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
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
        transition: all .3s;

        &.cur {
          transform: scale(1.1);
        }

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

  .doctor-chose {
    margin-top: 40px;
    .will {
      text-align: center;
      font-size: 30px;
      color: #7f7f7f;
      font-weight: bold;

      span {
        color: red;
        margin-right: 10px;
      }
    }

    .had {
      .morning,
      .afternoon {
        margin-bottom: 15px;
        .tip {
          display: flex;
          align-items: center;

          span {
            margin-left: 6px;
            color: #7f7f7f;
            font-weight: bold;
          }
        }

        .info {
          display: flex;
          justify-content: space-between;
          margin: 20px 0;
          border-bottom: 1px solid #ccc;

          .left {
            .name {
              color: skyblue;

              span {
                margin: 0 5px;
                font-size: 18px;
                font-weight: 900;
              }
            }

            .skill {
              margin: 10px 0;
              color: #7f7f7f;
            }
          }

          .right {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 150px;

            .money {
              color: red;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}
</style>
