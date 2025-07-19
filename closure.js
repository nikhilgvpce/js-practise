function sum() {
	const a = 10;
	function total() {
		const b = 5;
		function finalTotal() {
			const c = 3;
			return a + b + c;
		}
		return finalTotal;
	}
	return total;
}

const s = sum();
const t = s();
const f = t();
console.log(f);


function multiplyWithX(x) {
	function multiplyWithY(y) {
		return x * y;
	}
	return multiplyWithY;
}

const x = 5;
const first = multiplyWithX(x);
let result = first(2);
console.log(result);
result = first(3);
console.log(result);