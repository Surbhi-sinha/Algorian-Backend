for registering the user the API = LOCALHOST /api/auth/signup
for signin   = LocalHOST /api/auth/signin => returns a jwt accessToken which is then used to check the roles and contents.

for user => user content
for admin => admin content
for moderator => moderator content

set the x-access-token in the headers of the request in postman and send request to api api/test/user or  api/test/moderator or api/test/admin