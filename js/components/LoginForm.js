import validateEmail from '../utils.js'
import InputWrapper from "./InputWrapper.js";

const $template = document.createElement('template');
// <-- Khi submit thi chuyen den duong dan trong attr action cua form -->
$template.innerHTML=/*html*/ `
    <link rel="stylesheet" href="./css/login-form.css">
    <form id="login-form"> 
        <h2>Sign In</h2>
        <input-wrapper id="email" label="Email" type="email"  error="" value ="hahaha" ></input-wrapper>
        <input-wrapper id="password" label="Password" type="password" error="" value ="" ></input-wrapper>
        <button id='login-btn' >Sign In</button>

        <div id="to-login">
        You haven't got an account? <a href="#!/sign-up">Sign Up</a>
        </div>
    <form>
` 

// Shadow DOM
export default class RegisterForm extends HTMLElement {
    constructor() { 
        super();
        this.attachShadow({mode:'open'})
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        this.$form = this.shadowRoot.getElementById('login-form');
        this.$email = this.shadowRoot.getElementById('email');
        this.$password = this.shadowRoot.getElementById('password');
    }
    
    connectedCallback(){
        this.$form.onsubmit = async (event)=>{
            event.preventDefault();
            // console.log(this.$email.value());
            let email = this.$email.value();
            let password = this.$password.value();
            // if (email == '') {
            //     this.$email.alertError('Nhập email của bạn')
            // }else{
            //     this.$email.alertError('');
            // }
            let isPassed =
            InputWrapper.checkForm(this.$email, (value)=> value != '', 'Nhap vao ten dang ki' ) &
            InputWrapper.checkForm(this.$password, (value)=> value != '', 'Nhap vao mat khau' ) 
            console.log(isPassed)
            
            if (isPassed) {
               let result = await firebase
               .firestore()
               .collection('users')
               .where('email','==',email)
               .where('password','==',CryptoJS.MD5(password).toString())
               .get();

               if (result.empty) {
                   alert('Email hoac mat khau khong chinh xac')
               }else{
                   router.navigate('/chat')
               }
            }
        }
    }
}

window.customElements.define('login-form',RegisterForm);