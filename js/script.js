let xmlRoot = '<students></students>';
let parser = new DOMParser();
let serializer = new XMLSerializer();
let xmlDoc = parser.parseFromString(xmlRoot, "text/xml");



for(let i=1;i<=10;i++){
let tempName = document.getElementById('name'+i).innerHTML;
console.log(tempName)
  let tempAddr = document.getElementById('addr'+i).innerHTML;
  console.log(tempAddr)
  
    let students = xmlDoc.getElementsByTagName("students")[0];
    let newStdRoot = xmlDoc.createElement("std");
    let newStdName = xmlDoc.createElement("name");
    newStdName.innerHTML = tempName;
    let newStdAddr = xmlDoc.createElement("address");
    newStdAddr.innerHTML = tempAddr;
    newStdRoot.appendChild(newStdName);
    newStdRoot.appendChild(newStdAddr);
    students.appendChild(newStdRoot);
  
}

let formatAddr = (addr) => {
  let lines = addr.split(/\r?\n/);
  let final = '';
  for (let i = 0; i < lines.length-1; i++){
    if (lines[i] !== "") {
      final = final + lines[i] + '<br>';
    }
  }
  if (lines[lines.length-1] !== "") {
    final = final + lines[lines.length-1];
  }else {
    final = final.substring(0, final.length-4);
  }
  return final;
}

let render = () => {
  let students = xmlDoc.getElementsByTagName("std");
  let tableLines = '';
  for (let i = 0; i < students.length; i++){
    let tempName = students[i].getElementsByTagName('name')[0].innerHTML;
    let tempAddr = students[i].getElementsByTagName('address')[0].innerHTML;
    tempAddr = formatAddr(tempAddr);
    tableLines = tableLines + '<tr><th>' + (i+1) + '</th><td><strong>' + tempName +'</strong></td><td>' + tempAddr + '</td></tr>';
  }
  document.getElementById('tblBody').innerHTML = tableLines;
} 



document.getElementById('btnToUpper').addEventListener('click', () => {
  let http = new XMLHttpRequest();
  let url = 'http://localhost:3000/upper';
  http.open('POST', url, true);

  //Send the proper header information along with the request
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  http.onreadystatechange = function() {//Call a function when the state changes.
      if(http.readyState == 4 && http.status == 200) {
          xmlDoc = parser.parseFromString(http.responseText, "text/xml");
          render();
      }
  }
  let dataToSend = serializer.serializeToString(xmlDoc);
  http.send(dataToSend);
})

document.getElementById('btnToLower').addEventListener('click', () => {
  let http = new XMLHttpRequest();
  let url = 'http://localhost:3000/lower';
  http.open('POST', url, true);

  //Send the proper header information along with the request
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  http.onreadystatechange = function() {//Call a function when the state changes.
      if(http.readyState == 4 && http.status == 200) {
          xmlDoc = parser.parseFromString(http.responseText, "text/xml");
          render();
      }
  }
  let dataToSend = serializer.serializeToString(xmlDoc);
  http.send(dataToSend);
})
