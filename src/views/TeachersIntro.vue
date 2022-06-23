<!-- <template v-else>
  <div class="container-fluid vh-100">
    <div class="row h-100">
      <div class="col-3 menu mh-100"></div>
      <div class="col-md-9 row">
        <TeacherCard
          v-for="teacher in teachers"
          :key="teacher.id"
          :initialTeacher="teacher"
        />
      </div>
    </div>
  </div>
</template> -->

<template>
  <div class="container py-5">
    <SpinnerTool v-if="isLoading" />
    <template v-else>
      <div class="col-md-9 row">
        <TeacherCard
          v-for="teacher in teachers"
          :key="teacher.id"
          :initialTeacher="teacher"
        />
      </div>
    </template>
  </div>
</template>

<script>
import teacherAPI from "../apis/teacher"
import TeacherCard from "../components/TeacherCard.vue"
import { Toast } from "../utils/helpers"
import SpinnerTool from "./../components/SpinnerTool"

export default {
  name: "TeachersIntro",
  components: {
    TeacherCard,
    SpinnerTool,
  },
  data() {
    return {
      teachers: [],
    }
  },

  created() {
    // const { teacherId = "" } = this.$route.query
    this.fetchTeachers()
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchTeachers()
    next()
  },
  methods: {
    async fetchTeachers() {
      try {
        this.isLoading = true
        const response = await teacherAPI.getTeachers()
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
