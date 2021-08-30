import { Router } from "@vaadin/router";
import { state } from "../state";

export class Home extends HTMLElement {
    connectedCallback() {
        this.render();
        const form = this.querySelector(".form");
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const target = e.target as any;
            state.setName(target.nombre.value)
            Router.go("/chat");
        });
    }
    render() {
        const style = document.createElement("style");

        style.innerHTML = `
            .header {
                width: 100%;
                height: 60px;
                background-color: #FF8282;
            }
        `;
        this.innerHTML = `
        <div class="header"></div>
        <form class="form">
        <div>
            <label> Tu nombre </label>
        </div>
            <input type="text" name="nombre">
            <button> Comenzar </button>
        </form>
        `;
    }
}
customElements.define("home-page", Home);