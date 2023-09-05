import { configureStore } from '@reduxjs/toolkit';
import { AlertSlice } from './feature/AlertSlice';
import { userSlice } from './feature/userSlice';

export default configureStore({
    reducer: {
        alerts: AlertSlice.reducer,
        user: userSlice.reducer
    },
})
