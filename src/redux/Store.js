import { configureStore } from '@reduxjs/toolkit';
import { AlertSlice } from './feature/AlertSlice';

export default configureStore({
    reducer: {
        alerts: AlertSlice.reducer,
    },
})
