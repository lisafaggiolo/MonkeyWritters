$(() => {

$("#contributeStory-form").submit(submitForm);

loadContributions()

});



const submitForm = function(event) {
  event.preventDefault();
  const $form = $(this);
  const data = $form.serialize();
  console.log("FORM DATA =>",data);
  const url = $("#contributeStory-form").attr("action");
 // const url = $form.attr('action');
  console.log("URL =>", url);

  $.ajax(url, {method: "POST", data})
    .then(() => {
      loadContributions();

      $("#contribution-text").val("");
    });
}





const loadContributions = function() {
  const storyID = $('#storyID').val()
  console.log("STORY ID =>", storyID);
  const url = `/api/stories/${storyID}`;
 // console.log("URL =>" , url);


  $.ajax(url)

    .then((response) => {

      console.log("prospects loadiiiiing", response);
      console.log(`response: ${JSON.stringify(response)}`)

      for (const prospect of response.prospects) {
        console.log(storyID);
        const prospectElement = makeStoryElement(prospect)
        $("#render-prospects").prepend(prospectElement)
      }

    });
  };


function makeStoryElement(story) {
  console.log("DFSDFSDFDS---------", $(storyID).val());
  return `
  <div class="box">
  <header>
    <div class="top-left">
        <div>
          <img src="${story.avatar_url}">
        </div>
        <div class="top-left-column">
            <span>Monkey</span>
            <span class="story-owner">${story.owner}</span>
        </div>
    </div>
    <div class="top-right">
        <div class="top-right-column">

        </div>
        <div>

        </div>
    </div>

  </header>
  <form method= "POST" action= "/api/stories/${$(storyID).val()}/prospects/${story.id}">
  <textarea readonly name="prospect-content" id="prospect-content" class="text-section">
  ${story.content}
  </textarea>
  <footer>
  <button class="btn btn-success">Add this to my story</button>
  <input type="hidden" name="prospectID" id="prospectID" value="1"/>
  </form>
  <form method= "POST" action= "/api/stories/${$(storyID).val()}/prospects/${story.id}/vote">
  <div id="voteCounter">
    <span><button type="submit"  class="voteButton"><img src="/images/vote.png" alt="">Upvote this contribution</button></span>
    <span>${story.votes}</span>
  </div>
  </form>  
  </footer>
  </form>
  </div>
  `
}

