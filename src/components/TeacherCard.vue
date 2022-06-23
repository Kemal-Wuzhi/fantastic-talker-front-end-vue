<template>
  <div class="col-md-6 col-lg-3">
    <div class="card mb-4">
      <!-- <img
        class="card-img-top"
        :src="teacher.image"
        alt="Card image cap"
        width="286px"
        height="180px"
      /> -->
      <div class="card-body">
        <p class="card-text title-wrap">
          <router-link :to="`/teacher-profile/${teacher.id}`">
            {{ teacher.name }}
          </router-link>
        </p>

        <p class="card-text text-truncate">
          {{ teacher.introduction }}
        </p>
      </div>
      <!-- <div class="card-footer">
        <button
          v-if="teacher.isFavorited"
          type="button"
          class="btn btn-danger btn-border favorite mr-2"
          @click.stop.prevent="deleteFavorite"
        >
          移除最愛
        </button>
        <button
          v-else
          type="button"
          class="btn btn-primary btn-border favorite mr-2"
          @click.stop.prevent="addFavorite"
        >
          加到最愛
        </button>
      </div> -->
    </div>
  </div>
</template>

<script>
import { Toast } from "../utils/helpers"
import teacherAPI from "../apis/teacher"
export default {
  name: "TeacherCard",
  created() {
    const { teacherId } = this.$route.params
    this.fetchTeacher(teacherId)
  },
  // data() {
  //   return {
  //     // userId: 0,
  //     teacher: {},
  //   }
  // },
  props: {
    initialTeacher: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      teacher: this.initialTeacher,
    }
  },
  methods: {
    async fetchTeacher(teacherId) {
      try {
        this.isLoading = true
        const response = await teacherAPI.getTeacher(teacherId)
        // const { teacher, isFavorited } = data
        // const { id, email, name, introduction, avatar, total_favorite } =
        //   teacher
        this.isLoading = false
        console.log("response:", response)
        const statusText = response.statusText
        if (statusText !== "OK") {
          throw new Error(statusText)
        }

        console.log("responseData", response.data)

        this.id = response.data[0].id
        this.email = response.data[0].email
        this.name = response.data[0].name
        this.introduction = response.data[0].introduction
        this.avatar = response.data[0].avatar
        this.total_favorite = response.data[0].total_favorite
        console.log("total_favorite:", response.data[0].total_favorite)
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得老師資料，請稍後再試",
        })
      }
    },
  },
}
</script>
