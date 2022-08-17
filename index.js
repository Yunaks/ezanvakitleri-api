const axios = require("axios")
const express = require("express")
const app = express()
const moment = require("moment")
const port = 3000

async function ezanvakitleri(il) {
    if(!il) return {error: "İl giriniz."}

    let response = await axios.get(`https://www.sabah.com.tr/json/getpraytimes/${il}?dayafter=1`).catch(err => { })
    if(!response) return {error: "İl bulunamadı."}
    const data = response.data
    if(data.List.length < 1) return {error: "İl bulunamadı."}
    let imsak = data.List[0].Imsak.replace("/Date(", "").replace(")/", "")
    let Ogle = data.List[0].Ogle.replace("/Date(", "").replace(")/", "")
    let Ikindi = data.List[0].Ikindi.replace("/Date(", "").replace(")/", "")
    let Aksam = data.List[0].Aksam.replace("/Date(", "").replace(")/", "")
    let Yatsi = data.List[0].Yatsi.replace("/Date(", "").replace(")/", "")
    imsak = moment(parseInt(imsak)).format("HH:mm")
    Ogle = moment(parseInt(Ogle)).format("HH:mm")
    Ikindi = moment(parseInt(Ikindi)).format("HH:mm")
    Aksam = moment(parseInt(Aksam)).format("HH:mm")
    Yatsi = moment(parseInt(Yatsi)).format("HH:mm")
    
    return {
        "imsak" : imsak,
        "ogle" : Ogle,
        "ikindi" : Ikindi,
        "aksam" : Aksam,
        "yatsi" : Yatsi
    }
}

app.get("/:id", async (req, res) => {
    const id = req.params.id
    const data = await ezanvakitleri(id)
    res.send(data)
})

app.listen(port, () => {
    console.log(`Started http://localhost:${port}`)
})