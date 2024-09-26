let regex = /pic/

let arr = [{name:'balbasaur'},{name:'pickachu'}]

arr = arr.filter(e => regex.test(e.name))

console.log(arr)