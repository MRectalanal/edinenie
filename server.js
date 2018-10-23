const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const url = require('url');
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 8000;
server.listen( port, () => {
	console.log('Server is running on port ' + port);
});

app.get('/', (req, res) => {
	var page = fs.readFileSync('public/index.html');
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end(page);
});

app.get('/project', (req, res) => {
	var page = fs.readFileSync('public/project.html');
	res.cookie("proj_name", req.url.substr(req.url.lastIndexOf('?')+1));
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end(page);
});

app.get('/404', (req, res) => {
	var page = fs.readFileSync('public/404.html');
	res.writeHead(404, {'Content-Type': 'text/html'});
	res.end(page);
});

const io = require('socket.io')(server);
io.on('connection', socket => {
	socket.on('getIndexData', ()=> {
		fs.readFile('data/site_projects.json', (err, data) => {
			if (data) {
				data = JSON.parse(data);
				socket.emit('setIndexData', data);
			} else {
				console.log(err);
			}
		});
	});

	socket.on('getProjectData', (proj_name)=> {
		fs.readFile('data/'+proj_name+'.json', (err, data) => {
			if (data) {
				data = JSON.parse(data);
				socket.emit('setProjectData', data);
			} else {
				console.log(err);
				socket.emit('setError404');
			}
		});
	});
});