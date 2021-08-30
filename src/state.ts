const API_BASE_URL = "http://localhost:1234";
import { rtdb } from "./rtdb";
import map from "lodash/map";

type Message = {
    from: string
    message: string
}

const state = {
    data: {
        nombre: "",
        messages: [],
    },
    listeners: [],
    init() {
        const currentState = state.getState();
        const chatroomsRef = rtdb.ref('/chatrooms/general');

        chatroomsRef.on("value", (snapshot) => {
            const messagesFromServer = snapshot.val();
            console.log(messagesFromServer);
            const messagesList = map(messagesFromServer.messages);
            currentState.messages = messagesList;
            this.setState(currentState);
        });
    },
    getState() {
        return this.data;
    },
    setName(nombre: string) {
        const currentState = this.getState();
        currentState.nombre = nombre;
        this.setState(currentState);
    },
    pushMessage(message: Message) {
        const nameInTheState = this.data.nombre;
        fetch(API_BASE_URL + "/messages", {
            method: "post",
            headers: {
                "Cross-Origin-Resource-Policy": "cross-origin",
                "content-type": "application/json",
            },
            body: JSON.stringify({
                from: nameInTheState,
                message: message,
            }),
        });
    },
    setState(newState) {
        this.data = newState;
        for (const cb of this.listeners) {
            cb();
        }
        console.log("Soy el state, he cambiado", this.data);
    },
    suscribe(callback: (any) => any) {
        this.listeners.push(callback);
    },
};

export { state };