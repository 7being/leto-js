(function(){
leto.namespace('leto.util.DateFormat');
//===========================================================================
// DATE FORMAT
//===========================================================================
/*
 * @class	DateFormat
 */
var self = leto.util.DateFormat = function(pattern) {
    //=======================================================================
    // MEMBERS
    //=======================================================================
    this._pattern = pattern;
    this._tokens = this._tokenizePattern(pattern);
};


self.CONSTANTS = {
    //=======================================================================
    // CONSTANTS
    //=======================================================================

    /** Escape pattern character ('). */
    ESC: '\'',

    /** Era pattern character (G). CURRENTLY NOT SUPPORTED */
    ERA: 'G',

    /** Year-of-era pattern character (y). */
    YOE: 'y',

    /** Month-of-year pattern character (M). */
    MOY: 'M',

    /** Week-of-year pattern character (w). DO NOT USE */
    WOY: 'w',

    /** Week-of-month pattern character (W). DO NOT USE */
    WOM: 'W',

    /** Day-of-year pattern character (D). */
    DOY: 'D',

    /** Day-of-month pattern character (d). */
    DOM: 'd',

    /** Day-of-week-of-month pattern character (F). CURRENTLY NOT SUPPORTED */
    DWM: 'F',

    /** Day-of-week pattern character (E). */
    DOW: 'E',

    /** AM-PM pattern character (a). */
    AMP: 'a',

    /** Hour, 24-hour-clock, midnight=0 pattern character (H). */
    H23: 'H',

    /** Hour, 24-hour-clock, midnight=24 pattern character (k). */
    H24: 'k',

    /** Hour, 12-hour-clock, noon=0 pattern character (K). */
    H11: 'K',

    /** Hour, 12-hour-clock, noon=12 pattern character (h). */
    H12: 'h',

    /** Minute-of-hour pattern character (m). */
    MOH: 'm',

    /** Second-of-minute pattern character (s). */
    SOM: 's',

    /** Millisecond-of-second pattern character (S). */
    MSS: 'S',

    /** General timezone pattern character (z).  For example, "GMT-08:00" */
    TZG: 'z',

    /** Standard timezone pattern character (Z).  For example, "-0800" */
    TZS: 'Z',

    //Currently, only en_US supported; next version dynamically load symbols
    // based on locale.
    _ampms: [ 'AM', 'PM' ],
    _shortMonths: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
    _months: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
    _shortWeekdays: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
    _weekdays: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday' ]
};

self.prototype = {
    //=======================================================================
    // METHODS
    //=======================================================================

    //-----------------------------------------------------------------------
    // FORMAT
    //-----------------------------------------------------------------------
    format: function(dt) {
        var buffer = [];

        //Calculate the various date/time components.
        var boy = new Date(dt); boy.setMonth(0, 1); boy.setHours(0, 0, 0, 0);
        var bom = new Date(dt); bom.setDate(1); bom.setHours(0, 0, 0, 0);

                //(1000 * 60 * 60 * 24),
        var MS_DAY = 86400000,
                MS_WEEK = MS_DAY * 7;

        var yoe = dt.getFullYear(),
                moy = dt.getMonth(),
                doy = Math.floor((dt.getTime() - boy.getTime()) / MS_DAY) + 1,
                dom = dt.getDate(),
                dow = dt.getDay(),
                h23 = dt.getHours(),
                h24 = (h23 == 0 ? 24 : h23),
                h11 = (h23 % 12),
                h12 = (h11 == 0 ? 12 : h11),
                amp = (h24 == h12 ? 0 : 1),
                moh = dt.getMinutes(),
                som = dt.getSeconds(),
                mss = dt.getMilliseconds(),
                tzo = dt.getTimezoneOffset(),
                tzm = Math.abs(tzo % 60),
                tzh = Math.abs(tzo / 60) | 0;

        //The week calculations still need work; in particular, it is
        // locale-specific how counting is performed.
        var woy = Math.floor((dt.getTime() - boy.getTime()) / MS_WEEK) + 1,
                wom = Math.floor((dt.getTime() - bom.getTime()) / MS_WEEK) + 1;

        var CONST = self.CONSTANTS;
        //Build the result string using the parsed pattern as a template.
        for (var i = 0; i < this._tokens.length; i++) {
                var token = this._tokens[i];
                var c = token.charAt(0);
                switch (c) {
                        case CONST.ESC:
                                //Escape token.
                                if (token.length > 2) {
                                        var evenQuote = true;
                                        for (var x = 1; x < token.length - 1; x++) {
                                                var d = token.charAt(x);
                                                evenQuote = (CONST.ESC == d ? !evenQuote : evenQuote);
                                                
                                                //Skip every other quote.
                                                if ((CONST.ESC == d) && (!evenQuote)) {
                                                        continue;
                                                }

                                                buffer.push(d);
                                        }
                                }
                                break;

                        case CONST.ERA:
                                //NOT SUPPORTED.
                                break;

                        case CONST.YOE:
                                if (2 == token.length) {
                                        var year = this._formatNumber(yoe, 2);
                                        buffer.push(year.substring(year.length - 2));
                                } else {
                                        buffer.push(this._formatNumber(yoe, token.length));
                                }
                                break;

                        case CONST.MOY:
                                if (4 <= token.length) {
                                        buffer.push(CONST._months[moy]);
                                } else if (3 == token.length) {
                                        buffer.push(CONST._shortMonths[moy]);
                                } else {
                                        buffer.push(this._formatNumber(moy + 1, token.length));
                                }
                                break;

                        case CONST.WOY:
                                buffer.push(this._formatNumber(woy, token.length));
                                break;

                        case CONST.WOM:
                                buffer.push(this._formatNumber(wom, token.length));
                                break;

                        case CONST.DOY:
                                buffer.push(this._formatNumber(doy, token.length));
                                break;

                        case CONST.DOM:
                                buffer.push(this._formatNumber(dom, token.length));
                                break;

                        case CONST.DWM:
                                //NOT SUPPORTED.
                                break;

                        case CONST.DOW:
                                if (4 > token.length) {
                                        buffer.push(CONST._shortWeekdays[dow]);
                                } else {
                                        buffer.push(CONST._weekdays[dow]);
                                }
                                break;
                        
                        case CONST.AMP:
                                buffer.push(CONST._ampms[amp]);
                                break;

                        case CONST.H23:
                                buffer.push(this._formatNumber(h23, token.length));
                                break;

                        case CONST.H24:
                                buffer.push(this._formatNumber(h24, token.length));
                                break;

                        case CONST.H11:
                                buffer.push(this._formatNumber(h11, token.length));
                                break;

                        case CONST.H12:
                                buffer.push(this._formatNumber(h12, token.length));
                                break;

                        case CONST.MOH:
                                buffer.push(this._formatNumber(moh, token.length));
                                break;

                        case CONST.SOM:
                                buffer.push(this._formatNumber(som, token.length));
                                break;

                        case CONST.MSS:
                                if (2 == token.length) {
                                        mss /= 10;
                                        mss |= 0; //Ensure integer result.
                                } else if (1 == token.length) {
                                        mss /= 100;
                                        mss |= 0; //Ensure integer result.
                                }
                                buffer.push(this._formatNumber(mss, token.length));
                                break;

                        case CONST.TZG:
                        case CONST.TZS:
                                if (CONST.TZG == c) {
                                        buffer.push('GMT');
                                }
                                buffer.push((tzo < 0 ? '-' : '+'));
                                buffer.push(this._formatNumber(tzh, 2));
                                if (CONST.TZG == c) {
                                        buffer.push(':');
                                }
                                buffer.push(this._formatNumber(tzm, 2));
                                break;

                        default:
                                //Literal token.
                                buffer.push(token);
                                break;
                }
        }

        return buffer.join('');
    },


    //=======================================================================
    // PRIVATE IMPLEMENTATION
    //=======================================================================

    //-----------------------------------------------------------------------
    // FORMAT NUMBER
    //-----------------------------------------------------------------------
    /**
     * Zero-pads the given number if it has fewer than the minimum number of
     * digits.
     *
     * @param	{integer} num - The number to format.
     * @param	{integer} minDigits - The minimum number of digits.
     * @return	{string} The string representation of the given number, 
     *			zero-padded	to the minimum number of digits.
     */
    _formatNumber: function(num, minDigits) {
            var result = '' + num;
            while (result.length < minDigits) {
                    result = '0' + result;
            }

            return result;
    },

    //-----------------------------------------------------------------------
    // TOKENIZE PATTERN
    //-----------------------------------------------------------------------
    /**
     * Breaks the given format pattern down into individual tokens.
     *
     * Each token may be one of the following:
     *	1) A date/time token, consisting of one or more repeats of a single
     *		pattern character.
     *	2) An escaped literal sequence, which begins and ends with a single
     *		quote, and which may contain embedded, double single-quote
     *		escape sequences.
     *	3) An unescaped literal character (or sequence).
     *
     * Note that each type of token can be easily distinguished by its 
     * initial character.
     *
     * @param	{string} pattern - The pattern to tokenize.
     * @return	{array} An array of pattern tokens, as described above, in
     *			the order in which they were encountered.
     */
    _tokenizePattern: function(pattern) {
            var tokens = [];

            var CONST = self.CONSTANTS;
            var currentToken = '';
            var evenQuotes = true;
            for (var i = 0; i < pattern.length; i++) {
                    var c = pattern.charAt(i);
                    evenQuotes = (CONST.ESC == c ? !evenQuotes : evenQuotes);

                    if (currentToken.length == 0) {
                            //New token.
                            currentToken = c;
                    } else {
                            if (CONST.ESC == currentToken.charAt(0)) {
                                    if ((CONST.ESC != c) && (evenQuotes)) {
                                            //End of escape sequence; capture and start new token.
                                            tokens.push(currentToken);
                                            currentToken = c;
                                    } else {
                                            //Continued escape sequence; add to token.
                                            currentToken += c;
                                    }
                            } else if (c == currentToken.charAt(0)) {
                                    //Repeated character; add to token.
                                    currentToken += c;
                            } else {
                                    //End of previous token; capture and start new token.
                                    tokens.push(currentToken);
                                    currentToken = c;
                            }
                    }
            }

            //Last token.
            if (currentToken.length > 0) {
                    tokens.push(currentToken);
            }

            return tokens;
    }
};

})();

//	EOF
