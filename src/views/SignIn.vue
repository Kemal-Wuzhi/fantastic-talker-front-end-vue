<template>
  <div id="Signin" class="d-flex flex-column mx-auto">
    <div class="logo mx-auto mb-4">
      <img :src="require('./../assets/Logo.png')" width="50px" />
    </div>
    <p class="menu-text mx-auto mb-4">登入 Fantastic Talker</p>
    <form class="mx-auto w-100" action="" @submit.prevent.stop="handleSubmit">
      <div class="form-input d-flex flex-column">
        <label for="email" class="form-input-text">電子信箱</label>
        <input
          type="text"
          name="email"
          id="email"
          v-model.trim="email"
          required
        />
      </div>
      <div class="form-input d-flex flex-column">
        <label for="password" class="form-input-text">密碼</label>
        <input
          type="password"
          name="password"
          id="password"
          v-model="password"
          required
        />
        <div class="d-flex justify-content-between">
          <!-- <span class="text-danger" v-if="password.length === 0"
            >不可空白
          </span> -->
        </div>
      </div>
      <button
        type="submit"
        class="btn-active w-100 mb-3"
        :disabled="isProcessing"
      >
        登入
      </button>
      <div class="text-end">
        <router-link to="/signup" class="mx-auto text-blue"
          >註冊 Fantastic Talker</router-link
        >
        <span class="space">．</span>
        <router-link to="/admin/signin" class="mx-auto text-blue"
          >後台登入</router-link
        >
      </div>
    </form>
    <!-- alert -->
    <div
      class="alert d-flex fixed-top"
      id="alert"
      role="alert"
      v-if="alertStatus !== false"
    >
      <div class="ms-2 mx-auto my-auto text-alert">{{ alertMsg }}</div>
      <div class="ms-auto">
        <img
          :src="require('./../assets/error-alert.svg')"
          v-if="alertStatus === 'error'"
        />
        <img
          :src="require('./../assets/success-alert.svg')"
          v-else-if="alertStatus === 'success'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import authorizationAPI from "./../apis/authorization"

export default {
  name: "SignIn",
  data() {
    return {
      email: "",
      password: "",
      isProcessing: false,
      checkEmail: false,
      alertMsg: "",
      alertStatus: false,
    }
  },
  methods: {
    alertShow() {
      const bootstrap = require("bootstrap")
      let alertNode = document.querySelector("#alert")
      bootstrap.Alert.getInstance(alertNode)
      setTimeout(() => {
        this.alertStatus = false
      }, 2000)
    },
    async handleSubmit() {
      try {
        if (!this.email || !this.password) {
          this.alertMsg = "請填入信箱和密碼"
          this.alertStatus = "error"
          this.alertShow()
          return
        }

        this.isProcessing = true

        const response = await authorizationAPI.signin({
          email: this.email,
          password: this.password,
        })

        console.log("responseSignIn:", response)
        const { data } = response

        if (data.status !== "success") {
          this.alertMsg = "登入失敗"
          this.alertStatus = "error"
          this.alertShow()
        }

        localStorage.setItem("token", data.token)
        //要提交 mutation 事件時，語法是：this.$store.commit(<方法名稱>)。
        // 對應到我們在 mutation 定義的 setCurrentUser，
        // 就是 this.$store.commit(setCurrentUser)。
        this.$store.commit("setCurrentUser", data.user)

        this.$router.push("/mainpage")
      } catch (error) {
        this.isProcessing = false
        this.password = ""
        this.alertMsg = error.response.data.message
        this.alertStatus = "error"
        this.alertShow()
      }
    },
  },
}
</script>

<style scoped>
#signin {
  width: 540px;
  padding-top: 60px;
}
.menu-text {
  font-size: 1.5rem;
}
.space {
  font-size: 18px;
  font-weight: 700;
  color: #0099ff;
}
.form-input {
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  height: 54px;
  background: #f5f8fa;
}
.form-input input {
  padding-left: 10px;
  border-top: inherit;
  border-left: inherit;
  border-right: inherit;
  border-bottom-color: #657786;
  background: inherit;
}

.form-input input:hover {
  border-bottom: 2px solid #50b5ff;
}

.form-input input:focus {
  outline: none;
  border-bottom: 2px solid #50b5ff;
}

.form-input-error input {
  outline: none;
  border-bottom: 2px solid #fc5a5a;
}

.form-input-text {
  margin-top: 5px;
  margin-left: 10px;
  color: #657786;
}
</style>
