chrome.runtime.onStartup.addListener((msg, sender, senderResponse) => {
    console.log(msg, sender, senderResponse);
});
chrome.runtime.onInstalled.addListener((details) => {
    console.log(details);
})
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    console.log("--", msg, sender, sendResponse);
});
