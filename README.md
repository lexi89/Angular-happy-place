# Todo
0. ~~Write API endpoints~~
1. ~~Add error-handling to saveQuestion function.~~
2. ~~Edit / delete questions~~
3. ~~Add user authentication and authorization.~~
4. ~~Draw out user auth flow.~~
5. Persist users
5. Dashboard page
6. Make questions re-orderable and draggable

# Feature roadmap:
1. Dashboard with list of homeworks.
2. Advanced math operators.
3. Browse homework catalogue
4. Save / bookmark homeworks from catalogues.
5. Invite other teachers.


# Bugs:
1. Multiple operators allowed in input (e.g. "1-+1")
2. Duplicate entries aren't processed.


Authentication has to happen server-side. If authentication is in the hands of the client, they can can manipulate it.

index is the homepage.

Version 1: users log in to access the dashboard.

dashboard is where the user-authed part of the app starts.

Freemium model.
Users can access the app for free but have limited abilities. E.g. can only save x amount of questions.

Restrict actions based on premiumUser attribute.

Restricted actions:
Adding more than 10 questions.
Saving more than 10 homeworks.
Adding friends.
Sharing homeworks.
