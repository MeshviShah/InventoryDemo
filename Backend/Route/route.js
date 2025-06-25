import {productRoute} from "./index.js";

  export const routes = (app) => {
    app.use('/product', productRoute);
  };