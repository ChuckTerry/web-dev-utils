/**
 * Class for visualizing the binary, octal, decimal, and hexadecimal representations of a number.
 */
class RadixVisualizer {
  #doLogging; #dynamicCellLength; #returnTableArray; #showPrefix; #uppercase;

  static basePrefixStrings = ['0b', '0o', '', '0x'];
  static defaultOptions = {
    doLogging: true,
    dynamicCellLength: true,
    returnTableArray: false,
    showPrefix: false,
    uppercase: true
  };
  static headerBorderLookup = (new Array(50).fill('')).map((_, index) => '_'.repeat(index));
  static headerLookup = [new Map(), new Map(), new Map(), new Map()];
  static numberMemo = new Map();

  /** 
   * Resets the configuration of all RadixVisualizer instances.
   * @param {RadixVisualizer[]} instanceArray - An array of RadixVisualizer instances to reset.
   * @returns {RadixVisualizer[]} The array of RadixVisualizer instances that were reset.
   */
  static resetConfig(instanceArray = []) {
    RadixVisualizer.basePrefixStrings = ['0b', '0o', '', '0x'];
    RadixVisualizer.defaultOptions = {
      doLogging: true,
      dynamicCellLength: true,
      returnTableArray: false,
      showPrefix: false,
      uppercase: true
    };
    RadixVisualizer.headerBorderLookup = (new Array(50).fill('')).map((_, index) => '_'.repeat(index));
    RadixVisualizer.headerLookup = new Array(4).fill(new Map());
    RadixVisualizer.numberMemo = new Map();
    const instanceCount = instanceArray.length;
    for (let index = 0; index < instanceCount; index++) {
      const instance = instanceArray[index];
      instance.doLogging();
      instance.dynamicCellLength();
      instance.hidePrefix();
      instance.uppercase();
    }
    return instanceArray;
  }

  /**
   * Creates a new RadixVisualizer instance.
   * @param {RadixVisualizer.defaultOptions} options - Object containing configuration options for this instance.
   */
  constructor(options = RadixVisualizer.defaultOptions) {
    this.#doLogging = options.doLogging || true;
    this.#dynamicCellLength = options.dynamicCellLength || true;
    this.#returnTableArray = options.returnTableArray || false;
    this.#showPrefix = options.showPrefix || false;
    this.#uppercase = options.uppercase || true;
  }

  /**
   * Adds the base prefix to the binary, octal, decimal, and hexadecimal representations of a number.
   * @param {string[]} numberArray - An array of strings containing the binary, octal, decimal, and hexadecimal representations of a number.
   * @returns {string[]} the array of strings with the base prefix added.
   */
  #addBasePrefix(numberArray) {
    if (this.#showPrefix === true) {
      return numberArray.map((string, index) => RadixVisualizer.basePrefixStrings[index] + string);
    } else {
      return numberArray;
    }
  }

  /**
   * Determines the length of each column in the table.
   * @param {number[]} dynamicCellLength - An array of numbers containing the highest character count in each column.
   * @returns {number[]} An array of numbers containing the length of each column in the table.
   */
  #determineCellLength(dynamicCellLength) {
    if (this.#dynamicCellLength === true) {
      return dynamicCellLength.map((length) => length + 2);
    } else {
      const staticLength = Math.max(...dynamicCellLength);
      return new Array(4).fill(staticLength + 2);
    }
  }

  /**
   * Generates the array of radix strings and the array of column lengths.
   * @param {number[]} numberArray - An array of numbers to visualize.
   * @returns {[string[], number[]]} An array containing the array of radix strings and the array of column lengths.
   */
  #generateBaseArray(numberArray) {
    const cellLength = [6, 5, 7, 3];
    const baseArray = [];
    const numberCount = numberArray.length;
    for (let index = 0; index < numberCount; index++) {
      const number = numberArray[index];
      if (RadixVisualizer.numberMemo.has(number) === false) {
        const binary = number.toString(2);
        const octal = number.toString(8);
        const decimal = number.toString();
        const hex = number.toString(16);
        RadixVisualizer.numberMemo.set(number, [binary, octal, decimal, hex]);
      }
      const array = this.#addBasePrefix(RadixVisualizer.numberMemo.get(number));
      for (let baseIndex = 0; baseIndex < 4; baseIndex++) {
        const stringLength = array[baseIndex].length;
        if (stringLength > cellLength[baseIndex]) {
          cellLength[baseIndex] = stringLength;
        }
        if (this.#uppercase === true) {
          array[baseIndex] = array[baseIndex].toUpperCase();
        }
      }
      baseArray.push(array);
    }
    console.log(baseArray, cellLength)
    return [baseArray, cellLength];
  }

  /**\
   * Generates the header strings and the header border string.
   * @param {number[]} cellLength - An array of numbers containing the length of each column in the table.
   * @returns {string[]} An array containing the header strings and the header border string.
   */
  #generateLogHeaders(cellLength) {
    console.log(cellLength)
    const headerBorderArray = [];
    const headerStrings = ['Binary', 'Octal', 'Decimal', 'Hex'];
    for (let index = 0; index < 4; index++) {
      console.log(index);
      const baseCellLength = cellLength[index];
      console.log(baseCellLength);
      if (headerBorderArray.length > 49) {
        headerBorderArray.push('-'.repeat(baseCellLength));
      } else {
        headerBorderArray.push(RadixVisualizer.headerBorderLookup[baseCellLength]);
      }
      const headerLookup = RadixVisualizer.headerLookup[index];
      console.dir(headerLookup);
      if (headerLookup.has(baseCellLength) === false) {
        const string = headerStrings[index];
        console.log(string);
        const whitespace = baseCellLength - string.length;
        const prefixLength = Math.ceil(whitespace / 2);
        const suffixLength = Math.floor(whitespace / 2);
        const fullString = [' '.repeat(prefixLength), ' '.repeat(suffixLength)].join(string);

        console.log(fullString);
        headerLookup.set(baseCellLength, fullString);
        console.log(headerLookup)
      }
      console.log(headerLookup)
      headerStrings[index] = headerLookup.get(baseCellLength);
    }
    return [headerStrings.join('|'), headerBorderArray.join('|')];
  }

  /**
   * Enables logging for this instance.
   * @param {boolean} boolean - Whether or not to enable logging for this instance.
   */
  doLogging(boolean = true) {
    this.#doLogging = boolean;
  }

  /**
   * Enables dynamic cell length for this instance.
   * @param {boolean} boolean - Whether or not to enable dynamic cell length for this instance.
   */
  dynamicCellLength(boolean = true) {
    this.#dynamicCellLength = boolean;
  }

  /**
   * Disables the base prefix for this instance.
   */
  hidePrefix() {
    this.#showPrefix = false;
  }
  
  /**
   * Converts the radix strings to lowercase.
   */
  lowercase() {
    this.#uppercase = false;
  }

  /**
   * Disables logging for this instance.
   */
  noLogging() {
    this.#doLogging = false;
  }

  /**
   * Disables returning the table array for this instance.
   * @param {boolean} boolean - Whether or not to disable returning the table array for this instance.
   */
  returnRadixArray() {
    this.#returnTableArray = false;
  }

  /** 
   * Enables returning the table array for this instance.
   * @param {boolean} boolean - Whether or not to enable returning the table array for this instance.
   */
  returnTableArray(boolean = true) {
    this.#returnTableArray = boolean;
  }

  /**
   * Enables the base prefix for this instance.
   * @param {boolean} boolean - Whether or not to enable the base prefix for this instance.
   */
  showPrefix(boolean = true) {
    this.#showPrefix = boolean;
  }

  /**
   * Disables dynamic cell length for this instance.
   */
  staticCellLength() {
    this.#dynamicCellLength = false;
  }

  /**
   * Converts the radix strings to uppercase.
   * @param {boolean} boolean - Whether or not to convert the radix strings to uppercase.
   */
  uppercase(boolean = true) {
    this.#uppercase = boolean;
  }

  /**
   * Visualizes the binary, octal, decimal, and hexadecimal representations of a number.
   * @param {number | number[]} numberArray - A number or array of numbers to visualize.
   * @returns {string[] | string[][]} An array of strings containing the binary, octal, decimal, and hexadecimal representations of a number.
   */
  visualize(numberArray = [0]) {
    const arrayInput = Array.isArray(numberArray);
    if (arrayInput === false) {
      numberArray = [numberArray];
    }
    const numberCount = numberArray.length;
    const [baseArray, dynamicCellLength] = this.#generateBaseArray(numberArray);

    if (this.#doLogging === true || this.#returnTableArray === true) {
      const cellLength = this.#determineCellLength(dynamicCellLength);
      const tableArray = this.#generateLogHeaders(cellLength);
      for (let index = 0; index < numberCount; index++) {
        const lineStrings = [];
        const base = baseArray[index];
        for (let baseIndex = 0; baseIndex < 4; baseIndex++) {
          const whitespace = cellLength[baseIndex] - 1;
          const string = base[baseIndex];
          const suffix = ' '.repeat(whitespace - string.length);
          lineStrings.push(suffix + string + ' ');
        }
        tableArray.push(lineStrings.join('|'));
      }
      if (this.#doLogging === true) {
        console.info(tableArray.join('\n'));
      }
      if (this.#returnTableArray === true) {
        return tableArray;
      }
    }
    return arrayInput ? baseArray : baseArray[0];
  }
}
