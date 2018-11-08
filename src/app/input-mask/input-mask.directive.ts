import {
  Directive,
  Input,
  OnInit,
  ElementRef,
  HostListener
} from "@angular/core";
import * as includes from "lodash.includes";
import * as findLastIndex from "lodash.findLastIndex";
import * as findIndex from "lodash.findindex";
import {
  SPECIAL_CHARS,
  TAB,
  overWriteCharAtPos,
  LEFT_ARROW,
  RIGHT_ARROW,
  BACKSPACE,
  DELETE
} from "./mask.utils";
import { maskDigitValidators, neverValidator } from "./digit_validator";

@Directive({
  selector: "[appInputMask]"
})
export class InputMaskDirective implements OnInit {
    @Input("appInputMask") mask = "";
  
    input: HTMLInputElement;
  
    constructor(el: ElementRef) {
      this.input = el.nativeElement;
    }
  
    ngOnInit() {
      console.log(this.input);
      this.input.value = this.buildPlaceholder();
    }
  
    @HostListener("keydown", ["$event", "$event.keyCode"])
    onKeyDown(event: KeyboardEvent, keyCode) {
      if (keyCode !== TAB) {
        event.preventDefault();
      }
  
      const key = String.fromCharCode(keyCode);
      const currentCursorPos = this.input.selectionStart;
  
      switch (keyCode) {
        case LEFT_ARROW:
          this.handleLeftArrow(currentCursorPos);
          return;
  
        case RIGHT_ARROW:
          this.handleRightArrow(currentCursorPos);
          return;
  
        case BACKSPACE:
          this.handleBackspace(currentCursorPos);
          return;
  
        case DELETE:
          this.handleDelete(currentCursorPos);
          return;
      }
  
      const maskDigit = this.mask.charAt(currentCursorPos);
      const digitValidator = maskDigitValidators[maskDigit] || neverValidator;
  
      if (digitValidator(key)) {
        overWriteCharAtPos(this.input, currentCursorPos, key);
        this.handleRightArrow(currentCursorPos);
      }
    }

    handleBackspace(currentCursorPos) {
      const prevPos = this.calcPrevCursorPos(currentCursorPos);
  
      if (prevPos >= 0) {
        overWriteCharAtPos(this.input, prevPos, "_");
        this.input.setSelectionRange(prevPos, prevPos);
      }
    }

    handleDelete(currentCursorPos){
      overWriteCharAtPos(this.input, currentCursorPos, '_');
      this.input.setSelectionRange(currentCursorPos, currentCursorPos)
    }
  
    handleLeftArrow(currentCursorPos) {
      const prevPos = this.calcPrevCursorPos(currentCursorPos);
  
      if (prevPos >= 0) {
        this.input.setSelectionRange(prevPos, prevPos);
      }
    }
  
    calcPrevCursorPos(currentCursorPos) {
      const valueBeforeCursor = this.input.value.slice(0, currentCursorPos);
      return findLastIndex(
        valueBeforeCursor,
        char => !includes(SPECIAL_CHARS, char)
      );
    }
  
    handleRightArrow(currentCursorPos) {
      const valueAfterCursor = this.input.value.slice(currentCursorPos + 1);
      const nextPos = findIndex(
        valueAfterCursor,
        char => !includes(SPECIAL_CHARS, char)
      );
  
      if (nextPos >= 0) {
        const newCursorPos = currentCursorPos + nextPos + 1;
        this.input.setSelectionRange(newCursorPos, newCursorPos);
      }
    }
  
    buildPlaceholder(): string {
      const chars = this.mask.split("");
  
      const value = chars.reduce((result, char) => {
        return (result += includes(SPECIAL_CHARS, char) ? char : "_");
      }, "");
  
      return value;
    }
}
