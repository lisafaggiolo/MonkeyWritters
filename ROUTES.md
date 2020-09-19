# USER ROUTES
### METHOD       ### ROUTE                               ### ACTION
#### Lgin/register and log out routs 
GET           /                        Home page, would only show the login/register and app name
GET/POST      /register                If not, register please
GET/POST      /login                   Login 
POST          /logout

#### user routs only
GET          /stories                   users can view a list of stories on homepage along with these status
GET          /stories/:storyID           users can read a specific story
POST         /stories/:storyID            users can add contributions to an existing story

#### Only a creators
GET           /myStories
POST          /myStories/new             authorized users can start a story
POST          /myStories/:story/edit     authorized users can edit there myStories
POST          /myStories/:story/delete   authorized users can edit there myStories
POST          /myStories/:story/update   creator of story can accept a contribution; merge to the rest of story 
          


