import {Store,Action} from "../utils/flux.js";

interface AppData {
   spinner: boolean;
}

export const AppStore = new Store("AppStore", {
   spinner: true
} as AppData);

export const actionSpinnerOn =  Action("spinOn", () => { AppStore.set("spinner", true); });
export const actionSpinnerOff =  Action("spinOff", () => { AppStore.set("spinner", false); });
