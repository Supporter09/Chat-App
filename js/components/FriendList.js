import FriendContainer from "./FriendContainer.js"
import InputWrapper from "./InputWrapper.js"
import { getDataFromDoc } from "../utils.js"
import {getDataFromDocs } from "../utils.js"
const $template = document.createElement('template');

$template.innerHTML = /*html*/ `
    <style>
        * {
            background-color: #F1F1F2;
        }
        #title{
            padding: 15px;
            font-family: Arial;
            font-size: 20px;
            font-weight: bold;
            text-align: center;
            border-bottom: 1px solid #cccccc;
        }
        #search-friend-form {
            padding: 15px;
            display: flex;
            justify-content: space-between;
            align-item: center;
        }
        #search-friend-btn {
            border: 1px solid #cccccc;
            background-color: 
        }

        #search-friend-keyword{
            width: calc(100% - 100px - 15px)
        }
    </style>
    <div id="title">
        Bạn bè

    </div>

    <form id="search-friend-form">
    
    <input-wrapper id="search-friend-keyword" error="" label="Tim ban be" type="text"></input-wrapper>
    <button id="search-friend-btn">Tim Kiem Ban Be</button>
    </form>
    <div id="friend-list">
        
    </div>
`;

export default class FriendList extends HTMLElement {
    constructor(data) {
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        this.$friendList = this.shadowRoot.getElementById('friend-list');
        this.$searchFriendKeyword = this.shadowRoot.getElementById('search-friend-keyword')
        this.$searchFriendForm = this.shadowRoot.getElementById('search-friend-form')

        this.setAttribute('data', JSON.stringify(data))
    }
    connectedCallback() {
        this.$searchFriendForm.onsubmit = async (event) =>{
            event.preventDefault();

            let keyword = this.$searchFriendKeyword.value();

            let isPassed = InputWrapper.checkForm(this.$searchFriendKeyword, (value) => value != '', "Nhap vao ten ban be");

            if (isPassed) {
                let result = await firebase
                .firestore()
                .collection('users')
                .where('name','==', keyword)
                .get()

                console.log(getDataFromDocs(result.docs))
            }
        }
    }

    static get observedAttributes(){
        return ['data']
    }

    attributeChangedCallback(attrName, oldValue, newValue){
        if (attrName == "data") {
            let friendsData = JSON.parse(newValue);
            friendsData.forEach(element => {
                let $friendContainer = new FriendContainer(element.name);
                this.$friendList.appendChild($friendContainer)
            });
        }
    }
}

window.customElements.define('friend-list', FriendList)