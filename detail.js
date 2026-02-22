let url = window.location.href
let index = url.indexOf("?");
let para = url.substring(index+4, url.length)

const anime = await fetch("")

console.log(para)