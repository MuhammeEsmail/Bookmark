var siteName = document.getElementById('siteName')
var siteURL = document.getElementById('siteURL')
var addBtn = document.getElementById('addBtn')
var myList
if (localStorage.getItem('table')==null) {
    myList = []
}
else{
    myList = JSON.parse(localStorage.getItem('table'))
}
var tableRow = document.getElementById('tableRow')
display()
addBtn.onclick =function(){
    addSite()
    clearForm()
}
function addSite() {
    if (validation(siteName)&&validation(siteURL)) {
        var newSite ={
            sName:siteName.value,
            sURL:siteURL.value
        }
        myList.push(newSite)
        localStorage.setItem('table',JSON.stringify(myList))
        display()
    }
}
function clearForm() {
    siteName.value=null;
    siteURL.value=null;
}
function display() {
    var box=''
    for (var i = 0; i < myList.length; i++) {
        box+=`
        <tr>
                <th scope="row">${i+1}</th>
                <td>${myList[i].sName}</td>
                <!--<td>${myList[i].sURL}</td>-->
                <td><button type="button" class="btn btn-success" onclick="visitObj(${i})"><i class="fa-solid fa-eye"></i> Visit</button></td>
                <td><button type="button" class="btn btn-danger" onclick="deleteObj(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
              </tr>
        `
    }
    tableRow.innerHTML=box
}
function visitObj(index) {
    var url=myList[index].sURL;
    if (url) {
        window.open("https://www."+url,'_blank')
        console.log(url);
    }
    else{
        window.Error("URL Not found for key : ",index)
    }
    
}
function deleteObj(index) {
    myList.splice(index,1)
    localStorage.setItem('table',JSON.stringify(myList))
    display()
    
}
function validation(ele) {
    var Regex = {
        siteName : /^[A-Z](\w|-|\s){1,20}$/,
        siteURL : /(.com)$/
    }
    if(Regex[ele.id].test(ele.value)){
        ele.classList.add('is-valid')
        ele.classList.remove('is-invalid')
        ele.nextElementSibling.classList.replace('d-block','d-none')
        return true
    }
    else{
        ele.classList.add('is-invalid')
        ele.classList.remove('is-valid')
        ele.nextElementSibling.classList.replace('d-none','d-block')
        return false
    }
}