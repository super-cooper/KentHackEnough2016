/**
 * script to send flagged URLs to server
 */

document.addEventListener('DOMContentLoaded', () => {
  var el = document.getElementById("but1");
  el.addEventListener("click", sendCurrentUrl);
  var e2 = document.getElementById("but2");
  var text = document.getElementById("textfield");
  e2.addEventListener("click", function() { sendToServer(text.value);});
  document.getElementById("success").style.display = "none"; //hide elements
  document.getElementById("failure").style.display = "none";
});
/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });
}

function sendToServer(toServer)
{
  document.getElementById("success").style.display = "none"; //hide elements
  document.getElementById("failure").style.display = "none";
  $.post('http://phishnet.acorn.pw/report.php', {url: toServer, client: "poopybutt"}, function(data) { if (data.success) printSuccess(); else printFailure(); });
}

function sendCurrentUrl()
{
    getCurrentTabUrl(function(url) {sendToServer(url)});
}

function printSuccess()
{
   document.getElementById("success").style.display = "";
}
  
function printFailure()
{
   document.getElementById("failure").style.display = "";
}
