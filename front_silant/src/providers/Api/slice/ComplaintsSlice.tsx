import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Complaints} from "../models/Complaints";
import {ComplaintUnit} from "../models/ComplaintUnit";

export interface ComplaintsInfoState {
    complaints:Complaints;
    unit_complaint:ComplaintUnit;
    is_download_complaint: boolean
}

const initialState: ComplaintsInfoState = {

    complaints:{
        "complaints_data":[{
            "id": "",
            "date_of_refusal": "",
            "operating_time": "",
            "failure_node_id__name": "",
            "failure_description": "",
            "recovery_method_id__name": "",
            "parts_used": "",
            "date_of_restoration": "",
            "equipment_downtime": "",
            "machine_id__factory_number": "",
        }],
        'select_data': {
            'machine': {},
            'failure_node': {},
            'recovery_method': {}
        },
        'filter_data':{
            'failure_node': {},
            'recovery_method': {},
            'service_company': {},
            'machine': {}
                }

    },
        unit_complaint:{
            'id': "",
            'date_of_refusal': "",
            'operating_time': "",
            'failure_node': "",
            'failure_description': "",
            'recovery_method': "",
            'parts_used': "",
            'date_of_restoration': "",
            'equipment_downtime': "",
            'machine': "",

        },
    is_download_complaint:false


}

export const complaintsInfoSlice = createSlice({
    name: 'complaintsInfo',
    initialState,
    reducers: {
        ComplaintsInfo(state, action: PayloadAction<Complaints>){
            state.complaints = action.payload
        },
        ComplaintsUnit(state, action:PayloadAction<ComplaintUnit>){
            state.unit_complaint = action.payload
        },
        ComplaintIsDDownload(state, action:PayloadAction<boolean>){
            state.is_download_complaint = action.payload
        },
        ResetComplaint(state){
            const {failure_node,recovery_method,machine} = state.unit_complaint;
            state.unit_complaint = {
                ...initialState.unit_complaint,
                failure_node,
                recovery_method,
                machine
            }
        }
    }
})

export default complaintsInfoSlice.reducer;