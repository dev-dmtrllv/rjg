import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { isTouchscreen } from "utils/env";

if(isTouchscreen)
	document.body.classList.add("touch");

ReactDOM.render(<App />, document.getElementById("root"));