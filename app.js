import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    auth,
    googleProvider
} from "./firebase.js"

let passwordInput = document.getElementById("password-input")
let emialInput = document.getElementById("email-input")
let passwordImg = document.getElementById("password-hide")
let loginBtn = document.getElementById("login-Btn")
let changePage = document.getElementById("change-page")


// password hide and show function

passwordImg.addEventListener("click",()=>{
    if(passwordInput.type === "password"){
        passwordInput.type = "text"
        passwordImg.style.backgroundImage = "url(/assets/eye.png)"
    }
    else{
        passwordInput.type = "password"
        passwordImg.style.backgroundImage = "url(/assets/Vector.png)"
    }
})


// login page to signin page function
changePage.addEventListener("click",(e)=>{
     e.preventDefault(); 
    window.location.replace ("./signup.html")
})



onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    window.location.replace ("./main.html")
    // ...
  } else {
    // User is signed out
    console.log("user don't exist")
    // ...
  }
});



loginBtn.addEventListener("click",(e)=>{
 e.preventDefault(); 
  signInWithEmailAndPassword(auth, emialInput.value, passwordInput.value)
    .then((res) => {
      // Signed in 
      const user = res.user;
      console.log("user ",res.user )
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error :",error.code)
    });

})

// continue with google function

let googleBtn = document.getElementById("google-Btn")

let googleContinue =()=>{
signInWithPopup(auth, googleProvider)
  .then((result) => {
 
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
  console.log("Token :" , Token)
  console.log("user :" , user)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);

    console.log("error.code :", error.code ,credential)
    // ...
  });

} 

googleBtn.addEventListener("click",googleContinue)