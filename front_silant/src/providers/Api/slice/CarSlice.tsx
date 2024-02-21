import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Car} from "../models/Car";

export interface CarInfoState {
    car:Car;
    isloading:boolean
    numberCar: string
}

const initialState: CarInfoState = {

    car:{
            'filter_data': {
                'machine_models': {},
                'engine_models': {},
                'transmission_models': {},
                'driving_bridge_models': {},
                'controlled_bridge_models': {},
        },
            'users_data': {},
            'services_data': {},


          "service_company": "",
          "delivery_address": "",
          "consignee": "",
          "date_of_shipment": "",
          "delivery_contract": "",
          "driving_bridge_number": "",
          "engine_number": "",
          "factory_number": "",
          "transmission_number": "",
          "controlled_bridge_number": "",
          "client": "",
          "complete_set": "",
          "driving_bridge_model": "",
          "engine_model": "",
          "machine_model": "",
          "transmission_model": "",
          "controlled_bridge_model": "",
},
    isloading:false,
    numberCar: ""
}

export const carInfoSlice = createSlice({
    name: 'infoCar',
    initialState,
    reducers: {
        infoCar(state, action: PayloadAction<Car>){
            state.car = action.payload
        },
        numberCars(state, action: PayloadAction<string>){
            state.numberCar = action.payload
        },

        isLoadingCar(state, action: PayloadAction<boolean>){
            state.isloading = action.payload
        },
        resetCar(state) {
            const {services_data,users_data,filter_data,service_company,client,driving_bridge_model,engine_model,transmission_model,controlled_bridge_model} = state.car;
            state.car = {
                ...initialState.car,
                service_company,
                client,
                driving_bridge_model,
                engine_model,
                transmission_model,
                controlled_bridge_model,
                filter_data,
                users_data,
                services_data
            }
        },

    }
})

export default carInfoSlice.reducer;