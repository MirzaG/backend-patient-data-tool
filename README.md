# Patient Data Collection Tool 
This is a simple project to collect patient data based on dynamic questions with is backed with NodeJs express framework.
Here API access token encapsulated/encrypted with JWT token based system.
 - /pub/login API ready for login 
 - API middlewares for normal user and Admin user
 - ES6 import/export available to the user with spread operators
 - jest test configured(For users)

### Project Setup
Setup .env file as per your system

> copy **.env.local** file to **.env** file

### Installing libraries
```
> npm install (this will install all dependent libraries)
```

### Database Config Setup
Create new database (I have used postgres and my database name is **patient_survey**).
so in my **.env** file will set below parameters.
```
DB_HOST=localhost               # database connection host
DB_USER=root                    # database username
DB_PASS=secret@123              # database password
DB_NAME=patient_survey          # database name
DB_DIALECT=postgres             # database dialect
DB_PORT=5432                    # database port
```
some other inportant parameters/keys in **.env** file
```
APP_HOST=localhost      # application host name
APP_PORT=8080           # application port
SECRET=secret           # secret key for encrypt/decrypt JWT token
```

are you going to user google captcha while register? then also add/update in .env 
```
IS_GOOGLE_AUTH_ENABLE=true          # enable google captcha
GOOGLE_CAPTCHA_SECRET_CLIENT=secret
GOOGLE_CAPTCHA_SECRET_SERVER=secret
GOOGLE_CAPTCHA_URL=https://www.google.com/recaptcha/api/siteverify
```


### Migration and Seeders run
After creating database and updating .env file run below commands
```
> npm run db:migrate
> npm run db:seed:all
```
Migration will create table users and seed some default users
* **users** - this is normal user table with some required fields like (firstName, lastName, email, password, and isAdmin)
Seeders will create some users including one admin, some patients, doctors and staff members.

`npm start` to run your project 
>Everythig is setup and you are good to go now. Happy Coding :)



# Other Information about setup/commands
## Useful terminal commands
```
> npm run model:generate User --attributes firstName:string,lastName:string,email:string
> npm run db:migrate
> npm run db:migrate:undo
> npm run db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js
> npm run seed:generate demo-user
```

## Middlewares
```
> ApiAuth this will check user access token that we have return in login response.
> AdminAuth this will check admin auth and it's access.
```

## Routing files
> Currently we have added 3 routing files 
```
> pub.js   # public routing access everyone can access this APIs
> api.js   # only logged in user/ with vaild token user can access this routes
> admin.js # only admin can access with valid token
```
## Example APIs


### Login
```
> POST : http:localhost:8080/pub/login   
> Payload: email, password
> Response : 
{
    "code": 200,
    "data": {
        "user": {
            "id": 1,
            "firstName": "Admin",
            "lastName": "User",
            "email": "admin@gmail.com",
            "profilePic": null,
            "isAdmin": true,
            "verifyToken": null,
            "isVerified": true,
            "createdAt": "2019-05-27T07:15:12.000Z",
            "updatedAt": "2019-05-27T07:15:12.000Z"
        },
        "token": "secret token"
    },
    "success": true
}
```
### Get user
```
> GET : http:localhost:8080/api/me   
> Headers : 
        x-token (access token)
> Response : 
{
    "code": 200,
    "data": {
        "user": {
            "id": 1,
            "firstName": "Admin",
            "lastName": "User",
            "email": "admin@gmail.com",
            "profilePic": null,
            "isVerified": true,
            "createdAt": "2019-05-27T07:15:12.000Z",
            "updatedAt": "2019-05-27T07:15:12.000Z"
        }
    },
    "success": true
}
```
### Success Response
```
{
    "success": true,
    "code": 200,
    "data": "object or array"
}
```
### Error Response
```
{
    "success": false,
    "code": 500,
    "errorMessage": "Incorrect Email Id/Password",
    "error": {},
    "data": null
}