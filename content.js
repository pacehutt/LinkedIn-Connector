clickConnectButtons();

function clickConnectButtons() {
  const connections = document.querySelectorAll(".artdeco-button--secondary");
  let counter = 0;

  function clickButton(i) {
    console.log("inside clickButton", i, connections.length);
    if (i < connections.length) {
      if (connections[i].firstElementChild.textContent.trim() == "Connect") {
        clickConnect(connections[i]).then(() => {
          const sendButton = document.querySelector(
            ".artdeco-button.ml1.artdeco-button--primary"
          );
          console.log("inside if", i);
          try {
            if (sendButton.firstElementChild.textContent.trim() == "Send") {
              sendButton.click();
              ++counter;
              chrome.storage.local.set({ i: counter }, function () {
                chrome.runtime.sendMessage({ counter });
              });
              clickButton(i + 1);
            }
            console.log("clicked");
          } catch (e) {
            console.log(e, "error");
            clickButton(i);
          }
        });
      } else {
        clickButton(i + 1);
      }
    }
  }

  clickButton(0);
}

function clickConnect(button) {
  return new Promise((resolve, reject) => {
    button.click();
    setTimeout(() => {
      resolve("Resolved");
    }, 1000);
  });
}
