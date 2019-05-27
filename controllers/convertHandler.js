/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  this.getNum = function(input) {
    var result;
    
    const match = input.match(/[A-Za-z]/);
    if (match) result = input.slice(0, match.index);
    else result = input;
    
    if (!result) result = 1;
    else {
      // Check if number is invalid
      
      let fr1, fr2;
      // First check if input looks like fraction
      const slash = result.match('/');
      if (slash) {
        
        fr1 = result.slice(0, slash.index);
        fr2 = result.slice(slash.index+1);
        // Check if a fraction is empty string
        if (!fr1 || !fr2) return null;
        fr1 = Number(fr1);
        fr2 = Number(fr2);
        // Then check if fractions are numbers and if we're dividing by 0
        if (isNaN(fr1) || isNaN(fr2) || fr2 == 0) return null;
        else result = fr1 / fr2;
      } else {
        // input is not fraction. Attempt to convert string to number.
        result = Number(result);
        // Check if result is number
        if (isNaN(result)) return null;
      }
    }
    
    return result;
  };
  
  this.getUnit = function(input) {
    var result;
    
    const match = input.match(/[A-Za-z]/);
    if (match) result = input.slice(match.index);
    else return null;
    
    const validRegex = /^gal$|^l$|^mi$|^km$|^lbs$|^kg$|^GAL$|^L$|^MI$|^KM$|^LBS$|^KG$/i;
    
    if (!validRegex.test(result)) return null;
    
    return result;
  };
  
  const unitsXtoY = {
    kg: 'lbs',
    km: 'mi',
    l: 'gal',
    lbs: 'kg',
    mi: 'km',
    gal: 'l'
  };
  this.getReturnUnit = function(initUnit) {
    if (!initUnit) return null;
    
    var result = unitsXtoY[initUnit.toLowerCase()];
    
    return result;
  };

  const unitsSpelledOut = {
    kg: 'kilogram',
    km: 'kilometre',
    l: 'litre',
    lbs: 'pound',
    mi: 'mile',
    gal: 'gallon'
  };
  this.spellOutUnit = function(unit) {
    if (!unit) return null;
    
    var result = unitsSpelledOut[unit.toLowerCase()];
    
    return result;
  };
  
  const galToL = 3.78541;
  const lbsToKg = 0.453592;
  const miToKm = 1.60934;
  const unitConversionTable = {
    kg: 1/lbsToKg,
    km: 1/miToKm,
    l: 1/galToL,
    lbs: lbsToKg,
    mi: miToKm,
    gal: galToL
  };
  this.convert = function(initNum, initUnit) {
    if (!initUnit) return null;
    // Won't detect invalid input!
    return unitConversionTable[initUnit.toLowerCase()] * initNum;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    if (!initNum && !initUnit) return 'invalid number and unit';
    if (!initNum) return 'invalid number';
    if (!initUnit) return 'invalid unit';
    
    let spelledInitUnit = initNum == 1 ? this.spellOutUnit(initUnit) : this.spellOutUnit(initUnit) + "s";
    let spelledReturnUnit = returnNum == 1 ? this.spellOutUnit(returnUnit) : this.spellOutUnit(returnUnit) + "s";
    
    return `${initNum} ${spelledInitUnit} converts to ${parseFloat(returnNum.toFixed(5))} ${spelledReturnUnit}`;
  };
  
}

module.exports = ConvertHandler;
