// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: purple; icon-glyph: newspaper;
// The script shows the latest article
// from MacStories in a widget on your
// Home screen. Go to your Home screen
// to set up the script in a widget.
// The script will present a preview
// of the widget when running in the
// app.
let items = await loadItems()
let widget = await createWidget(items)
// Check if the script is running in
// a widget. If not, show a preview of
// the widget to easier debug it.
if (!config.runsInWidget) {
  await widget.presentMedium()
}
// Tell the system to show the widget.
Script.setWidget(widget)
Script.complete()

async function createWidget(items) {
  let item = items[0]
  let authors = item.authors.map(a => {
    return a.name
  }).join(", ")
  let imgURL = extractImageURL(item)
  let rawDate = item["date_published"]
  let date = new Date(Date.parse(rawDate))
  let dateFormatter = new DateFormatter()
  dateFormatter.useFullDateStyle()
  dateFormatter.useShortTimeStyle()
  let strDate = dateFormatter.string(date)
  let gradient = new LinearGradient()
  gradient.locations = [0, 1]
  gradient.colors = [
    new Color("#b00a0fe6"),
    new Color("#b00a0fb3")
  ]
  let w = new ListWidget()
  if (imgURL != null) {
    let imgReq = new Request(imgURL)
    let img = await imgReq.loadImage()
    w.backgroundImage = img
  }
  w.backgroundColor = new Color("#b00a0f")
  w.backgroundGradient = gradient
  // Add spacer above content to center it vertically.
  w.addSpacer()
  // Show article headline.
  let titleTxt = w.addText(item.title)
  titleTxt.font = Font.boldSystemFont(16)
  titleTxt.textColor = Color.white()
  // Add spacing below headline.
  w.addSpacer(8)
  // Show authors.
  let authorsTxt = w.addText("by " + authors)
  authorsTxt.font = Font.mediumSystemFont(12)
  authorsTxt.textColor = Color.white()
  authorsTxt.textOpacity = 0.9
  // Add spacing below authors.
  w.addSpacer(2)
  // Show date.
  let dateTxt = w.addText(strDate)
  dateTxt.font = Font.mediumSystemFont(12)
  dateTxt.textColor = Color.white()
  dateTxt.textOpacity = 0.9
  // Add spacing below content to center it vertically.
  w.addSpacer()
  w.url = item.url
  return w
}
  
async function loadItems() {
  let url = "https://macstories.net/feed/json"
  let req = new Request(url)
  let json = await req.loadJSON()
  return json.items
}

function extractImageURL(item) {
  let regex = /<img src="(.*)" alt="/
  let html = item["content_html"]
  let matches = html.match(regex)
  if (matches && matches.length >= 2) {
    return matches[1]
  } else {
    return null
  }
}