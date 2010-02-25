(function(){

Leto.namespace('Leto.util');

Leto.util.Format = {

    usPhone: function(str) {
        str = (str + '').replace(/[^\d]/g, '');

        var sb = [];
        sb.unshift(str.slice(6, 10));
        if (str.length > 6) sb.unshift('-');
        sb.unshift(str.slice(3, 6));
        if (str.length > 3) sb.unshift(')');
        sb.unshift(str.slice(0, 3));
        if (str.length > 0) sb.unshift('(');

		return sb.join('');
	}
};

})();
