/* Remember that blanket will only work with brackets live preview */
/* Try to maximise the coverage of the SantaModel object */

//blanket non mi va, quindi non ho potuto vedere i test-cases.
describe("Santa", function() {
	describe("testing getCurrentRequest", function(){
  		it("should properly return null if not init", function() {  
	  		expect(SantaModel.getCurrentRequest()).toBe(null);
  		}); 
		it("should return the correct request if init", function(){
			SantaModel.init();
			var firstRequest = {
  				question : "Carlo wants a TOY. Shall I pack a banana?",
  				options : ["yes", "no"],
				answer : "no"
			};
			
			expext(SantaModel.next()).toBe(true);
			
			var currentRequest = SantaModel.getCurrentRequest();
			expect(currentRequest.question).toBe(firstRequest.question);
			expect(currentRequest.options).toEqual(firstRequest.options);
			expect(currentRequest.answer).toBe(firstRequest.answer);
			
			
			expext(SantaModel.next()).toBe(true);
			
			var secondRequest = {
					question : "Julia wants a doll. Shall I pack a barbie?",  
					options : ["yes", "no"],
					answer : "yes"
			};
			currentRequest = SantaModel.getCurrentRequest();
			expect(currentRequest.question).toBe(secondRequest.question);
			expect(currentRequest.options).toEqual(secondRequest.options);
			expect(currentRequest.answer).toBe(secondRequest.answer);
			
			expext(SantaModel.next()).toBe(true);
			var thirdRequest = {
  				question : "Fabio wants a smartphone. Shall I pack a potatoe?",  
				options : ["yes", "no"],
  				answer : "no"
			};
			currentRequest = SantaModel.getCurrentRequest();
			expect(currentRequest.question).toBe(thirdRequest.question);
			expect(currentRequest.options).toEqual(thirdRequest.options);
			expect(currentRequest.answer).toBe(thirdRequest.answer);
			
			expext(SantaModel.next()).toBe(false);
		});
	});
	
	describe("testing pack", function(){
		it("should properly identify correct answer", function(){
			SantaModel.init();
			SantaModel.next();
			expect(SantaModel.pack("1")).toBe(false);
			expext(SantaModel.pack("yes")).toBe(false);			
			expext(SantaModel.pack("no")).toBe(false);
		});
	});
});
