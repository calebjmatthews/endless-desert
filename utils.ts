class Utils {
  constructor() {
    let seedFunction = this.hash(new Date(Date.now()).valueOf().toString());
    this.random = this.mulberry32(seedFunction());
  }

  random: Function;

  hash(seed: string) {
    for(var i = 0, h = 1779033703 ^ seed.length; i < seed.length; i++)
        h = Math.imul(h ^ seed.charCodeAt(i), 3432918353),
        h = h << 13 | h >>> 19;
    return function() {
        h = Math.imul(h ^ h >>> 16, 2246822507);
        h = Math.imul(h ^ h >>> 13, 3266489909);
        return (h ^= h >>> 16) >>> 0;
    }
  }

  mulberry32(a: number) {
    return function() {
      var t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
  }

  randHex(len: number) {
    let maxlen = 8;
    let min = Math.pow(16,Math.min(len,maxlen)-1);
    let max = Math.pow(16,Math.min(len,maxlen)) - 1;
    let n = Math.floor( this.random() * (max-min+1) ) + min;
    let r = n.toString(16);
    while (r.length < len) {
      r = r + this.randHex( len - maxlen );
    }
    return r;
  }

  getDateString(date: Date) {
    let dateString = '';
    dateString += date.getFullYear() + '-';
    if (date.getMonth()+1 >= 10) {
      dateString += (date.getMonth()+1);
    }
    else {
      dateString += ('0' + (date.getMonth()+1));
    }
    dateString += '-';
    if (date.getDate() >= 10) {
      dateString += date.getDate();
    }
    else {
      dateString += ('0' + date.getDate());
    }
    return dateString;
  }

  getTimeString(date: Date) {
    let timeString = '';
    let ampm = 'am';
    if (date.getHours() > 12) {
      ampm = 'pm';
      timeString += (date.getHours() - 12) + ':';
    }
    else {
      timeString += date.getHours() + ':';
    }

    if (date.getMinutes() >= 10) {
      timeString += date.getMinutes();
    }
    else {
      timeString += ('0' + date.getMinutes());
    }
    timeString += ampm;
    return timeString;
  }

  isEmpty(aValue: any) {
    if (aValue) {
      if (typeof aValue == 'string') {
        if (aValue.length > 0) {
          return false;
        }
        return true;
      }
      else {
        return false;
      }
    }
    return true;
  }

  // Take in a string of various format and output an internationally formatted string
  phoneNumberIn(rawNum: string) {
    if (!rawNum) { return null; }
    if (rawNum.slice(0,1) == '+') {
      return rawNum;
    }
    // ex: John Doe (303) 555-5309 -> 3035555309
    let formatNum = new String(rawNum).replace(/\D/g,'');
    // ex: 3035555309 -> +13035555309
    if (formatNum.length == 10) {
      return '+1' + formatNum.valueOf();
    }
    else if ((formatNum.length == 11) && (formatNum.slice(0,1) == '1')) {
      return '+' + formatNum.valueOf();
    }
    else { return null; }
  }

  // Take an internationally formatted phone number string and output a human-friendly
  // ex: +13038675309 -> (303) 867-5309
  phoneNumberOut(rawNum: string) {
    let formatNum = this.phoneNumberIn(rawNum);
    if (formatNum == null) { return ''; }
    if (formatNum.length == 0) { return ''; }
    if (formatNum.length == 12) {
      return '(' + formatNum.slice(2,5) + ') ' + formatNum.slice(5,8)
        + '-' + formatNum.slice(8,12);
    }
    else {
      return rawNum;
    }
  }

  upperCaseFirst(aString: string) {
    if (aString) {
      return aString.slice(0, 1).toUpperCase() + aString.slice(1);
    }
    return null;
  }

  // Returns a maximum of two units of time, e.g. '1d 4h ' or '3m 45s ', with
  //  seconds being the smallest unit
  formatDuration(milliseconds: number, units: number = 0, long: boolean = false):
    string {
    if (units < 2) {
      if (milliseconds > (1000 * 60 * 60 * 24)) {
        let days: number = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
        units++;
        return ((days + (long ? ' days ' : 'd ') +
          this.formatDuration(milliseconds % (1000 * 60 * 60 * 24), units, long)));
      }
      if (milliseconds > (1000 * 60 * 60)) {
        let days: number  = Math.floor(milliseconds / (1000 * 60 * 60));
        units++;
        return ((days + (long ? ' hours ' : 'h ') +
          this.formatDuration(milliseconds % (1000 * 60 * 60), units, long)));
      }
      if (milliseconds > (1000 * 60)) {
        let days: number  = Math.floor(milliseconds / (1000 * 60));
        units++;
        return ((days + (long ? ' minutes ' : 'm ') +
          this.formatDuration(milliseconds % (1000 * 60), units, long)));
      }
      else if (milliseconds > (1000)) {
        let days: number  = Math.floor(milliseconds / (1000));
        units++;
        return ((days + (long ? ' seconds ' : 's ') +
          this.formatDuration(milliseconds % (1000), units, long)));
      }
      if (units == 0) {
        return (long ? '0 seconds ' : '0s ');
      }
    }
    return '';
  }

  // 1234567890 -> 1,234,567,890
  formatNumberLong(number: number): string {
    let strNumber = Math.round(number).toString();
    let commaNumber = '';
    let digitCount = 0;
    for (let iii = (strNumber.length-1); iii >= 0; iii--) {
      digitCount++;
      if (digitCount % 3 == 0) {
        commaNumber = (',' + strNumber[iii] + commaNumber);
      }
      else {
        commaNumber = (strNumber[iii] + commaNumber);
      }
    }
    if (commaNumber.slice(0, 1) == ',') {
      return commaNumber.slice(1);
    }
    return commaNumber;
  }

  // 1234567890 -> 1.23B
  formatNumberShort(number: number): string {
    const exponents: {[power: number] : string} = {
      3: 'K',
      6: 'M',
      9: 'B',
      12: 'T',
      15: 'Qa',
      18: 'Qi',
      21: 'Sx',
      23: 'Sp',
      25: 'Oc',
      28: 'No',
      30: 'De'
    };
    if (number < 1000) {
      return Math.round(number).toString();
    }
    let powers = Object.keys(exponents);
    let strNumber = '';
    for (let iii = 0; iii < (powers.length-2); iii++) {
      let power = parseInt(powers[iii]);
      if (number >= Math.pow(10, power)) {
        strNumber = (number / Math.pow(10, power)).toFixed(2) + exponents[power];
      }
    }
    return strNumber;
  }

  numberToRoman(num: number): string {
    let roman: { [roman: string] : number } = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1
    };
    let str = '';

    for (var i of Object.keys(roman)) {
      var q = Math.floor(num / roman[i]);
      num -= q * roman[i];
      str += i.repeat(q);
    }

    return str;
  }

  romanToNumber (romanNumeral: string): number|null {
    var DIGIT_VALUES: { [roman: string] : number } = {
      I: 1,
      V: 5,
      X: 10,
      L: 50,
      C: 100,
      D: 500,
      M: 1000
    };

    let result = 0;
    let input = romanNumeral.split('');

    for (var i = 0; i < input.length; i++) {
      var currentLetter = DIGIT_VALUES[input[i]];
      var nextLetter = DIGIT_VALUES[input[i + 1]];
      if (currentLetter === undefined) {
        return null;
      }
      else {
        if (currentLetter < nextLetter) {
          result += nextLetter - currentLetter;
          i++;
        } else {
          result += currentLetter;
        }
      }
    };

    return result;
  }
}

export let utils = new Utils();
