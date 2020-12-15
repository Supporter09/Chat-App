import validateEmail from '../utils.js'
const $template = document.createElement('template');
$template.innerHTML=/*html*/ `
    <link rel="stylesheet" href="./css/input-wrapper.css">
    <div id="input-wrapper">
        <label id="input-label" for="#input-main">Ten Dang Ki</label>
        <input id="input-main" type='text'>
        <div id=input-error>Nhap vao ten</div>
    <div>
` 

// Shadow DOM
export default class InputWrapper extends HTMLElement {
    constructor() { 
        super();
        this.attachShadow({mode:'open'})
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$label = this.shadowRoot.getElementById('input-label');
        this.$main = this.shadowRoot.getElementById('input-main');
        this.$error = this.shadowRoot.getElementById('input-error');
        
    }

    static get observedAttributes() {
        return ['label','type','error','value'];
    };

    attributeChangedCallback(attrName, oldValue, newValue) {
        switch(attrName){
            case 'label':
                this.$label.innerHTML = newValue;
                break;

            case 'type':
                this.$main.type = newValue;
                break;

            case 'error':
                this.$error.innerHTML =newValue;
                break;

            case 'value':
                this.$main.innerHTML = newValue;
                break;   
        }
    }
    value(){
        //*$main la input
        return this.$main.value;
    }

    alertError(message){
        this.setAttribute('error',message);
    }

    static checkForm($inputWrapper,condition,message){
        let value = $inputWrapper.value();
        if (condition(value)) {
            $inputWrapper.alertError('');
            return true;
        } else {
            $inputWrapper.alertError(message);
            return false;
        } 
    }
}

window.customElements.define('input-wrapper',InputWrapper);