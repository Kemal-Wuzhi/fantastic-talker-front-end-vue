import { apiHelper } from "./../utils/helpers"
// const getToken = () => localStorage.getItem("token")

export default {
  getTeacher({ teacherId }) {
    return apiHelper.get(`/teachers/${teacherId}`)
  },
  // getTeacher() {
  //   const searchParams = new URLSearchParams()
  //   console.loh("searchParams:", searchParams)
  //   return apiHelper.get(`/teachers?${searchParams.toString()}`)
  // },
  getTeachers() {
    return apiHelper.get("/teachers/")
  },
}
