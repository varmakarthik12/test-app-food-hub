# test-app-food-hub

use `yarn install `to build

Here are some sample CURL's
## POST
```
curl --location --request POST 'http://localhost:8092/books' \
--header 'Authorization: eyJ0b2tlbiI6InNvbWUtc2VjcmV0LXRva2VuIiwiaWQiOiJzb21lVW5pcXVlVXNlciJ9' \
--header 'Content-Type: application/json' \
--data-raw '{
    "bookName": "The art of saying NO"
}'
```

## GET
```
curl --location --request GET 'http://localhost:8092/books' \
--header 'Authorization: eyJ0b2tlbiI6InNvbWUtc2VjcmV0LXRva2VuIiwiaWQiOiJzb21lVW5pcXVlVXNlciJ9'
```