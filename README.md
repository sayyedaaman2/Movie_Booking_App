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

## REST API endpoints

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
Detials about the JSON structure
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

### 8 Get single Movie
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


