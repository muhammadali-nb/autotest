import React from 'react';
import Api from "../../Api";

const LoadError:React.FC<{ response: any, text?:string}> = (props) => {
    return (
        <>
            {Api.isError(props.response) && <div className={'text-muted text-center py-px-60'}>
                <div className={'mb-3'}>
                    {props.text ?? props.response.message}
                </div>
                <a className={'default-link text-muted text-decoration-underline'} href={window.location.href}>Перезагрузить страницу</a>
            </div>}
        </>
    );
};

export default LoadError;