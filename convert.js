function ConvertHandler() {
  
  this.getNum = (input) => {
    
    let initNum = "";
    //set to 1 if none
    if (! /^\d/.test(input)) {
      
      initNum = 1;
      return initNum;
    //check valid math exp  
    } else if (/^\d+(\.\d+)?(\/\d+(\.\d+)?)?(\w+|\W)$/.test(input)) {
      //get only num, /, and .
      initNum = input.match(/^[\d.\/]+/)[0];
      //check if fraction
      if (initNum.includes("/")) {
        //calculate fraction
        const parts = initNum.split("/");
        
        initNum = parseFloat(parts[0]) / parseFloat(parts[1]);
      } else {
        initNum = parseFloat(initNum);
      }
      return initNum;
    } else {
      throw new Error("invalid number");
    }
  };
  
  this.getUnit = (input) => {
    //cut out unit from input
    let initUnit = input
      .slice(input.search(/[a-z]/i))
      .toLowerCase();
    //check for valid unit
    switch (initUnit) {

      case 'gal':
      case 'lbs':
      case 'kg':
      case 'mi':
      case 'km':
        return initUnit;
      case 'l': //uppercase liters
        initUnit = initUnit.toUpperCase();
        return initUnit;
      default:
        throw new Error("invalid unit");
    }
  };
  
  this.getReturnUnit = (initUnit) => {
    
    let returnUnit;
    //set corresp unit pair
    switch (initUnit) {
      
      case 'gal':
        returnUnit = 'L';
        break;
      case 'L':
        returnUnit = 'gal';
        break;
      case 'lbs':
        returnUnit = 'kg';
        break;
      case 'kg':
        returnUnit = 'lbs';
        break;
      case 'mi':
        returnUnit = 'km';
        break;
      case 'km':
        returnUnit = 'mi';
    };
    return returnUnit;
  };

  this.spellOutUnit = (unit) => {
    
    let unitStr;
    //set full unit name
    switch (unit) {

      case 'gal':
        unitStr = "gallons";
        break;
      case 'L':
        unitStr = "liters";
        break;
      case 'lbs':
        unitStr = "pounds";
        break;
      case 'kg':
        unitStr = "kilograms";
        break;
      case 'mi':
        unitStr = "miles";
        break;
      case 'km':
        unitStr = "kilometers";
    };
    return unitStr;
  };
  
  this.convert = (initNum, initUnit) => {
    //converting table 
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let returnNum;
    
    switch (initUnit) {

      case 'gal':
        returnNum = initNum * galToL;
        break;
      case 'L':
        returnNum = initNum / galToL;
        break;
      case 'lbs':
        returnNum = initNum * lbsToKg;
        break;
      case 'kg':
        returnNum = initNum / lbsToKg;
        break;
      case 'mi':
        returnNum = initNum * miToKm;
        break;
      case 'km':
        returnNum = initNum / miToKm;
        break;
    }; //rounding to 5 decimals
    returnNum = parseFloat(returnNum.toFixed(5));
    return returnNum;
  };
  
  this.getString = (initNum, initUnitStr, returnNum, returnUnitStr) => {
    //construct the full response
    let string = `${initNum} ${initUnitStr} converts to ${returnNum} ${returnUnitStr}`;
    
    return string;
  };
}

module.exports = ConvertHandler;
