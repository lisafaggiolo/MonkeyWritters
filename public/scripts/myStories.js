$(() => {
  console.log("Hello")
  loadMyStories()


});


const loadMyStories = function() {
  console.log("stories are loading????????????????????")

    $.ajax({
      url:"/api/stories/mystories",
      method:"GET"
    })
      .then((response) => {
        //console.log(`response: ${JSON.stringify(response)}`)

        for (let story of response.stories) {
          let storyElement = makeStoryElement(story)
          $("#render-ownerStories").prepend(storyElement)
        }
    });
  };


function makeStoryElement(story) {
    return `
    <div class="box">
    <header>
      <div class="top-left">
          <div>
            <img src="${story.avatar_url}">
          </div>
          <div class="top-left-column">
              <span>creator</span>
              <span class="story-owner">${story.owner}</span>
          </div>
      </div>
      <div class="top-right">
          <div class="top-right-column">
            <span></span>
            <span></span>
          </div>
          <div>
          </div>
      </div>
    </header>
    <div class="storyTitle">
    <span>${story.title}</span>
    </div>
    <div class="text-section">


    ${story.content}
    </div>
    <footer>
    <a class="nav-item nav-link" href="/stories/${story.id}">Contribution to this story</a>
    </footer>
  </div>
    `
  }
