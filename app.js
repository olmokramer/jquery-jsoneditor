(function($) {
  $(document).ready(function() {
    //init
    $("#main").html(createNode());
    $("#main").find(".key").focus();

    //add a click listener to the button
    $("button").click(function() {
      alert(getJSON(true));
    });
  });

  /*
  event listener for 'paste'
  */

  $(document).bind("paste", $(".value"), function(e) {
    setTimeout(function() {
      $(e.target).html($(e.target).text().replace(/\n/g, '[newline]'));
    }, 10)
  });


  /*
  listener for 'keyup'
  */

  $(document).on("keyup", function(e) {
    switch ($(e.target).attr("class")) {
      case "key":
        keyKeyupListener(e);
        break;
      case "value":
        valueKeyupListener(e);
        break;
    }
    $("textarea").val($("#main").html());
  });

  /*
  handles the key events for a '.key' element
  */

  function keyKeyupListener(e) {
    switch (e.which) {
      case 13:
        $(e.target).text($(e.target).text());
        $(e.target).parent().find(".value").focus();
        document.execCommand('selectAll', false, null);
        break;
      case 8:
        if ($(e.target).text().length === 0)
          return $(e.target).empty();
        break;
    }
  }

  /*
  handles the key events for a '.value' element
  */

  function valueKeyupListener(e) {
    switch (e.which) {
      case 13:
        $(e.target).text($(e.target).text());
        $("#main").append(createNode());
        $(e.target).parent().parent().find(".key").last().focus();
        break;
      case 8:
        if ($(e.target).text().length === 0)
          $(e.target).empty();
        break;
      default:
        return false;
        break;
    }
  }

  /*
  create a new node
  */

  function createNode() {
    return $('<tr class="node"><td class="key" contenteditable="true" data-placeholder="key"></td> <td class="separator">:</td> <td class="value" contenteditable="true" data-placeholder="String"></td></tr>');
  }

  /*
  get the json data
  */

  function getJSON(stringify) {
    var data = {};
    $(".node").each(function() {
      if ($(this).find('.key').text().length > 0)
        data[$(this).find('.key').text()] = $(this).find('.value').text();
    });
    return (stringify) ? JSON.stringify(data) : data;
  }
}(jQuery));