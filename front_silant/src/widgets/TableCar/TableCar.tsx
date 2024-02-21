import {memo, ReactNode, useState} from 'react';
import {classNames, Mods} from "../../shared/lib/classNames/classNames";
import cls from "./TableCar.module.scss"
import {Table} from "react-bootstrap";
import {InputArea} from "../../shared/ui/InputArea/InputArea";
import {InputSelect} from "../../shared/ui/InputSelect/InputSelect";
import {useAppSelector} from "../../shared/hooks/Redux/redux";

interface TableCarProps {
    className?: string
    children?: ReactNode
    updateRole: string
}


export const TableCar = memo((props: TableCarProps) => {

    const {role} = useAppSelector(state=>state.authReducer)
    const {car} = useAppSelector(state => state.carInfo)

    const {
        className,
        children,
        updateRole,
        ...otherProps
    } = props

    const mods: Mods = {

    };

    return (
        <div
            className={classNames(cls.TableCar, mods, [className])}
            {...otherProps}
        >
                <Table>
                    <thead>
                    <tr>
                        <th>Характеристика</th>
                        <th>Значение</th>
                    </tr>
                    </thead>
                        <tbody>
                        <InputArea header={"Зав. № машины"} valueDispatch={"factory_number"} role={updateRole} valueInput={car.factory_number}/>
                        <InputSelect valueDispatch={"machine_model"} keyInput={"name"} role={role} listMachine={car.filter_data.machine_models} valueInput={car.machine_model} header={"Модель машины"}/>
                        <InputSelect valueDispatch={"engine_model"} keyInput={"name"} role={role} listMachine={car.filter_data.engine_models} valueInput={car.engine_model} header={"Модель двигателя"}/>
                        <InputArea role={role} valueInput={car.engine_number} valueDispatch={"engine_number"} header={"Зав. № двигателя"}/>
                        <InputSelect valueDispatch={"transmission_model"} keyInput={"name"} role={role} listMachine={car.filter_data.transmission_models} valueInput={car.transmission_model} header={"Модель трансмиссии"}/>
                        <InputArea header={"Зав. № трансмиссии"} valueDispatch={"transmission_number"} role={role} valueInput={car.transmission_number}/>
                        <InputSelect valueDispatch={"driving_bridge_model"} keyInput={"name"} role={role} listMachine={car.filter_data.driving_bridge_models} valueInput={car.driving_bridge_model} header={"Модель ведущего моста"}/>
                        <InputArea role={role} valueInput={car.driving_bridge_number} valueDispatch={"driving_bridge_number"} header={"Зав. № ведущего моста"}/>
                        <InputSelect valueDispatch={"controlled_bridge_model"} keyInput={"name"} role={role} listMachine={car.filter_data.controlled_bridge_models} valueInput={car.controlled_bridge_model} header={"Модель управляемого моста"}/>
                        <InputArea role={role} valueInput={car.controlled_bridge_number} valueDispatch={"controlled_bridge_number"} header={"Зав. № управляемого моста"}/>
                        <InputArea role={role} valueInput={car.delivery_contract} valueDispatch={"delivery_contract"} header={"Договор поставки №, дата"} type={"date"}/>
                        <InputArea role={role} valueInput={car.date_of_shipment} valueDispatch={"date_of_shipment"} header={"Дата отгрузки с завода"} type={"date"}/>
                        <InputArea role={role} valueInput={car.consignee} valueDispatch={"consignee"} header={"Грузополучатель (конечный потребитель)"}/>
                        <InputArea role={role} valueInput={car.delivery_address} valueDispatch={"delivery_address"} header={"Адрес поставки (эксплуатации)"}/>
                        <InputArea role={role} valueInput={car.complete_set} valueDispatch={"complete_set"} header={"Комплектация (доп. опции)"}/>
                        <InputSelect valueDispatch={"client"} keyInput={"first_name"} role={role} listMachine={car.users_data} valueInput={car.client} header={"Клиент"}/>
                        <InputSelect valueDispatch={"service_company"} keyInput={"first_name"} role={role} listMachine={car.services_data} valueInput={car.service_company} header={"Cервисная компания"}/>
                        </tbody>
                </Table>

            {children}
        </div>
    );
});