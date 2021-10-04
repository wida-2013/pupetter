var express = require("express");
const cors = require('cors');
const app = express();
var serveIndex = require('serve-index');
const fetch = require('node-fetch')
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 80;
const fs = require('fs')
const path = require('path')
const axios = require('axios')
var osu = require('node-os-utils')

app.get("/",async function(req, res) {
    let cpu_usage = await osu.cpu.usage()
    let ram_usage = await osu.mem.info()
    let drive = await osu.drive.info('/')
    let cpune = {
        cpu_usage: cpu_usage+' %',
        ram_free: ram_usage.freeMemPercentage+' %',
        storage_usage: drive.usedGb + ' GB / ' + drive.totalGb + ' GB',
        message: 'Я отвезу тебя в германию'
    }
    res.header("Content-Type",'application/json'); 
    res.send(JSON.stringify(cpune, null, 4));
})


app.get('/ayla', async (req, res) => {
    let q = req.query.q
    res.header("Content-Type", 'application/json');
    if (!q) return res.send(JSON.stringify({
        code: 403,
        status: false,
        message: "Harap masukkan parameter q!"
    }, null, 4));
try {
        const expd = await axios.get('https://fdciabdul.tech/api/ayla/?pesan=' + q)
        res.header("Content-Type", 'application/json');
        res.send(JSON.stringify({
            status: true,
            result: expd.data.jawab
        }, null, 4));
    } catch (e) {
        console.log(e)
        res.header("Content-Type", 'application/json');
        res.send(JSON.stringify({
            code: 501,
            status: false,
            error: 'Ich bringe dich nach Deutschland'
        }, null, 4));
    }
})

app.get('*', async (req, res) => {
	res.header("Content-Type", 'application/json');
  	res.send(JSON.stringify({
        status: true,
        msg: 'rest api down, baru akan pulih tanggal 10 Mei 2021'
    }, null, 4));
	})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});