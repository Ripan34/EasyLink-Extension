let data = {}; //for data storage
chrome.storage.sync.get(["obj"], function(result){  //get the stored data
  if(result.obj != undefined){
  data = result.obj;

  for(let ele in data)
  {
     addLinks(ele, data[ele]);
  }
}
});

document.querySelector("#AddLink").addEventListener("click", function() { //button listener
  let name = $("#className").val();
  let link = $("#classLink").val();
  let flg=true;
  if(name != "" && link != ""){
    if(data.hasOwnProperty(name)){
    if(confirm(`Do you want to replace link for "${name}"?`))
    {
       $(`#${name}`).remove();
    }
    else{
      flg=false;
      $("#className").val("");
      $("#classLink").val("");
    }
    }
if(flg) {
  if(!isUrl(link))
  {
    link = `http://google.com/search?q=` + link;
  }
  data[$("#className").val()] =  $("#classLink").val();
  chrome.storage.sync.set({"obj": data}, function(){ addLinks(name, link); });
}
}
else{
  alert("Invalid/empty fields!");
}
});
//function to add name and link
function addLinks(name, link){
 $("ul").append("<div style='margin-top: -6px;' id='" + name + "' class='d-flex p-2'>  <a class='btn btn-dark btn-block btn-sm' href='" + link + "' target='_blank' >" + name + " </a> <span><i class='fas fa-trash-alt'></i> </span ></div>");
 $("#className").val("");
 $("#classLink").val("");
}
// to delete
$("ul").on("click", "span", function(event){
    let idOfDiv = $(this).parent().attr('id');
    delete data[idOfDiv];
chrome.storage.sync.set({"obj": data});
  $(this).parent().fadeOut(500, function(){
    $(this).remove();
  });
  event.stopPropagation();
});
//URL validation
function isUrl(s) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(s);
}
