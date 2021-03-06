// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: exclamation-triangle;
// Checks if Slack is down by examining their status page. Works perfectly with Siri.
let url = "https://status.slack.com"
let r = new Request(url)
let body = await r.loadString()
Safari.openInApp(url)
if (config.runsWithSiri) {
  let needles = [
    "up and running",
    "smooth sailing"
  ]
  let foundNeedles = needles.filter(n => {
    return body.includes(n)
  })
  if (foundNeedles.length > 0) {
    Speech.speak("No")
  } else {
    Speech.speak("Yes")
  }
}
// It is good practice to call Script.complete() at the end of a script, especially when the script is used with Siri or in the Shortcuts app. This lets Scriptable report the results faster. Please see the documentation for details.
Script.complete()