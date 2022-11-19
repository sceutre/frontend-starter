import { render } from 'preact';
import {App} from "./app/App.js";
import {dispatcher} from "./utils/flux.js";

if ((window as any).MDEV) {
   dispatcher.installActionLogging((action,data) => {
      console.log(action + " " + JSON.stringify(data));
   });
}
render(<App />, document.getElementById('react')!);
