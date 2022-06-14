import React from "react";
import { BsFillLightningChargeFill } from 'react-icons/bs'
import './flashbackButton.css'

type FlashbackButtonProps = {
    onMouseDown: Function;
    loading: boolean;
}

export default function FlashbackButton(props: FlashbackButtonProps) {
    return (
        <>
            <div
                className="circle_btn"
                onMouseDown={() => props.onMouseDown()}
            >
                <BsFillLightningChargeFill/>
            </div>
            {props.loading && (
                <div className="section center">
                    <span className="loader"></span>
                </div>
            )}
        </>
    )
}