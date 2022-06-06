import { apiHelper } from "./../utils/helpers"

export default {
  signin({ email, password }) {
    return apiHelper.post("/signin", {
      email,
      password,
    })
  },
  signup({ email, name, password, checkPassword }) {
    return apiHelper.post("/users", {
      email,
      name,
      password,
      checkPassword,
    })
  },
  adminSignin({ email, password }) {
    return apiHelper.post("/admin/signin", {
      email,
      password,
    })
  },
}
