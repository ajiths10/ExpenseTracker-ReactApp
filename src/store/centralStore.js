import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth';
import itemsListReducer from './fetchData';
import  premiumReducer  from "./PremiumBtn";
import darkModeReducer from './darkMode';

const store = configureStore({
    reducer: { auth:authReducer,
        itemsData:itemsListReducer,
        premium:premiumReducer,
        darkMode:darkModeReducer,
    },
});



export default store;