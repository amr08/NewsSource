// // // Grab the articles as a json
// $.getJSON("/articles", function(data) {
//   console.log(data)
//   // For each one
//   for (var i = 0; i < data.length; i++) {
//     // Display the apropos information on the page
//     $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
//   }
// });



// $(document).on("click", "#savenote", function(event) {
//   console.log("works")
//   event.preventDefault();
//   $("#notes").empty();

//   var thisId = $(this).attr("data-id");
  
//   $.ajax({
//     method: "GET",
//     url: "/articles/" + thisId
//   })
//     // With that done, add the note information to the page
//     .done(function(data) {
//       console.log(data.note);
//       // $("#notes").append("<input id='titleinput' name='title' >");
//       // // A textarea to add a new note body
//       // $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
//       // // A button to submit a new note, with the id of the article saved to it
//       // $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

//       // If there's a note in the article
//       if (data.note) {

//         $("#notes").val(data.note.body);
//       }
//     });
// });

// When you click the savenote button
// $(document).on("click", "#savenote", function() {
//   // Grab the id associated with the article from the submit button
//   var thisId = $(this).attr("data-id");
//   console.log("were saving the note:" + thisId)

//   // Run a POST request to change the note, using what's entered in the inputs
//   $.ajax({
//     method: "POST",
//     url: "/articles/" + thisId,
//     data: {
    
//       // Value taken from note textarea
//       body: $("#notes").val()
//     }
//   })
//     // With that done
//     .done(function(data) {
//       // Log the response
//       console.log(data);
//       // Empty the notes section
//       $("#notes").empty();
//     });

//   // Also, remove the values entered in the input and textarea for note entry
//   $("#notes").val("");

// });
