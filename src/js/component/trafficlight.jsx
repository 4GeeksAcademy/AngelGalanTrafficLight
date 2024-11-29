import React, { useState, useEffect } from "react";
import AddPurple from "./addpurple";

const SignalLight = () => {
    const [currentLight, setCurrentLight] = useState("green");
    const [isAutoChanging, toggleAutoChange] = useState(false);
    const [isPurpleEnabled, togglePurple] = useState(false);

    const handleLightChange = (newColor) => {
        setCurrentLight(newColor);
    };

    useEffect(() => {
        if (isAutoChanging) {
            const timer = setTimeout(() => {
                setCurrentLight((prevLight) => {
                    switch (prevLight) {
                        case "green":
                            return "yellow";
                        case "yellow":
                            return "red";
                        default:
                            return "green";
                    }
                });
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [isAutoChanging, currentLight]);

    return (
        <div className="traffic-signal">
            <div className="pole"></div>
            <div className={`lights-container ${isPurpleEnabled ? "with-purple" : "no-purple"}`}>
                <div
                    className={`light red ${currentLight === "red" ? "active" : ""}`}
                    onClick={() => handleLightChange("red")}
                ></div>
                <div
                    className={`light yellow ${currentLight === "yellow" ? "active" : ""}`}
                    onClick={() => handleLightChange("yellow")}
                ></div>
                <div
                    className={`light green ${currentLight === "green" ? "active" : ""}`}
                    onClick={() => handleLightChange("green")}
                ></div>
                {isPurpleEnabled && <div className="light purple"></div>}
            </div>
            <div className="control-buttons">
                <button
                    className="btn toggle-cycle"
                    onClick={() => toggleAutoChange((prev) => !prev)}
                >
                    Toggle Auto Change
                </button>
                <button
                    className="btn toggle-purple"
                    onClick={() => togglePurple((prev) => !prev)}
                >
                    Toggle Purple Light
                </button>
            </div>
        </div>
    );
};

export default SignalLight;