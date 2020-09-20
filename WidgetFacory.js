// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: teal; icon-glyph: magic;

//
// JSDoc Types
//

/**
 * @typedef {'left' | 'center' | 'right'} Align
 * @typedef {{
 * text: string;
 * color?: Color;
 * font?: Font;
 * opacity?: number;
 * lineLimit?: number;
 * align?: Align;
 * }} TextOpts
 * @typedef {{
 *  image: Image;
 *  opacity?: number;
 *  size?: Size;
 *  cornerRadius?: number;
 *  borderWidget?: number;
 *  containerRelativeShape?: boolean;
 *  align?: Align;
 * }} ImageOpts
 * @typedef {{ length?: number }} SpacerOpts
 * @typedef {{
 *  bgColor?: Color;
 *  bgImage?: Image;
 *  bgGradient?: LinearGradient;
 *  spaceBetweenEls?: number;
 *  onTapUrl?: string;
 *  padding?: string; // CSS syntax (without `px` suffix)
 *  content: (TextOpts | ImageOpts | SpacerOpts)[];
 * }} WidgetOpts
 */

//
// Utils
//

/**
 * @param {string} paddingStr
 * Returns array of padding values in order of `ListWidget.setPadding()`.
 * Example: `1 2 3 4` will set padding for top, right, bottom, and left, respectively.
 * See for usage: https://developer.mozilla.org/en-US/docs/Web/CSS/padding
 */
const cssPaddingStrToArr = paddingStr => {
  const values = paddingStr
    .trim()
    .split(' ')
    .map(numStr => parseInt(numStr, 10));
  const numVals = values.length;
  if (!numVals) return null;
  const top = values[0];
  const right = numVals > 1 ? values[1] : values[0];
  const bottom = numVals > 2 ? values[2] : values[0];
  const left = numVals > 3 ? values[3] : numVals > 1 ? values[1] : values[0];
  return [top, left, bottom, right];
};

/** @type {(content: any) => content is TextOpts} */
const isText = content => Boolean(content.text);
/** @type {(content: any) => content is ImageOpts} */
const isImage = content => Boolean(content.image);
/** @type {(content: any) => content is SpacerOpts} */
const isSpacer = content => Boolean(content.isSpacer);

//
//
//

/** @param {WidgetOpts} opts */
module.exports.widgetFactory = ({
  bgColor,
  bgImage,
  bgGradient,
  spaceBetweenEls,
  onTapUrl,
  padding,
  content,
}) => {
  const widget = new ListWidget();
  if (bgColor) widget.backgroundColor = bgColor;
  if (bgImage) widget.backgroundImage = bgImage;
  if (bgGradient) widget.backgroundGradient = bgGradient;
  if (spaceBetweenEls) widget.spacing = spaceBetweenEls;
  if (onTapUrl) widget.url = onTapUrl;
  if (padding) {
    const parsedPadding = cssPaddingStrToArr(padding);
    if (parsedPadding) widget.setPadding(...parsedPadding);
  }
  content.forEach(pieceOfContent => {
    if (isText(pieceOfContent)) {
      const { text, color, font, opacity, lineLimit, align } = pieceOfContent;
      const addedText = widget.addText(text);
      if (color) addedText.textColor = color;
      if (font) addedText.font = font;
      if (opacity) addedText.textOpacity = opacity;
      if (lineLimit) addedText.lineLimit = lineLimit;
      if (align === 'left') addedText.leftAlignText();
      if (align === 'center') addedText.centerAlignText();
      if (align === 'right') addedText.rightAlignText();
    }
    if (isImage(pieceOfContent)) {
      const {
        image,
        opacity,
        size,
        cornerRadius,
        borderWidth,
        containerRelativeShape,
        align,
      } = pieceOfContent;
      const addedImage = widget.addImage(image);
      if (opacity) addedImage.imageOpacity = opacity;
      if (size) addedImage.imageSize = size;
      if (cornerRadius) addedImage.cornerRadius = cornerRadius;
      if (borderWidth) addedImage.borderWidth = borderWidth;
      if (containerRelativeShape)
        addedImage.containerRelativeShape = containerRelativeShape;
      if (align === 'left') addedImage.leftAlignImage();
      if (align === 'center') addedImage.centerAlignImage();
      if (align === 'right') addedImage.rightAlignImage();
    }
    if (isSpacer(pieceOfContent)) widget.addSpacer(pieceOfContent.length);
  });
  return widget;
};

/** @param {TextOpts} opts */
module.exports.widgetText = ({
  text,
  color,
  font,
  opacity,
  lineLimit,
  align,
}) => ({ text, color, font, opacity, lineLimit, align });

/** @param {ImageOpts} opts */
module.exports.widgetImage = ({
  image,
  opacity,
  size,
  cornerRadius,
  borderWidth,
  containerRelativeShape,
  align,
}) => ({
  image,
  opacity,
  size,
  cornerRadius,
  borderWidth,
  containerRelativeShape,
  align,
});

/** @param {SpacerOpts} opts */
module.exports.widgetSpacer = ({ length } = {}) => ({ length, isSpacer: true });