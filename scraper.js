const request = require('request');
const cheerio = require('cheerio');
const { MongoClient } = require('mongodb');
const fs = require('fs');
require('dotenv').config();

// MongoDB connection URI
const uri = process.env.MONGODB_URI;

//const uri = "mongodb+srv://varshakrishnan1711995:cqsa96n8Alkt9Z4i@cluster0.tcaqqny.mongodb.net/test?retryWrites=true&w=majority";

// Create a write stream for the CSV file
const writeStream = fs.createWriteStream('data.csv');
writeStream.write(`JobTitle,Link,Date,Company,Location,Salary,Source \n`);

// Array to hold job data
let jobData = [];

// Scraping the data
request('https://www.jobbank.gc.ca/jobsearch/jobsearch?searchstring=full+stack+developer&locationstring=Canada&sort=M', (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        $('.action-buttons').each((i, el) => {
            const item = $(el).find('.noctitle').contents().filter(function () {
                return this.nodeType === 3;
            }).first().text().trim();

            const link = $(el).find('a').attr('href');
            const jobLink = "https://www.jobbank.gc.ca" + link;

            const date = $(el).find('.date').text().replace(/,/g, '').trim();

            const company = $(el).find('.business').text().replace(/\s\s+/g, '').trim();

            const locationText = $(el).find('.location').text().trim();
            const location = locationText.replace(/Location\s*/, '').trim();

            let salaryText = $(el).find('.salary').text().trim();
            let salary = salaryText.replace(/Salary:\s*/, '').replace(/,/g, '').trim();

            let source = $(el).find('.job-source').find('.wb-inv').contents().filter(function () {
                return this.nodeType === 3 && this.nodeValue.trim() !== '';
            }).first().text().trim();

            // Write job data to CSV
            writeStream.write(`${item},${jobLink},${date},${company},${location},${salary},${source} \n`);

            // Push job data into the array
            jobData.push({
                jobTitle: item,
                link: jobLink,
                date: date,
                company: company,
                location: location,
                salary: salary,
                source: source
            });
        });

        console.log('Scraping done..');
        console.log(jobData);

        // After scraping, insert data into MongoDB
        insertIntoMongoDB(jobData);
    } else {
        console.error('Error fetching the webpage.');
    }
});

// Function to insert data into MongoDB
async function insertIntoMongoDB(data) {
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Specify the database and collection
        const database = client.db('test');
        const collection = database.collection('documents');

        // Insert the JSON data into the collection
        const result = await collection.insertMany(data);

        console.log(`${result.insertedCount} documents were inserted`);
    } catch (err) {
        console.error(err);
    } finally {
        // Close the connection
        await client.close();
    }
}