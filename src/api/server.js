import axios from "axios";

export default axios.create({
  baseURL:
    process.env.BACKENDURL || "https://mern-products-app.herokuapp.com/api",
});
