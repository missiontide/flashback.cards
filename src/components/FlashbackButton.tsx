import React from "react";
import { BsFillLightningChargeFill } from 'react-icons/bs'
import './flashbackButton.css'

type FlashbackButtonProps = {
    onMouseDown: Function;
    onTouchStart: Function;
    onTouchMove: Function;
    onTouchEnd: Function;
    loading: boolean;
}

export default function FlashbackButton(props: FlashbackButtonProps) {
    return (
        <>
            <div
                className="circle_btn"
                onMouseDown={() => props.onMouseDown()}
                onTouchStart={() => props.onTouchStart()}
                onTouchMove={(e) => props.onTouchMove(e)}
                onTouchEnd={() => props.onTouchEnd()}
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