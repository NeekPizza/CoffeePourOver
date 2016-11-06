$(document).ready(function(){
  $("#calculate_button").click(function(){
    var r=($("#ratio_text").val());
    var c=($("#coffee").val());
    var w=($("#water").val());
    if (r<=0) {
      alert("Ratio Field Can Not Be Empty");
    }
    if (c<1) {
      $("#coffee").val(w/r);
    }else if (w<1) {
      $("#water").val(r*c);
    }  
  });
 });
