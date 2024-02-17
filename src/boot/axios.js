import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
  timeout: 10000,
});

export default async ({ app, router, Vue }) => {
  Vue.prototype.$axios = axiosInstance;
  app.config.globalProperties.$axios = axiosInstance;
};
