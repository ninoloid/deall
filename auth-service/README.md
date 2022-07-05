# Auth Service

## Initialization

### Requirements (must be installed on your device)

- NodeJS v14
- Mongodb

Install all the dependency, type

```
npm i
```

## Seeding

To seed data, type

```
npm run seed
```

## Running

To run the service, type

```
npm run dev
```

## Available Endpoint

### Register

```
URL:
  http://127.0.0.1:3000/user/register

Body:
  {
    "username": "username",
    "password": "password",
    "role": "ADMIN",
    "name": "name of the user",
    "email": "thisisuseremail@mail.com",
    "phone": "123456789"
  }
```

```
URL:
  http://127.0.0.1:3000/auth/login

Body:
  {
    "username": "username",
    "password": "password"
  }
```

```
URL:
  http://127.0.0.1:3000/user/:userid

Params:
  id

This url implement authentication and authorization. IF the role of the user is ADMIN, user can see the details of all users. But, if the role of the user is USER, user can only see the details of him/herself.
```

Authentication middleware can accept array of role. For example, if we use ['ADMIN'] as parameter of authentication middleware, then the route can only be accessed by the admin.

```
Example :
  http://127.0.0.1:3000/admin-only

This endpoint can only be accessed by the admin.
```