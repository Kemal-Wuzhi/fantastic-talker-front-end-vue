<template>
  <div class="row">
    <div class="col-md-12 mb-3">
      <h1>{{ teacher.name }}</h1>
    </div>
    <div class="col-lg-4">
      <!-- <img
        class="img-responsive center-block"
        :src="teacher.image || emptyImage"
        style="width: 250px; margin-bottom: 25px"
      /> -->
    </div>
    <div class="col-lg-8">
      <p>{{ teacher.introduction }}</p>
      <!-- <router-link
        class="btn btn-primary btn-border mr-2"
        :to="{ name: 'teacher-dashboard', params: { id: teacher.id } }"
        >Dashboard</router-link
      > -->
      <!-- <button
        type="button"
        class="btn btn-danger btn-border mr-2"
        v-if="teacher.isFavorited"
        @click.prevent.stop="deleteFavorite(teacher.id)"
      >
        移除最愛
      </button>
      <button
        type="button"
        class="btn btn-primary btn-border mr-2"
        v-else
        @click.prevent.stop="addFavorite(teacher.id)"
      >
        加到最愛
      </button> -->
    </div>
  </div>
</template>

<script>
// import { emptyImageFilter } from "../utils/mixins"
// import usersAPI from "./../apis/user"
import teacherAPI from "./../apis/teacher"
import { Toast } from "../utils/helpers"

export default {
  name: "TeacherDetail",
  // mixins: [emptyImageFilter],
  props: {
    initialTeacher: {
      type: Object,
      required: true,
    },
  },
  watch: {
    initialTeacher(newValue) {
      this.teacher = {
        ...this.teacher,
        ...newValue,
      }
    },
  },
  data() {
    return {
      teacher: this.initialTeacher,
    }
  },
  methods: {
    async addFavorite(teacherId) {
      try {
        const { data } = await teacherAPI.addFavorite({ teacherId })
        if (data.status !== "success") {
          throw new Error(data.message)
        }
        this.teacher = {
          ...this.teacher,
          isFavorited: true,
        }
      } catch (error) {
        console.log("error", error)
        Toast.fire({
          icon: "error",
          title: "無法加入最愛，請稍後再試",
        })
      }
    },
    async deleteFavorite(teacherId) {
      try {
        const { data } = await teacherAPI.deleteFavorite({ teacherId })
        if (data.status !== "success") {
          throw new Error(data.message)
        }
        this.teacher = {
          ...this.teacher,
          isFavorited: false,
        }
      } catch (error) {
        console.log("error", error)
        Toast.fire({
          icon: "error",
          title: "無法加入最愛，請稍後再試",
        })
      }
    },
  },
}
</script>
<style scoped>
.col-lg-8 p,
.contact-info-wrap li,
.contact-info-wrap strong {
  font-family: serif;
  font-size: 17px;
}
</style>
