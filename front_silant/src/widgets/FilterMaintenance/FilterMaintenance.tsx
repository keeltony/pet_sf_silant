import {memo, ReactNode, useEffect} from 'react';
import {classNames, Mods} from "../../shared/lib/classNames/classNames";
import cls from "./FilterMaintenance.module.scss"
import {Button, Form} from "react-bootstrap";
import {useAppdispatch, useAppSelector} from "../../shared/hooks/Redux/redux";
import {maintenanceInfoSlice} from "../../providers/Api/slice/MaintenanceSlice";
import MainAPI from "../../providers/Api/axios";
import {useQueryParams} from "../../shared/hooks/useQueryParams/useQueryParams";

interface FilterMaintenanceProps {
    className?: string
    children?: ReactNode
}


export const FilterMaintenance = memo((props: FilterMaintenanceProps) => {

    const dispatch = useAppdispatch()
    const {MaintenanceInfo} = maintenanceInfoSlice.actions
    const {maintenance} = useAppSelector(state=>state.maintenanceInfo)
     const {setQueryParam, queryParameters} = useQueryParams();

        const get_list_maintenance = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        try {
            let list_maintenances = await MainAPI.get_data(`service/api/maintenance/?`+

            `&type_of_maintenance=${!!queryParameters.type_of_maintenance ? queryParameters.type_of_maintenance :"Все модели"}`+
            `&service_company=${!!queryParameters.service_company_maintenance ? queryParameters.service_company_maintenance :"Все модели"}`+
            `&machine=${!!queryParameters.machine_number_maintenance ? queryParameters.machine_number_maintenance :"Все модели"}`
            )
                dispatch(MaintenanceInfo(list_maintenances))
            if (!list_maintenances){
                alert("Такого номера не существует")
            }

        }
         catch (error) {
            console.log(`Ошибка ${error}`)
        }}

        useEffect(() => {
        const event = {
            preventDefault: () => {},
        }
            get_list_maintenance(event);
        },[]);



    const {
        className,
        children,
        ...otherProps
    } = props

    const mods: Mods = {

    };

    return (
        <div
            className={classNames(cls.FilterMaintenance, mods, [className])}
            {...otherProps}
        >
              <Form.Group className={cls.Input} controlId="formModel">
                <Form.Label>Тип ТО</Form.Label>
                <Form.Control
                    value={queryParameters.type_of_maintenance}
                    onChange={event => {
                    setQueryParam("type_of_maintenance",event.target.value);
                }}
                    as="select">
                  <option >Все модели</option>
                  {maintenance &&
                      Object.values(maintenance.filter_data.type_of_maintenance).map((model) => (
                        <option key={model['type_of_maintenance__name']}>{model['type_of_maintenance__name']}</option>
                    ))}
                </Form.Control>
              </Form.Group>

              <Form.Group className={cls.Input} controlId="formModel">
                <Form.Label>Сервисная Компания</Form.Label>
                <Form.Control
                    value={queryParameters.service_company_maintenance}
                    onChange={event => {
                    setQueryParam("service_company_maintenance",event.target.value);
                }}
                    as="select">
                  <option >Все модели</option>
                  {maintenance &&
                      Object.values(maintenance.filter_data.service_company).map((model) => (
                        <option key={model['machine__service_company__first_name']}>{model['machine__service_company__first_name']}</option>
                    ))}
                </Form.Control>
              </Form.Group>

              <Form.Group className={cls.Input} controlId="formModel">
                <Form.Label>Машина</Form.Label>
                <Form.Control
                    value={queryParameters.machine_number_maintenance}
                    onChange={event => {
                    setQueryParam("machine_number_maintenance",event.target.value);
                }}
                    as="select">
                  <option >Все модели</option>
                  {maintenance &&
                      Object.values(maintenance.filter_data.machine).map((model) => (
                        <option key={model['factory_number']}>{model['factory_number']}</option>
                    ))}
                </Form.Control>
              </Form.Group>
            <Button className={"m-3"} onClick={get_list_maintenance}>Сформитровать</Button>
            {children}
        </div>
    );
});