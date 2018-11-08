export const    TAB = 9,
                LEFT_ARROW = 37,
                RIGHT_ARROW = 39,
                BACKSPACE = 8,
                DELETE = 46

export const SPECIAL_CHARS = [' ', '/', '(', ')', '+', '\/', '-' ];

export function overWriteCharAtPos(input: HTMLInputElement, position: number, key: string){
    const inputValue = input.value;
  
    input.value = inputValue.slice(0, position) + key + inputValue.slice(position + 1) ;
  
}