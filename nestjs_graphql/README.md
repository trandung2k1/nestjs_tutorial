```js
Query
```
query UsersQuery {
  getAllUsers {
    name
  }
}

```js
Mutation
```
mutation CreateUser($payload: CreateUserModel!) {
  createUser(payload: $payload) {
    name
    email
  }
}


```js
Variables
```
{
  "payload": {
    "name": "Dung",
    "email": "trandungksnb00@gmail.com"
  }
}