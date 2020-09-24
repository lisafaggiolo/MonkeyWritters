$(() => {

// -------------------Fetch all Stories-------------------

loadstories();



});

const loadstories = function() {
    $.ajax("/api/stories", { method: "GET",
      success: function(response) {
        console.log(`response: ${JSON.stringify(response)}`)
        let storyElements = [];
        for (const story of response.stories) {
          const storyElement = makeStoryElement(story)
          storyElements.push(storyElement);
        }
        $("#render-stories").prepend(storyElements)
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
            <span>contributor</span>
            <span>contributors.user_name</span>
          </div>
          <div>
          <img src="/images/av6.png">
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
    <a class="nav-item nav-link" href="/stories/${story.id}">Add contribution to story</a>
    </footer>
  </div>
    `
  }
