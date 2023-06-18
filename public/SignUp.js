const SignUp = (event) => {
  event.preventDefault();

  const name = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const phone = document.getElementById("phone").value;

  const obj = {
    name,
    email,
    password,
    phone,
  };
  axios
    .post("http://localhost:3000/signup", obj)
    .then((res) => {
      if (res.data.existedEmail) {
        window.alert("Email already existed try with another email!");
      } else {
        window.alert(" user signed up successfully!");
        console.log(res.data);
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
};

function hideUsernameLabel() {
  document.getElementById("username-label").style.display = "none";
}
function hideEmailLabel() {
  document.getElementById("email-label").style.display = "none";
}
function hidePasswordLabel() {
  document.getElementById("password-label").style.display = "none";
}
function hidePhoneLabel() {
  document.getElementById("phone-label").style.display = "none";
}
