# School Management API

## Description
This is a backend API built with Node.js and Express.js for managing school data. It provides functionalities to:
- Add new schools.
- Retrieve a list of all schools.
- Fetch a list of schools near a user-specified location.

## Features
- Add a new school (`/addSchool`).
- List all schools (`/listAllSchools`).
- List schools near a specific latitude and longitude (`/listSchoolsNearby`).

## Technologies Used
- **Node.js** for backend runtime.
- **Express.js** for building the API.
- **MongoDB** for storing school data.
- **Mongoose** for interacting with MongoDB.

## Setup and Installation

### Prerequisites
1. **Node.js** installed on your machine. You can download it from [here](https://nodejs.org/).
2. **MongoDB** setup locally or you can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a cloud database.

### API Endpoints
1. POST
```bash
schools/addSchool
```

Description: Adds a new school to the database.
Request Body (JSON):
```bash
{
  "name": "Green Valley School",
  "address": "123 Main St",
  "latitude": 40.7128,
  "longitude": -74.0060
}
```
Response:
```bash
{
  "message": "School added successfully!"
}
```
Errors:
If any field is missing or invalid, the server will respond with a 400 Bad Request error.

2. GET schools/listAllSchools
Description: Fetches all schools from the database.
Response (JSON):
```bash
{
  "data": [
    {
      "_id": "school_id_1",
      "name": "Green Valley School",
      "address": "123 Main St",
      "latitude": 40.7128,
      "longitude": -74.0060
    },
    {
      "_id": "school_id_2",
      "name": "Bright Future Academy",
      "address": "456 Oak Ave",
      "latitude": 34.0522,
      "longitude": -118.2437
    }
  ]
}
```

3. GET schools/listSchoolsNearby
Description: Fetches a list of schools near the specified latitude and longitude.
Query Parameters:
latitude: Latitude of the user's location.
longitude: Longitude of the user's location.
Example Request:

```bash

GET /listSchoolsNearby?latitude=40.7128&longitude=-74.0060

```
Response (JSON):
```bash
{
  "data": [
    {
      "_id": "school_id_1",
      "name": "Green Valley School",
      "address": "123 Main St",
      "latitude": 40.7128,
      "longitude": -74.0060
    }
  ]
}
```
Error Handling

400 Bad Request: If required fields are missing or invalid in the request.
500 Internal Server Error: If there is a server issue or a database connection problem.
Testing the API
You can use Postman or cURL to test the API endpoints:
