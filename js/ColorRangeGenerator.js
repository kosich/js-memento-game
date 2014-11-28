/**
 * Generates a range of colors with defined length and from-to values
 * */
//TODO: Add alpha channel
//TODO: use color class to return 
//TODO: accept different types
"use strict";
var colorRangeGenerator = colorRangeGenerator || {};
colorRangeGenerator.settings = {};
//TODO: add extendable options
colorRangeGenerator.generate = function(startColor, targetColor, count) {
	var result = [], _helper = {}, log;

	if (colorRangeGenerator.settings.makelog && console && console.log) {
		log = console.log;
		log = log.bind(console);
	} else {
		log = function() {
		};
	}

	if (!startColor || !targetColor || isNaN(count)) {
		var _wrongparamserrortext = 'ColorRangeGenerator: wrong parameters passed';
		log(_wrongparamserrortext, arguments);
		throw _wrongparamserrortext;
	};

	log('Called with: ', arguments);

	startColor = FormatNumberLength(startColor, 6);
	targetColor = FormatNumberLength(targetColor, 6);

	//_helper.multy = startColor < targetColor ? 1 : startColor == targetColor ? 0 : -1;

	_helper.color_sr = extractColorChannel(startColor, 0);
	_helper.color_sg = extractColorChannel(startColor, 1);
	_helper.color_sb = extractColorChannel(startColor, 2);

	_helper.color_tr = extractColorChannel(targetColor, 0);
	_helper.color_tg = extractColorChannel(targetColor, 1);
	_helper.color_tb = extractColorChannel(targetColor, 2);

	_helper.colordelta = {}, _helper.ccolor = {};

	_helper.colordelta.r = (_helper.color_tr - _helper.color_sr) / (count-1);
	_helper.colordelta.g = (_helper.color_tg - _helper.color_sg) / (count-1);
	_helper.colordelta.b = (_helper.color_tb - _helper.color_sb) / (count-1);

	log(_helper.colordelta);

	_helper.ccolor.r = _helper.color_sr;
	_helper.ccolor.g = _helper.color_sg;
	_helper.ccolor.b = _helper.color_sb;

	for (var i = 0; i < count; i++) {
		_helper.color = '#' + normalyzeChannel(_helper.ccolor.r) + normalyzeChannel(_helper.ccolor.g) + normalyzeChannel(_helper.ccolor.b);
		result.push(_helper.color);
		//define next color
		_helper.ccolor.r += _helper.colordelta.r;
		_helper.ccolor.g += _helper.colordelta.g;
		_helper.ccolor.b += _helper.colordelta.b;
	};
	log(result);
	return result;

	function normalyzeChannel(x) {
		return '' + FormatNumberLength(Math.max(0, Math.min(255, Math.round(x))).toString(16), 2);
	}

	function FormatNumberLength(num, length) {
		var r = "" + num;
		while (r.length < length) {
			r = "0" + r;
		}
		return r;
	};
	function extractColorChannel(color, filter) {
		color = '' + color;
		return parseInt('0x' + color[filter * 2] + color[filter * 2 + 1]);
	};
};
