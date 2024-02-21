import {memo, ReactNode} from 'react';
import {classNames, Mods} from "../../../shared/lib/classNames/classNames";
import {Form} from "react-bootstrap";
import {useAppdispatch, useAppSelector} from "../../hooks/Redux/redux";
import {carInfoSlice} from "../../../providers/Api/slice/CarSlice";

interface InputSelectProps {
    className?: string
    children?: ReactNode
    role: string
    listMachine: object
    valueInput: string
    header: string
    keyInput: string
    valueDispatch: string
}


export const InputSelect = memo((props: InputSelectProps) => {
    const {
        className,
        children,
        role,
        listMachine,
        valueInput,
        keyInput,
        header,
        valueDispatch,
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
                            disabled={role !== 'manager'}
                            as="select"
                            value={valueInput}
                            onChange={event => {
                            dispatch(infoCar({...car, [valueDispatch]: event.target.value}));
                            }}

                        >
                            {
                              Object.values(listMachine).map((model) => (
                                <option
                                         key={model[keyInput]}

                                >{model[keyInput]}</option>
                            ))}
                            <option disabled={true}>Данные доступны для владельцев техники</option>
                        </Form.Control>
                    </td>
        </tr>
    );
});