export interface Maintenance{
        "maintenance_data":{
            "id": string
            "type_of_maintenance__name": string
            "date_of_maintenance": string
            "operating_time": string
            "order_number": string
            "order_date": string
            "machine_id__factory_number":string
        }[]
        "select_data":{
            "machine": object
            "type_maintenance" :object
        }
        "filter_data":{
            "type_of_maintenance": object
            "service_company": object
            "machine": object
        }



}