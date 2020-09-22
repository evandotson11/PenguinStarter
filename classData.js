var penguinPromise = d3.json("classData.json");

var successFCN = function (penguins)
{
    console.log("penguins",penguins);
    drawTable(penguins);
    FinalSort(penguins)
}

var getQgrade = function(quiz){
    return quiz.grade
}
var getHgrade = function(homework)
{
   return homework.grade}
var getTgrade = function(test)
{return test.grade}
//var Quizgrades = penguins.map(getQgrade)
//var QuizMean = d3.mean(Quizgrades)
var failureFCN = function(Error)
{
    console.log("try again",Error)
}

var drawTable=function(penguins)
{
    var rows= d3.select("#penguinTable tbody")
        .selectAll("tr")
        .data(penguins)
        .enter()
        .append("tr")
    
    rows.append("td")
        .append("img")
        .attr("src", function(penguin){
        console.log("hello")
        return "imgs/"+penguin.picture});
    
    
    rows.append("td")
        .text(function(penguin){
        var Quizgrades = penguin.quizes.map(getQgrade)
        var QuizMean = d3.mean(Quizgrades)
        
        return QuizMean});
     rows.append("td")
        .text(function(penguin){
         var Homeworkgrades=penguin.homework.map(getHgrade)
         var hwMean= d3.mean(Homeworkgrades)
        
         return hwMean
     });
   
    rows.append("td")
        .text(function(penguin){
        var Testgrades= penguin.test.map(getTgrade)
        var TestMean =d3.mean(Testgrades)
        
        return TestMean
    });
    
    
    rows.append("td")
        .text(function(penguin){
        return penguin.final[0].grade});
    
  
    }
var cleartable = function(penguins){
    d3.selectAll("#PenguinTable tbody tr")
        .remove();
    
}

var FinalSort = function(penguins)
    {  
        // Create a clickable header
        d3.select("#FinalGrade")
          .on("click",function()
             {
                console.log("clicked"); // just for debugging
                // sort the penguins by grade
                penguins.sort(function(penguinA,penguinB)
                {
                    if(penguinA.final[0].grade > penguinB.final[0].grade){return 1}
                    else if(penguinA.final[0].grade < penguinB.final[0].grade){return -1}
                    else{ return 0;}
                }) // end sort function
                console.log(penguins)
                // clear table body and redraw it
                cleartable();
                drawTable(penguins);
             }); // end on function
    } // end FinalSort


//penguins.sort(function())
    
    
              


penguinPromise.then(successFCN,failureFCN)