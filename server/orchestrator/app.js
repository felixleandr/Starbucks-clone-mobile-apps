const express = require("express");
const app = express();
const port = Number(process.env.PORT) || 4000;
const os = require('os')

const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const {typeDefs: userTypeDefs, resolvers: userResolvers} = require('./schemas/user')
const {typeDefs: bevTypeDefs, resolvers: bevResolvers, resolvers} = require('./schemas/beverages')

app.get('/', (req, res) => {
	res.status(200).json({
		message: 'welcome to orchestrator',
		os: os.platform()
	})
})

const server = new ApolloServer({
	typeDefs: [userTypeDefs, bevTypeDefs],
	resolvers: [userResolvers, bevResolvers],
	introspection: true
})

startStandaloneServer(server, {
	listen: {port: process.env.PORT || 4000}
})
.then(({url}) => {
	console.log('Server ready at:' + url);
})

// });

// app.get("/beverages", async (req, res) => {
//     try {
// 		const dataCache = await redis.get('app:beverages')
// 		let response; 

// 		if(dataCache){
// 			response = JSON.parse(dataCache)
// 		} else {
// 			const {data} = await axios({
// 				url: BASEURL_APP + '/beverages',
// 				method: 'GET'
// 			})
// 			await redis.set('app:beverages', JSON.stringify(data))
// 			response = data
// 		}

// 		res.status(200).json(response)
//     } catch (err) {
// 		res.status(500).json(err)
// 	}
// });

// app.get("/beverages/:id", async (req, res) => {
//     try {
// 		const dataCache = await redis.get('app:beveragesById')
// 		let response; 
// 		const {id} = req.params

// 		if(dataCache){
// 			response = JSON.parse(dataCache)
// 		} else {
// 			const {data} = await axios({
// 				url: BASEURL_APP + '/beverages/' + id,
// 				method: 'GET'
// 			})
// 			await redis.set('app:beveragesById', JSON.stringify(data))
// 			response = data
// 		}

// 		res.status(200).json(response)
//     } catch (err) {
// 		res.status(500).json(err)
// 	}
// });

// app.get("/beverages/:id", async (req, res) => {
//     try {
// 		const dataCache = await redis.get('app:beveragesById')
// 		let response; 
// 		const {id} = req.params

// 		if(dataCache){
// 			response = JSON.parse(dataCache)
// 		} else {
// 			const {data} = await axios({
// 				url: BASEURL_APP + '/beverages/' + id,
// 				method: 'GET'
// 			})
// 			await redis.set('app:beveragesById', JSON.stringify(data))
// 			response = data
// 		}

// 		res.status(200).json(response)
//     } catch (err) {
// 		res.status(500).json(err)
// 	}
// });

// app.get("/beverages", async (req, res) => {
//     try {

// 		const {name, imgUrl, description, price, CategoryId, AuthorId} = req.body
// 		const {data} = await axios({
// 			url: BASEURL_APP + '/beverages',
// 			method: 'POST',
// 			data: {
// 				name,
// 				imgUrl,
// 				description,
// 				price,
// 				CategoryId,
// 				AuthorId  
// 			}
// 		})

// 		if(dataCache){
// 			response = JSON.parse(dataCache)
// 		} else {
// 			const {data} = await axios({
// 				url: BASEURL_APP + '/beverages/' + id,
// 				method: 'GET'
// 			})
// 			await redis.set('app:beveragesById', JSON.stringify(data))
// 			response = data
// 		}

// 		res.status(200).json(response)
//     } catch (err) {
// 		res.status(500).json(err)
// 	}
// });

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
