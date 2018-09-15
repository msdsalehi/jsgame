function jsgame(rows, columns, pSize, pCount){
    this.width = rows;
    this.height = columns;
    this.pSize = pSize;
    this.pCount = pCount;
    
    var imagesArr, emptyBoxesArr, selectedImageNamesArr, firstSelection;
    
    this.start = function start(){          
        loadImagesIntoArrays();
        placeImagesOnPage();
        addEventHandlers();
    }
    
    function loadImagesIntoArrays(){
        var i, j;
        
        imagesArr = makeArray(rows, columns);
        selectedImageNamesArr = new Array();
        emptyBoxesArr = new Array();

        var imageNameIndex = 0;
        for(i=0; i<rows; i++){
            for (j=0; j<columns; j++){
                if (imagesArr[i][j] == null || imagesArr[i][j].toString().length == 0){
                    /**
                     * Put random image into first empty place on array
                     */
                    var imageName = getNextImageName();
                    imagesArr[i][j]=imageName;
                    /**
                      * Put mirror image into a random empty place on array
                      */
                    refreshEmptyBoxesArr();
                    var mirrorIndex = generateRandomNumberSpecifiedRange(0, emptyBoxesArr.length-1);
                    var mirrorBox = emptyBoxesArr[mirrorIndex];
                    imagesArr[mirrorBox[0]][mirrorBox[1]] = imageName;
                }
            }
        }
    }
    
    function placeImagesOnPage(){
        var i, j;
        var mainPanel = document.createElement("div");
        mainPanel.setAttribute("id","mainPanel");
        mainPanel.setAttribute("style", "width:"+(columns*pSize+columns*4)+"px;height:"+(rows*pSize+rows*4)+"px;");
        for(i=0; i<rows; i++){
            var rowPanel = document.createElement("div");
            rowPanel.setAttribute("class","rowPanel");
            rowPanel.setAttribute("style", "width:"+(columns*pSize+columns*4)+"px;height:"+(pSize+4)+"px;");
            for (j=0; j<columns; j++){
                var box = document.createElement("div");
                box.setAttribute("class", "box");
                box.setAttribute("style", "width:"+pSize+"px;height:"+pSize+"px;");
                box.setAttribute("id", "box-"+i+"*"+j);
                box.setAttribute("name", "box-"+imagesArr[i][j]);
                
                var img = document.createElement("img");
                img.setAttribute("class", "image");
                img.setAttribute("style", "width:"+pSize+"px;height:"+pSize+"px;");
                img.setAttribute("src", "./resources/images/"+imagesArr[i][j]);
                img.setAttribute("id", "img-"+i+"*"+j);
                img.setAttribute("name", "img-"+imagesArr[i][j]);
                
                box.appendChild(img);
                rowPanel.appendChild(box);
            }
            mainPanel.appendChild(rowPanel);
        }
        $("#gameContainer").html(mainPanel);
        $(".image").fadeIn(1000).delay(rows*columns/6*1000);
        $(".image").fadeOut(1500);
    }
    
    function addEventHandlers(){
        $(".box").click(function(){
            var selectedImage = $(this).find(".image");
            selectedImage.fadeIn(500);
            if (firstSelection == null){
                firstSelection = selectedImage.attr("name");
            } else {
                if (firstSelection != selectedImage.attr("name")){
                    $(".image[name='"+selectedImage.attr("name")+"']").fadeOut(500);
                    $(".image[name='"+firstSelection+"']").fadeOut(500);
                } else {
                    if ($("img:hidden").length == 0){
                        $("#eventDialog").attr("title", "winning").text("You are the winner !!").dialog({
                            buttons:{
                                "Ok":function(){
                                    window.location.reload(true);
                                }
                            }
                        });
                    }
                    $(".image[name='"+selectedImage.attr("name")+"']").parent().off('click');
                    $(".image[name='"+firstSelection+"']").parent().off('click');
                }
                firstSelection = null;
            }
        });
    }
    
    function getNextImageName(){
        var foundANewImage = false;
        var allImagesAreUsed = false;
        var imageName, imageCounter, i;
            looop:
            while(!foundANewImage){
                imageName = "p"+generateRandomNumberSpecifiedRange(1,pCount)+".jpg";
                for(i=0; i<selectedImageNamesArr.length; i++){
                    if (selectedImageNamesArr[i] == imageName){
                        continue looop;
                    }
                }
                foundANewImage = true;
                selectedImageNamesArr.push(imageName);
            }
        return imageName;
    }
    
    function refreshEmptyBoxesArr(){
        emptyBoxesArr = new Array();
        var i, j;
        for(i=0; i<rows; i++){
            for (j=0; j<columns; j++){
                if (imagesArr[i][j] == null || imagesArr[i][j].toString().length == 0){
                    emptyBoxesArr.push([i, j]); 
                }
            }
        }        
    }

}
