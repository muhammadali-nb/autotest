import React, {ReactNode, useState} from 'react';
import {Collapse} from "react-bootstrap";
import circle from './../../img/common/circle-down.svg'
import circleUp from './../../img/common/circle-up.svg'

const FoldableQuestion:React.FC<{header:string|ReactNode, children:any, small?:boolean}> = (props) => {
    const [open, setOpen] = useState(false);
    return (
        <div className={'foldable ' + (props.small ? 'foldable-small' : '')}>
            <button className={'foldable-header'}
                onClick={() => setOpen(!open)}
            >
                <span>{props.header}</span>
                <img src={(open ? circleUp : circle)}
                     className={'foldable-header-image ' + (open ? 'turned ' : '')
                         + (props.small ? 'foldable-header-image-small' : '')}
                     alt={''} />

            </button>
            <Collapse in={open}>
                <div>
                    <div className={'foldable-content ' + (props.small ? '' : 'text-gray-color')}>
                        {props.children}
                    </div>
                </div>
            </Collapse>
        </div>
    );
};

export default FoldableQuestion;