import React from 'react';
import {StatBlock, StatBlockItem} from "../../common/CarCard";

export interface CarStatBlockProps {
    column1Width?:number|string,
    column2Width?:number|string,
    dotted?:boolean,
    data:Array<StatBlock>
}

export const CarStatBlockItem:React.FC<{settings:CarStatBlockProps,data:StatBlockItem}> = ({settings, data}) =>{

    return (
        <>
            <div className={'car-stat-block-item-name'}>
                <div>{data.name}</div>
                <div className={'car-stat-block-item-filler' + (settings.dotted ? ' dotted' : '')}></div>
            </div>
            <div className={'car-stat-block-item-value'}>{data.value}</div>
        </>
    )
}

export const CarStatBlockEntry:React.FC<{settings:CarStatBlockProps,block?:StatBlock,children?:any}> = ({settings, block,children}) =>{
    const style:React.CSSProperties = {
        gridTemplateColumns:(settings.column1Width ?? '2fr') + ' ' + (settings.column2Width ?? '1fr'),
    }
    return (
        <div className={'car-stat-block'}>
            {block && <div className={'car-stat-block-header'}>{block.name}</div>}
            <div className={'car-stat-block-list'} style={style}>
                {block?.list.map((item, index)=>(
                    <CarStatBlockItem key={index} data={item} settings={settings}/>
                ))}
                {!block && children}
            </div>
        </div>
    )
}


export const CarStatBlock:React.FC<CarStatBlockProps> = (props) => {
    return (
        <div className={'car-stat-block-container'}>
            {props.data.map((block, index) => (
                <CarStatBlockEntry key={index} settings={props} block={block} />
            ))}
        </div>
    );
};

export default CarStatBlock;