# test-app-food-hub

## Installing & running the app
```
yarn install
yarn start-server
```

Here are some sample CURL's
## POST
```
curl --location --request POST 'http://localhost:8092/book' \
--header 'Authorization: eyJ0b2tlbiI6InNvbWUtc2VjcmV0LXRva2VuIiwiaWQiOiJzb21lVW5pcXVlVXNlciJ9' \
--header 'Content-Type: application/json' \
--data-raw '{"BookName":"Newtons laW","AuthorName":"Newton","Info":"General Info"}'
```

## GET
```
curl --location --request GET 'http://localhost:8092/books' \
--data-raw ''
```