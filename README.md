# Job Bank Scraper 

A web scraper that extracts job listings from Job Bank Canada and stores them in MongoDB + CSV.

![Node.js](https://img.shields.io/badge/Node.js-14.x+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-blue)

## How It Works

Mermaid Diagram
-graph TD
    -A[Scrape Job Bank Canada] --> B[Parse HTML with Cheerio]
    -B --> C[Extract Job Data]
    -C --> D[Write to CSV]
    -C --> E[Store in MongoDB]

## Features 
- Scrapes job titles, companies, locations, salaries, and dates
- Stores data in MongoDB Atlas (NoSQL database)
- Generates a CSV backup file
- Handles pagination (add your implementation)

## Data Structure

|     Field      |  selector    | example Outp |
|----------------|--------------|--------------|
| Job Title      | .noctitle    | "Developer"  |
| Link           | a[href]      | "/job/12345" |
| Company        | .business    | "Tech Inc"   |
| Salary         | .salary	    | "$85,000"    |


## Prerequisites

    -Node.js 18+
    -MongoDB Atlas account

## Installation 

1. **Clone the repository**
   
   git clone https://github.com/varshachandran/scrapingJobBank.git
   cd scrapingJobBank

2. **Install Dependencies**

   npm install cheerio request mongodb dotenv

3. **Set up environment variables**

   Create a .env file:
    MONGODB_URI=your_mongodb_atlas_connection_string

4. **Usage**

   Input:
   node scraper.js

   Outputs:
   data.csv with all job listings
   Documents in MongoDB jobs collection

## Output Samples

  **CSV file**

  Full Stack Developer,https://jobbank.gc.ca/job/12345,2023-11-15,Acme Inc,Toronto,$85,000/year,Job Bank

  **MongoDB Document**

  {
  "jobTitle": "Full Stack Developer",
  "link": "https://jobbank.gc.ca/job/12345",
  "date": "2023-11-15",
  "company": "Acme Inc",
  "location": "Toronto",
  "salary": "$85,000/year",
  "source": "Job Bank"
  }

## Error Handling

  The script includes:
  -HTTP request error checking
  -MongoDB connection try-catch
  -CSV write stream error listener

## Dependencies 

   -cheerio - HTML parsing
   -mongodb - Official MongoDB driver
   -dotenv - Environment variables
   -request - HTTP requests to fetch job listings 

## License

This project is licensed under the [MIT License](LICENSE).

  
