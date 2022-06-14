import React, { useState } from 'react';
import sparks from './sparks'
import timePeriods from "./timePeriods";
import FlashbackButton from "./components/FlashbackButton";
import FlashbackCard from "./components/FlashbackCard";
import InstructionsModal from "./components/InstructionsModal";
import { RiArrowDropRightLine } from 'react-icons/ri'
import logo from "./logo.png"
import './App.css';
import "@fontsource/cooper-hewitt/all.css"


function App() {
    const [spark, setSpark] = useState("Sparks")
    const [timePeriod, setTimePeriod] = useState("Time Periods")
    const [loading, setLoading] = useState(false)
    const [flashed, setFlashed] = useState(false)
    const [gameStarted, setGameStarted] = useState(false)
    const [showInstructions, setShowInstructions] = useState(false)

    /**
     * Sets the spark and time period to new random values
     */
    function newFlashBack() : void {
        let newSpark : string = getRandomSpark();
        let newTimePeriod : string = getRandomTimePeriod();

        if (newSpark === spark || newTimePeriod === timePeriod) {
            // retry until these are new values
            newFlashBack();
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
     * If button is held for 1.5s, trigger a new flashback
     */
    function handleMouseDown() : void {
        setLoading(true);
        let timer = setTimeout(() => {
            triggerFlashback();
        }, 1500)
        document.addEventListener("mouseup", () => (handleMouseUp(timer)))
    }

    function triggerFlashback() : void {
        setLoading(false)
        setGameStarted(true)
        setFlashed(true)
        setTimeout(() => {
            setFlashed(false);
        }, 10)
        newFlashBack();
    }

    // function handleMouseUp
    function handleMouseUp(timer : any) : void {
        setLoading(false);
        clearTimeout(timer)
        document.removeEventListener("mouseup", handleMouseUp)
    }

    return (<>
        {/* Branding */}
        <a href="/">
            <img src={logo} className="App-logo" alt="logo" />
        </a>

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
