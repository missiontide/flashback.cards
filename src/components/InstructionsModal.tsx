import React from "react";
import { Modal, ModalProps } from "react-bootstrap"
import { BsFillLightningChargeFill } from 'react-icons/bs'
import './instructionsModal.css'

export default function InstructionsModal(props: ModalProps) {
    return (
        <Modal
            {...props}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Flashback Instructions
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="signature">
                    made by <a href="https://www.missiontide.com" target="_blank" rel="noreferrer">@missiontide</a>
                </p>
                <ol>
                    <li>
                        Get together with friends or family.
                    </li>
                    <br/>
                    <li>
                        The youngest person goes first:<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;Choose anyone in the room.<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;Say their name out-loud.<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;Then press the <BsFillLightningChargeFill/> button!
                    </li>
                    <br/>
                    <li>
                        Read to them the time period and spark that appears.
                    </li>
                    <br/>
                    <li>
                        <u>They must share the <b><i>first  memory</i></b> that comes to mind.</u><br/>
                        <i>Don't worry if it&apos;s a &quot;good story&quot;... the goal is to
                            share whatever memory was sparked in your head.</i>
                    </li>
                    <br/>
                    <li>
                        After they share their memory,
                        it&apos;s their turn to choose someone
                        and press the <BsFillLightningChargeFill/> button!
                    </li>
                    <br/>
                </ol>
            </Modal.Body>
        </Modal>
    )
}
