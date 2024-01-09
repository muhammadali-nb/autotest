import { useEffect, useState } from 'react';
import './PersonalAccountActions.scss';
import PersonalAccountModal from '../../../pages/PersonalAccount/PersonalAccountModal/PersonalAccountModal';
import { useAuth } from '../../../../hooks/useAuth';
import WithdrawMobile from '../PersonalAccountWithdraw/mobile/PersonalAccountWithdraw';

const PersonalAccountActions: React.FC<{
    balance: number,
    setCallModal: (e: boolean) => void
}> = (props) => {
    const { balance, setCallModal } = props;

    const [size, setSize] = useState("desk");
    const [actionOpened, setActionOpened] = useState({
        opened: false,
        type: ''
    });

    useEffect(() => {
        const checkSize = () => {
            if (window.innerWidth > 1024) {
                setSize("desk");
            } else {
                setSize("mobile");
            }
        }
        window.addEventListener('resize', checkSize);

        checkSize();

        return () => {
            window.removeEventListener('resize', checkSize);
        }
    }, []);

    const { phone } = useAuth();

    const handleOpen = (type: string) => {
        setActionOpened({
            opened: true,
            type: type
        });
    }

    const handleClose = () => {
        setActionOpened({
            opened: false,
            type: ""
        });
    }

    return (
        <>
            <div className='personal-account_actions'>
                <div className={"personal-account_actions-item " + (balance <= 0 ? "disabled" : "")}>
                    <button className={"personal-account_actions-btn "} onClick={() => handleOpen("withdraw")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <g clip-path="url(#clip0_6038_184856)">
                                <path d="M11 1.83333L5.5 7.19919M11 1.83333L16.5 7.19919M11 1.83333L11 16.5"
                                    stroke="#222222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M1.83337 20.166H20.1667" stroke="#222222" strokeWidth="2" strokeLinecap="round" />
                            </g>
                            <defs>
                                <clipPath id="clip0_6038_184856">
                                    <rect width="22" height="22" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </button>
                    <span className="font-size-12">
                        Вывести
                    </span>
                </div>
                <div className="personal-account_actions-item">
                    <button className={"personal-account_actions-btn"} onClick={() => handleOpen("replenish")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <g clip-path="url(#clip0_6038_184853)">
                                <path d="M11 16.5007L5.5 11.1348M11 16.5007L16.5 11.1348M11 16.5007L11 1.83398"
                                    stroke="#222222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M1.83337 20.166H20.1667" stroke="#222222" strokeWidth="2" strokeLinecap="round" />
                            </g>
                            <defs>
                                <clipPath id="clip0_6038_184853">
                                    <rect width="22" height="22" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </button>
                    <span className="font-size-12">
                        Пополнить
                    </span>
                </div>
                <div className="personal-account_actions-item">
                    <button className={"personal-account_actions-btn"} onClick={() => handleOpen("transaction")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <path
                                d="M18.0729 8.41111C17.1564 5.65556 14.5316 3.66602 11.4365 3.66602C8.8175 3.66602 6.37306 4.44249 1.83337 9.27386M1.83337 9.27386H6.63496M1.83337 9.27386V4.52876M3.9272 13.5876C4.84368 16.3431 7.4685 18.3327 10.5635 18.3327C13.1826 18.3327 15.627 17.5562 20.1667 12.7248M20.1667 12.7248H15.3651M20.1667 12.7248V17.4699"
                                stroke="#222222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <span className="font-size-12">
                        Перевести
                    </span>
                </div>
            </div>
            {actionOpened.opened &&
                <>
                    {actionOpened.type === "withdraw" &&
                        <>
                            {size === "desk" ?
                                <PersonalAccountModal type="withdraw" show={actionOpened.opened} onHide={handleClose} currentPhone={phone} balance={balance} />
                                :
                                <WithdrawMobile active={actionOpened.opened} setActive={setActionOpened} setCallActive={setCallModal} balance={balance} />
                            }
                        </>
                    }
                    {actionOpened.type === "replenish" &&
                        <>
                            {size === "desk" ?
                                <PersonalAccountModal type="replenish" show={actionOpened.opened} onHide={handleClose} currentPhone={phone} />
                                :
                                <WithdrawMobile active={actionOpened.opened} setActive={setActionOpened} setCallActive={setCallModal} balance={balance} />
                            }
                        </>
                    }
                </>
            }
        </>
    )
}

export default PersonalAccountActions;