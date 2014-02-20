var post_index_tpl = '\
    <h1><a href="/posts/<%= id %>"><%= title %></a></h1>\
    <p class="lead">by <a href="#">Author Name</a></p>\
    <hr>\
    <p><span class="glyphicon glyphicon-time"></span> Tornadoed on <span class="dateTime"></span></p>\
    <p><span class="emotions"></span></p>\
    <hr>\
    <img src="http://placehold.it/900x300" class="img-responsive">\
    <p><%= body %></p>\
    <button class="btn btn-primary read-more">Read More <span class="glyphicon glyphicon-chevron-right"></span></button> \
  <hr>\
';

var edit_post_tpl = " \
    <h3> \
      <input type='text' value='<%= title %>'> \
    </h3> \
    <textarea><%= body %></textarea> \
  <input class='save-button btn btn-default' type='button' value='Save'> \
";

// /posts/<%= id %>