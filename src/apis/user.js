import { apiHelper } from "./../utils/helpers"
const getToken = () => localStorage.getItem("token")

export default {
  update({ userId, email, name, password, checkPassword }) {
    return apiHelper.put(
      `/users/${userId}/`,
      {
        email,
        name,
        password,
        checkPassword,
      },
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    )
  },
  getUser({ userId }) {
    return apiHelper.get(`/users/${userId}`)
  },
  updateUser({ userId, formData }) {
    return apiHelper.put(`/users/${userId}`, formData)
  },
}
