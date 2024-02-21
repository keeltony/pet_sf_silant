import {memo, ReactNode, useEffect} from 'react';
import {classNames, Mods} from "../../shared/lib/classNames/classNames";
import cls from "./FilterComplaints.module.scss"
import {Button, Form} from "react-bootstrap";
import {useAppdispatch, useAppSelector} from "../../shared/hooks/Redux/redux";
import {useQueryParams} from "../../shared/hooks/useQueryParams/useQueryParams";
import {complaintsInfoSlice} from "../../providers/Api/slice/ComplaintsSlice";
import MainAPI from "../../providers/Api/axios";

interface FilterComplaintsProps {
    className?: string
    children?: ReactNode
}


export const FilterComplaints = memo((props: FilterComplaintsProps) => {

        const dispatch = useAppdispatch()
        const {ComplaintsInfo} = complaintsInfoSlice.actions
        const {complaints} = useAppSelector(state=>state.complaintsInfo)
        const {setQueryParam, queryParameters} = useQueryParams();

        const get_list_complaints = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        try {
            let list_complaint = await MainAPI.get_data(`service/api/complaints/?`+

            `&failure_node=${!!queryParameters.failure_node ? queryParameters.failure_node :"Все модели"}`+
            `&recovery_method=${!!queryParameters.recovery_method ? queryParameters.recovery_method :"Все модели"}`+
            `&service_company=${!!queryParameters.service_company_maintenance_complaints ? queryParameters.service_company_maintenance_complaints :"Все модели"}`
            )
                dispatch(ComplaintsInfo(list_complaint))
            if (!list_complaint){
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
            get_list_complaints(event);
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
            className={classNames(cls.FilterComplaints, mods, [className])}
            {...otherProps}
        >
              <Form.Group className={cls.Input} controlId="formModel">
                <Form.Label>Узел отказа</Form.Label>
                <Form.Control
                    value={queryParameters.failure_node}
                    onChange={event => {
                    setQueryParam("failure_node",event.target.value);
                }}
                    as="select">
                  <option >Все модели</option>
                  {complaints &&
                      Object.values(complaints.filter_data.failure_node).map((model) => (
                        <option key={model['failure_node__name']}>{model['failure_node__name']}</option>
                    ))}
                </Form.Control>

              </Form.Group>

              <Form.Group className={cls.Input} controlId="formModel">
                <Form.Label>Способ восстановления</Form.Label>
                <Form.Control
                    value={queryParameters.recovery_method}
                    onChange={event => {
                    setQueryParam("recovery_method",event.target.value);
                }}
                    as="select">
                  <option >Все модели</option>
                  {complaints &&
                      Object.values(complaints.filter_data.recovery_method).map((model) => (
                        <option key={model['recovery_method__name']}>{model['recovery_method__name']}</option>
                    ))}
                </Form.Control>
              </Form.Group>

              <Form.Group className={cls.Input} controlId="formModel">
                <Form.Label>Сервисная Компания</Form.Label>
                <Form.Control
                    value={queryParameters.service_company_maintenance_complaints}
                    onChange={event => {
                    setQueryParam("service_company_maintenance_complaints",event.target.value);
                }}
                    as="select">
                  <option >Все модели</option>
                  {complaints &&
                      Object.values(complaints.filter_data.service_company).map((model) => (
                        <option key={model['machine__service_company__first_name']}>{model['machine__service_company__first_name']}</option>
                    ))}
                </Form.Control>
              </Form.Group>
            <Button className={"m-3"} onClick={get_list_complaints}>Сформитровать</Button>



        </div>
    );
});