const axios = require('axios')

const LINE_HEADER = {
	'Content-Type': 'application/json',
	Authorization: `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`
}

function isValidJSON (str) {
	try {
		JSON.parse(str)
		return true
	} catch (e) {
		return false
	}
}

class LINE {
	reply (token, payload) {
		console.log(payload)
		return axios({
			method: 'post',
			url: 'https://api.line.me/v2/bot/message/reply',
			headers: LINE_HEADER,
			data: {
				replyToken: token,
				messages: isValidJSON(payload) ? JSON.parse(payload) : payload
			}
		})
	}

	loading (chatId) {
		return axios({
			method: 'post',
			url: 'https://api.line.me/v2/bot/chat/loading/start',
			headers: LINE_HEADER,
			data: { chatId }
		})
	}
}

module.exports = new LINE()
