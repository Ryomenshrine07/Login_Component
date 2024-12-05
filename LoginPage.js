const loginBtn = document.querySelector('#loginbtn');
const signUpBtn = document.querySelector('#sign-up-btn');
const userInputBox = document.querySelector("#user");
const passWordInputBox = document.querySelector('#Passs');
const signInUserNameBox = document.querySelector('#userSign-in');
const signInUserPasswordBox = document.querySelector('#PasssSign-in');
const signInRegisterBtn = document.querySelector('#register-btn');
const goToLoginBtn = document.querySelector('#gotToLogin');

let data = JSON.parse(localStorage.getItem("userData")) || [
    { username: "Vinayak Upadhay", password: "1234@Hello" },
    { username: "Priyanka Thapa", password: "1234@Hi" },
    { username: "Pankaj Oberoi", password: "1234@HelloMitron" },
    { username: "Anonymous", password: "1234@Heee" },
];

loginBtn.addEventListener('click', () => {
    const username = userInputBox.value.trim();
    const password = passWordInputBox.value.trim();

    const isValidUser = validatePassword(username, password);
    userInputBox.value = "";
    passWordInputBox.value = "";

    if (isValidUser) {
        showFeedback('#success', true);
        document.querySelector('.login-main').style.display = "block";
        document.querySelector('.sign-page').style.display = "none";
    } else {
        showFeedback('#error', true);
        signUpBtn.addEventListener('click', () => {
            showSignUpPage(username, password);
        });
    }
});

function validatePassword(username, password) {
    return data.some(user => user.username === username && user.password === password);
}

function showSignUpPage(username, password) {
    document.querySelector('.login-main').style.display = "none";
    document.querySelector('.sign-page').style.display = "block";

    signInRegisterBtn.addEventListener('click', () => {
        registerUser();
    });
}

function registerUser() {
    const signInUserName = signInUserNameBox.value.trim();
    const signInUserPassword = signInUserPasswordBox.value.trim();

    // if (!signInUserName || !signInUserPassword) {
    //     showFeedback('#not-registered', true, "Please fill in all fields to register.");
    //     return;
    // }

    const userExists = data.some(user => user.username === signInUserName);
    if (userExists) {
        showFeedback('#not-registered', true, "User already registered!");
        return;
    }

    const userData = { username: signInUserName, password: signInUserPassword };
    data.push(userData);
    localStorage.setItem("userData", JSON.stringify(data));

    signInUserNameBox.value = "";
    signInUserPasswordBox.value = "";

    showFeedback('#regesterd-now', true, "Registration successful!");
    document.querySelector('#gotToLogin').style.display = "block";
    goToLoginBtn.addEventListener('click', goBackToLogin);
}

function goBackToLogin() {
    document.querySelector('.login-main').style.display = "block";
    document.querySelector('.sign-page').style.display = "none";
    showFeedback('#error', false);
    showFeedback('#success', false);
    showFeedback('#not-registered', false);
    showFeedback('#regesterd-now', false);
}

function showFeedback(selector, display, message = "") {
    const element = document.querySelector(selector);
    element.style.display = display ? "block" : "none";
    if (message) {
        element.textContent = message;
    }
}
