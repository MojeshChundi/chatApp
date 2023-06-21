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

window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  axios
    .get("http://localhost:3000/getusers", { headers: { Auth: token } })
    .then((res) => {
      console.log(res);

      getusers(res.data.users, res.data.messages, res.data.name);
    })
    .catch((err) => {
      console.log(err);
    });
});
let HtmlOutput = document.getElementById("user");
let HtmlOutput1 = document.getElementById("chat");
function getusers(users, messages, user) {
  users.forEach((user) => {
    let outPut = ` 
          <li>
            <img
              src =
                "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg"
              alt=""
            />
            <div>
              <h2>${user.name}</h2>
              <h3>
                <span> offline</span>
              </h3>
            </div>
          </li>
        `;

    HtmlOutput.innerHTML += outPut;
  });

  messages.forEach((message) => {
    let outPut1 = `<li class="you">
            <div class="entete">
              <span class="status green"></span>
              <h2>${user[0].name}</h2>
              <h3>10:12AM, Today</h3>
            </div>
            <div class="triangle"></div>
            <div class="message">
               ${message.content}
            </div>
          </li>`;
    HtmlOutput1.innerHTML += outPut1;
  });
}

const fetchdata = setInterval(() => {
  const token = localStorage.getItem("token");
  axios
    .get("http://localhost:3000/getusers", { headers: { Auth: token } })
    .then((res) => {
      console.log(res);

      getusers(res.data.users, res.data.messages, res.data.name);
      HtmlOutput = "";
      HtmlOutput1 = "";
    })
    .catch((err) => {
      console.log(err);
    });
}, 1000);
