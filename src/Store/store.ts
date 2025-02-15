
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from '../../node_modules/react-redux/src/hooks/useDispatch';
import userReducer from './user.slice'
import reportReducer from './report.slice'
import evidenceReducer from './evidence.slice'
import governmentalReducer from './governmental.slice'
import articleReducer from './article.slice'
export  const configStore = configureStore({
    reducer: {
        user: userReducer,
        reports: reportReducer,
        evidences: evidenceReducer,
        governmentals: governmentalReducer,
        articles: articleReducer,
    },
})

export type AppDispatch = typeof configStore.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();