'use strict';

var max     = Math.max
  , forEach = require('../../Object/for-each')
  , pad     = require('../../String/prototype/pad')
  , memoize = require('./memoize')
  , partial = require('./partial')

  , stats = exports.statistics = {};

memoize._profile = function () {
	var id, stack = (new Error()).stack;
	id = stack.split('\n')[3].replace(/\n/g, "\\n").trim();
	return (stats[id] = { initial: 0, cached: 0 });
};

exports.log = function () {
	var initial, cached, ordered, ipad, cpad, ppad, toPrc;

	initial = cached = 0;
	ordered = [];
	toPrc = function (initial, cached) {
		if (!initial && !cached) {
			return '0.00%';
		}
		return ((cached / (initial + cached)) * 100).toFixed(2) + '%';
	};

	console.log("------------------------------------------------------------");
	console.log("Memoize statistics:");

	forEach(stats, function (data, name) {
		initial += data.initial;
		cached += data.cached;
		ordered.push([name, data]);
	}, null, function (a, b) {
		return (this[b].initial + this[b].cached) -
			(this[a].initial + this[a].cached);
	});

	console.log("");
	ipad = partial.call(pad, " ",
		max(String(initial).length, "Initial".length));
	cpad = partial.call(pad, " ", max(String(cached).length, "From cache".length));
	ppad = partial.call(pad, " ", 6);
	console.log(ipad.call("Initial"), " ", cpad.call("From cache"),
		" ", ppad.call("Gain"));
	console.log(ipad.call(initial), " ", cpad.call(cached),
		" ", ppad.call(toPrc(initial, cached)), " Total");
	ordered.forEach(function (data) {
		var name = data[0];
		data = data[1];
		console.log(ipad.call(data.initial), " ", cpad.call(data.cached),
			" ", ppad.call(toPrc(data.initial, data.cached)), " " + name);
	});
	console.log("------------------------------------------------------------");
};