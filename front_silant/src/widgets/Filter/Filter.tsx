import { memo, ReactNode, useEffect } from "react";
import { classNames, Mods } from "../../shared/lib/classNames/classNames";
import { Form, Button } from "react-bootstrap";
import cls from "./Filter.module.scss";
import MainAPI from "../../providers/Api/axios";
import { useAppdispatch, useAppSelector } from "../../shared/hooks/Redux/redux";
import { listMachineSlice } from "../../providers/Api/slice/ListMachineSlice";
import { useQueryParams } from "../../shared/hooks/useQueryParams/useQueryParams";

interface FilterProps {
  className?: string;
  children?: ReactNode;
}

export const Filter = memo((props: FilterProps) => {
  const dispatch = useAppdispatch();
  const { ListMachineSlice } = listMachineSlice.actions;
  const { listMachine } = useAppSelector((state) => state.listMachine);
  const { setQueryParam, queryParameters} = useQueryParams();

  const get_list_machine = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      let list_machine = await MainAPI.get_data(
        `service/api/machine_list/?` +
          `machine_model=${
            !!queryParameters.machine_model
              ? queryParameters.machine_model
              : "Все модели"
          }` +
          `&engine_model=${
            !!queryParameters.engine_model
              ? queryParameters.engine_model
              : "Все модели"
          }` +
          `&transmission_model=${
            !!queryParameters.transmission_model
              ? queryParameters.transmission_model
              : "Все модели"
          }` +
          `&driving_bridge_model=${
            !!queryParameters.driving_bridge_model
              ? queryParameters.driving_bridge_model
              : "Все модели"
          }` +
          `&controlled_bridge_model=${
            !!queryParameters.controlled_bridge_model
              ? queryParameters.controlled_bridge_model
              : "Все модели"
          }`
      );
      dispatch(ListMachineSlice(list_machine));
      if (!list_machine) {
        alert("Такого номера не существует");
      }
    } catch (error) {
      console.log(`Ошибка ${error}`);
    }
  };

  useEffect(() => {
    const event = {
      preventDefault: () => {},
    };
    get_list_machine(event);
  }, []);

  const { className, children, ...otherProps } = props;

  const mods: Mods = {};

  return (
    <div className={classNames(cls.Filter, mods, [className])} {...otherProps}>
      <Form className={cls.Form}>
        <Form.Group className={cls.Input} controlId="formModel">
          <Form.Label>Модель техники</Form.Label>
          <Form.Control
            value={queryParameters.machine_model}
            onChange={(event) => {
              setQueryParam("machine_model", event.target.value);
            }}
            as="select"
          >
            <option>Все модели</option>
            {listMachine &&
              Object.values(listMachine.filter_data.machine_models).map(
                (model) => (
                  <option key={model["machine_model__name"]}>
                    {model["machine_model__name"]}
                  </option>
                )
              )}
          </Form.Control>
        </Form.Group>

        <Form.Group className={cls.Input} controlId="formEngineModel">
          <Form.Label>Модель двигателя</Form.Label>
          <Form.Control
            value={queryParameters.engine_model}
            onChange={(event) => {
              setQueryParam("engine_model", event.target.value);
            }}
            as="select"
          >
            <option>Все модели</option>
            {listMachine &&
              Object.values(listMachine.filter_data.engine_models).map(
                (model) => (
                  <option key={model["engine_model__name"]}>
                    {model["engine_model__name"]}
                  </option>
                )
              )}
          </Form.Control>
        </Form.Group>

        <Form.Group className={cls.Input} controlId="formTransmissionModel">
          <Form.Label>Модель трансмиссии</Form.Label>
          <Form.Control
            value={queryParameters.transmission_model}
            onChange={(event) => {
              setQueryParam("transmission_model", event.target.value);
            }}
            as="select"
          >
            <option>Все модели</option>
            {listMachine &&
              Object.values(listMachine.filter_data.transmission_models).map(
                (model) => (
                  <option key={model["transmission_model__name"]}>
                    {model["transmission_model__name"]}
                  </option>
                )
              )}
          </Form.Control>
        </Form.Group>

        <Form.Group className={cls.Input} controlId="formAxleModel">
          <Form.Label>Модель ведущего моста</Form.Label>
          <Form.Control
            value={queryParameters.driving_bridge_model}
            onChange={(event) => {
              setQueryParam("driving_bridge_model", event.target.value);
            }}
            as="select"
          >
            <option>Все модели</option>
            {listMachine &&
              Object.values(listMachine.filter_data.driving_bridge_models).map(
                (model) => (
                  <option key={model["driving_bridge_model__name"]}>
                    {model["driving_bridge_model__name"]}
                  </option>
                )
              )}
          </Form.Control>
        </Form.Group>

        <Form.Group className={cls.Input} controlId="formSteeringModel">
          <Form.Label>Модель управляемого моста</Form.Label>
          <Form.Control
            onChange={(event) => {
              setQueryParam("controlled_bridge_model", event.target.value);
            }}
            as="select"
          >
            <option>Все модели</option>
            {listMachine &&
              Object.values(
                listMachine.filter_data.controlled_bridge_models
              ).map((model) => (
                <option key={model["controlled_bridge_model__name"]}>
                  {model["controlled_bridge_model__name"]}
                </option>
              ))}
          </Form.Control>
        </Form.Group>
      </Form>
      <div className={cls.ButtonContainer}>
        <Button
          onClick={get_list_machine}
          className={cls.Button}
          variant="warning"
          type="submit"
        >
          Найти
        </Button>
      </div>

      {children}
    </div>
  );
});
