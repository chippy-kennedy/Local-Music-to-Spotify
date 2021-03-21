
const isEmpty = (obj) => {
	if(Array.isArray(obj)){
		return obj === undefined || obj.length == 0
	} else {
		return Object.keys(obj).length === 0 && obj.constructor === Object
	}
}

module.exports = { isEmpty }
