import {memo, ReactNode} from 'react';
import {classNames, Mods} from "../../../shared/lib/classNames/classNames";
import {Form} from "react-bootstrap";
import {useAppdispatch, useAppSelector} from "../../hooks/Redux/redux";
import {carInfoSlice} from "../../../providers/Api/slice/CarSlice";

interface InputAreaProps {
    className?: string
    children?: ReactNode
    role: string
    type?:string
    valueInput: string
    valueDispatch: string
    header: string
}


export const InputArea = memo((props: InputAreaProps) => {



    const {
        className,
        children,
        role,
        type,
        valueDispatch,
        valueInput,
        header,
        ...otherProps
    } = props

    const mods: Mods = {

    };

    const dispatch = useAppdispatch()
    const {infoCar} = carInfoSlice.actions
    const {car} = useAppSelector(state => state.carInfo)


    return (
        <tr
            className={classNames('', mods, [className])}
            {...otherProps}
        >
            <td>{header}</td>
            <td>
                <Form.Control
                    as="textarea"
                    rows={1}
                    value={valueInput}
                    disabled={role !== 'manager'}
                    type={type}
                    onChange={event =>{
                        dispatch(infoCar({ ...car, [valueDispatch]: event.target.value }));
                    }
                }
                />
            </td>
        </tr>
    );
});