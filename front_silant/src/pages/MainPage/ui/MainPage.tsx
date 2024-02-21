import {memo, ReactNode} from 'react';
import {classNames, Mods} from "../../../shared/lib/classNames/classNames";
import cls from "./MainPage.module.scss"
import {FormSearch} from "../../../features/Form/Form";
import {PageWrapper} from "../../../shared/ui/PageWrapper/PageWrapper";
import {TableSearch} from "../../../features/Table/Table";
import {useAppSelector} from "../../../shared/hooks/Redux/redux";
import {Carusel} from "../../../widgets/Carusel/Carusel";

interface MainPageProps {
    className?: string
    children?: ReactNode
}


const MainPage = memo((props: MainPageProps) => {

    const {car} = useAppSelector(state => state.carInfo)
    const {
        className,
        children,
        ...otherProps
    } = props




    const mods: Mods = {
        
    };
    
    return (
        <PageWrapper>
            <div
                className={classNames(cls.MainPage, mods, [className])}
                {...otherProps}
            >
                <FormSearch/>
                {car?.complete_set && <TableSearch/>}
                <Carusel/>
            </div>
        </PageWrapper>
    );
});
export default MainPage