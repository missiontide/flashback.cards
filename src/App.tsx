import React, { useState } from 'react';
import sparks from './sparks'
import timePeriods from "./timePeriods";
import './App.css';

function App() {
    const [spark, setSpark] = useState("Spark")
    const [timePeriod, setTimePeriod] = useState("Time Period")

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

    return (
        <div className="App">
            <div>
                <div className="spark">
                    <span>Tell me the <b><i>first memory</i></b> that comes to mind related to</span>
                    <div>
                        {spark}
                    </div>
                </div>
                <div className="flashbackButton">
                    <button type="button" onClick={newFlashBack}>
                        lightning
                    </button>
                </div>
                <div className="timePeriod">
                    <span>Around the time of</span>
                    <div>
                        {timePeriod}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
