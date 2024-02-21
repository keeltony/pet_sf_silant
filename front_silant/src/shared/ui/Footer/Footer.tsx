import {memo, ReactNode} from 'react';
import {classNames, Mods} from "../../../shared/lib/classNames/classNames";
import { Container } from 'react-bootstrap';
import cls from "./Footer.module.scss"

interface FooterProps {
    className?: string
    children?: ReactNode
}


export const Footer = memo((props: FooterProps) => {
    const {
        className,
        children,
        ...otherProps
    } = props

    const mods: Mods = {

    };

    return (
        <div
            className={classNames(cls.Footer, mods, [className])}
            {...otherProps}
        >
            <footer>
              <Container>
                <div className="d-flex justify-content-between">
                  <div>
                    <span className="text-white">+7-8352-20-12-09</span>
                    <a className="text-white m-2" href="https://telegram.org">Telegram</a>
                  </div>
                  <div>
                    <h4 className="text-white">Мой Силант 2022</h4>
                  </div>
                </div>
              </Container>
            </footer>
            {children}
        </div>
    );
});