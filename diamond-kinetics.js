var swingData = require('./latestSwing')

/* 1.searchContinuityAboveValue(data, indexBegin, indexEnd, threshold, winLength) -
from indexBegin to indexEnd, search data for values that are higher than threshold.
Return the first index where data has values that meet this criteria for at least winLength samples.
*/

function searchContinuityAboveVariable(data, indexBegin, indexEnd, threshold, winLength) {
  var firstIndex = null;
  var countOfGoodMatches = 0;

  for (var i = indexBegin; i <= indexEnd; i++) {
    var alreadyIncremeted = false;

    data[i].forEach(function(val, index, array) {
      if (val > threshold && index != 0) {
        if (!alreadyIncremeted) {
          countOfGoodMatches = countOfGoodMatches + 1;
          alreadyIncremeted = true;
        }

        if (!firstIndex) {
          firstIndex = i;
        }
      }
    })
  }

  if (countOfGoodMatches > winLength) {
    console.log('searchContinuityAboveVariable FirstIndex: ', firstIndex);
    return firstIndex;
  } else {
    console.log('searchContinuityAboveVariable FirstIndex: FALSE');
    return false;
  }
}
/*backSearchContinuityWithinRange(data, indexBegin, indexEnd, thresholdLo, thresholdHi, winLength) -
from indexBegin to indexEnd (where indexBegin is larger than indexEnd),
search data for values that are higher than thresholdLo and lower than thresholdHi.
Return the first index where data has values that meet this criteria for at least winLength samples.*/

function backSearchContinuityWithinRange(data, indexBegin, indexEnd, thresholdLo, thresholdHi, winLength) {
  var firstIndex = null;
  var countOfGoodMatches = 0;

  for (var i =indexBegin; i >= indexEnd; i--) {
    var alreadyIncremeted = false;

    data[i].forEach(function(val, index, array){
      if (val > thresholdLo && val < thresholdHi && index != 0) {
        if (!alreadyIncremeted) {
          countOfGoodMatches = countOfGoodMatches + 1;
          alreadyIncremeted = true;
        }

        if (!firstIndex) {
          firstIndex = i;
        }
      }
    })
  }

  if (countOfGoodMatches > winLength) {
    console.log('backSearchContinuityWithinRange FirstIndex: ', firstIndex);
    return firstIndex;
  } else {
    console.log('backSearchContinuityWithinRange FirstIndex: False');
    return false;
  }
}

/* searchContinuityAboveValueTwoSignals(data1, data2, indexBegin, indexEnd, threshold1, threshold2, winLength) -
from indexBegin to indexEnd, search data1 for values that are higher than threshold1 and also search data2 for
values that are higher than threshold2. Return the first index where both data1 and data2 have values that meet
these criteria for at least winLength samples. */


function searchContinuityAboveValueTwoSignals(data1, data2, indexBegin, indexEnd, threshold1, threshold2, winLength) {
  var firstIndex = null;
  var countOfGoodMatches = 0;

  for (var i = indexBegin; i <= indexEnd; i++) {
    var alreadyIncremeted1 = false;
    var alreadyIncremeted2 = false;

    data1[i].forEach(function(val, index, array) {
      if (val > threshold1 && index != 0) {
        if (!alreadyIncremeted1) {
          alreadyIncremeted1 = true;
        }
      }
    })

    data2[i].forEach(function(val, index, array) {
      if (val > threshold2 && index != 0) {
        if (!alreadyIncremeted2) {
          alreadyIncremeted2 = true;
        }
      }
    })

    if (alreadyIncremeted1 && alreadyIncremeted2) {
      countOfGoodMatches = countOfGoodMatches + 1;
      if (!firstIndex) {
        firstIndex = i;
      }
    }
    }

    if (countOfGoodMatches > winLength) {
      console.log('searchContinuityAboveValueTwoSignals FirstIndex: ', firstIndex);
      return firstIndex;
    } else {
      console.log('searchContinuityAboveValueTwoSignals FirstIndex: FALSE');
      return false;
    }
}



/* searchMultiContinuityWithinRange(data, indexBegin, indexEnd, thresholdLo, thresholdHi, winLength) -
from indexBegin to indexEnd, search data for values that are higher than thresholdLo and lower than thresholdHi.
Return the the starting index and ending index of all continuous samples that meet this criteria for at least
winLength data points. */

function searchMultiContinuityWithinRange(data, indexBegin, indexEnd, thresholdLo, thresholdHi, winLength) {
  var firstIndex = null;
  var lastIndex = null;
  var countOfGoodMatches = 0;

  for (var i = indexBegin; i <= indexEnd; i++) {
    var alreadyIncremeted = false;

    data[i].forEach(function(val, index, array) {
      if (val > thresholdLo && val <thresholdHi && index != 0) {
        if (!alreadyIncremeted) {
          countOfGoodMatches = countOfGoodMatches + 1;
          alreadyIncremeted = true;
          lastIndex = i;
        }
        if (!firstIndex) {
          firstIndex = i;
        }
      }
    })
  }
  if (countOfGoodMatches > winLength) {
    console.log('searchMultiContinuityWithinRange First Index, Last Index: ',firstIndex, lastIndex);
    return [firstIndex, lastIndex];
  } else {
    console.log('searchMultiContinuityWithinRange First Index, Last Index: False');
    return false;
  }
}


searchContinuityAboveVariable(swingData, 100, 500, 1, 3);
backSearchContinuityWithinRange(swingData, 100, 500, 1, 7, 4);
searchContinuityAboveValueTwoSignals(swingData, swingData, 100, 500, 1, 7, 4);
searchMultiContinuityWithinRange(swingData, 100, 500, 1, 7, 4);
