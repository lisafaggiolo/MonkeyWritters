$(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;


const loadMyStories = function() {
  $.ajax("/api/stories/mystories", { method: "GET",
  success: function(response) {
    console.log(`response: ${JSON.stringify(response)}`)
    let storyElements = [];
    for (const story of response.stories) {
      const storyElement = makeStoryElement(story)
      storyElements.push(storyElement);
    }
    $("#render-ownerStories").append(storyElements)
  }
});
}
loadMyStories()




// Fetch Existing Stories
  const loadstories = function() {
    $.ajax("/api/stories", { method: "GET",
      success: function(response) {
        console.log(`response: ${JSON.stringify(response)}`)
        let storyElements = [];
        for (const story of response.stories) {
          const storyElement = makeStoryElement(story)
          storyElements.push(storyElement);
        }
        $("#render-stories").append(storyElements)
      }
    });
  };
  loadstories()
});


function makeStoryElement(story) {
  return `
  <div class="box">
  <header>
    <div class="top-left">
        <div>
          <img src="/images/av3.png">
        </div>
        <div class="top-left-column">
            <span>creator</span>
            <span>users.username</span>
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
    <span>Add contribution to story</span>
    <span>rate this prospect</span>
  </footer>
</div>
  `
}
// in the future put seperate request in separate folders and in templates(index.ejs and mystories.ejs) require all those folders instead of only app.js
