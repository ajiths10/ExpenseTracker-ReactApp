import { createSlice } from "@reduxjs/toolkit";

const darkModeInitial = { isDarkMode : false }

const darkMode =createSlice( {
    name: 'darkmode',
    initialState: darkModeInitial,
    reducers:{
        darkModeToggle(state){
            state.isDarkMode = !state.isDarkMode;
        },
    }
})

export const darkModeActions = darkMode.actions;

export default darkMode.reducer;