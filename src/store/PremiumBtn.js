import { createSlice } from "@reduxjs/toolkit";

const btnInitialState = {
    isPremium: false,
    preminumValue: false,
}
 
const PremiumBtn = createSlice({
    name: 'PremiumButton',
    initialState:btnInitialState,
    reducers: {
        PremiumBtnActive(state){
            state.isPremium = true;
            state.preminumValue = state.preminumValue
        },
        PremiumBtnDeactive(state){
            state.isPremium = false
            state.preminumValue = false
        },
        activatePremium(state){
            state.preminumValue= true
            state.isPremium = state.isPremium;
        },
    }
})

export const premiumActions = PremiumBtn.actions;

export default PremiumBtn.reducer;