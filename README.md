# scrapingJobBank
This repository contains scripts for web scraping job listings from the Job Bank Canada website and storing the data in both CSV and MongoDB formats.
How to Use:
1.	Install Dependencies:

Run the following command to install the required dependencies:

       npm install request cheerio mongodb
3.	Run the Script:
   
Execute the script using Node.js:

       node combinedScrape.js
       
What It Does:

•	Scrapes Job Data: It scrapes job listings for "Full Stack Developer" positions from the Job Bank Canada website.

•	Saves to CSV: The scraped data is saved to a file named data.csv.

•	Inserts into MongoDB: The scraped data is also inserted into a MongoDB collection named documents in the test database.

Notes:

•	Ensure that the MongoDB URI is correctly configured and accessible.

•	Modify the scraping logic if the structure of the target website changes.
