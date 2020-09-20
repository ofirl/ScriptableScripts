// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: magic;

const { NotificationFactory } = importModule(
	"NotificationFactory"
);

let webView = new WebView();
const onePratUrl = "https://one.prat.idf.il";
await webView.loadURL(onePratUrl);

await new Promise(r => Timer.schedule(1000, false, r));

// click button
let clickButton = await webView.evaluateJavaScript(`
console.log(window.location.href);

if (window.location.pathname === "/finish") {
    completion(false);
}
else if (window.location.pathname === "/hp") {
    document.querySelector('.locationStatusBtn').click();
    completion(true);
}
`, true);

// console.log(clickButton);

if (!clickButton)
	return completeScript('error');

// wait for redirects
await new Promise(r => Timer.schedule(1000, false, r));

// check result
let result = await webView.evaluateJavaScript(`
console.log(window.location.href);

if (window.location.pathname === "/finish") {
    if (document.body.innerHTML.includes('הדיווח שלך נשלח בהצלחה')) {
        completion(true);
    }
    else {
        completion(false);
    }
}
else {
    completion(false);
}
`, true);

completeScript(result);

function completeScript(result) {
	if (config.runsInApp)
		QuickLook.present(result);

	NotificationFactory({
		threadIdentifier: 'ReportOneStatus',
		title: 'Report One',
		subtitle: 'Status',
		body: result,
		sound: result === true ? 'complete' : 'failure',
		actions: [{
			name: 'Open Site',
			url: onePratUrl
		}]
	})

	return result;
	// Script.complete();
}