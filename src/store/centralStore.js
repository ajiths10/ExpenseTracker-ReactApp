import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import itemsListReducer from "./fetchData";
import premiumReducer from "./PremiumBtn";
import darkModeReducer from "./darkMode";
import paginationReducer from "./pagination";

const store = configureStore({
  reducer: {
    auth: authReducer,
    itemsData: itemsListReducer,
    premium: premiumReducer,
    darkMode: darkModeReducer,
    pagination: paginationReducer,
  },
});

export default store;
