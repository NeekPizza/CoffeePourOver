$(document).ready(function(){
  $("#calculate_button").click(function(){
    var r=($("#ratio_text").val());
    var c=($("#coffee").val());
    var w=($("#water").val());
    $("#coffee").val(w/r);
    $("#water").val(r*c);
  });
 });
