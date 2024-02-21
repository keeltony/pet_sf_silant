import {memo, ReactNode, useState} from 'react';
import {classNames, Mods} from "../../shared/lib/classNames/classNames";
import cls from "./TableMaintenance.module.scss"
import {Button, Form, Modal, Table} from "react-bootstrap";
import {useAppdispatch, useAppSelector} from "../../shared/hooks/Redux/redux";
import {maintenanceInfoSlice} from "../../providers/Api/slice/MaintenanceSlice";
import moment from 'moment'
import MainAPI from "../../providers/Api/axios";

interface TableMaintenanceProps {
    className?: string
    children?: ReactNode
}

export const TableMaintenance = memo((props: TableMaintenanceProps) => {
        const dispatch = useAppdispatch()
        const {unit_maintenance} =useAppSelector(state=>state.maintenanceInfo)
        const {maintenance} = useAppSelector(state=>state.maintenanceInfo)
        const {MaintenanceUnit} = maintenanceInfoSlice.actions
        const [show, setShow] = useState(false);
        const {MaintenanceIsDDownload} = maintenanceInfoSlice.actions
        const {ResetMaintenance} = maintenanceInfoSlice.actions
        const [updateRole, setUpdateRole] = useState("client")



        const get_maintenance_unit = async (event: { preventDefault: () => void; },id:string) => {
        event.preventDefault();

        try {
            let maintenance_unit = await MainAPI.get_data(`service/api/maintenance_unit/?maintenance_id=${id}`)
            dispatch(MaintenanceUnit(maintenance_unit))

            if (!maintenance_unit){
                alert("Такого ТО не существует")
            }

        }
         catch (error) {
            console.log(`Ошибка ${error}`)
        }}

        async function save_maintenance() {
            const datePattern = /^(0[1-9]|[12][0-9]|3[01])[./-](0[1-9]|1[0-2])[./-](\d{4})$/;
            if (datePattern.test(unit_maintenance.date_of_maintenance) && datePattern.test(unit_maintenance.order_date)){
                let result = await MainAPI.post_data(`service/api/update_maintenance/`, unit_maintenance)
                dispatch(MaintenanceIsDDownload(true));
                setShow(false);
                alert(result.result)
            }else {
                alert("Некорректный формат даты! Введите дату в формате dd.mm.yyyy");
            }
    }




          const handleClose = () => setShow(false);
      const handleShow = () => {
          setShow(true);
      }


    const {
        className,
        children,
        ...otherProps
    } = props

    const mods: Mods = {

    };

    return (
        <div
            className={classNames(cls.TableMaintenance, mods, [className])}
            {...otherProps}
        >
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Дата проведения ТО</th>
                  <th>Вид технического обслуживания</th>
                  <th>Наработка, м/час</th>
                  <th>№ заказ-наряда</th>
                  <th>Дата заказ-наряда</th>
                  <th>Машина</th>
                </tr>
              </thead>
              <tbody>
              {maintenance.maintenance_data.map((item)=>(
                  <tr key={item.id} onClick={(event)=>{dispatch(MaintenanceIsDDownload(false));handleShow();setUpdateRole("client"); get_maintenance_unit(event,item.id)}}>
                      <td>{moment(item.date_of_maintenance).format("DD.MM.YYYY")}</td>
                      <td>{item.type_of_maintenance__name}</td>
                      <td>{item.operating_time}</td>
                      <td>{item.order_number}</td>
                      <td>{moment(item.order_date).format("DD.MM.YYYY")}</td>
                      <td>{item.machine_id__factory_number}</td>
                  </tr>
              ))}
              </tbody>
            </Table>
                        <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Редактирование ТО</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <td>
                        <tr>
                            <td>Вид технического обслуживания</td>
                                <td>
                                    <Form.Control
                                        as="select"
                                        value={unit_maintenance.type_of_maintenance}
                                onChange={event =>{
                                dispatch(MaintenanceUnit({...unit_maintenance, type_of_maintenance: event.target.value}));
                                }}
                                    >
                                        {
                                          Object.values(maintenance.select_data.type_maintenance).map((model) => (
                                            <option key={model['name']}>{model['name']}</option>
                                        ))}
                                    </Form.Control>
                                </td>

                        </tr>
                        <tr>
                        <td>Машина</td>
                            <td>
                                <Form.Control
                                    disabled={updateRole !== 'manager'}
                                    as="select"
                                    value={unit_maintenance.machine}
                                onChange={event =>{
                                dispatch(MaintenanceUnit({...unit_maintenance, machine: event.target.value}));
                                }}

                                >
                                    {
                                      Object.values(maintenance.filter_data.machine).map((model) => (
                                        <option key={model['factory_number']}>{model['factory_number']}</option>
                                    ))}
                                </Form.Control>
                            </td>
                        </tr>
                        <tr>
                            <td>Дата проведения ТО</td>
                           <td>
                                <Form.Control
                                 rows={1} as="textarea"
                                 value={unit_maintenance.date_of_maintenance}
                                onChange={event =>{
                                dispatch(MaintenanceUnit({...unit_maintenance, date_of_maintenance: event.target.value}));
                                }}
                            /></td>
                        </tr>
                        <tr>
                           <td>Наработка, м/час</td>
                           <td>
                                <Form.Control
                                 rows={1} as="textarea"
                                 value={unit_maintenance.operating_time}
                                onChange={event =>{
                                dispatch(MaintenanceUnit({...unit_maintenance, operating_time: event.target.value}));
                                }}
                            /></td>
                        </tr>
                        <tr>
                           <td>№ заказ-наряда</td>
                           <td>
                                <Form.Control
                                 rows={1} as="textarea"
                                 value={unit_maintenance.order_number}
                                onChange={event =>{
                                dispatch(MaintenanceUnit({...unit_maintenance, order_number: event.target.value}));
                                }}
                            /></td>
                        </tr>
                        <tr>
                           <td>Дата заказ-наряда</td>
                           <td>
                                <Form.Control
                                 rows={1} as="textarea"
                                 value={unit_maintenance.order_date}
                                onChange={event =>{
                                dispatch(MaintenanceUnit({...unit_maintenance, order_date: event.target.value}));
                                }}
                            /></td>
                        </tr>
                    </td>
                    <Button className={"m-2"} onClick={()=>{save_maintenance()}}>Сохранить</Button>
                    <Button className={"m-2"} onClick={()=>{dispatch(ResetMaintenance());setUpdateRole("manager")}}>Создать новое ТО</Button>
                </Modal.Body>
          </Modal>


        </div>
    );
});