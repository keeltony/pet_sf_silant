import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ListMachine} from "../models/ListMachine";

export interface ListMachineState {
    listMachine:ListMachine;
}

const initialState: ListMachineState = {

    listMachine:{
        filter_data:{
            controlled_bridge_models:{
                0:{
                    name:"Все модели"
                }
            },
            driving_bridge_models:{
                0:{
                    name:"Все модели"
                }
            },
            engine_models:{
                0:{
                    name:"Все модели"
                }
            },
            machine_models:{
                0:{
                    name:"Все модели"
                }
            },
            transmission_models:{
                0:{
                    name:"Все модели"
                }

            }
        },
        machine_list_data:{
            controlled_bridge_model__name:"",
            driving_bridge_model__name:"",
            engine_model__name:"",
            factory_number:"",
            id:null,
            machine_model__name:"",
            transmission_model__name:"",
            engine_number: "",
            transmission_number: "",
            driving_bridge_number: "",
            controlled_bridge_number: "",

        },
        users_data: {},
        services_data: {}

}
}

export const listMachineSlice = createSlice({
    name: 'listMachine',
    initialState,
    reducers: {
        ListMachineSlice(state, action: PayloadAction<ListMachine>){
            state.listMachine = action.payload
        },
    }
})

export default listMachineSlice.reducer;

