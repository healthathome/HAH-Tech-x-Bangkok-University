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
const CACHE_IMAGE = 'image_'
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

					/* 3. Generate text from text-and-image input (multimodal) */
					// 3.5. Get cache image

					// 3.6. Check available cache
					// 3.7. Send a prompt to Gemini multimodal
					// 3.8. Reply a generated text

					/* 1. Generate text from text-only input */
					// 1.1. Send a prompt to Gemini

					// 1.2. Reply a generated text


					/* 2. Generate text from text-only input with contextual info */
					// 2.1. Send a prompt to Gemini

					// 2.2. Reply a generated text


					/* 4. Build multi-turn conversations (chat) */
					// 4.1. Get a cache chat history

					// 4.2. Check available cache

					// 4.3. Send a prompt to Gemini

					// 4.4. Reply a generated text

					// 4.5. Push a new chat history

					// 4.6. Set a cache chat history

				}

				if (event.message.type === 'image') {
					/* 3. Generate text from text-and-image input (multimodal) */
					// 3.1. Get an image binary

					// 3.2. Convert binary to base64

					// 3.3. Set a cache image

					// 3.4. Ask for prompt

					break
				}
				break
		}
	}

	res.status(200).send('OK')
})

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`)
})
