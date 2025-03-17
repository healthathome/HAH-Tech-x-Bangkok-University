/* 0. Initial */
// 0.1. Install dependencies
// 0.2. Fill out values in .env

require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

const line = require('./utils/line')
const gemini = require('./utils/gemini')

const NodeCache = require('node-cache')
const cache = new NodeCache()
const CACHE_CHAT = 'chat_'
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../liff/index.html'))
})


app.post('/webhook', async (req, res) => {
	const events = req.body.events
	// console.log('event: ', JSON.stringify(req.body))

	for (const event of events) {
		const userId = event.source.userId
		// console.log('userId: ', userId)
		await line.loading(userId)

		switch (event.type) {
			case 'message':
				if (event.message.type === 'text') {
					const prompt = event.message.text
					// console.log('prompt: ', prompt)

					/* 1. Generate text from text-only input */
					// 1.1. Send a prompt to Gemini
					// const result = await gemini.textOnly(prompt)

					// 1.2. Reply a generated text
					// await line.reply(event.replyToken, [{
					// 	type: 'text',
					// 	text: result,
					// }])


					/* 2. Generate text from text-only input with contextual info */
					// 2.1. Send a prompt to Gemini
					// const result = await gemini.textOnlyWithContext(prompt)

					// 2.2. Reply a generated text
					// await line.reply(event.replyToken, [{
					// 	type: 'text',
					// 	text: result,
					// }])

					/* 3. Build multi-turn conversations (chat) */
					// 3.1. Get a cache chat history
					// let chatHistory = cache.get(CACHE_CHAT + userId)

					// 3.2. Check available cache
					// if (!chatHistory) {
					// 	chatHistory = []
					// }

					// 3.3. Send a prompt to Gemini
					// const result = await gemini.chat(chatHistory, prompt)

					// 3.4. Reply a generated text
					// await line.loading(userId)
					// await line.reply(event.replyToken, result)

					// 3.5. Push a new chat history
					// chatHistory.push({
					// 	role: 'user',
					// 	parts: [{ text: prompt }]
					// })
					// chatHistory.push({
					// 	role: 'model',
					// 	parts: [{ text: result }]
					// })

					// 3.6. Set a cache chat history
					// cache.set(CACHE_CHAT + userId, chatHistory, 60)
				}
				break
		}
	}

	res.status(200).send('OK')
})

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`)
})
