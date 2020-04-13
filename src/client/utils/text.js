export function isCaretPositionAt(textarea, position = 0) {
  return textarea.selectionStart === position && textarea.selectionStart === textarea.selectionEnd;
}

export function setCaretPositionToEnd(element) {
  if (!element) {
    return;
  }
  element.focus();
  element.setSelectionRange(element.value.length, element.value.length);
}

export function setCaretPositionToBegin(element) {
  if (!element) {
    return;
  }
  element.focus();
  element.setSelectionRange(0, 0);
}
