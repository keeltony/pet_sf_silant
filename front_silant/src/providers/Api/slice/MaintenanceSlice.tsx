import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Maintenance} from "../models/Maintenance";
import {MaintenanceUnit} from "../models/MaintenanceUnit";

export interface MaintenanceInfoState {
    maintenance:Maintenance;
    unit_maintenance: MaintenanceUnit;
    is_download_maintenance: boolean
}

const initialState: MaintenanceInfoState = {

    maintenance:{
        "maintenance_data":[{
            "id": "",
            "type_of_maintenance__name": "",
            "date_of_maintenance": "",
            "operating_time": "",
            "order_number": "",
            "order_date": "",
            "machine_id__factory_number":""
        }]
        ,
        "select_data":{
            "machine": {},
            "type_maintenance" : {}
        },
        'filter_data':{
            "type_of_maintenance": {},
            "service_company": {},
            "machine": {}
        }

    },
    unit_maintenance:{
            "id": "",
            "type_of_maintenance": "",
            "date_of_maintenance": "",
            "operating_time": "",
            "order_number": "",
            "order_date": "",
            "machine":""

    },
    is_download_maintenance: false



}

export const maintenanceInfoSlice = createSlice({
    name: 'maintenanceInfo',
    initialState,
    reducers: {
        MaintenanceInfo(state, action: PayloadAction<Maintenance>){
            state.maintenance = action.payload
        },
        MaintenanceUnit(state, action: PayloadAction<MaintenanceUnit>){
            state.unit_maintenance = action.payload
        },
        MaintenanceIsDDownload(state, action: PayloadAction<boolean>){
            state.is_download_maintenance = action.payload
        },
ResetMaintenance(state){
    const { type_of_maintenance, machine } = state.unit_maintenance;
    state.unit_maintenance = {
        ...initialState.unit_maintenance,
        type_of_maintenance,
        machine
    }}
}})

export default maintenanceInfoSlice.reducer;