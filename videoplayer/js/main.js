// properties
var XML_PATH = "videoplayer/xml/config.xml";
var video_width;
var video_height;
var videos_array=new Array();


// init the application
function init()
{
  // call loadXML function
  loadXML();
}


// XML loading
function loadXML()
{
  $.ajax({
      type: "GET",
      url: XML_PATH,
      dataType: "xml",
      success: function onXMLloaded(xml)
      {
        // set video_width and video_height
        video_width=$(xml).find("videos").attr("width");
        video_height=$(xml).find("videos").attr("height");
        
        // loop for each item
        $(xml).find('item').each(function loopingItems(value)
        {  
          // create an object
          var obj={title:$(this).find("title").text(), mp4:$(this).find("mp4").text(), ogg:$(this).find("ogg").text(), description:$(this).find("description").text()};
          videos_array.push(obj);
          
          // append <ul> and video title
          $("#mycustomscroll").append('<ul>');
          $("#mycustomscroll").append('<a><li id="item"><strong>'+obj.title+'</strong></li></a>');
        });
        
        // close </ul>
        $("#mycustomscroll").append('</ul>');
        // append video tag player
        $("#leftcolumn").append('<video width="'+video_width+'" height="'+video_height+'" controls="controls"><source src="'+videos_array[0].mp4+'" type="video/mp4" /><source src="'+videos_array[0].ogg+'" type="video/ogg" />Your browser does not support the video tag.</video>');
        // append description
        $("#description").append(videos_array[0].description);
        
        // call addListeners function
        addListeners();
      }
  });
}

// add <li> listener
function addListeners()
{
  // loop for each list item
  $('#mycustomscroll li').each(function looping(index)
  {
    // onclick...
    $(this).click(function onItemClick()
    {
      // empty left column and description
      $("#leftcolumn").empty();
      $("#description").empty();
      // append video tag
      $("#leftcolumn").append('<video width="'+video_width+'" height="'+video_height+'" controls="controls"><source src="'+videos_array[index].mp4+'" type="video/mp4" /><source src="'+videos_array[index].ogg+'" type="video/ogg" />Your browser does not support the video tag.</video>');
      // append description
      $("#description").append(videos_array[index].description);
    });
  });
}