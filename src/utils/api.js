import Axios from 'axios';

export const axios = Axios.create({
  baseURL: "https://cors-anywhere.herokuapp.com/https://www.post.gov.tw/post/streetNameData"
})