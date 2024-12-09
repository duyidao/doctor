<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { User, Lock } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import useUserStore from "@/store/modules/user";
import { storeToRefs } from "pinia";
import CountDown from "../count_down/index.vue";

const { dialogVisible } = storeToRefs(useUserStore());
const { getCodeFn, loginFn } = useUserStore();
const route = useRoute();
const router = useRouter();

// 控制显示账号密码还是扫码：0账号密码；1微信扫码
const scene = ref<number>(0);

// 点击修改登录方式
const changeLoginType = (e: number) => {
  scene.value = e;
};

/**
 * 账号密码登录方式------------------------
 */
// 手机号验证码数据对象
const loginParams = ref({
  phone: "",
  code: "",
});
// 手机号码校验是否通过
let isPhone = computed(() => {
  return /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
    loginParams.value.phone
  );
});
// 点击获取验证码按钮
const flag = ref<boolean>(false);
const handleGetCodeFn = async () => {
  try {
    flag.value = true;
    getCodeFn(loginParams.value.phone).then((code: string) => {
      loginParams.value.code = code;
    });
  } catch (error: any) {
    ElMessage.error(error.message);
  }
};

// 子组件通知父组件时间到
const timeOverFn = () => {
  flag.value = false;
};

const formRef = ref<any>(null);
// 校验
const validatorPhone = (_rule: any, value: any, callback: any) => {
  // _rule：表单校验规则；value：表单内容；callback：回调函数
  if (
    /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
      value
    )
  ) {
    callback();
  } else {
    callback(new Error("手机号校验错误，请输入正确手机号"));
  }
};
const formRules = ref<any>({
  phone: [
    { required: true, trigger: ["blur", "change"], message: "手机号必填" },
    { validator: validatorPhone, trigger: ["blur", "change"] },
  ],
  code: [
    { required: true, trigger: ["blur", "change"], message: "验证码必填" },
    { min: 6, max: 6, trigger: ["blur", "change"], message: "验证码为6位" },
  ],
});

// 点击登录按钮
const onLogin = (formRef: any) => {
  if (!formRef) return; // 没有该form节点
  formRef.validate((valid: any) => {
    if (valid) {
      loginFn(loginParams.value)
        .then((_res: any) => {
          closeDialogFn();
          if (route.query.redirect) router.push(route.query.redirect as string);
        })
        .catch((err: any) => {
          ElMessage.error(err);
        });
    } else {
      ElMessage.error("表单校验失败，请重新填写后登录");
    }
  });
};

// 关闭对话框
const closeDialogFn = () => {
  // 重置内容与校验
  loginParams.value = {
    phone: "",
    code: "",
  };
  formRef.value.resetFields();
  dialogVisible.value = false;
};
</script>

<template>
  <div class="login">
    <el-dialog v-model="dialogVisible" title="用户登录" @close="closeDialogFn">
      <!-- 对话框身体部分 -->
      <div class="content">
        <el-row>
          <!-- 左侧表单 -->
          <el-col :span="12">
            <div class="login_form">
              <div v-show="scene === 0">
                <el-form ref="formRef" :model="loginParams" :rules="formRules">
                  <el-form-item prop="phone">
                    <el-input
                      :prefix-icon="User"
                      v-model="loginParams.phone"
                      maxLength="11"
                      placeholder="请输入手机号码"
                    />
                  </el-form-item>
                  <el-form-item prop="code">
                    <el-input
                      :prefix-icon="Lock"
                      v-model="loginParams.code"
                      maxLength="6"
                      placeholder="请输入手机验证码"
                    />
                  </el-form-item>
                  <el-form-item>
                    <el-button
                      :disabled="!isPhone || flag"
                      @click="handleGetCodeFn"
                    >
                      <span v-if="!flag">获取验证码</span>
                      <CountDown @timeOverFn="timeOverFn" :flag="flag" v-else />
                    </el-button>
                  </el-form-item>
                </el-form>
                <div class="bottom">
                  <el-button
                    type="primary"
                    style="width: 90%"
                    size="default"
                    @click="onLogin(formRef)"
                    >用户登录</el-button
                  >
                  <p @click="changeLoginType(1)">微信扫码登录</p>
                  <svg
                    @click="changeLoginType(1)"
                    style="cursor: pointer"
                    t="1690164462308"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="2323"
                    width="32"
                    height="32"
                  >
                    <path
                      d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                      fill="#28C445"
                      p-id="2324"
                    ></path>
                    <path
                      d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                      fill="#28C445"
                      p-id="2325"
                    ></path>
                  </svg>
                </div>
              </div>
              <div class="wechat" v-show="scene === 1">123</div>
            </div>
          </el-col>
          <!-- 右侧二维码 -->
          <el-col :span="12">
            <div class="top">
              <div class="item">
                <img src="../../assets/images/code_app.png" alt="" />
                <svg
                  t="1690164897153"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2511"
                  width="16"
                  height="16"
                >
                  <path
                    d="M664.250054 368.541681c10.015098 0 19.892049 0.732687 29.67281 1.795902-26.647917-122.810047-159.358451-214.077703-310.826188-214.077703-169.353083 0-308.085774 114.232694-308.085774 259.274068 0 83.708494 46.165436 152.460344 123.281791 205.78483l-30.80868 91.730191 107.688651-53.455469c38.558178 7.53665 69.459978 15.308661 107.924012 15.308661 9.66308 0 19.230993-0.470721 28.752858-1.225921-6.025227-20.36584-9.521864-41.723264-9.521864-63.862493C402.328693 476.632491 517.908058 368.541681 664.250054 368.541681zM498.62897 285.87389c23.200398 0 38.557154 15.120372 38.557154 38.061874 0 22.846334-15.356756 38.156018-38.557154 38.156018-23.107277 0-46.260603-15.309684-46.260603-38.156018C452.368366 300.994262 475.522716 285.87389 498.62897 285.87389zM283.016307 362.090758c-23.107277 0-46.402843-15.309684-46.402843-38.156018 0-22.941502 23.295566-38.061874 46.402843-38.061874 23.081695 0 38.46301 15.120372 38.46301 38.061874C321.479317 346.782098 306.098002 362.090758 283.016307 362.090758zM945.448458 606.151333c0-121.888048-123.258255-221.236753-261.683954-221.236753-146.57838 0-262.015505 99.348706-262.015505 221.236753 0 122.06508 115.437126 221.200938 262.015505 221.200938 30.66644 0 61.617359-7.609305 92.423993-15.262612l84.513836 45.786813-23.178909-76.17082C899.379213 735.776599 945.448458 674.90216 945.448458 606.151333zM598.803483 567.994292c-15.332197 0-30.807656-15.096836-30.807656-30.501688 0-15.190981 15.47546-30.477129 30.807656-30.477129 23.295566 0 38.558178 15.286148 38.558178 30.477129C637.361661 552.897456 622.099049 567.994292 598.803483 567.994292zM768.25071 567.994292c-15.213493 0-30.594809-15.096836-30.594809-30.501688 0-15.190981 15.381315-30.477129 30.594809-30.477129 23.107277 0 38.558178 15.286148 38.558178 30.477129C806.808888 552.897456 791.357987 567.994292 768.25071 567.994292z"
                    fill="#5D5D5D"
                    p-id="2512"
                  ></path>
                </svg>
              </div>
              <div class="item">
                <img src="../../assets/images/code_login_wechat.png" alt="" />
                <svg
                  t="1690165338189"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3826"
                  width="16"
                  height="16"
                >
                  <path
                    d="M798.723234 174.782745c0-60.576657-49.106418-109.683075-109.683075-109.683075l-354.708628 0c-60.576657 0-109.683075 49.106418-109.683075 109.683075l0 673.980161c0 60.576657 49.106418 109.683075 109.683075 109.683075l354.708628 0c60.576657 0 109.683075-49.106418 109.683075-109.683075L798.723234 174.782745zM264.557398 237.015112l494.256894 0 0 529.049305-494.256894 0L264.557398 237.015112zM334.356091 105.008612 689.016623 105.008612c38.548968 0 69.798692 31.249725 69.798692 69.798692l0 22.298865-494.256894 0 0-22.298865C264.557398 136.25936 295.807123 105.008612 334.356091 105.008612zM689.016623 918.53704 334.356091 918.53704c-38.548968 0-69.798692-31.249725-69.798692-69.798692l0-43.788296 494.256894 0 0 43.788296C758.814292 887.287315 727.564567 918.53704 689.016623 918.53704z"
                    fill="#272636"
                    p-id="3827"
                  ></path>
                  <path
                    d="M513.173732 829.943282c-16.70752 0-30.30112 13.5936-30.30112 30.30112 0 16.70752 13.5936 30.30112 30.30112 30.30112s30.299073-13.5936 30.299073-30.30112C543.472805 843.536882 529.881253 829.943282 513.173732 829.943282z"
                    fill="#272636"
                    p-id="3828"
                  ></path>
                </svg>
              </div>
            </div>
            <div class="text">
              <p>刀刀医院官方指定平台</p>
              <p>快速挂号 安全放心</p>
            </div>
          </el-col>
        </el-row>
      </div>
      <template #footer>
        <el-button @click="closeDialogFn">关闭窗口</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.login {
  :deep(.el-dialog__body) {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }

  .login_form {
    padding: 20px;
    border: 1px solid #ccc;
  }

  .bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;

    p {
      margin: 20px;
    }
  }

  .top {
    display: flex;
    justify-content: space-between;
    .item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 130px;
        height: 130px;
        margin-bottom: 20px;
      }
    }
  }

  .text {
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      margin: 20px 0;
      font-size: 20px;
      font-weight: bold;
    }
  }
}
</style>
