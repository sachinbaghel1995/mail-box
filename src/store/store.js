import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'
import mailReducer from './mail-slice'
import showReducer from './show-slice';
const store=configureStore({
    reducer:{auth:authReducer,mail:mailReducer,show:showReducer}
})
export default store