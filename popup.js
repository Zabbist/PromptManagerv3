$(document).ready(function() {
  // Initial content
  $('#content').html('Initial content');

  // Hello button click event
  $('#mainBtn').click(function() {
    $('#content').html('Hello');
  });

  // World button click event
  $('#worldBtn').click(function() {
    $('#preferencesBtn').html('World');
  });
});
