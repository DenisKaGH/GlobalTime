/**
 * Global Time (⊙) - Transparent Badge Controller
 */

function getGlobalBeat() {
    const now = new Date();
    // UTC+14 Offset (Solar Anchor)
    const utcSeconds = (now.getTime() / 1000) + (14 * 3600);
    const secondsPastMidnight = utcSeconds % 86400;
    
    // Calculate the 1,500 Beat
    const beat = Math.floor(secondsPastMidnight / 57.6);
    return beat.toString().padStart(4, '0');
}

function updateBadge() {
    const beatValue = getGlobalBeat();
    
    // 1. Set the 4-digit text
    chrome.action.setBadgeText({ text: beatValue });
    
    // 2. Set the text color to Solar Teal (#00CCBB)
    // This makes the numbers themselves the primary visual element
    if (chrome.action.setBadgeTextColor) {
        chrome.action.setBadgeTextColor({ color: "#00A89B" });
    }
    
    // 3. Set the badge background to fully transparent
    // [Red, Green, Blue, Alpha] -> Alpha 0 is invisible
    chrome.action.setBadgeBackgroundColor({ color: [0, 0, 0, 0] });
}

// Update loop
chrome.alarms.create("sync_badge", { periodInMinutes: 0.5 });
chrome.alarms.onAlarm.addListener(updateBadge);

// Startup logic
chrome.runtime.onInstalled.addListener(updateBadge);
chrome.runtime.onStartup.addListener(updateBadge);