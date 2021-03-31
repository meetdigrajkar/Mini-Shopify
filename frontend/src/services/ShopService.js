import axios from "axios";
import {
  deleteShop,
  setShops,
  setUserShops,
  updateShop,
} from "../redux/actions";
import store from "../redux/store";

var endpoint =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/"
    : "https://minishopifyapp.herokuapp.com/";

// Public end points
const GET_ALL_SHOPS_URL = endpoint + "api/shop/getShops";
const GET_SHOP_BY_ID_URL = endpoint + "api/getShopById";

// Protected end points
const CREATE_SHOP_URL = endpoint + "api/shop/protected/createShop";
const DELETE_SHOP_URL = endpoint + "api/shop/protected/deleteShop";
const UPDATE_SHOP_URL = endpoint + "api/shop/protected/updateShop";
const ADD_TEST_SHOP_URL = endpoint + "api/shop/protected/createTestShop";

class ShopService {
  getHeaders() {
    const config = {
      headers: {
        "X-Firebase-Auth": store.getState().idToken,
      },
    };
    return config;
  }

  async createShop() {
    const config = {
      headers: {
        "X-Firebase-Auth": "",
      },
    };

    axios.post(CREATE_SHOP_URL, null, config).then((response) => {
      console.log(response.data);
    });
  }

  async getAllShops() {
    return axios
      .get(GET_ALL_SHOPS_URL)
      .then((res) => {
        store.dispatch(setShops(res.data));
        return res.data;
      })
      .catch((error) => {
        return null;
      });
  }

  async deleteShop(shopID) {
    var config = this.getHeaders();

    return axios
      .post(DELETE_SHOP_URL, shopID, config)
      .then((res) => {
        console.log("manually delete a shop");

        store.dispatch(deleteShop(shopID));

        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

  async updateShop(updatedShop) {
    var config = this.getHeaders();

    return axios
      .post(UPDATE_SHOP_URL, updatedShop, config)
      .then((res) => {
        store.dispatch(updateShop(updatedShop));
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

  async addTestShop() {
    var config = this.getHeaders();

    return axios
      .post(ADD_TEST_SHOP_URL, null, config)
      .then((res) => {
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

  getShopById() {
    return axios.get(GET_SHOP_BY_ID_URL);
  }
}

export default new ShopService();
