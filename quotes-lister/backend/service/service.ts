//service.ts file
import * as http from 'http';
import {QuoteType, ServiceResponseType} from '@deleteman/quotes-lister.shared-types';
import  * as fs from 'fs'

let data: ServiceResponseType = [
    {
        text: "Quote #1",
        author: "Fernando Doglio"
    },
    {
        text: "Quote #2",
        author: "Someone else"
    }
]

let quotes: QuoteType[];
fs.readFile(__dirname + '/quotes.txt', (err, txt) => {
    if(err) {
        return console.error("Error reading the quotes file: ", err)
    }

    let strCnt:string = txt.toString();
    quotes = strCnt.split("%%").map( (q):QuoteType => {
        let qParts:string[] = q.split(/--?/);
        let newQuote: QuoteType = {
            text: qParts[0],
            author: qParts[1]
        }
        return newQuote;
    })
})


export function newServer() {
    http.createServer(function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Max-Age', 2592000); // 30 days

    res.end(JSON.stringify(quotes));
    }).listen(8000);
}
