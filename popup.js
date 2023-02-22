document
  .getElementById("connect-button")
  .addEventListener("click", async () => {
    let connect_btn = document.getElementById("connect-button");
    connect_btn.disabled = true;
    connect_btn.innerText = "Connecting";
    connect_btn.style.backgroundColor = "grey";

    chrome.storage.local.set({ i: 0 }, function () {
      console.log("counter is set to", 0);
    });

    await chrome.scripting.executeScript({
      target: { tabId: await getCurrentTabId() },
      files: ["content.js"],
    });
  });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.counter !== undefined) {
    document.getElementById("count").innerText = message.counter;
  }
});

async function getCurrentTabId() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab.id;
}
