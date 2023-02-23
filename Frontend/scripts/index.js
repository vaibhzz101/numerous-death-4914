import { footer } from "../components/footer.js";
import navbar from "../components/navbar.components.js";

import loading from "../components/loading.components.js";
import hideLoading from "../components/hideLoading.components.js";
let popHandler = document
loading()

// navbar

let naverbarDiv = document.querySelector('.navbar-section')
naverbarDiv.innerHTML = navbar()

// footer 
let footerDiv = document.querySelector('.footer');
footerDiv.innerHTML = footer()

hideLoading()

// ....>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// log in

let form = document.getElementById("log_form")

let log_email_error = document.getElementById("log_email_error")

let log_password_error = document.getElementById("log_password_error")

const baseurl = "https://rich-ruby-kitten-toga.cyclic.app"
import loading from "../components/loading.components.js";
import hideLoading from "../components/hideLoading.components.js";


// let form = document.querySelector("#signinfrom")
// let body = document.querySelector("body");

form.addEventListener('submit',function(event){
    event.preventDefault(event);
    let user ={
        email:form.email.value,
        password:form.password.value
    }
    console.log(user);
    

        body.style.backgroundImage = "url('https://img.rawpixel.com/private/static/images/website/2022-05/pf-s124-ak-2615_2.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=c77077de245e55401603da8711ee87a7')";
        login(user);
        loading()
    
}) 


const login = async(user) =>{
    if(user.email =="admin" && user.password =="admin"){
        window.location.href = "../routes/admin_panel.html"  
        return
    }
    try {

        const res = await fetch(`${baseurl}/users/login`,{
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(user) 
        })


        if(res.ok){
            alert("Logged in")
            let data = await res.json()
            localStorage.setItem('token',data.Token)
            window.location.href = "../index.html"  
        }else{
            let data = await res.json()
            alert(data.message);
            document.body.style.backgroundColor = 'white';
            hideLoading()
            window.location.reload();
        }

    } catch (error) {
        alert(error.message);
    }

}


// // import loading from "../components/loading.components.js";

// log_myform.addEventListener("submit", (e) => {
//     e.preventDefault();
//     var userData = {

//         email: log_myform.log_email.value,
//         password: log_myform.log_password.value,
//     }

//     var admin={
//         email:"admin",
//         password:"admin1",
//     }

//     //    validation of form

// //     if (userData.email !== "" && userData.password.length !== 0) {
// //         log_email_error.innerHTML = null; log_password_error.innerHTML = null;
// //         login_User(userData)
// //     } else {
// //         userData.email == "" ? log_email_error.innerHTML = "*Enter Email!"
// //             : log_email_error.innerHTML = null;

// //         userData.password.length == 0 ? log_password_error.innerHTML = "*Enter Password!"
// //             : log_password_error.innerHTML = null;
// //     }


// // })


// function login_User(obj) {
//     fetch("https://localhost:8900/users/login")
//         .then(responseObject => responseObject.json())
//         .then((data) => {
//             //   console.log(data)
//             let flag = false;
//             var element = "";

//             data.forEach((item) => {
//                 if(obj.email=="admin@gmail.com" && obj.password=="admin1"){
//                     window.location.href= "../html/admin.html"
//                 }
//                 else
//                 if (item.email == obj.email && item.password == obj.password) {
//                     element = item;
//                     flag = true;

//                 }

//             })
//             if (flag == true) {
//                  localStorage.setItem("loginUser",JSON.stringify(element))
//                 // alert(`Congratulation ${element.firstname} ${element.lastname}, Explore your dream journey with GhumooCaR`)
//                 swal({
//                     title: `Welcome To GhumooCar`,
//                     text: "Explore you dream journey!",
//                     icon: "success",
//                     button:"Go"
//                   });
//                 log_closePopup()
//                 login_name.innerHTML=`Hey, ${element.firstname} ${element.lastname}
//                 <i id="pro" class="fa-solid fa-user"></i>`;

//             } else {
//                 log_password_error.innerHTML = "Username and password may be incorrect!"
//             }
//         })

// }


let log_popup = document.getElementById("log_popup");

function log_openPopup() {
    log_popup.classList.add("log_open-popup");
}
function log_closePopup() {
    log_popup.classList.remove("log_open-popup");
}

//sign up 


let myform = document.getElementById("form")
// let cpassword = document.getElementById("cpassword")

let first_name_error = document.getElementById("first_error")
let last_name_error = document.getElementById("last_error")
let mobile_error = document.getElementById("mobile_error")
let email_error = document.getElementById("email_error")
let date_error = document.getElementById("date_error")
let password_error = document.getElementById("password_error")
let cpassword_error = document.getElementById("cpassword_error")
let gender_error = document.getElementById("gender_error")

myform.addEventListener("submit", (e) => {
    e.preventDefault();

    var userData = {
        firstname: myform.firstname.value,
        lastname: myform.lastname.value,
        email: myform.email.value,
        mobile: myform.mobile.value,
        DOB: myform.birthdate.value,
        gender: myform.gender.value,
        password: myform.password.value,

    }

    //    validation of form
    if (userData.firstname !== "" && userData.lastname !== "" && userData.email !== "" && userData.email !== "" && userData.mobile.length == 10 && userData.DOB !== "" && userData.gender !== "" && userData.password.length >= 6 && myform.cpassword.value == userData.password) {
        first_name_error.innerHTML = null; date_error.innerHTML = null; gender_error.innerHTML = null;
        last_name_error.innerHTML = null; password_error.innerHTML = null; cpassword_error.innerHTML = null;
        email_error.innerHTML = null; mobile_error.innerHTML = null;

        // alert(`Hey ${userData.firstname} ${userData.lastname}! You Signed Up Successfully.`)
        swal({
            title: `Congrats! ${userData.firstname} ${userData.lastname}`,
            text: "You succefully registered!",
            icon: "success",
          });

        SignUp_user(userData);

    } else {
        userData.firstname == "" ? first_name_error.innerHTML = "*Enter First Name!"
            : first_name_error.innerHTML = null;

        userData.lastname == "" ? last_name_error.innerHTML = "*Enter Last Name!"
            : last_name_error.innerHTML = null;

        userData.email == "" ? email_error.innerHTML = "*Enter Email!"
            : email_error.innerHTML = null;

        userData.mobile.length == 0 ? mobile_error.innerHTML = "*Enter Mobile Number!"
            : userData.mobile.length != 10 ? mobile_error.innerHTML = "*Mobile Number should be 10 digit."
                : mobile_error.innerHTML = null;

        userData.DOB == "" ? date_error.innerHTML = "*Enter Date of Birth!"
            : date_error.innerHTML = null;
        userData.gender == "" ? gender_error.innerHTML = "*Fill the gender" : gender_error.innerHTML = null;

        userData.password.length == 0 ? password_error.innerHTML = "*Enter Password!"
            : userData.password.length < 6 ? password_error.innerHTML = "*Password length should be greater than or equal to 6."
                : password_error.innerHTML = null;

        cpassword.value !== userData.password ? cpassword_error.innerHTML = "*Password & confirm password must be equal!"
            : cpassword_error.innerHTML = null;
    }


})


function SignUp_user(obj) {
    fetch("https://localhost:8900/users/register", {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(obj)
    }
    )
        .then(responseObject => responseObject.json())
        .then((data) => {
            console.log(data)
            location.href = "../index.html"
        })
}



let popup = document.getElementById("popup");

function openPopup() {
  popup.classList.add("open-popup");
}
function closePopup() {
  popup.classList.remove("open-popup");
}



