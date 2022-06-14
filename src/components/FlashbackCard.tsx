import React from "react";
import { Card } from "react-bootstrap"
import './flashbackCard.css'

type FlashbackCardProps = {
    text: string;
}

export default function FlashbackCard(props: FlashbackCardProps) {
    return (
        <Card>
            <p>
                {props.text}
            </p>
        </Card>
    )
}