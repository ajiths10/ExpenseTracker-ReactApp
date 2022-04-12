import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth';
import itemsListReducer from './fetchData';
import  premiumReducer  from "./PremiumBtn";

const store = configureStore({
    reducer: { auth:authReducer,
        itemsData:itemsListReducer,
        premium:premiumReducer,

    },
});

export default store;