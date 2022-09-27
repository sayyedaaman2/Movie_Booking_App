# Movie_Booking_App
This project is node.js back-end code for a movie booking
application that can create various entities like users,
movies, theatres, bookings and payments as well as perform various actions on them.

<br/>

## Features

>**Account Creation**
- You can create accounts for user as well as theatre owner.
- If the user is a customer, the accout will automatically be approved on verification.
- In case of theatre owner, an admin will have to approve the account.
- JSON Web Token used for authentication.
- Users can also update some details like name, password and email.
- Admin can update additional details like userType and userStatus.
- User serach is also available for users with proper authorization.

>**Movie API**
- an admin can create a new movie, Edit and existing movie
and delete an existing movie.
- All registered users can get a list of all movies as well as a single movie using movieId.

>**Theatre API**
- A theatre owner or an admin can create a new theatre,
Edit their existing theatre and delete their existing theatre.
- All registered users can get a list of all theatres as well as a single theatre using theatreId.
- All registered users can get a list of all the movies
released in a single theatre using theatreId.
- A theatre owner or an admin can add or remove a new movie in an existing theatre.

>**Booking API**
- All registered users can create a new booking and update their existing booking.
- All registered users can get a list of all of their booings as well as single booking using bookingId.
- An admin can get the list of all the bookings.

>**Payment API**
- All registered users with a booking can create a payment of  their booking.
- All registered users can get a list of all of their payments as well as a single payment using paymentId.
- An admin can get the list of all the payments.

<br/>

# Dependencies
|npm modules|
|-|
|express|
|mongoose|
|jsonwebtoken|
|node-rest-client|
|dotenv|
|body-parser|
|bcrypt|

|external applications|
|-|
|notification service application|

<br/>

## Installation
this app requires [Node.js](https://nodejs.org/) v14+ to run.
before installing the application we required to one more application to Start
[NotificationsService](https://github.com/sayyedaaman2/notificationService)

Install the dependencies and devDependencies and start the server.

```sh
cd Movie_Booking_App
npm install
npm start 
```
<br/>

### REST API endpoints

### 1. Sign Up request

```sh
POST /mba/api/v1/auth/signup
sample request body : 
{
   "name" : "test3",
   "userId" : "test3",
   "password" : "Testtest3@",
   "email" : "test3@gmail.com",
   "userType" : "CUSTOMER"
}

sample response body :
{
    "name": "test3",
    "userId": "test3",
    "email": "test3@gmail.com",
    "userType": "CUSTOMER",
    "userStatus": "APPROVED",
    "createdAt": "2022-09-26T18:56:02.988Z",
    "updatedAt": "2022-09-26T18:56:02.988Z"
}
```
Details about the JSON structure
- name : Mandatory
- userId : Mandatory + Unique
- email : Mandatory + Unique
- password : Mandatory
- userType : Optional, deffault value is CUSTOMER. Other possible value : THEATRE_OWNER and for the ADMIN there is not be allowed to create the admin account.
- userStatus : It reperesents the status of the user registered. Customer are by default approve d. ADMIN and TheatreOwner need approval from Admin. Possible values : APPROVED | PENDING | REJECTED

---

### 2. Login Request

```sh
POST /mba/api/v1/auth/signin
Sample request body : 
{
    "userId" : "test3",
    "password" : "Testtest3@"
}
Sample response body : 
{
    "name": "test3",
    "userId": "test3",
    "email": "test3@gmail.com",
    "userType": "CUSTOMER",
    "userStatus": "APPROVED",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3QzIiwiaWF0IjoxNjY0MjE5MDc3LCJleHAiOjE2NjQyMTkxOTd9.FP2wgOK5EkQMzQvS9LKh2dJ-V1-NIx90a9QQkcrvuRc",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3QzIiwiaWF0IjoxNjY0MjE5MDc3LCJleHAiOjE2NjQyMTk2Nzd9.GoVUKxpJU7x-MMG6kTyeQOErfD639s4eX4dnKlQ3Sp8"
}
```

---

### 3. Generate the refreshToken
```sh
GET /mba/api/v1/auth/refreshTokens/:refreshToken

sample request Path: 
Path Vaiables : {
    refreshToken : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3QzIiwiaWF0IjoxNjY0MjE5MDc3LCJleHAiOjE2NjQyMTk2Nzd9.GoVUKxpJU7x-MMG6kTyeQOErfD639s4eX4dnKlQ3Sp8
}

sample response body : 
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3QzIiwiaWF0IjoxNjY0MjE5NjY0LCJleHAiOjE2NjQyMTk3ODR9.d30H8AWk7w0s0-9CL6FLfUTwQ1jCyPYKyLZS45XS3_o"
}
```

---

### 4.1 update the user by itself
```sh
PUT /mba/api/v1/users/:id
Headers : 
 Content-Type : application/json
 x-access-token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3QzIiwiaWF0IjoxNjY0MjE5NjY0LCJleHAiOjE2NjQyMTk3ODR9.d30H8AWk7w0s0-9CL6FLfUTwQ1jCyPYKyLZS45XS3_o

Path Variables : 
 id : test3

sample request body : 
{   
    "name" : "test3",
    "password" : "Testtest3@",
    "email" : "test3@gmail.com"
}

Sample request body : 
{
    "name": "test31",
    "userId": "test3",
    "email": "test3@gmail.com",
    "userType": "CUSTOMER",
    "userStatus": "APPROVED",
    "createdAt": "2022-09-26T18:56:02.988Z",
    "updatedAt": "2022-09-26T19:30:18.845Z"
}
```

---

### 4.2 update the user by admin
```sh
PUT /mba/api/v1/users/:id
Headers : 
 Content-Type : application/json
 x-access-token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3QzIiwiaWF0IjoxNjY0MjE5NjY0LCJleHAiOjE2NjQyMTk3ODR9.d30H8AWk7w0s0-9CL6FLfUTwQ1jCyPYKyLZS45XS3_o

Path Variables : 
 id : theatreOwner01

sample request body : 
{   
    "userType" : "THEATRE_OWNER",
    "userStatus" : "APPROVED"
}

Sample request body : 
{
    "name": "test31",
    "userId": "test3",
    "email": "test3@gmail.com",
    "userType": "THEATRE_OWNER",
    "userStatus": "APPROVED",
    "createdAt": "2022-09-26T18:56:02.988Z",
    "updatedAt": "2022-09-26T19:30:18.845Z"
}
```

---

### 5 Get all Users (admin only)
```sh
GET /mba/api/v1/users
Headers : 
 Content-Type : application/json
 x-access-token :eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNjY0MjIwOTc0LCJleHAiOjE2NjQyMjEwOTR9.w239VWc2OGKQdDiIDyWaVLnwwovV7ohNv_T6cMoAW3o

sample request body : {}

Sample request body : 
[
    {
        "name": "Admin",
        "userId": "admin",
        "email": "admin@example.com",
        "userType": "ADMIN",
        "userStatus": "APPROVED"
    },
    {
        "name": "Customer1",
        "userId": "customer1",
        "email": "customer1@example.com",
        "userType": "CUSTOMER",
        "userStatus": "APPROVED"
    },
    {
        "name": "Theatre Owner 1",
        "userId": "theatreOwner1",
        "email": "theatre1@example.com",
        "userType": "THEATRE_OWNER",
        "userStatus": "APPROVED"
    },
    {
        "name": "Theatre Owner 2",
        "userId": "theatreOwner2",
        "email": "theatre2@example.com",
        "userType": "THEATRE_OWNER",
        "userStatus": "APPROVED"
    },
    {
        "name": "test31",
        "userId": "test3",
        "email": "test3@gmail.com",
        "userType": "CUSTOMER",
        "userStatus": "APPROVED"
    }
]
```

---

### 6 Find by userId
```sh
GET /mba/api/v1/users/:id
Headers : 
 Content-Type : application/json
 x-access-token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3QzIiwiaWF0IjoxNjY0MjE5NjY0LCJleHAiOjE2NjQyMTk3ODR9.d30H8AWk7w0s0-9CL6FLfUTwQ1jCyPYKyLZS45XS3_o

Path Variables : 
 id : test3

sample request body : {}

Sample request body : 
{
    "name": "test31",
    "userId": "test3",
    "email": "test3@gmail.com",
    "userType": "CUSTOMER",
    "userStatus": "APPROVED",
    "createdAt": "2022-09-26T18:56:02.988Z",
    "updatedAt": "2022-09-26T19:30:18.845Z"
}
```

---

### 5 Create a Movie (admin only)
```sh
POST /mba/api/v1/movies
Headers : 
 Content-Type : application/json
 x-access-token :eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNjY0MjIxMzUyLCJleHAiOjE2NjQyMjE0NzJ9.IqiNZVL21TPBqIC2go9y0wU8QT4Ru7aOjGIw2eOOgP0

sample request body : 
{
    "name": "Inception",
    "description": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
    "casts" : ["Leonardo DiCaprio","Joseph Gordon-Levitt", "Elliot Page", "Ken Watanabe", "Tom Hardy", "Dileep Rao",
    "Cillian Murphy", "Tom Berenger", "Marion Cotillard", "Taylor Geare"],
    "trailerUrls" : ["https://youtu.be/8hP9D6kZseM"],
    "posterUrls" : ["https://www.imdb.com/title/tt1375666/mediaviewer/rm3426651392/?ref_=tt_ov_i"],
    "languages" : ["English","Hindi"],
    "releaseDate" : "16 july 2010",
    "releaseStatus" : "RELEASED",
    "imdbRating" : 8.8,
    "genre" : ["ACTION", "DRAMA"]
}

sample response body :
{
    "name": "Inception",
    "description": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
    "casts": [
        "Leonardo DiCaprio",
        "Joseph Gordon-Levitt",
        "Elliot Page",
        "Ken Watanabe",
        "Tom Hardy",
        "Dileep Rao",
        "Cillian Murphy",
        "Tom Berenger",
        "Marion Cotillard",
        "Taylor Geare"
    ],
    "trailerUrls": [
        "https://youtu.be/8hP9D6kZseM"
    ],
    "posterUrls": [
        "https://www.imdb.com/title/tt1375666/mediaviewer/rm3426651392/?ref_=tt_ov_i"
    ],
    "languages": [
        "English",
        "Hindi"
    ],
    "releaseDate": "2010-07-15T18:30:00.000Z",
    "releaseStatus": "RELEASED",
    "imdbRating": 8.8,
    "genre": [
        "ACTION",
        "DRAMA"
    ],
    "theatres": [],
    "bookings": [],
    "_id": "633200b838cb64f95ae0d371",
    "createdAt": "2022-09-26T19:42:48.183Z",
    "updatedAt": "2022-09-26T19:42:48.183Z"
}
```

---

### 6 Update a Movie (admin only)
```sh
POST /mba/api/v1/movies/:id
Headers : 
 Content-Type : application/json
 x-access-token :eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNjY0MjIxMzUyLCJleHAiOjE2NjQyMjE0NzJ9.IqiNZVL21TPBqIC2go9y0wU8QT4Ru7aOjGIw2eOOgP0

Path Variables : 
 id : 633200b838cb64f95ae0d371


sample request body : 
{
    "name" : "Inception" ,
    "description" : "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
    "casts" : ["Leonardo DiCaprio","Joseph Gordon-Levitt", "Elliot Page", "Ken Watanabe", "Tom Hardy", "Dileep Rao",
    "Cillian Murphy", "Tom Berenger", "Marion Cotillard", "Taylor Geare"],
    "trailerUrls" : ["https://youtu.be/8hP9D6kZseM"],
    "posterUrls" : ["https://www.imdb.com/title/tt1375666/mediaviewer/rm3426651392/?ref_=tt_ov_i"],
    "languages" : ["English" , "Hindi", "French"],
    "releaseDate" : "16 july 2010",
    "releaseStatus" : "COMING_SOON",
    "imdbRating" : 8.8,
    "genre" : ["ACTION","ADVENTURE", "SCI-FI"]
}

sample response body :
{
    "_id": "633200b838cb64f95ae0d371",
    "name": "Inception",
    "description": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
    "casts": [
        "Leonardo DiCaprio",
        "Joseph Gordon-Levitt",
        "Elliot Page",
        "Ken Watanabe",
        "Tom Hardy",
        "Dileep Rao",
        "Cillian Murphy",
        "Tom Berenger",
        "Marion Cotillard",
        "Taylor Geare"
    ],
    "trailerUrls": [
        "https://youtu.be/8hP9D6kZseM"
    ],
    "posterUrls": [
        "https://www.imdb.com/title/tt1375666/mediaviewer/rm3426651392/?ref_=tt_ov_i"
    ],
    "languages": [
        "English",
        "Hindi",
        "French"
    ],
    "releaseDate": "2010-07-15T18:30:00.000Z",
    "releaseStatus": "COMING_SOON",
    "imdbRating": 8.8,
    "genre": [
        "ACTION",
        "ADVENTURE",
        "SCI-FI"
    ],
    "theatres": [],
    "bookings": [],
    "createdAt": "2022-09-26T19:42:48.183Z",
    "updatedAt": "2022-09-26T19:48:58.828Z"
}
```

---

### 7 Delete a Movie (admin only)
```sh
POST /mba/api/v1/movies/:id
Headers : 
 Content-Type : application/json
 x-access-token :eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNjY0MjIxMzUyLCJleHAiOjE2NjQyMjE0NzJ9.IqiNZVL21TPBqIC2go9y0wU8QT4Ru7aOjGIw2eOOgP0

Path Variables : 
 id : 633200b838cb64f95ae0d371

sample request body : {}

sample response body :
{
    "message": "Movie deleted"
}
```
 
---

### 8 Get all Movies
```sh
GET /mba/api/v1/movies
Headers : 
 Content-Type : application/json
 x-access-token :eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNjY0MjIxMzUyLCJleHAiOjE2NjQyMjE0NzJ9.IqiNZVL21TPBqIC2go9y0wU8QT4Ru7aOjGIw2eOOgP0


sample request body : {}

sample response body :
[
    {
        "_id": "6331f5c038cb64f95ae0d34c",
        "name": "Movie 1",
        "description": "Description for movie 1",
        "casts": [
            "SomeOne",
            "SomeOneElse"
        ],
        "trailerUrls": [
            "TrailerURL"
        ],
        "posterUrls": [
            "PosterURL"
        ],
        "languages": [
            "English",
            "Hindi"
        ],
        "releaseDate": "1970-01-01T00:00:02.002Z",
        "releaseStatus": "COMING_SOON",
        "imdbRating": 8.5,
        "genre": [
            "ACTION"
        ],
        "theatres": [
            "6331f5c038cb64f95ae0d346"
        ],
        "bookings": [
            "6331f5c038cb64f95ae0d353"
        ],
        "createdAt": "2022-09-26T18:56:00.621Z",
        "updatedAt": "2022-09-26T18:56:00.716Z"
    },
    {
        "_id": "6331f5c038cb64f95ae0d34d",
        "name": "Movie 2",
        "description": "Description for movie 2",
        "casts": [
            "SomeOne",
            "SomeOneElse"
        ],
        "trailerUrls": [
            "TrailerURL"
        ],
        "posterUrls": [
            "PosterURL"
        ],
        "languages": [
            "English",
            "Hindi"
        ],
        "releaseDate": "1970-01-01T00:00:02.004Z",
        "releaseStatus": "COMING_SOON",
        "imdbRating": 8.5,
        "genre": [
            "ACTION"
        ],
        "theatres": [
            "6331f5c038cb64f95ae0d346"
        ],
        "bookings": [],
        "createdAt": "2022-09-26T18:56:00.622Z",
        "updatedAt": "2022-09-26T18:56:00.673Z"
    },
    {
        "_id": "6331f5c038cb64f95ae0d34e",
        "name": "Movie 3",
        "description": "Description for movie 3",
        "casts": [
            "SomeOne",
            "SomeOneElse"
        ],
        "trailerUrls": [
            "TrailerURL"
        ],
        "posterUrls": [
            "PosterURL"
        ],
        "languages": [
            "English",
            "Hindi"
        ],
        "releaseDate": "1970-01-01T00:00:01.998Z",
        "releaseStatus": "COMING_SOON",
        "imdbRating": 8.5,
        "genre": [
            "ACTION"
        ],
        "theatres": [],
        "bookings": [],
        "createdAt": "2022-09-26T18:56:00.622Z",
        "updatedAt": "2022-09-26T18:56:00.622Z"
    }
]
```

---

### 9 Get single Movie
```sh
GET /mba/api/v1/movie/:id
Headers : 
 Content-Type : application/json
 x-access-token :eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNjY0MjIxMzUyLCJleHAiOjE2NjQyMjE0NzJ9.IqiNZVL21TPBqIC2go9y0wU8QT4Ru7aOjGIw2eOOgP0

Path Variables : 
 id : 6331f5c038cb64f95ae0d34c

sample request body : {}

sample response body :
{
    "_id": "6331f5c038cb64f95ae0d34c",
    "name": "Movie 1",
    "description": "Description for movie 1",
    "casts": [
        "SomeOne",
        "SomeOneElse"
    ],
    "trailerUrls": [
        "TrailerURL"
    ],
    "posterUrls": [
        "PosterURL"
    ],
    "languages": [
        "English",
        "Hindi"
    ],
    "releaseDate": "1970-01-01T00:00:02.002Z",
    "releaseStatus": "COMING_SOON",
    "imdbRating": 8.5,
    "genre": [
        "ACTION"
    ],
    "theatres": [
        "6331f5c038cb64f95ae0d346"
    ],
    "bookings": [
        "6331f5c038cb64f95ae0d353"
    ],
    "createdAt": "2022-09-26T18:56:00.621Z",
    "updatedAt": "2022-09-26T18:56:00.716Z"
}
```

---

### 10 Create Theatre (TheatreOwner and Admin)
```sh
POST /mba/api/v1/theatres
Headers : 
 Content-Type : application/json
 x-access-token :eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNjY0MjIxMzUyLCJleHAiOjE2NjQyMjE0NzJ9.IqiNZVL21TPBqIC2go9y0wU8QT4Ru7aOjGIw2eOOgP0

sample request body : 
{
    "ownerId": "63320698e236609a19c2f58e",
    "name": "PVR LATUR",
    "description": "full screen cinema",
    "city": "Latur",
    "pinCode": 41001,
    "showTypes": [
        "MORNING",
        "EVENING",
        "NIGHT"
    ],
    "numberOfSeats": 100,
    "ticketPrice" : 150
}

sample response body : 
{
    "ownerId": "63320698e236609a19c2f58e",
    "name": "PVR LATUR",
    "description": "full screen cinema",
    "city": "Latur",
    "pinCode": 41001,
    "showTypes": [
        "MORNING",
        "EVENING",
        "NIGHT"
    ],
    "numberOfSeats": 100,
    "movies": [],
    "ticketPrice": 150,
    "_id": "63320734e236609a19c2f59d",
    "createdAt": "2022-09-26T20:10:28.473Z",
    "updatedAt": "2022-09-26T20:10:28.473Z"
}
```

---


### 11 update Theatre (TheatreOwner and Admin)
```sh
PUT /mba/api/v1/theatres/:id
Headers : 
 Content-Type : application/json
 x-access-token :eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNjY0MjIxMzUyLCJleHAiOjE2NjQyMjE0NzJ9.IqiNZVL21TPBqIC2go9y0wU8QT4Ru7aOjGIw2eOOgP0

Path Variables : 
 id : 63320734e236609a19c2f59d
sample request body : 
{
    "name" : "PVR",
    "description" : "full screen cinema Hall",
    "city" : "Pune",
    "pinCode" : 410212,
    "showTypes" : ["MORNING", "NOON", "EVENING", "NIGHT"],
    "numberOfSeats" : 90,
    "ticketPrice" : 180
}

sample response body : 
{
    "_id": "63320734e236609a19c2f59d",
    "ownerId": "63320698e236609a19c2f58e",
    "name": "PVR",
    "description": "full screen cinema Hall",
    "city": "Pune",
    "pinCode": 410212,
    "showTypes": [
        "MORNING",
        "NOON",
        "EVENING",
        "NIGHT"
    ],
    "numberOfSeats": 90,
    "movies": [],
    "ticketPrice": 180,
    "createdAt": "2022-09-26T20:10:28.473Z",
    "updatedAt": "2022-09-26T20:12:35.794Z"
}
```

---

### 12 delete Theatre (TheatreOwner and Admin)
```sh
PUT /mba/api/v1/theatres/:id
Headers : 
 Content-Type : application/json
 x-access-token :eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNjY0MjIxMzUyLCJleHAiOjE2NjQyMjE0NzJ9.IqiNZVL21TPBqIC2go9y0wU8QT4Ru7aOjGIw2eOOgP0

Path Variables : 
 id : 63320734e236609a19c2f59d
sample request body : {}

sample response body : 
{
    "message": "Theatre deleted"
}
```

---

### 13 Get all Theatres
```sh
GET /mba/api/v1/theatres
Headers : 
 Content-Type : application/json
 x-access-token :eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNjY0MjIxMzUyLCJleHAiOjE2NjQyMjE0NzJ9.IqiNZVL21TPBqIC2go9y0wU8QT4Ru7aOjGIw2eOOgP0

sample request body : {}

sample response body : 
[
    {
        "_id": "6332066fe236609a19c2f575",
        "ownerId": "6332066fe236609a19c2f572",
        "name": "Theatre 1",
        "description": "Description for theatre 1",
        "city": "Mumbai",
        "pinCode": 400049,
        "showTypes": [
            "MORNING",
            "NOON",
            "EVENING",
            "NIGHT"
        ],
        "numberOfSeats": 100,
        "movies": [
            "6332066fe236609a19c2f57b",
            "6332066fe236609a19c2f57c"
        ],
        "ticketPrice": 145,
        "createdAt": "2022-09-26T20:07:11.905Z",
        "updatedAt": "2022-09-26T20:07:11.940Z"
    },
    {
        "_id": "6332066fe236609a19c2f576",
        "ownerId": "6332066fe236609a19c2f573",
        "name": "Theatre 2",
        "description": "Description for theatre 2",
        "city": "Ahmedabad",
        "pinCode": 380007,
        "showTypes": [
            "EVENING",
            "NIGHT"
        ],
        "numberOfSeats": 50,
        "movies": [],
        "ticketPrice": 120,
        "createdAt": "2022-09-26T20:07:11.906Z",
        "updatedAt": "2022-09-26T20:07:11.906Z"
    },
    {
        "_id": "6332066fe236609a19c2f577",
        "ownerId": "6332066fe236609a19c2f573",
        "name": "Theatre 3",
        "description": "Description for theatre 3",
        "city": "New Delhi",
        "pinCode": 110031,
        "showTypes": [
            "EVENING"
        ],
        "numberOfSeats": 75,
        "movies": [],
        "ticketPrice": 235,
        "createdAt": "2022-09-26T20:07:11.906Z",
        "updatedAt": "2022-09-26T20:07:11.906Z"
    }
]
```

---

### 14 Get single Theatre By theatreId
```sh
GET /mba/api/v1/theatres/:id
Headers : 
 Content-Type : application/json
 x-access-token :eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNjY0MjIxMzUyLCJleHAiOjE2NjQyMjE0NzJ9.IqiNZVL21TPBqIC2go9y0wU8QT4Ru7aOjGIw2eOOgP0

Path Variables :
 id : 6332066fe236609a19c2f577
sample request body : {}

sample response body : 
{
    "_id": "6332066fe236609a19c2f577",
    "ownerId": "6332066fe236609a19c2f573",
    "name": "Theatre 3",
    "description": "Description for theatre 3",
    "city": "New Delhi",
    "pinCode": 110031,
    "showTypes": [
        "EVENING"
    ],
    "numberOfSeats": 75,
    "movies": [],
    "ticketPrice": 235,
    "createdAt": "2022-09-26T20:07:11.906Z",
    "updatedAt": "2022-09-26T20:07:11.906Z"
}
```

---

### 15 Get Movies in  Theatre
```sh
GET /mba/api/v1/theatres/:id/movies
Headers : 
 Content-Type : application/json
 x-access-token :eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNjY0MjIxMzUyLCJleHAiOjE2NjQyMjE0NzJ9.IqiNZVL21TPBqIC2go9y0wU8QT4Ru7aOjGIw2eOOgP0

Path Variables :
 id : 6332066fe236609a19c2f575
sample request body : {}

sample response body : 
[
    {
        "_id": "6332066fe236609a19c2f57b",
        "name": "Movie 1",
        "description": "Description for movie 1",
        "casts": [
            "SomeOne",
            "SomeOneElse"
        ],
        "trailerUrls": [
            "TrailerURL"
        ],
        "posterUrls": [
            "PosterURL"
        ],
        "languages": [
            "English",
            "Hindi"
        ],
        "releaseDate": "1970-01-01T00:00:02.002Z",
        "releaseStatus": "COMING_SOON",
        "imdbRating": 8.5,
        "genre": [
            "ACTION"
        ],
        "theatres": [
            "6332066fe236609a19c2f575"
        ],
        "bookings": [
            "6332066fe236609a19c2f582"
        ],
        "createdAt": "2022-09-26T20:07:11.929Z",
        "updatedAt": "2022-09-26T20:07:11.981Z"
    },
    {
        "_id": "6332066fe236609a19c2f57c",
        "name": "Movie 2",
        "description": "Description for movie 2",
        "casts": [
            "SomeOne",
            "SomeOneElse"
        ],
        "trailerUrls": [
            "TrailerURL"
        ],
        "posterUrls": [
            "PosterURL"
        ],
        "languages": [
            "English",
            "Hindi"
        ],
        "releaseDate": "1970-01-01T00:00:02.004Z",
        "releaseStatus": "COMING_SOON",
        "imdbRating": 8.5,
        "genre": [
            "ACTION"
        ],
        "theatres": [
            "6332066fe236609a19c2f575"
        ],
        "bookings": [],
        "createdAt": "2022-09-26T20:07:11.929Z",
        "updatedAt": "2022-09-26T20:07:11.947Z"
    }
]
```

---

### 16 Add or Remove the movies on theatre
```sh
PUT /mba/api/v1/theatres/:id/movies
Headers : 
 Content-Type : application/json
 x-access-token :eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNjY0MjIxMzUyLCJleHAiOjE2NjQyMjE0NzJ9.IqiNZVL21TPBqIC2go9y0wU8QT4Ru7aOjGIw2eOOgP0

Path Variables :
 id : 63320a9ee236609a19c2f5ba
sample request body : 
{
    "addMovies" :[
        "6332066fe236609a19c2f57b"
    ],
    "removeMovies" : [
        "631b666a7e2caa97cdf60184"
    ]

}

sample response body : 
{
    "message": "Updated movies in theatre"
}
```

---

### 17 Booking the ticket
```sh
POST /mba/api/v1/bookings
Headers : 
 Content-Type : application/json
 x-access-token :eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNjY0MjIxMzUyLCJleHAiOjE2NjQyMjE0NzJ9.IqiNZVL21TPBqIC2go9y0wU8QT4Ru7aOjGIw2eOOgP0

Path Variables :
 id : 63320a9ee236609a19c2f5ba
sample request body : 
{
    "theatreId" : "6332066fe236609a19c2f575",
    "movieId" : "6332066fe236609a19c2f57b",
    "noOfSeats" : 5
}

sample response body : 
{
    "totalCost": 725,
    "theatreId": "6332066fe236609a19c2f575",
    "movieId": "6332066fe236609a19c2f57b",
    "userId": "63320698e236609a19c2f58e",
    "ticketBookedTime": "2022-09-26T20:28:33.972Z",
    "noOfSeats": 5,
    "status": "IN_PROGRESS",
    "_id": "63320b71e236609a19c2f5cc",
    "createdAt": "2022-09-26T20:28:33.974Z",
    "updatedAt": "2022-09-26T20:28:33.974Z"
}
```

---

### 18 Update Booking (user and admin only)
```sh
PUT /mba/api/v1/bookings/:id
Headers : 
 Content-Type : application/json
 x-access-token :eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3QyIiwiaWF0IjoxNjY0MjI1OTMyLCJleHAiOjE2NjQyMjYwNTJ9.MEbOibT61lt63A8mHD9DukvRgUFPOBR_2SIJmm_N3HE

Path Variables :
 id : 63320cbb0e89b5da70f1d164
sample request body : 
{
    "noOfSeats" : 10
}

sample response body : 
{
    "_id": "63321b3add16ed73d477b5ad",
    "totalCost": 1450,
    "theatreId": "63320c45d9c8393eedcaad5e",
    "movieId": "63320c45d9c8393eedcaad64",
    "userId": "63320c740e89b5da70f1d158",
    "ticketBookedTime": "2022-09-26T21:35:54.598Z",
    "noOfSeats": 10,
    "status": "IN_PROGRESS",
    "createdAt": "2022-09-26T21:35:54.603Z",
    "updatedAt": "2022-09-26T21:39:53.926Z"
}
```

---

### 19 get single Booking (user and admin only)
```sh
GET /mba/api/v1/bookings/:id
Headers : 
 Content-Type : application/json
 x-access-token :eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3QyIiwiaWF0IjoxNjY0MjI1OTMyLCJleHAiOjE2NjQyMjYwNTJ9.MEbOibT61lt63A8mHD9DukvRgUFPOBR_2SIJmm_N3HE

Path Variables :
 id : 63320cbb0e89b5da70f1d164
sample request body : {}

sample response body : 
{
    "_id": "63320cbb0e89b5da70f1d164",
    "totalCost": 725,
    "theatreId": "63320c45d9c8393eedcaad5e",
    "movieId": "63320c45d9c8393eedcaad64",
    "userId": "63320c740e89b5da70f1d158",
    "ticketBookedTime": "2022-09-26T20:34:03.378Z",
    "noOfSeats": 5,
    "status": "IN_PROGRESS",
    "createdAt": "2022-09-26T20:34:03.381Z",
    "updatedAt": "2022-09-26T20:34:03.381Z"
}
```

---

### 20.1  get all  booking (only user can booked);
```sh
GET /mba/api/v1/bookings
Headers : 
 Content-Type : application/json
 x-access-token :eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3QyIiwiaWF0IjoxNjY0MjI1OTMyLCJleHAiOjE2NjQyMjYwNTJ9.MEbOibT61lt63A8mHD9DukvRgUFPOBR_2SIJmm_N3HE

sample request body : {}

sample response body : 
[
     {
        "_id": "63321810c766c30c5df84d71",
        "totalCost": 725,
        "theatreId": "63320c45d9c8393eedcaad5e",
        "movieId": "63320c45d9c8393eedcaad64",
        "userId": "63320c740e89b5da70f1d158",
        "ticketBookedTime": "2022-09-26T21:22:24.484Z",
        "noOfSeats": 10,
        "status": "IN_PROGRESS",
        "createdAt": "2022-09-26T21:22:24.497Z",
        "updatedAt": "2022-09-26T21:25:20.352Z"
    },
    {
        "_id": "63321b3add16ed73d477b5ad",
        "totalCost": 1450,
        "theatreId": "63320c45d9c8393eedcaad5e",
        "movieId": "63320c45d9c8393eedcaad64",
        "userId": "63320c740e89b5da70f1d158",
        "ticketBookedTime": "2022-09-26T21:35:54.598Z",
        "noOfSeats": 10,
        "status": "IN_PROGRESS",
        "createdAt": "2022-09-26T21:35:54.603Z",
        "updatedAt": "2022-09-26T21:39:53.926Z"
    }
]
```

---

### 20.2  get all  booking (admin can get all booking);
```sh
GET /mba/api/v1/bookings
Headers : 
 Content-Type : application/json
 x-access-token :eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNjY0MjI4NzI2LCJleHAiOjE2NjQyMjg4NDZ9.6py8qI_H-DOPPxwUlwt1AT3ThY0cUiqb6CDOmj-ZrMo

sample request body : {}

sample response body : 
[
    {
        "_id": "63320c45d9c8393eedcaad6b",
        "totalCost": 200,
        "theatreId": "63320c45d9c8393eedcaad5e",
        "movieId": "63320c45d9c8393eedcaad64",
        "userId": "63320c45d9c8393eedcaad5a",
        "ticketBookedTime": "2022-09-26T20:32:05.767Z",
        "noOfSeats": 2,
        "status": "COMPLETED",
        "createdAt": "2022-09-26T20:32:05.768Z",
        "updatedAt": "2022-09-26T20:32:05.768Z"
    },
    {
        "_id": "63320cbb0e89b5da70f1d164",
        "totalCost": 725,
        "theatreId": "63320c45d9c8393eedcaad5e",
        "movieId": "63320c45d9c8393eedcaad64",
        "userId": "63320c740e89b5da70f1d158",
        "ticketBookedTime": "2022-09-26T20:34:03.378Z",
        "noOfSeats": 5,
        "status": "IN_PROGRESS",
        "createdAt": "2022-09-26T20:34:03.381Z",
        "updatedAt": "2022-09-26T20:34:03.381Z"
    },
    {
        "_id": "63321381657b0278037c9f6e",
        "totalCost": 725,
        "theatreId": "63320c45d9c8393eedcaad5e",
        "movieId": "63320c45d9c8393eedcaad64",
        "userId": "63320c740e89b5da70f1d158",
        "ticketBookedTime": "2022-09-26T21:02:57.792Z",
        "noOfSeats": 5,
        "status": "IN_PROGRESS",
        "createdAt": "2022-09-26T21:02:57.804Z",
        "updatedAt": "2022-09-26T21:02:57.804Z"
    },
    {
        "_id": "6332147f202a49e95b3633e3",
        "totalCost": 725,
        "theatreId": "63320c45d9c8393eedcaad5e",
        "movieId": "63320c45d9c8393eedcaad64",
        "userId": "63320c740e89b5da70f1d158",
        "ticketBookedTime": "2022-09-26T21:07:11.296Z",
        "noOfSeats": 10,
        "status": "IN_PROGRESS",
        "createdAt": "2022-09-26T21:07:11.309Z",
        "updatedAt": "2022-09-26T21:09:25.834Z"
    },
    {
        "_id": "63321810c766c30c5df84d71",
        "totalCost": 725,
        "theatreId": "63320c45d9c8393eedcaad5e",
        "movieId": "63320c45d9c8393eedcaad64",
        "userId": "63320c740e89b5da70f1d158",
        "ticketBookedTime": "2022-09-26T21:22:24.484Z",
        "noOfSeats": 10,
        "status": "IN_PROGRESS",
        "createdAt": "2022-09-26T21:22:24.497Z",
        "updatedAt": "2022-09-26T21:25:20.352Z"
    },
    {
        "_id": "63321b3add16ed73d477b5ad",
        "totalCost": 1450,
        "theatreId": "63320c45d9c8393eedcaad5e",
        "movieId": "63320c45d9c8393eedcaad64",
        "userId": "63320c740e89b5da70f1d158",
        "ticketBookedTime": "2022-09-26T21:35:54.598Z",
        "noOfSeats": 10,
        "status": "IN_PROGRESS",
        "createdAt": "2022-09-26T21:35:54.603Z",
        "updatedAt": "2022-09-26T21:39:53.926Z"
    }
]
```


--

### 21 Payment 
```sh
POST /mba/api/v1/payments
Headers : 
 Content-Type : application/json
 x-access-token :eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3QyIiwiaWF0IjoxNjY0MjI5MzUwLCJleHAiOjE2NjQyMjk0NzB9.zn9YSZOdZoH-6aBq86p-bDQH5SEuCbWNr5eqoRur_jU


sample request body : 
{
    "bookingId" : "63321fee7d9482b48c504294",
    "amount"  : 725,
    "status" : "SUCCESS"
}

sample response body : 
{
    "bookingId": "63321fee7d9482b48c504294",
    "amount": 725,
    "status": "SUCCESS",
    "_id": "633220007d9482b48c50429a",
    "createdAt": "2022-09-26T21:56:16.369Z",
    "updatedAt": "2022-09-26T21:56:16.369Z"
}
```

---

### 22 Get Single Payment 
```sh
GET /mba/api/v1/payments/:id
Headers : 
 Content-Type : application/json
 x-access-token :eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3QyIiwiaWF0IjoxNjY0MjI5MzUwLCJleHAiOjE2NjQyMjk0NzB9.zn9YSZOdZoH-6aBq86p-bDQH5SEuCbWNr5eqoRur_jU

Path Variables :
 id : 63321fee7d9482b48c504294

sample request body : {}

sample response body : 
{
    "_id": "633220f6faf68f29b21e81b0",
    "bookingId": "633220e3faf68f29b21e81aa",
    "amount": 725,
    "status": "SUCCESS",
    "createdAt": "2022-09-26T22:00:22.497Z",
    "updatedAt": "2022-09-26T22:00:22.497Z"
}
```

---

### 23  Get All Payments 
```sh
GET /mba/api/v1/payments
Headers : 
 Content-Type : application/json
 x-access-token :eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3QyIiwiaWF0IjoxNjY0MjI5MzUwLCJleHAiOjE2NjQyMjk0NzB9.zn9YSZOdZoH-6aBq86p-bDQH5SEuCbWNr5eqoRur_jU

sample request body : {}

sample response body : 
[
    {
        "_id": "633220007d9482b48c50429a",
        "bookingId": "63321fee7d9482b48c504294",
        "amount": 725,
        "status": "SUCCESS",
        "createdAt": "2022-09-26T21:56:16.369Z",
        "updatedAt": "2022-09-26T21:56:16.369Z"
    },
    {
        "_id": "633220f6faf68f29b21e81b0",
        "bookingId": "633220e3faf68f29b21e81aa",
        "amount": 725,
        "status": "SUCCESS",
        "createdAt": "2022-09-26T22:00:22.497Z",
        "updatedAt": "2022-09-26T22:00:22.497Z"
    }
]
```

###
POSTMAN Collection [link](https://www.getpostman.com/collections/7f1e22b84529523427bb)