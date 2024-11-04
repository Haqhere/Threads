import { configureStore } from "@reduxjs/toolkit";
import postsSlice from './reducers/postsSlice'
import userSlice from './reducers/userSlice'




export const store = configureStore({
    reducer:{
        posts : postsSlice,
        users : userSlice,
    },
})


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;