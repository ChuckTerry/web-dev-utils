/**
 * Chainable function that adds an event listener to an element that copies text to the clipboard when clicked
 * @param {HTMLElement} clickableElement The element that will be clicked to copy the text
 * @param {HTMLElement | string} copySource The element that contains the text to be copied or a string
 * @returns {HTMLElement} The clickable element
 */
function copyOnClick(clickableElement, copySource) {
  const useValue = copySource instanceof HTMLTextAreaElement || copySource instanceof HTMLInputElement;
  const accessor = useValue ? 'value' : 'innerText';
  const getString = typeof copySource === 'string' ? () => copySource : () => copySource[accessor];
  clickableElement.addEventListener('click', async () => {
    navigator.clipboard.writeText(getString()).then(() => { }, () => console.error('Unable to copy text to clipboard: Permission not granted'));
  });
  return clickableElement;
}
