import { create } from 'zustand';


const store = create((set) => ({
    fontsLoaded: null,
    setFontsLoaded: (state)=> set({fontsLoaded: state}),

    budget:{},
    setBudget:(state)=> set({budget: state})

}));


export default store;