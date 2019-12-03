button = document.getElementById('but');
button2 = document.getElementById('btn2');


button.onclick = function(){
	var date = document.getElementById('date').value,
	dep = document.getElementById('dep').value,
	fee = document.getElementById('fee'),
	price = document.getElementById('price').value;
	diff = 0,
	days = 1000*60*60*24;
var start = new Date(date),
	end = new Date(dep);
	location.reload();
	diff = end - start;
	var test = Math.floor(diff/days) * price;
	fee.value = test+" "+"INR";
}

