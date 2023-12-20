const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('./convert.js');
const convertHandler = new ConvertHandler();

suite('Unit Tests', () => {

  suite("Number Assertions", () => {
    
    test("1) whole number", () => {

      assert.typeOf(convertHandler.getNum("1a"), "number");
    });
    
    test("2) decimal number", () => {

      assert.typeOf(convertHandler.getNum("1.1a"), "number");
    });
    
    test("3) fractional number", () => {

      assert.typeOf(convertHandler.getNum("1/1a"), "number");
    });
    
    test("4) fractional and decimal number", () => {

      assert.typeOf(convertHandler.getNum("1.1/1a"), "number");
    });
    
    test("5) error by double fractional number", () => {
      
      assert.throw(() => convertHandler.getNum("1/1/1a"), Error);
    });
    
    test("6) set to 1 if no number", () => {

      assert.equal(convertHandler.getNum("a"), 1);
    });
  });

  suite("Unit Assertions", () => {

    test("7) valid unit", () => {

      assert.equal(convertHandler.getUnit("LbS"), "lbs");
    });

    test("8) invalid unit", () => {

      assert.throw(() => convertHandler.getUnit("KKG"), Error);
    });

    test("9) correct return unit", () => {

      assert.equal(convertHandler.getReturnUnit("gal"), "L");
    });

    test("10) correct full unit name", () => {

      assert.equal(convertHandler.spellOutUnit("L"), "liters");
    });
  });

  suite("Convert Assertions", () => {

    test("11) gal to L", () => {

      assert.equal(convertHandler.convert(1, "gal"), 3.78541);
    });

    test("12) L to gal", () => {

      assert.equal(convertHandler.convert(1, "L"), 0.26417);
    });

    test("13) mi to km", () => {

      assert.equal(convertHandler.convert(1, "mi"), 1.60934);
    });

    test("14) km to mi", () => {

      assert.equal(convertHandler.convert(1, "km"), 0.62137);
    });

    test("15) lbs to kg", () => {

      assert.equal(convertHandler.convert(1, "lbs"), 0.45359);
    });

    test("16) kg to lbs", () => {

      assert.equal(convertHandler.convert(1, "kg"), 2.20462);
    });
  });
});
