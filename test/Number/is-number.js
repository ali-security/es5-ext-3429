'use strict';

module.exports = function (t, a) {
	a(t(0), true, "Zero");
	a(t(NaN), false, "NaN");
	a(t(Infinity), false, "Infinity");
	a(t(12), true, "Number");
	a(t(false), false, "Boolean");
	a(t(new Date), false, "Date");
	a(t(new Number(2)), false, "String object");
	a(t('asdfaf'), false, "String");
	a(t(''), false, "Empty String");
};