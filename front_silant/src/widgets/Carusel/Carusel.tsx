import {memo, ReactNode} from 'react';
import {classNames, Mods} from "../../shared/lib/classNames/classNames";
import {Carousel, Container} from "react-bootstrap";
import firstImage from "../../style/icons/Icons 1.jpg"
import secondimage from "../../style/icons/Icons 2.jpg"

import cls from "./Carusel.module.scss"

interface CaruselProps {
    className?: string
    children?: ReactNode
}


export const Carusel = memo((props: CaruselProps) => {
    const {
        className,
        children,
        ...otherProps
    } = props
    
    const mods: Mods = {
        
    };
    
    return (
        <div
            className={classNames(cls.Carusel, mods, [className])}
            {...otherProps}
        >
                    <Container>
            <Carousel variant="dark">
                <Carousel.Item className='col-3'>
                    <img
                        className="d-block w-100 col-3"
                        src={firstImage}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item className='col-3'>
                    <img
                        className="d-block w-100 col-3"
                        src={secondimage}
                        alt="Second slide"
                    />
                </Carousel.Item>
            </Carousel>
        </Container>

        </div>
    );
});