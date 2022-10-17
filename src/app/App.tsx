import * as React from "react";
import {useStore} from "../utils/flux.js";
import {actionSpinnerOff, AppStore} from "./AppBacking.js";

export function App() {
   const {spinner} = useStore(AppStore, ["spinner"]);
   let ctx:React.ReactNode = null;
   return <div style={{
      display: "grid",
      grid: "1fr 1fr 1fr / 1fr 1fr 1fr",
      height: "100%"
   }}>
      <div style={{placeSelf: "center", gridArea: "1 / 2", fontSize: "20px", color: "#eee"}}>Hello, world!</div>
      {spinner && <div style={{placeSelf: "center", gridArea: "2 / 2"}}><div className="loader"></div></div>}
   </div>
}

setTimeout(() => actionSpinnerOff(), 10000);