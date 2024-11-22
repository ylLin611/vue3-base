<template>
  <div class="bg-[url(@/assets/images/login/bg.png)] bg-cover h-100vh overflow-hidden">
    <div class="lg:absolute mt-32px ml-40px">
      <img src="@/assets/images/login/logo.png" class="w-164px" />
    </div>
    <section class="flex-center lg:p-72px">
      <div class="w-0 lg:flex-1 flex justify-center">
        <img src="@/assets/images/login/hero.png" alt="bg" class="w-full" />
      </div>
      <div class="relative bg-#fff w-80vw lg:w-526px rounded-8px h-666px">
        <section class="pt-72px px-48px">
          <h1 class="m0 p0 text-28px font-bold lh-46px">IEM 数据资产平台</h1>
          <el-form :model="form" ref="formRef" :rules class="mt-36px">
            <el-form-item prop="username">
              <div class="flex rounded-8px bg-base-gray bg-op-5 w-full h-56px items-center">
                <div class="px-24px">账号</div>
                <div class="flex-1">
                  <el-input v-model="form.username" placeholder="请输入账号" />
                </div>
              </div>
            </el-form-item>
            <el-form-item prop="password">
              <div class="flex rounded-8px bg-base-gray bg-op-5 w-full h-56px items-center">
                <div class="px-24px">密码</div>
                <div class="flex-1">
                  <el-input v-model="form.password" type="password" placeholder="请输入密码" />
                </div>
              </div>
            </el-form-item>
            <el-form-item prop="captcha">
              <div class="flex rounded-8px bg-base-gray bg-op-5 w-full h-56px items-center">
                <div class="flex-1">
                  <el-input v-model="form.captcha" placeholder="请输入验证码" />
                </div>
                <div class="px-24px">
                  <el-button type="primary" link @click="handleGetCaptcha"> 获取验证码 </el-button>
                </div>
              </div>
            </el-form-item>
          </el-form>
          <el-button
            type="primary"
            @click="handleLogin"
            class="w-full h-56px text-18px mt-48px"
            size="large"
          >
            登录
          </el-button>
        </section>
        <div class="text-center text-12px lh-18px text-base-gray op-40 w-full absolute bottom-24px">
          @copyright © 2024
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { loginApi } from '../service/login.service'

const form = reactive<{
  username?: string
  password?: string
  captcha?: string
}>({})
const formRef = ref()

const rules = reactive({
  username: [
    {
      required: true,
      message: '请输入账号',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
    },
  ],
  captcha: [
    {
      required: true,
      message: '请输入验证码',
    },
  ],
})

const handleGetCaptcha = () => {}
const handleLogin = () => {
  formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      const res = await loginApi(form)
      if (res?.code === 200) {
        console.log(res.data.token)
      }
    }
  })
}
</script>

<style scoped lang="scss">
:deep(.el-input) {
  height: 56px;
}
:deep(.el-input__wrapper) {
  box-shadow: none;
  background-color: transparent;
}
</style>
