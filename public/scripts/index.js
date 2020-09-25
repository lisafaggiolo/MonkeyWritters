$(() => {

// -------------------Fetch all Stories-------------------

loadstories();



});

const loadstories = function() {
    $.ajax("/api/stories", { method: "GET",
      success: function(response) {
        //console.log(`response: ${JSON.stringify(response)}`)
        //console.log(response.stories)

        for (const story of response.stories) {

          if (story.closed) {
            story.status = "completed"
          } else {
            story.status = "in progress"
          }
          //console.log("STORY OF STORIES", story)
        }

        for (const story of response.stories) {
          const storyElement = makeStoryElement(story)
          $("#render-stories").prepend(storyElement);
        }

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
            <span>Status</span>
            <span>${story.status}</span>
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
    <div class="index-story">
      <a class="${story.closed ? "hide": ""} nav-item nav-link" href="/stories/${story.id}">Add contribution to story</a>
    </div>
    </footer>
  </div>
    `
  }
