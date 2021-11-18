// build server, khai báo sử dụng socket io
var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

io.on("connection", function(socket)
	{
		socket.on("disconnect", function()
			{
			});
         //server lắng nghe dữ liệu từ client
		socket.on("Client-sent-data", function(data)
			{
				//sau khi lắng nghe dữ liệu, server phát lại dữ liệu này đến các client khác
                socket.emit("Server-sent-data", data);
			});
	});