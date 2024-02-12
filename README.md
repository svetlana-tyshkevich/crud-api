# Crud-api

#### Downloading repository

```
git clone git@github.com:svetlana-tyshkevich/crud-api.git
```

#### Switch to branch "task-03"

```
git checkout task-03
```

#### Installing NPM modules

```
npm i
```

#### Running application with nodemon (development mode)

```
npm run start:dev
```

Now you can check how application works by using API testing tools, such as Postman or another.
Application starts on port "3000" as default or you may sete it value in .env file
Example of request (GET): ```http://localhost:3000/user/```
If you want to stop the server press ```CTRL + C``` 

#### Building application with Webpack and running (production mode)

```
npm run start:prod
```

#### Testing

```
npm run test
```