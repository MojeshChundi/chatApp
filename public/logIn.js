const logIn = (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const data = { email, password };

  axios
    .post("http://localhost:3000/login", data)
    .then((res) => {
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      window.alert("login successfully!");
      window.location.href = "http://localhost:3000/public/chat.html";
    })
    .catch((err) => {
      if (err.response.request.status === 401) {
        window.alert(
          `${err.response.data.message}  Please enter currect password!!`
        );
      } else if (err.response.request.status === 404) {
        window.alert(`${err.response.data.message}  SignUp Now!!`);
      }
    });
};
function hideEmailLabel() {
  document.getElementById("email-label").style.display = "none";
}
function hidePasswordLabel() {
  document.getElementById("password-label").style.display = "none";
}
