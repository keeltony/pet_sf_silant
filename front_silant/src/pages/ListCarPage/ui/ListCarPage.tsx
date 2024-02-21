import {memo, ReactNode} from 'react';
import {classNames, Mods} from "../../../shared/lib/classNames/classNames";
import cls from "./ListCarPage.module.scss"
import {PageWrapper} from "../../../shared/ui/PageWrapper/PageWrapper";
import {TableListCar} from "../../../features/TableListCar/TableListCar";

interface ListCarPageProps {
    className?: string
    children?: ReactNode
}


 const ListCarPage = memo((props: ListCarPageProps) => {
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
                className={classNames(cls.ListCarPage, mods, [className])}
                {...otherProps}
            >

                <TableListCar/>
                {children}
            </div>
        </PageWrapper>
    );
});
export default ListCarPage