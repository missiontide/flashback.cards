import React, { useState } from 'react';
import sparks from './sparks'
import timePeriods from "./timePeriods";
import FlashbackButton from "./components/FlashbackButton";
import './App.css';

function App() {
    const [spark, setSpark] = useState("Spark")
    const [timePeriod, setTimePeriod] = useState("Time Period")
    const [loading, setLoading] = useState(false)
    const [flashed, setFlashed] = useState(false)

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

    return (
        <>
        <div className={"flashAnimation " + (flashed ? "visible" : "invisible")}></div>
        <div className="App no-select">
            <div className="components">
                <div className="spark">
                    <span>Tell me the <b><i>first memory</i></b> that comes to mind related to</span>
                    <div>
                        {spark}
                    </div>
                </div>
                <div className="flashbackButton">
                    <FlashbackButton
                        onMouseDown={handleMouseDown}
                        loading={loading}
                    />
                </div>
                <div className="timePeriod">
                    <span>Around the time of</span>
                    <div>
                        {timePeriod}
                    </div>
                </div>
            </div>
        </div>

        </>
    );
}

export default App;
