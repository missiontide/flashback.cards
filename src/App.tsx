import React, {useEffect, useState, useRef} from 'react';
import sparks from './sparks'
import timePeriods from "./timePeriods";
import FlashbackButton from "./components/FlashbackButton";
import FlashbackCard from "./components/FlashbackCard";
import InstructionsModal from "./components/InstructionsModal";
import { RiArrowDropRightLine } from 'react-icons/ri'
import logo from "./logo.png"
import './App.css';
import './MobileStyles.css'
import "@fontsource/cooper-hewitt/all.css"


function App() {
    const [spark, setSpark] = useState("Sparks")
    const [timePeriod, setTimePeriod] = useState("Time Periods")
    const [loading, setLoading] = useState(false)
    const timerRef = useRef<NodeJS.Timeout | null>(null)
    const [flashed, setFlashed] = useState(false)
    const [gameStarted, setGameStarted] = useState(false)
    const [showInstructions, setShowInstructions] = useState(false)

    /**
     * Sets the spark and time period to new random values
     */
    function newFlashback() : void {
        let newSpark : string = getRandomSpark();
        let newTimePeriod : string = getRandomTimePeriod();

        if (newSpark === spark || newTimePeriod === timePeriod) {
            // retry until these are new values
            newFlashback();
        } else {
            setSpark(newSpark);
            setTimePeriod(newTimePeriod)
        }
    }

    /**
     * Returns a random spark
     *
     * @returns a spark string
     */
    function getRandomSpark() : string {
        return sparks[Math.floor(Math.random()*sparks.length)]
    }

    /**
     * Returns a random time period
     *
     * @returns a time period string
     */
    function getRandomTimePeriod() : string {
        return timePeriods[Math.floor(Math.random()*timePeriods.length)]
    }

    /**
     * Begins build-up animation and triggers flashback if uninterrupted for 1.5 seconds.
     */
    function beginHoldingButton() : void {
        setLoading(true);
        timerRef.current = setTimeout(() => {
            triggerFlashback();
        }, 1500)
    }

    /**
     * Trigger flashback animation and set new prompts
     */
    function triggerFlashback() : void {
        setLoading(false)
        setGameStarted(true)
        setFlashed(true)
        setTimeout(() => {
            setFlashed(false);
        }, 10)
        newFlashback();
    }

    /**
     * Stop loading animation and interrupt timer
     */
    function releaseButton() : void {
        setLoading(false);
        if (timerRef.current !== null) {
            clearTimeout(timerRef.current)
        }
    }

    // Used to prevent mouse emulation events triggering from touch events
    const [usingTouch, setUsingTouch] = useState(false)

    /**
     * Mouse functionality for the flashback button
     */
    function handleMouseDown() : void {
        if (usingTouch) return;
        beginHoldingButton();
        document.addEventListener("mouseup", handleMouseUp)
    }

    function handleMouseUp() : void {
        if (usingTouch) return;
        releaseButton();
        document.removeEventListener("mouseup", handleMouseUp)
    }

    /**
     * Touch functionality for the flashback button
     */
    function handleTouchStart() : void {
        setUsingTouch(true)
        beginHoldingButton();
    }

    function handleTouchMove(e: any) : void {
        if (e.touches.length === 1) {
            let touch = e.touches[0];
            let target = document.elementFromPoint(touch.clientX, touch.clientY);
            if (target === null) return;

            // releases button if touch has moved off of the button
            if ("loader" !== target.getAttribute('class')) {
                releaseButton()
            }
        } else {
            return;
        }
    }

    function handleTouchEnd() : void {
        releaseButton();
    }

    return (<>
        {/* Branding */}
        <div className="logoDiv">
            <a href="/">
                <img src={logo} className="App-logo" alt="logo" />
            </a>
        </div>

        {/* Instructions */}
        <InstructionsModal
            show={showInstructions}
            onHide={() => setShowInstructions(false)}
        />
        <div className="openInstructions" onClick={() => {setShowInstructions(true)}}>
            <u>Instructions</u>
        </div>

        {/* Animations */}
        <div className={"flareFlash flareText " + (flashed ? "visible": "long-invisible")}>FLASH</div>
        <div className={"flareBack flareText " + (flashed ? "visible": "long-invisible")}>BACK</div>
        <div className={"flashAnimation " + (flashed ? "visible" : "invisible")}></div>

        {/* App */}
        {!gameStarted && <div className="startInstruction">
            <span>Press and hold</span><RiArrowDropRightLine className="arrow"/>
        </div>}
        <div className="App no-select">
            <div className="components">
                <div className="spark">
                    <div className="caption">
                        {gameStarted ? <>Tell me the <span className="emphasis">first memory</span> that comes to mind related to</> : ""}
                    </div>
                    <FlashbackCard text={spark}/>
                </div>
                <div className="flashbackButton">
                    <FlashbackButton
                        onMouseDown={handleMouseDown}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        loading={loading}
                    />
                </div>
                <div className="timePeriod">
                    <div className="caption">
                        {gameStarted ? <>Around the time of</> : ""}
                    </div>
                    <FlashbackCard text={timePeriod}/>
                </div>
            </div>
        </div>
    </>);
}

export default App;
