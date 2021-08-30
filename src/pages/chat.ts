import { state } from "../state";

type Message = {
    from: string
    message: string
}

export class Chat extends HTMLElement {
    connectedCallback() {
        state.suscribe(() => {
            const currentState = state.getState();
            this.messages = currentState.messages;
            this.render();
        });
        this.render()
    }
    messages: Message[] = [];
    addListeners() {
        const form = this.querySelector(".submit-message");
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const target = e.target as any;
            state.pushMessage(target["new-message"].value);
        });
    }
    render() {
        // o de objeto (en el map)
        this.innerHTML = `
        <div class="container">
        <h1> Chat Page</h1>
            <div class="messages">
                ${this.messages.map((o) => {
                    return `<div class="message"> ${o.from}:${o.message} </div>`;
                }).join("")}
            </div>
            <form class="submit-message">
                <input type="text" name="new-message">
                <button class="send-button"> Enviar </button>
            </form>
            </div>
        </div>
        `;
        this.addListeners();
    }
}
customElements.define("chat-page", Chat);