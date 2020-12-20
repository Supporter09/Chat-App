import RegisterForm from './js/components/RegisterForm.js'

var root = null;
var useHash = true; // Defaults to: false
var hash = '#!'; // Defaults to: '#'
var router = new Navigo(root, useHash, hash);

router
  .on('/chat' ,function () {
    // show home page here
    document.getElementById('app').innerHTML ="<h1>Wellcome to film world</h1>";
  })
  .resolve();


router
  .on('/sign-up', function () {
    document.getElementById('app').innerHTML ="";
    document.getElementById('app').innerHTML ="<register-form></register-form>";
    console.log("ban dang o chuc nang dang ki")
  })
  .resolve();
  

router
  .on('/sign-in', function () {
    document.getElementById('app').innerHTML ="<login-form></login-form>";
    console.log("ban dang o chuc nang dang nhap")
  })
  .resolve();
  

window.router = router