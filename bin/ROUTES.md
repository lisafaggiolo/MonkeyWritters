# USER ROUTES
### METHOD       ### ROUTE                               ### ACTION
#### Lgin/register and log out routs 
GET           /                        Home page, would only show the login/register and app name
GET/POST      /register                If not, register please
GET/POST      /login                   Login 
POST          /logout

#### user routs only
GET          /user/stories             users can view a list of stories on homepage along with these status
GET          /user/:story              users can read a specific story
POST         /user/:story              users can add contributions to an existing story

#### Only a creators
POST          /stories/new             authorized users can start a story
POST          /stories/:story/edit     authorized users can edit there stories
POST          /stories/:story/delete   authorized users can edit there stories
POST          /stories/:story/update   creator of story can accept a contribution; merge to the rest of story 
          


