import {memo, ReactNode, useEffect, useState} from 'react';
import {classNames, Mods} from "../../shared/lib/classNames/classNames";
import {Button} from 'react-bootstrap';
import cls from "./Table.module.scss"
import {useAppdispatch, useAppSelector} from "../../shared/hooks/Redux/redux";
import MainAPI from "../../providers/Api/axios";
import {carInfoSlice} from "../../providers/Api/slice/CarSlice";
import {authPageSlice} from "../../providers/Api/slice/AuthSlice";
import {TableCar} from "../../widgets/TableCar/TableCar";

interface TableProps {
    className?: string
    children?: ReactNode
}


export const TableSearch = memo((props: TableProps) => {
    const dispatch = useAppdispatch()
    const {resetCar} = carInfoSlice.actions
    const {car} = useAppSelector(state => state.carInfo)
    const {isRole} = authPageSlice.actions
    const {role} = useAppSelector(state=>state.authReducer)
    const {numberCar} = useAppSelector(state => state.carInfo)


    const [isCar,setIsCar]=useState<boolean>(true)
    const [updateRole, setUpdateRole] = useState("client")
        async function save_machine() {
        const datePattern = /^(0[1-9]|[12][0-9]|3[01])[./-](0[1-9]|1[0-2])[./-](\d{4})$/;
        if (datePattern.test(car.date_of_shipment)) {
            let result = await MainAPI.post_data(`service/api/update_machine/`, car)
            alert(result.result)
        }else {
            alert("Некорректный формат даты! Введите дату в формате dd.mm.yyyy");
        }

    }

        useEffect(()=>{
            setUpdateRole("client");
        },[numberCar])
        useEffect(() => {
            const roleUser = localStorage.getItem("role_user");
            if (roleUser !== null && roleUser !== "anonymous" && roleUser !== "") { dispatch(isRole(roleUser));
            } }, []);



    const {
        className,
        children,
        ...otherProps
    } = props

    const mods: Mods = {

    };

    return (
        <div
            className={classNames(cls.TableSearch, mods, [className])}
            {...otherProps}
        >
            {isCar &&
                <TableCar updateRole={updateRole}/>
            }
            {isCar &&
                <div>
                    {role == "manager" &&
                        <Button className={"m-2"} onClick={save_machine}>Сохранить</Button>
                    }
                    {role == "manager" &&
                        <Button className={"m-2"} onClick={() => {
                            dispatch(resetCar())
                            setUpdateRole(role)
                        }}>Создать новую машину</Button>
                    }
                </div>
            }
        </div>
    );
});