<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import {
  getOrderInfoApi,
  cancelOrderApi,
  getQRCodeApi,
  payApi,
} from "@/apis/user/index.ts";
import type {
  orderInfoResponseType,
  orderInfoType,
  qrCodeResponseType,
  codeType,
  payResponseType,
} from "@/apis/user/type.ts";
import { ElMessage } from "element-plus";
// @ts-ignore
import QRCode from "qrcode";

const route = useRoute();

// 获取订单详情
const orderInfo = ref<orderInfoType>({});
const getOrderInfoFn = async () => {
  const res: orderInfoResponseType = await getOrderInfoApi(
    route.query.orderId as string
  );
  orderInfo.value = res.data;
};
onMounted(() => getOrderInfoFn());

// 取消预约按钮被点击
const onCancelFn = async () => {
  const res = await cancelOrderApi(route.query.orderId as string);
  if (res.code === 200) {
    ElMessage.success(res.message);
    getOrderInfoFn();
  } else {
    ElMessage.error(res.message);
  }
};

const dialogPayVisible = ref<boolean>(false);

// 点击支付按钮
const payCode = ref<codeType>({});
const imgUrl = ref<string>(""); // 图片二维码
const timer = ref<any>(null); // 定时器
const handlePayFn = async () => {
  dialogPayVisible.value = true;
  const res: qrCodeResponseType = await getQRCodeApi(
    route.query.orderId as string
  );
  if (res.code === 200) {
    payCode.value = res.data;
    imgUrl.value = await QRCode.toDataURL(res.data.codeUrl);

    // 只要显示二维码，每隔一段时间查询是否支付成功
    timer.value = setInterval(() => {
      payApi(route.query.orderId as string).then((result: payResponseType) => {
        if (result.data) {
          dialogPayVisible.value = false;
          ElMessage.success("支付成功");
          clearInterval(timer.value); // 清除定时器
          getOrderInfoFn(); // 再次获取订单详情
        }
      });
    }, 2000);
  }
};

const closeFn = () => {
  dialogPayVisible.value = false;
  clearInterval(timer.value); // 清除定时器
};
</script>

<template>
  <div class="detail">
    <el-card>
      <!-- 标题 -->
      <template #header>
        <div class="title">挂号详情</div>
      </template>
      <!-- 内容 -->
      <div class="top">
        <el-tag type="success">
          <div class="tag">
            <svg
              t="1690427888770"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1507"
              width="16"
              height="16"
            >
              <path
                d="M404.352 685.354667L789.632 213.333333 853.333333 267.52 409.941333 810.666667 170.666667 566.4l58.581333-59.818667z"
                fill="#1afa29"
                p-id="1508"
              ></path>
            </svg>
            <span>{{ orderInfo?.param?.orderStatusString }}</span>
          </div>
        </el-tag>
        <div class="code">
          <img src="../../../../assets/images/code_app.png" alt="" />
          <div>
            <p>微信 关注“114514预约挂号”</p>
            <p>快速预约挂号</p>
          </div>
        </div>
      </div>

      <div class="bottom">
        <div class="left">
          <el-descriptions :column="1" border>
            <el-descriptions-item label="就诊人信息">{{
              orderInfo.patientName
            }}</el-descriptions-item>
            <el-descriptions-item label="就诊日期">{{
              orderInfo.reserveDate
            }}</el-descriptions-item>
            <el-descriptions-item label="就诊医院">{{
              orderInfo.hosname
            }}</el-descriptions-item>
            <el-descriptions-item label="就诊科室">{{
              orderInfo.depname
            }}</el-descriptions-item>
            <el-descriptions-item label="医生职称">{{
              orderInfo.title
            }}</el-descriptions-item>
            <el-descriptions-item label="服务费">{{
              orderInfo.amount
            }}</el-descriptions-item>
            <el-descriptions-item label="挂号单号">{{
              orderInfo.outTradeNo
            }}</el-descriptions-item>
            <el-descriptions-item label="挂号时间">{{
              orderInfo.createTime
            }}</el-descriptions-item>
          </el-descriptions>

          <!-- 只有在预约成功状态显示 -->
          <div
            class="btn"
            v-if="orderInfo.orderStatus === 0 || orderInfo.orderStatus === 1"
          >
            <el-popconfirm title="确定要取消预约吗？" @confirm="onCancelFn">
              <template #reference>
                <el-button>取消预约</el-button>
              </template>
            </el-popconfirm>
            <el-button
              type="primary"
              v-if="orderInfo.orderStatus === 0"
              @click="handlePayFn"
              >支付</el-button
            >
          </div>
        </div>
        <div class="right">
          <el-card>
            <template #header>
              <div>注意事项</div>
            </template>
            <ol>
              <li>取号时间：{{ orderInfo.fetchTime }}</li>
              <li>退号时间：{{ orderInfo.quitTime }}</li>
            </ol>
          </el-card>
        </div>
      </div>
    </el-card>

    <!-- 展示支付二维码 -->
    <el-dialog
      v-model="dialogPayVisible"
      width="400"
      title="微信支付"
      @close="closeFn"
    >
      <!-- 图片内容区域 -->
      <div class="qrcode">
        <img :src="imgUrl" alt="" />
        <p>请使用微信扫一扫</p>
        <p>扫描二维码支付</p>
      </div>
      <template #footer>
        <div>
          <el-button type="primary" @click="closeFn">关闭窗口</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.detail {
  .title {
    color: #7f7f7f;
    font-weight: 900;
  }

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .tag {
      display: flex;
      align-items: center;
      width: 120px;

      span {
        margin-left: 10px;
      }
    }

    .code {
      display: flex;
      align-items: center;

      img {
        width: 45px;
        height: 45px;
      }

      div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #7f7f7f;
        font-size: 14px;
        margin-left: 15px;

        p:last-child {
          margin-top: 10px;
        }
      }
    }
  }

  .bottom {
    display: flex;
    margin-top: 50px;

    .left {
      flex: 4;

      .btn {
        margin-top: 15px;
      }
    }

    .right {
      flex: 6;
      margin-left: 20px;

      ol {
        list-style: decimal;
        padding-left: 20px;
        li {
          line-height: 30px;
        }
      }
    }
  }

  .qrcode {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 200px;
      height: 200px;
    }

    p {
      font-size: 20px;
      color: #555;

      &:nth-of-type(1) {
        margin: 20px 0;
      }
    }
  }

  :deep(.el-dialog__body) {
    border-top: 1px solid #7f7f7f;
    border-bottom: 1px solid #7f7f7f;
  }
}
</style>
