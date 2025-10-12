import { create } from 'zustand';


const store = create((set) => ({
    fontsLoaded: null,
    setFontsLoaded: (state)=> set({fontsLoaded: state}),

    budget:{},
    setBudget:(state)=> set({budget: state}),
    

    totalBalance:0,
    setTotalBalance:(state)=> set({totalBalance: state}),

    notifications:[],
    setNotifications:(state)=> set({notifications: state}),

}));


export default store;