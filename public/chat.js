const sendMessage = (event) => {
  event.preventDefault();
  const message = document.getElementById("text").value;
  //console.log(message);
  const token = localStorage.getItem("token");
  const data = { message };
  axios
    .post("http://localhost:3000/message", data, { headers: { Auth: token } })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
