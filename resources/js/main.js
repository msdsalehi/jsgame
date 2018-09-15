$(document).ready(function(){
    addEventHandlers();
    $("#formDialog").dialog({closable:false, resizable:false, closeOnEscape:false, show:'bounce', modal:true});
});

function addEventHandlers(){
    $("#startButton").click(function(event){
        $("#errorPanel").text("");
        var rows = parseInt($("#rowsField").val());
        var columns = parseInt($("#columnsField").val());
        var pSize = parseInt($("#pSizeField").val());
        var pCount = parseInt($("#pNumberField").val());
        
        if (validateForm(rows, columns, pSize, pCount)){
            var game = new jsgame(rows, columns, pSize, pCount);
            $("#formDialog").dialog("close");
            game.start();            
        } else {
            
        }
    });
}

function validateForm(rows, columns, pSize, pCount){
    if (parseInt(rows) * parseInt(columns) % 2 != 0){
        $("#errorPanel").text("The total number of boxes (rows * columns) cannot be be an odd number. Please change either 'Number of rows' or 'Number of columns' and press 'Start Game...' button again. ");
        return false;
    }
    return true;
}