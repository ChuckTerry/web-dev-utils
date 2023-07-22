/**
 * Converts an image to a base64 encoded string.
 * @param {HTMLImageElement | Image} image The image to convert
 * @param {boolean} [trimSuffix=true] Whether or not to remove the data type suffix from the returned string
 * @returns {string} String representing the base64 encoded image
 */
function base64EncodeImage(image, trimSuffix = true) {
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0);
  // Default is a 1px x 1px transparent PNG;
  let dataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQI12NgAAIAAAUAAeImBZsAAAAASUVORK5CYII=';
  try {
    dataUrl = canvas.toDataURL("image/png");
  } catch (error) {
    if (error instanceof DOMException) {
      console.error("getBase64Image encountered an error: The image is from a different origin and cannot be downloaded due to security concerns, instead a 1px x 1px transparent image will be used.");
    } else {
      throw error;
    }
  }
  if (trimSuffix) dataUrl = dataUrl.replace(/^data:image\/(?:png|jpg);base64,/, "");
  return dataUrl;
}
