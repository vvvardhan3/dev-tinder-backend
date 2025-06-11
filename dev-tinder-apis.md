# APIS

## authRouter
POST/Signup
POST/login
POST/logout

## profileRouter
GET/profile/view
PATCH/profile/edit
PATCH/profile/password

## connectionRequestRouter
POST/request/send/ignored/:userID
POST/request/send/interested/:userID
POST/request/review/accepted/:requestID
POST/request/review/rejected/:requestID

## userRouter
GET/connections
GET/requests/received
GET/feed
