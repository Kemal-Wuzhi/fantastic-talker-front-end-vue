import Vue from "vue"
import Vuex from "vuex"
import userAPI from "./../apis/user"
// import tweetAPI from './../apis/tweet'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      // id: -1,
      // account: "",
      // name: "",
      // email: "",
      // avatar: "",
      // cover: "",
      // introduction: "",
      // role: "",
      // followingCount: 0,
      // followerCount: 0,
      // tweetCount: 0,
      id: -1,
      name: "",
      email: "",
      role: "",
    },
    isAuthenticated: false,
    token: "",
    // newTweets: [],
  },
  // 現在，我們要從 Vue 物件把 user 的內容提交給 Vuex 的 mutation，
  //然後由 mutation 來更新 state 裡的 currentUser 狀態。
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser,
      }

      state.isAuthenticated = true
      state.token = localStorage.getItem("token")
    },
    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      state.token = ""
      localStorage.removeItem("token")
    },
    // setNewTweet(state, newTweet) {
    //   state.newTweets.push(newTweet)
    // },
    // resetNewTweet(state) {
    //   state.newTweets = []
    // },
  },
  actions: {
    // 在 actions 屬性裡設定一個 fetchCurrentUser 方法
    async fetchCurrentUser({ commit }) {
      try {
        const { data } = await userAPI.getCurrentUser()
        commit("setCurrentUser", data.data)
        return true
      } catch (error) {
        console.error(error.message)
        commit("revokeAuthentication")
        return false
      }
    },
    // async fetchTweets({commit}) {
    //    try {
    //      const response = await tweetsAPI.getTweets()
    //      const { data } = response
    //      this.allTweets = data.map((tweet) => {
    //        return {
    //          ...tweet,
    //        }
    //      })
    //      this.isLoading = false
    //    } catch (error) {
    //      this.isLoading = false
    //      this.alertMsg = '取得推文失敗，請稍後再試'
    //      this.alertStatus = 'error'
    //      this.alertShow()
    //    }
    // }
  },
  modules: {},
})
