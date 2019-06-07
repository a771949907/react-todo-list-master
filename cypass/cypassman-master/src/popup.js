import Hello from "./components/popup.jsx";
import React from "react";
import { render } from "react-dom";

render(
    <Hello />,
    window.document.getElementById("app")
);