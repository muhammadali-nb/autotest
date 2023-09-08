import React from 'react';


export const DocTitle:React.FC<{text?:string,children?:any}> = (props) => {
    return (
        <div className={'document-subtitle'}>{props.text ?? props.children}</div>
    )
}
export const DocParagraph:React.FC<{children?:any, padded?:boolean, prefix?:string}> = (props) => {
    return (
        <>
            <p className={(props.padded ?? true) ? '' : 'document-not-padded'}>
                {props.prefix && <strong>{props.prefix}</strong>}
                {props.children}
            </p>
        </>
    )
}
export const DocChapter:React.FC<{header?:string,children?:any}> = (props) => {
    return (
        <>
            <DocTitle text={props.header}></DocTitle>
            {props.children}
        </>
    )
}
const DocPage:React.FC<{children:any, header:string}> = (props) => {
    return (
        <div className={'document-page'}>
            <div className="document-title">{props.header}</div>
            <div>
                {props.children}
            </div>
        </div>
    );
};

export default DocPage;