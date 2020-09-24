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
         
      $("contribution-text").val("");
    });  
}





const loadContributions = function() {
  const storyID = $('#storyID').val()
 // console.log("STORY ID =>", storyID);
  const url = `/api/stories/${storyID}`;
 // console.log("URL =>" , url);


  $.ajax(url)
    
    .then((response) => {

      console.log("prospects loadiiiiing", response);
      console.log(`response: ${JSON.stringify(response)}`)
  
      for (const prospect of response.prospects) {
        const prospectElement = makeStoryElement(prospect)
        $("#render-prospects").prepend(prospectElement)  
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
// in the future put seperate request in separate folders and in templates(index.ejs and mystories.ejs) require all those folders instead of only app.js
