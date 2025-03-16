const axios = require('axios')

const LINE_HEADER = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`
}

class LINE {
	async getImageBinary (messageId) {
		const originalImage = await axios({
			method: 'get',
			headers: LINE_HEADER,
			url: `https://api-data.line.me/v2/bot/message/${messageId}/content`,
			responseType: 'arraybuffer'
		})
		return originalImage.data
	}
	
	reply (token, payload) {
		console.log(payload)
		return axios({
			method: 'post',
			url: 'https://api.line.me/v2/bot/message/reply',
			headers: LINE_HEADER,
			data: {
				replyToken: token,
				messages: JSON.parse(payload) || payload
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
