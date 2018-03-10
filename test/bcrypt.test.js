let chaiHttp = require('chai-http');
let chai = require('chai');
let expect = chai.expect;
let bcrypt = require('bcrypt')

xdescribe ('Testing use of the async bcrypt method', () => {

	const password = 'please-work'
	const origHash = 'asdlkfo9cu;lawjnreoiauwposenrp'
		// console.log( `***** The origHash is : ${origHash}` )

	it ('.. async hash creates a newobject', () => {
		let digest
		bcrypt.hash(password, 10)
			.then (
				(newHash) => {
				console.log(newHash)
				expect(newHash).to.be.an('string')
				expect(newHash).not.to.equal(origHash)
				// done()
				digest = newHash
				expect(digest).to.be.a('string')
			console.log(`Here it is~  a new digest!:  ${ digest }`)
			})
			.catch(err => console.log(err))
	});	

});

