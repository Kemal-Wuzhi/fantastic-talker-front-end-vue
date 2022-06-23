<template>
  <div class="container py-5">
    <TeacherDetail :initialTeacher="teacher" />
    <hr />
    <!-- 餐廳評論 TeacherComments -->
  </div>
</template>

<script>
import TeacherDetail from "./../components/TeacherDetail"
import teacherAPI from "../apis/teacher"
import { Toast } from "../utils/helpers"
import { mapState } from "vuex"

export default {
  name: "TeacherIntro",
  components: {
    TeacherDetail,
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params
    this.fetchTeacher(id)
    next()
  },
  data() {
    return {
      teacher: {
        id: -1,
        name: "",
        // image: "",
        introduction: "",
        isFavorited: false,
      },
      // teacherComments: [],
    }
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    const { id: teacherId } = this.$route.params
    this.fetchTeacher(teacherId)
  },
  methods: {
    async fetchTeacher(teacherId) {
      try {
        const { data } = await teacherAPI.getReacher({ teacherId })
        const { teacher } = data
        const { id, name, introduction } = teacher

        this.teacher = {
          id,
          name,
          // image,
          introduction,
        }
      } catch (error) {
        console.log("error", error)
        Toast.fire({
          icon: "error",
          title: "無法取得老師資料，請稍後再試",
        })
      }
    },
  },
}
</script>
