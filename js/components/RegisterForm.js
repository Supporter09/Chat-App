import validateEmail from '../utils.js'
import InputWrapper from "./InputWrapper.js";

const $template = document.createElement('template');
// <-- Khi submit thi chuyen den duong dan trong attr action cua form -->
$template.innerHTML=/*html*/ `
    <link rel="stylesheet" href="./css/register-form.css">
    <form id="register-form"> 
        <h2>Sign Up</h2>
        <input-wrapper id="email" label="Email" type="email"  error="" value ="hahaha" ></input-wrapper>
        <input-wrapper id="name" label="UserName" type="text" error="" value ="" ></input-wrapper>
        <input-wrapper id="password" label="Password" type="password" error="" value ="" ></input-wrapper>
        <input-wrapper id="password-confirmation" label="Re-password" type="password" error="" value ="" ></input-wrapper>
        <button id='register-btn' >Sign Up</button>

        <div id="to-login">
        You have already got an account? <a href="#!/sign-in">Sign In</a>
        </div>
    <form>
` 

// Shadow DOM
export default class RegisterForm extends HTMLElement {
    constructor() { 
        super();
        this.attachShadow({mode:'open'})
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        this.$form = this.shadowRoot.getElementById('register-form');
        this.$email = this.shadowRoot.getElementById('email');
        this.$name = this.shadowRoot.getElementById('name');
        this.$password = this.shadowRoot.getElementById('password');
        this.$passwordConfirmation = this.shadowRoot.getElementById('password-confirmation');
    }
    
    connectedCallback(){
        this.$form.onsubmit = async (event)=>{
            event.preventDefault();
            // console.log(this.$email.value());
            let email = this.$email.value();
            let name = this.$password.value();
            let password = this.$password.value();
            let passwordConfirmation = this.$passwordConfirmation.value();
            // if (email == '') {
            //     this.$email.alertError('Nhập email của bạn')
            // }else{
            //     this.$email.alertError('');
            // }
            let isPassed =
            (InputWrapper.checkForm(this.$email,(value)=> value != '', "Nhap vao email") 
            && InputWrapper.checkForm(this.$email,(value)=> validateEmail(value) , "Email khong hop le")) &

            InputWrapper.checkForm(this.$name, (value)=> value != '', 'Nhap vao ten dang ki' ) &
            
            InputWrapper.checkForm(this.$password, (value)=> value != '', 'Nhap vao mat khau' ) &

            (InputWrapper.checkForm(this.$passwordConfirmation, (value)=> value != '', 'Nhap lai xac nhan mat khau' )
            && InputWrapper.checkForm(this.$passwordConfirmation, (value)=> value == password, 'Mat khau xac nhan khong chinh xac' )) 

            console.log(isPassed)
            if (isPassed) {
                let result = await firebase
                .firestore()
                .collection('users')
                .where('email', '==' , email)
                .get();
                console.log(result)
                if (result.empty) {
                    firebase.firestore().collection('users').add({
                        name: name,
                        email: email,
                        password: CryptoJS.MD5(password).toString()
                    });
                }else{
                    alert('Email nay do co nguoi su dung')
                }
            }
        }
    }
}

window.customElements.define('register-form',RegisterForm);