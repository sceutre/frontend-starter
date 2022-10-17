import * as React from "react";
import * as ReactDOM from "react-dom";
import {App} from "./app/App.js";
import {dispatcher} from "./utils/flux.js";

if ((window as any).MDEV) {
   dispatcher.installActionLogging((action,data) => {
      console.log(action + " " + JSON.stringify(data));
   });
}
ReactDOM.render(<App />, document.getElementById('react'));
