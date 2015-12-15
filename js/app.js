/* SantaModel assists santa's helpers in packing children's requests.
 * It provides quality control by checking if the requests are being
 * fulfilled
 */

var SantaModel = {
    
    /* Initializes the model with a list of requests, 
     * and sets the first one as the current one 
     */
    init : function(list){
	this.requests = requests;
	this.index = -1;
    },  
    /* It moves "current" to the next request */
    next : function (){
	this.index++;
	if(this.index >= this.requests.length)
	    return false;
	return true;
    },
    /* Returns the current request. 
     * If all requests have been processed (there is no current one), it returns null 
     */
    getCurrentRequest : function () {
	return this.requests[this.index];
    },
    getQuestion : function(){
	return this.getCurrentRequest().question;	
    },
    getOptions : function(){
	return this.getCurrentRequest().options;
    },
    /* Packs the given item if it fulfills the current request.       
     * returns 1 if the given item fulfills the request (= answer)
     * returns 0 if the given item does not fulfill the request
     */
    pack : function(item) {
	var correct = this.getCurrentRequest().answer;
	console.log("answer: " + item + " correct: " + correct);
	return (correct == item);
    }
};

var SantaView = {
    init : function(){
	this.question = $(".question");
	this.options = $(".question-items");
	this.result = $(".result");
	
	this.optionsTemplate = "<li>?option?</li>";
	this.addEventHandlers();
    },
    clear : function(){
	this.question.empty();
	this.options.empty();
    },
    addEventHandlers : function(){
	this.options.on("click", "*", function(){
	    var selected = $(this).text();
	    SantaController.answer(selected);
	});
    },
    setRound : function(question, options){
	this.clear();
	this.setQuestion(question);
	for(var i=0; i < options.length; i++){
	    var option = options[i];
	    this.addOption(option);
	}
    },
    setQuestion : function(question){
	this.question.append(question);	
    },
    addOption : function(option){
	var html = this.optionsTemplate.replace("?option?", option);
	this.options.append(html);
    },
    showResult(result){
	this.clear();
	this.result.append("Total points : " + result);
    }
};

var SantaController = {
    init : function(){
	this.points = 0;
	SantaModel.init();
	SantaView.init();
	this.loadNextQuestion(); //start the game.
    },
    answer : function(answer){
	var isCorrect = SantaModel.pack(answer);	
	if(isCorrect){
	    this.points++;
	}
	this.loadNextQuestion();
    },
    loadNextQuestion :  function(){
	if(SantaModel.next()){
	    var question = SantaModel.getQuestion();
	    var options = SantaModel.getOptions();
	    SantaView.setRound(question, options);
	}else this.showResult();
    },
    showResult : function(){
	SantaView.showResult(this.points);
    }
    
    
};

$(document).ready(function(){
    SantaController.init();
});
