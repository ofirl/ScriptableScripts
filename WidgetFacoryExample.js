// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: teal; icon-glyph: magic;

const { widgetFactory, widgetSpacer, widgetText } = importModule(
  "./widgetFactory"
);

/** @param {string | void} imgUrl */
const getBgImage = async imgUrl => {
  if (!imgUrl) return null;
  const imgReq = new Request(imgUrl);
  return await imgReq.loadImage();
};

const bgImage = await getBgImage(imgURL);
const bgGradient = new LinearGradient();
bgGradient.locations = [0, 1];
bgGradient.colors = [new Color("#b00a0fe6"), new Color("#b00a0fb3")];

const widget = widgetFactory({
  ...(bgImage ? { bgImage } : {}),
  bgColor: new Color("#b00a0f"),
  bgGradient,
  content: [
    widgetSpacer(),
    widgetText({
      text: item.title,
      font: Font.boldSystemFont(16),
      color: Color.white(),
    }),
    widgetSpacer({ length: 8 }),
    widgetText({
      text: `by ${authors}`,
      font: Font.mediumSystemFont(12),
      color: Color.white(),
      opacity: 0.9,
    }),
    widgetSpacer({ length: 2 }),
    widgetText({
      text: strDate,
      font: Font.mediumSystemFont(12),
      color: Color.white(),
      opacity: 0.9,
    }),
    widgetSpacer(),
  ],
});