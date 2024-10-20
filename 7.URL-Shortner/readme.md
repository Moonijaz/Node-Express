
# URL Shortener
A web application that shortens long URLs, tracks how many times they are accessed, and redirects users from the short links to the original URLs. This project uses Node.js, Express, MongoDB, and EJS for dynamic rendering.

## Features
Shorten long URLs easily.
Redirect users from short URLs to the original links.
View analytics for each short URL (number of clicks and usage history).
## Prerequisites
Before starting, ensure you have the following installed:

Node.js (v14 or later)
MongoDB (Running locally or via a cloud service like MongoDB Atlas)
## Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/url-shortener.git
cd url-shortener
Install dependencies:

bash
Copy code
npm install
Set up MongoDB:
Start your MongoDB server locally:

bash
Copy code
mongod
Alternatively, use a MongoDB Atlas cloud instance and get your connection string.

Configure the environment:
If needed, create a .env file and add the following variables:

bash
Copy code
MONGODB_URI=mongodb://localhost:27017/url
PORT=8001
Running the Application
Start the server:

bash
Copy code
node index.js
Open your browser and visit:
http://localhost:8001

Project Structure
plaintext
Copy code
/url-shortener
│
├── Controllers/          # Contains business logic
│   └── url.js
│
├── Models/               # MongoDB schema definitions
│   └── url.js
│
├── Routes/               # Handles HTTP routes
│   ├── url.js            # API routes (generate, analytics)
│   └── staticRouter.js   # Static route for homepage
│
├── views/                # EJS templates for rendering HTML
│   └── home.ejs
│
├── index.js              # Main server entry point
├── connect.js            # MongoDB connection setup
└── package.json          # Project metadata and dependencies
API Endpoints
1. Generate a Short URL
Endpoint:
POST /url
Body:
json
Copy code
{
  "url": "http://example.com"
}
Response:
Renders the home page with the newly generated short ID.
2. Redirect to Original URL
Endpoint:
GET /:shortId
Behavior:
Redirects the user to the original URL associated with the shortId.
3. Get Analytics for a URL
Endpoint:
GET /url/analytics/:shortId
Response:
json
Copy code
{
  "totalClicks": 5,
  "analytics": [
    { "timestamp": 1697759253491 },
    { "timestamp": 1697763253491 }
  ]
}
Technologies Used
Backend: Node.js, Express
Database: MongoDB
Templating Engine: EJS
UUID Generation: shortid library
How it Works
Shorten URLs:
When a user submits a URL, the app generates a short ID and stores it in the MongoDB database along with the original URL and an empty visit history.

Redirect to Original URLs:
If someone visits the short URL, the app looks up the original URL in the database and redirects the user there. It also records the timestamp of the visit.

Analytics:
The analytics endpoint provides the total number of clicks and the full visit history for each short URL.

Known Issues
Visit History Rendering:
Make sure the table in home.ejs uses proper EJS syntax to loop through the URLs and display analytics data. For example:

ejs
<% urls.forEach((url, index) => { %>
  <tr>
    <td><%= index + 1 %></td>
    <td><%= url.shortId %></td>
    <td><%= url.redirectURL %></td>
    <td><%= url.visitHistory.length %></td>
  </tr>
<% }) %>
