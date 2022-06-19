<template>
  <div class="container-fluid vh-100">
    <div class="row h-100">
      <div class="col-3 menu mh-100">
        <Menu />
      </div>

      <div class="col-md-9 row">
        <RestaurantCard
          v-for="restaurant in restaurants"
          :key="restaurant.id"
          :initialRestaurant="restaurant"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Menu from "../components/Menu.vue"

import RestaurantCard from "../components/RestaurantCard.vue"
// import RestaurantsNavPills from "../components/RestaurantsNavPills.vue"
// import RestaurantPagination from "../components/RestaurantsPagination.vue"

const dummyData = {
  restaurants: [
    {
      id: 1,
      name: "Royal Kirlin",
      tel: "1-279-871-4558",
      address: "779 Larry Grove",
      opening_hours: "08:00",
      description: "quasi",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=93.40570532027948",
      viewCounts: 0,
      createdAt: "2022-01-29T09:01:55.000Z",
      updatedAt: "2022-01-29T09:01:55.000Z",
      CategoryId: 1,
      Category: {
        id: 1,
        name: "中式料理",
        createdAt: "2022-01-29T09:01:55.000Z",
        updatedAt: "2022-01-29T09:01:55.000Z",
      },
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 2,
      name: "Junior Heidenreich",
      tel: "229-039-4723",
      address: "085 Patience Fork",
      opening_hours: "08:00",
      description: "dolorem qui ipsa",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=49.75130047525029",
      viewCounts: 0,
      createdAt: "2022-01-29T09:01:55.000Z",
      updatedAt: "2022-01-29T09:01:55.000Z",
      CategoryId: 1,
      Category: {
        id: 1,
        name: "中式料理",
        createdAt: "2022-01-29T09:01:55.000Z",
        updatedAt: "2022-01-29T09:01:55.000Z",
      },
      isFavorited: false,
      isLiked: false,
    },
  ],
}

export default {
  name: "MainPage",
  components: {
    Menu,

    //res
    // NavTabs,
    RestaurantCard,
    // RestaurantsNavPills,
    // RestaurantPagination,
  },

  // res
  data() {
    return {
      restaurants: [],
      // categories: [],
      // categoryId: -1,
      // currentPage: 1,
      // totalPage: [],
      // previousPage: -1,
      // nextPage: -1,
    }
  },
  created() {
    this.fetchRestaurants()
  },
  methods: {
    fetchRestaurants() {
      const {
        restaurants,
        // categories,
        // categoryId,
        // page,
        // totalPage,
        // prev,
        // next,
      } = dummyData
      this.restaurants = restaurants
      // this.categories = categories
      // this.categoryId = categoryId
      // this.currentPage = page
      // this.totalPage = totalPage
      // this.previousPage = prev
      // this.nextPage = next
    },
  },
}
</script>

<style scoped>
#main {
  padding-left: 0;
  padding-right: 0;
  border-left: 1px solid #e6ecf0;
  border-right: 1px solid #e6ecf0;
  max-width: 600px;
  overflow: auto;
}
</style>
