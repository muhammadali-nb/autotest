import { useEffect, useRef, useState } from "react";
import "./CardSelect.scss";

interface optionProps {
    name: string,
    number: string,
    favourite: boolean
}

export const SelectOption: React.FC<{
    value: optionProps,
    onSelect: (arg0: { name: string, number: string }) => void
}> = (props) => {
    const { value, onSelect } = props;

    return (
        <li className="card-select_option" onClick={() => onSelect({ name: value.name, number: value.number })}>
            <div className="card-select_name">
                <div className="card-select_star">
                    {value.favourite &&
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
                            <g id="Stars" clipPath="url(#clip0_6199_114703)">
                                <g id="Fill">
                                    <path id="Star 1" d="M6.80871 1.68687C7.1173 1.15706 7.8827 1.15706 8.19129 1.68687L9.94924 4.70508C10.0623 4.89916 10.2517 5.03678 10.4712 5.08432L13.8849 5.82354C14.4842 5.95331 14.7207 6.68125 14.3122 7.13846L11.9849 9.74304C11.8353 9.91052 11.7629 10.1332 11.7855 10.3567L12.1374 13.8317C12.1992 14.4417 11.5799 14.8916 11.0189 14.6444L7.8226 13.2359C7.61707 13.1453 7.38293 13.1453 7.1774 13.2359L3.98114 14.6444C3.42007 14.8916 2.80084 14.4417 2.8626 13.8317L3.21445 10.3567C3.23708 10.1332 3.16473 9.91052 3.01508 9.74304L0.687827 7.13846C0.279304 6.68125 0.515825 5.95331 1.11507 5.82354L4.52879 5.08432C4.7483 5.03678 4.93772 4.89916 5.05076 4.70508L6.80871 1.68687Z" fill="#BF3535" />
                                </g>
                            </g>
                            <defs>
                                <clipPath id="clip0_6199_114703">
                                    <rect width="15" height="15" fill="white" transform="translate(0 0.5)" />
                                </clipPath>
                            </defs>
                        </svg>
                    }
                </div>
                {value.name}
            </div>
            <div className="card-select_number">
                {value.number}
            </div>
        </li>
    )
}

const CardSelect: React.FC<{
    cards: optionProps[],
    accounts: optionProps[]
    placeholder: string,
    onSelect: (arg0: { name: string, number: string }) => void,
    error: string
}> = (props) => {
    const { cards, accounts, placeholder, onSelect, error } = props;

    const [selected, setSelected] = useState<{
        name: string,
        number: string
    } | null>(null);
    const [tab, setTab] = useState("cards");
    const [active, setActive] = useState(false);

    const selectRef = useRef<HTMLDivElement>(null);

    const setOption = (value: { name: string, number: string }) => {
        setSelected({
            name: value.name,
            number: value.number
        });
        onSelect({ name: value.name, number: value.number });
        setActive(false);
    }

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (e.target instanceof Node && !selectRef.current?.contains(e.target))
                setActive(false);
        }

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        }
    }, []);

    return (
        <div className="card-select" ref={selectRef}>
            <div className={"card-select_head " + (error ? "error" : "")} onClick={() => setActive(prev => !prev)}>
                <span className={"card-select_value " + (selected ? "selected" : "")}>
                    {error ?
                        <>{error}</>
                        :
                        <>
                            {selected ?
                                <>
                                    <span>{selected.name}</span>
                                    <span>{selected.number}</span>
                                </>
                                :
                                <>{placeholder}</>
                            }
                        </>
                    }
                </span>
                <div className={"card-select_icon " + (active ? "active" : "")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <path d="M5.5 8.25L11 13.75L16.5 8.25" stroke="#BABCBF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
            {active &&
                <div className="card-select_dropdown">
                    <div className="card-select_tabs">
                        <div className={"card-select_tab " + (tab === "cards" ? "active" : "")} onClick={() => setTab("cards")}>
                            Карты
                        </div>
                        <div className={"card-select_tab " + (tab === "accounts" ? "active" : "")} onClick={() => setTab("accounts")}>
                            Счета
                        </div>
                    </div>
                    <ul className="card-select_list">
                        {tab === "cards" ?
                            <>
                                {cards.map((item, index) =>
                                    <SelectOption key={index} value={item} onSelect={setOption} />
                                )}
                            </>
                            :
                            <>
                                {accounts.map((item, index) =>
                                    <SelectOption key={index} value={item} onSelect={setOption} />
                                )}
                            </>
                        }
                    </ul>
                </div>
            }
        </div>
    )
}

export default CardSelect;