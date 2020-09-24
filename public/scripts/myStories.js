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
              <span>${story.owner}</span>
          </div>
      </div>
      <div class="top-right">
          <div class="top-right-column">
            <span>contributor</span>
            <span>contributors.user_name</span>
          </div>
          <div>
          <img src="/images/av6.png">
          </div>
      </div>
    </header>
    ${story.title}
    <div class="text-section">
  
    ${story.content}
    </div>
    <footer>
    <a class="nav-item nav-link" href="/stories/${story.id}">Add contribution to story</a>
      <span>rate this prospect</span>
    </footer>
  </div>
    `
  }