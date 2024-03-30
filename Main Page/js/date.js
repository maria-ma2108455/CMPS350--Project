const date = new Date()
console.log(date);
console.log(date.getHours());

console.log(new Date('2024-03-30T03:41:59.449Z').getHours());

console.log(new Date('2024-03-29T03:41:59.449Z'));

console.log(JSON.stringify(date));

console.log(`${date.getHours}:${date.getMinutes}:${date.getSeconds}`);