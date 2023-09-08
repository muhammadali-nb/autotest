import React from 'react';
import Slider from "../../common/Slider";

type IndexCalculatorSliderProps = {
    label ?: string,
    labelClass ?: string,
    labelStyle ?: object,
    value ?: number,
    valueClass ?: string,
    valueStyle ?: object,
    valuePrefix ?: string,
    valuePrefixClass ?: string,
    valuePrefixStyle ?: object,
    valueSuffix ?: string,
    valueSuffixStyle ?: object,
    valueSuffixClass ?: string,
    max ?: number,
    min ?: number,
    step ?: number,
    className ?: string,
    style ?: object,
    wideSpace?:boolean,
    onChange ?: (value:number)=>void,
    showValueFunc ?: (value:number)=>any,
}
const defaultValue = {
    label: '',
    labelClass : 'font-inter',
    labelStyle: {},
    value : 0,
    valueClass : '',
    valueStyle: {},
    valuePrefix : '',
    valueSuffix : '',
    valuePrefixClass : '',
    valueSuffixClass : '',
    max : 100,
    min : 0,
    step : 1,
    className : '',
    onChange : (value:number)=>{},
    showValueFunc : (value:number) => {return Number(value).toLocaleString()},
}

const  IndexCalculatorSlider:React.FC<IndexCalculatorSliderProps> = (props:IndexCalculatorSliderProps = defaultValue) => {
    const processValue = (value:number) => {
        if(props.showValueFunc)
            return props.showValueFunc(value);
        return value.toLocaleString();
    }
    const handleOnChange = (e:number) => {
        if (props.onChange)
            props.onChange(e);
    }
    return (
        <div className={'mb-px-10 ' + (props.className ?? '')} style={props.style}>
            <div className={'d-flex justify-content-between align-items-center ' + (props.wideSpace?'mb-px-10':'')}>
                <span className={'indexCalculatorSliderLabel ' + (props.labelClass ?? '')}  style={props.labelStyle}>{props.label}</span>
                <div className={'indexCalculatorSliderValue ' + (props.valueClass ?? '')}>
                    <span className={(props.valuePrefixClass ?? '')} style={props.valuePrefixStyle}>{props.valuePrefix}</span>
                    <span style={props.valueStyle}>{processValue(props.value ?? 0)}</span>
                    <span className={(props.valueSuffixClass ?? '')} style={props.valueSuffixStyle}>{props.valueSuffix}</span>
                </div>

            </div>
            <div className={'w-100'}>
                <Slider max={props.max} min={props.min} value={props.value} step={props.step} onChange={handleOnChange} />
            </div>
        </div>
    );
}

export default IndexCalculatorSlider;