export class Utility {

  static currencyStringToNumber(str: string): number {
    const text = str;
    let fixed = "";
    for (let i = 0; i < text.length; i++) {
      const character = text.charAt(i);
      if(character != ",")
      {
        fixed = fixed + character;
      }
    }
    return Number(fixed);
  }
}
