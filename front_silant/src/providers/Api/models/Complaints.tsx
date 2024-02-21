export interface Complaints{
    "complaints_data":{
            id: string
            "date_of_refusal": string
            "operating_time": string
            "failure_node_id__name": string
            "failure_description": string
            "recovery_method_id__name": string
            "parts_used": string
            "date_of_restoration": string
            "equipment_downtime": string
            "machine_id__factory_number": string

    }[]
    'select_data': {
            'machine': object
            'failure_node': object
            'recovery_method': object
        }
        'filter_data':{
            'failure_node': object
            'recovery_method': object
            'service_company': object
            'machine': object
                }


}