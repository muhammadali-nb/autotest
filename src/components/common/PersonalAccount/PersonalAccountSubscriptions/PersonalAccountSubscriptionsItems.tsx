import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import tg from "../../../../images/personal-account/social/tg-blue.svg";
import "./PersonalAccountSubscriptions.scss";

const PersonalAccountSubscriptionsItems: React.FC = () => {
    const linkRef = useRef<HTMLInputElement>(null);

    const [copied, setCopied] = useState(false);

    const copyCode = () => {
        if (!linkRef) return;
        if (linkRef.current?.value) {
            navigator.clipboard.writeText(linkRef.current?.value);
            setCopied(true);
        }
    }

    return (
        <>
            <div className="personal-account_subscriptions-items">
                <Link to={"#"} target="_blank" className="personal-account_subscriptions-item tg">
                    <div className="personal-account_subscriptions-head">
                        <div className="personal-account_subscriptions-icon">
                            <img src={tg} alt="Telegram" />
                        </div>
                        Telegram
                    </div>
                    <p>
                        У основных продуктов нашей экосистемы есть собственные логотипы. Каждый логотип содержит иконку
                        и текстовую часть.
                    </p>
                    <p>
                        Иконка состоит из уникального знака продукта на квадратной подложке.
                    </p>
                    <div className="personal-account_subscriptions-arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="102" height="14" viewBox="0 0 102 14" fill="none">
                            <path d="M101 7L95.4146 1M101 7L95.4146 13M101 7H1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                </Link>
                <Link to={"#"} target="_blank" className="personal-account_subscriptions-item wa">
                    <div className="personal-account_subscriptions-head">
                        <div className="personal-account_subscriptions-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <rect width="40" height="40" rx="20" fill="url(#paint0_linear_8597_4124)" />
                                <path d="M20 9.23047C14.062 9.23047 9.23084 14.0616 9.23084 19.9997C9.23084 21.8539 9.70984 23.6772 10.6182 25.286L9.24817 30.1743C9.20322 30.3349 9.24676 30.5072 9.36288 30.6266C9.45231 30.7188 9.57405 30.7689 9.69907 30.7689C9.73653 30.7689 9.77445 30.7642 9.81144 30.7554L14.9132 29.4916C16.471 30.3279 18.2255 30.7689 20 30.7689C25.9381 30.7689 30.7692 25.9378 30.7692 19.9997C30.7692 14.0616 25.9381 9.23047 20 9.23047ZM25.4174 23.7998C25.187 24.4376 24.082 25.0196 23.5511 25.0978C23.0744 25.1675 22.4713 25.1975 21.8093 24.9896C21.408 24.8632 20.8929 24.6956 20.2332 24.4141C17.4599 23.2314 15.6488 20.474 15.5102 20.2919C15.3721 20.1097 14.3813 18.8118 14.3813 17.4685C14.3813 16.1251 15.0954 15.4644 15.3492 15.191C15.6029 14.9176 15.9021 14.8492 16.0866 14.8492C16.2711 14.8492 16.4551 14.8515 16.6166 14.859C16.7866 14.8675 17.0146 14.7949 17.2389 15.3277C17.4693 15.8746 18.0223 17.218 18.0906 17.3552C18.1599 17.4919 18.2058 17.6515 18.114 17.8337C18.0223 18.0158 17.9764 18.1296 17.8378 18.2893C17.6992 18.4489 17.5475 18.6451 17.4229 18.7678C17.2843 18.904 17.1406 19.0515 17.3017 19.325C17.4627 19.5984 18.0176 20.4923 18.8398 21.2162C19.8956 22.1461 20.7867 22.4345 21.0629 22.5712C21.3392 22.7079 21.5007 22.685 21.6618 22.5028C21.8228 22.3202 22.3529 21.7055 22.5369 21.4325C22.7209 21.1595 22.9054 21.2044 23.1592 21.2958C23.4129 21.3866 24.7722 22.0468 25.0485 22.1835C25.3247 22.3202 25.5092 22.3886 25.5785 22.5024C25.6478 22.6157 25.6478 23.1626 25.4174 23.7998Z" fill="white" />
                                <defs>
                                    <linearGradient id="paint0_linear_8597_4124" x1="0" y1="40" x2="40" y2="0" gradientUnits="userSpaceOnUse">
                                        <stop offset="0.146484" stop-color="#28D145" />
                                        <stop offset="0.853516" stop-color="#5FFB7B" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        WhatsApp
                    </div>
                    <p>
                        У основных продуктов нашей экосистемы есть собственные логотипы. Каждый логотип содержит иконку
                        и текстовую часть.
                    </p>
                    <p>
                        Иконка состоит из уникального знака продукта на квадратной подложке.
                    </p>
                    <div className="personal-account_subscriptions-arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="102" height="14" viewBox="0 0 102 14" fill="none">
                            <path d="M101 7L95.4146 1M101 7L95.4146 13M101 7H1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                </Link>
                <Link to={"#"} target="_blank" className="personal-account_subscriptions-item vk">
                    <div className="personal-account_subscriptions-head">
                        <div className="personal-account_subscriptions-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <rect width="40" height="40" rx="20" fill="#0077FF" />
                                <path d="M21.0994 28.4608C12.6892 28.4608 7.89227 22.6858 7.69238 13.0762H11.9051C12.0435 20.1294 15.1492 23.117 17.6092 23.733V13.0762H21.5761V19.1591C24.0053 18.8973 26.5572 16.1254 27.4183 13.0762H31.3851C30.724 16.8338 27.9565 19.6058 25.9885 20.7453C27.9565 21.6693 31.1085 24.0872 32.3078 28.4608H27.9411C27.0032 25.5348 24.6664 23.271 21.5761 22.9629V28.4608H21.0994Z" fill="white" />
                            </svg>
                        </div>
                        В Контакте
                    </div>
                    <p>
                        У основных продуктов нашей экосистемы есть собственные логотипы. Каждый логотип содержит иконку
                        и текстовую часть.
                    </p>
                    <p>
                        Иконка состоит из уникального знака продукта на квадратной подложке.
                    </p>
                    <div className="personal-account_subscriptions-arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="102" height="14" viewBox="0 0 102 14" fill="none">
                            <path d="M101 7L95.4146 1M101 7L95.4146 13M101 7H1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                </Link>
            </div>
            <div className={"personal-account_subscriptions-link " + (copied ? "copied" : "")}>
                <div className="text-uppercase font-weight-semibold mb-px-10">
                    Реферальная программа
                </div>
                <p>
                    У основных продуктов нашей экосистемы есть собственные логотипы. <br /> Каждый логотип содержит иконку и текстовую часть.
                </p>
                <input type="text" ref={linkRef} value={'https://www.google.com/search?q=%D0%A0%D0%B5%D1%84%D0%B5%D1%80%D0%B0%D0%BB%D1%8C%D0%BD%D0%B0%D1%8F+%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0&rlz=1C1GKLB_enRU957RU957&ei=bfieZMq2LdWNwPAPhrG-uAY&ved=0ahUKEwiKoeKRq-v_AhXVBhAIHYaYD2cQ4dUDCBA&uact=5&oq=%D0%A0%D0%B5%D1%84%D0%B5%D1%80%D0%B0%D0%BB%D1%8C%D0%BD%D0%B0%D1%8F+%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzILCAAQgAQQsQMQgwEyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQ6DwgAEIoFEOoCELQCEEMYAToVCAAQAxCPARDqAhC0AhCMAxDlAhgCOhUILhADEI8BEOoCELQCEIwDEOUCGAI6EQguEIAEELEDEIMBEMcBENEDOggIABCABBCxAzoLCC4QgAQQsQMQgwE6CwgAEIoFELEDEIMBOh8ILhCABBCxAxCDARDHARDRAxCXBRDcBBDeBBDgBBgDOgcIABCKBRBDOgoIABCKBRCxAxBDOg0IABCKBRCxAxCDARBDSgQIQRgAUJAFWJc-YOVBaAJwAXgAgAHQAYgBwhmSAQYwLjIxLjGYAQCgAQGwARTAAQHaAQQIARgH2gEGCAIQARgK2gEGCAMQARgU&sclient=gws-wiz-serp'} />
                <button className="site-btn small" onClick={copyCode}>
                    Скопировать ссылку
                </button>
            </div>
        </>

    )
}

export default PersonalAccountSubscriptionsItems;