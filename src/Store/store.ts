
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from '../../node_modules/react-redux/src/hooks/useDispatch';
import userReducer from './user.slice'
import reportReducer from './report.slice'
import guideReducer from './guide.slice'
import governmentalReducer from './governmental.slice'
export  const configStore = configureStore({
    reducer: {
        user: userReducer,
        reports: reportReducer,
        guides: guideReducer,
        governmentals: governmentalReducer,
    },
})

export type AppDispatch = typeof configStore.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();