const express = require('express')
const fs = require('fs')

const app = express()
app.use(express.static('dist'))

const handleGetTestJson = (req, res) => {
	return fs.readFile('upload/sftp-server.cfn.json', 'utf8', (err, data) => {
		if (err) throw err
		res.send({ filename: 'sftp-server.cfn.json', content: JSON.parse(data) })
	})
}

app.get('/api/getUsername', (req, res) => res.send({ username: 'ZMORA' }))
app.get('/api/getTestJson', handleGetTestJson)

app.listen(process.env.PORT || 8080, () =>
	console.log(`Listening on port ${process.env.PORT || 8080}!`)
)
