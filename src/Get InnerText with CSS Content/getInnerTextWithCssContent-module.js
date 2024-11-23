/**
 * Get the innerText of an element including CSS :before & :after content.
 * @param {Element|Text} element - The element to retrive innerText from.
 * @returns {string} The innerText of the element including CSS content.
 */
export function getInnerTextWithCssContent(element) {
  // If element is a Text Node, set element to its parent.
  if (element instanceof Text) {
    element = element.parentElement;
  }
  if (element instanceof Element) {
    const before = window.getComputedStyle(element, ':before')['content'];
    const after = window.getComputedStyle(element, ':after')['content'];
    // In the case of none, we use empty strings;
    // Otherwise we trim the surrounding quotes.
    const prefix = before === 'none' ? '' : before.slice(1, -1);
    const suffix = after === 'none' ? '' : after.slice(1, -1);
    return `${prefix}${element.innerText}${suffix}`;
  }
  // If argument is an incorrect type, fail gracefully.
  return element?.toString() || String(element) || '';
}
