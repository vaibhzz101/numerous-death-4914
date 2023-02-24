// import { footer } from "../components/footer.js";
// import navbar from "../components/navbar.components.js";

import loading from "../components/loading.components.js";
import hideLoading from "../components/hideLoading.components.js";
let popHandler = document



const baseurl = "https://elegant-gold-starfish.cyclic.app"

// login
let form = document.querySelector("#signinfrom")

let body = document.querySelector("body");

form.addEventListener('submit',function(event){
    event.preventDefault(event);
    let user ={
        email:form.email.value,
        password:form.password.value,
    }
    console.log(user);
    

        // body.style.backgroundImage = "url('https://img.rawpixel.com/private/static/images/website/2022-05/pf-s124-ak-2615_2.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=c77077de245e55401603da8711ee87a7')";
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

// 
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

// sign-up

let form2 = document.querySelector("#signupfrom")


form2.addEventListener('submit',function(event){
    event.preventDefault(event);
    let user = {
        name : form2.name.value,
        email:form2.email.value,
        phone:form2.phone.value,
        password:form2.password.value,
    }
    body.style.backgroundImage = "url('https://img.rawpixel.com/private/static/images/website/2022-05/pf-s124-ak-2615_2.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=c77077de245e55401603da8711ee87a7')";
    loading()
    register(user)
})


const register = async(user) =>{
    try {

        const res = await fetch(`${baseurl}/users/register`,{
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(user) 
        })
        let data = await res.json()
        if(data.err){
            alert(data.err)
            hideLoading()
            window.location.reload();

        }
        else{
            alert(user.name + " user created successfully")  
            window.location.href = "./index.html"  
        }
    } catch (error) {
        console.log(error.message);
    }

}