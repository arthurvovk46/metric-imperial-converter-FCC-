'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('./convert.js');

module.exports = (app) => {

  const convertHandler = new ConvertHandler();

  app.route("/api/convert")
    .get((req, res) => {
      //getting parameters
      const { input } = req.query;
      const { getNum,
           getUnit,
           convert,
           getReturnUnit,
           getString,
           spellOutUnit } = convertHandler;
      let numError, unitError;
      //catch invalid num
      try {

        getNum(input);
      } catch (error) {

        numError = error;
      }
      //catch invalid unit
      try {

        getUnit(input);
      } catch (error) {

        unitError = error;
      }
      //cath both errors
      if (numError && unitError) {
        //respond for both invalid
        res.send("invalid number and unit");
      } else if (numError) {
        //respond for invalid number
        res.send("invalid number");
      } else if (unitError) {
        //respond for invalid unit
        res.send("invalid unit");
      } else {
        //constructing response obj
        const initNum = getNum(input);
        const initUnit = getUnit(input);
        const returnNum = convert(initNum, initUnit);
        const returnUnit = getReturnUnit(initUnit);
        const responseObject = {
          initNum: initNum,
          initUnit: initUnit,
          returnNum: returnNum,
          returnUnit: returnUnit,
          string: getString(
            initNum,
            spellOutUnit(initUnit),
            returnNum,
            spellOutUnit(returnUnit)
        )};
        //respond for valid obj
        res.json(responseObject);
      }
    })
};
