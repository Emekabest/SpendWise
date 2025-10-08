import { create } from 'zustand';


const store = create((set) => ({
    fontsLoaded: null,
    setFontsLoaded: (state)=> set({fontsLoaded: state}),

    


}));


export default store;