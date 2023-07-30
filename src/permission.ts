// 路由鉴权
import router from "./router";
// 引入进度条
import Nprogress from "nprogress";
// 引入进度条样式
import "nprogress/nprogress.css";
import { storeToRefs } from "pinia";
import useUserStore from "./store/modules/user";

const blackList = [
  "/doctor/user",
  "/doctor/user/certification",
  "/doctor/user/order",
  "/doctor/user/feedback",
  "/doctor/user/profile",
  "/doctor/user/patient",
];
// 添加相应全局前置首位
router.beforeEach((to, from, next) => {
  const { userInfo, dialogVisible } = storeToRefs(useUserStore());
  Nprogress.start();

  if (userInfo.value.token) {
    next();
  } else {
    if (blackList.includes(to.path)) {
      dialogVisible.value = true;
      next({
        path: from.fullPath,
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      next();
    }
  }
});

// 添加相应全局后置首位
router.afterEach((to, from) => {
  Nprogress.done();
});
