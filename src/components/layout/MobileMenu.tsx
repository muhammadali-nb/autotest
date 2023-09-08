import React, {RefObject, useEffect, useState} from 'react';
import {HeaderLogoImage} from "./Header";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";


//icons
import house from '../../img/common/mobile_menu-icons/house.svg'
import car from '../../img/common/mobile_menu-icons/car.svg'
import dashboard from '../../img/common/mobile_menu-icons/dashboard.svg'
import phone from '../../img/common/mobile_menu-icons/phone.svg'
import question from '../../img/common/mobile_menu-icons/question.svg'
import ticked from '../../img/common/mobile_menu-icons/ticked.svg'
import loginIcon from '../../img/common/mobile_menu-icons/login.svg'
import AdvanceLogin from "../common/AdvanceLogin";

interface MobileMenuProps {
    menuIsOpen: boolean
    setMenuIsOpen: (e: boolean) => void
    menuRef: RefObject<HTMLDivElement>
}

const defaultLinks = [
    {text: "Главная", path: "/", className: '', icon: house, id: 1},
    {text: "Каталог", path: "/catalog", className: '', icon: car, id: 2},
    {text: "Программы", path: "/programs", className: '', icon: dashboard, id: 3},
    {text: "Аренда", path: "/rent", className: '', icon: ticked, id: 4},
    {text: "Вопросы", path: "/faq", className: '', icon: question, id: 5},
    {text: "Контакты", path: "/contacts", className: '', icon: phone, id: 6},
]

const MobileMenu = (props: MobileMenuProps) => {
    const {menuIsOpen, setMenuIsOpen, menuRef} = props
    const [loginAdvanceIsShow, setLoginAdvanceIsShow] =useState(true)

    useEffect(() => {
        if (menuIsOpen) document.body.style.overflow = 'hidden'
        else document.body.style.overflow = 'unset'
    }, [menuIsOpen]);

    return (
        <div className={`mobile-menu ${menuIsOpen ? 'active': ''} `}>
            <div ref={menuRef} className={`mobile-menu_container ${menuIsOpen ? 'active' : ''} `}>
                <div>
                    <div className={'d-flex align-items-center gap-2'}>
                        <FontAwesomeIcon color={'#fff'} width={20} height={20} onClick={() => setMenuIsOpen(false)}
                                         icon={faArrowLeft}/>
                        <HeaderLogoImage image={'light'} width={100} height={24}/>
                    </div>
                    <div>
                        <ul className='mobile-menu_routes'>
                            {defaultLinks.map(_item => (
                                    <li className='mobile-menu_routes_item' key={_item.id}>
                                        <Link to={_item.path}>
                                            <img src={_item.icon} alt={_item.text}/>
                                            <p>{_item.text}</p>
                                        </Link>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </div>
             <div >
                 <AdvanceLogin isShow={loginAdvanceIsShow} setIsShow={setLoginAdvanceIsShow}/>
                 <div className='mobile-menu_login mt-4'>
                     <img src={loginIcon} alt={'login'}/>
                     <h5>Войти в ЛК</h5>
                 </div>
             </div>
            </div>
        </div>
    );
};

export default MobileMenu;