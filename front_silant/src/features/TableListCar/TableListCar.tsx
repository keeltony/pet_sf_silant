import {memo, ReactNode, useState} from 'react';
import {classNames, Mods} from "../../shared/lib/classNames/classNames";
import cls from "./TableListCar.module.scss"
import {Button, Table} from "react-bootstrap";
import {useAppdispatch, useAppSelector} from "../../shared/hooks/Redux/redux";
import {carInfoSlice} from "../../providers/Api/slice/CarSlice";
import {useNavigate} from "react-router-dom";
import {TableComplaints} from "../../widgets/TableComplaints/TableComplaints";
import {TableMaintenance} from "../../widgets/TableMaintenance/TableMaintenance";
import {Filter} from "../../widgets/Filter/Filter";
import {FilterMaintenance} from "../../widgets/FilterMaintenance/FilterMaintenance";
import {FilterComplaints} from "../../widgets/FilterComplaints/FilterComplaints";

interface TableListCarProps {
    className?: string
    children?: ReactNode
}


export const TableListCar = memo((props: TableListCarProps) => {
    const dispatch = useAppdispatch()
    const {numberCars} = carInfoSlice.actions
    const {listMachine} =useAppSelector(state => state.listMachine)
    const [isCar,setIsCar]=useState<boolean>(true)
    const [isComplaints, setIsComplaints]=useState<boolean>()
    const [isMaintenance,setIsMaintenance]=useState<boolean>()
    const navigate = useNavigate()



    const {
        className,
        children,
        ...otherProps
    } = props

    const mods: Mods = {

    };

    return (
        <div
            className={classNames(cls.TableListCar, mods, [className])}
            {...otherProps}
        >
            <h4 className={cls.Header}>Информация о комплектации и технических характеристиках вашей техники</h4>
          <div className={cls.ContainerButton}>
            <Button onClick={()=>{setIsCar(true); setIsMaintenance(false); setIsComplaints(false)}} className={cls.Button} variant="warning">Общая инфо</Button>
            <Button onClick={()=>{setIsCar(false); setIsMaintenance(true); setIsComplaints(false)}} className={cls.Button} variant="warning">ТО</Button>
            <Button onClick={()=>{setIsCar(false); setIsMaintenance(false); setIsComplaints(true)}} className={cls.Button} variant="warning">Рекламации</Button>
          </div>
            {isCar &&
                <div>
                    <Filter/>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Модель техники</th>
                                <th>Заводской номер</th>
                                <th>Модель двигателя</th>
                                <th>Зав. № двигателя</th>
                                <th>Модель трансмиссии</th>
                                <th>Зав. № трансмиссии</th>
                                <th>Модель ведущего моста</th>
                                <th>Зав. № ведущего моста</th>
                                <th>Модель управляемого моста</th>
                                <th>Зав. № управляемого моста</th>
                            </tr>
                        </thead>
                            <tbody>
                            {listMachine &&
                                Array.isArray(listMachine.machine_list_data) &&
                                listMachine.machine_list_data.map((machine) => (
                                    <tr key={machine.id}
                                            onClick={() => {dispatch(numberCars(machine.factory_number))
                                                                navigate("/")
                                            }}
                                    >
                                        <td>{machine.machine_model__name}</td>
                                        <td>{machine.factory_number}</td>
                                        <td>{machine.engine_model__name}</td>
                                         <td>{machine.engine_number}</td>
                                        <td>{machine.transmission_model__name}</td>
                                         <td>{machine.transmission_number}</td>
                                        <td>{machine.driving_bridge_model__name}</td>
                                         <td>{machine.driving_bridge_number}</td>
                                        <td>{machine.controlled_bridge_model__name}</td>
                                         <td>{machine.controlled_bridge_number}</td>
                                    </tr>
                                ))}

                            </tbody>
                    </Table>
                </div>
            }
            {isComplaints &&
                <div>
                    <FilterComplaints/>
                    <TableComplaints/>
                </div>
            }
            {isMaintenance &&
                <div>
                    <FilterMaintenance/>
                    <TableMaintenance/>
                </div>
            }
            {children}
        </div>
    );
});