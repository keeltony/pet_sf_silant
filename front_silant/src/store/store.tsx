import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {postApi} from "../providers/Api/RtkService";
import authReducer from "../providers/Api/slice/AuthSlice";
import carInfo from "../providers/Api/slice/CarSlice";
import complaintsInfo from "../providers/Api/slice/ComplaintsSlice"
import maintenanceInfo from "../providers/Api/slice/MaintenanceSlice"
import listMachine from "../providers/Api/slice/ListMachineSlice";

const rootReducer = combineReducers({
    authReducer,
    carInfo,
    complaintsInfo,
    maintenanceInfo,
    listMachine,


    [postApi.reducerPath]: postApi.reducer
})

export const setupStore =() => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(postApi.middleware)
    })
}
export type RootState = ReturnType<typeof  rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type  AppDispatch = AppStore["dispatch"]