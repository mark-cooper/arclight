Blacklight.onLoad(function () {
  'use strict';

  $('[data-arclight-oembed="true"]').each(function (i, element) {
    var $el = $(element);
    var data = $el.data();
    var resourceUrl = data.arclightOembedUrl;
    $.ajax({
      url: resourceUrl,
      dataType: 'html'
    }).done(function (response) {
      var links = $('<div>' + response.match(/<link .*>/g).join('') + '</div>'); // Parse out link elements so image assets are not loaded
      var oEmbedEndPoint = links.find('link[rel="alternate"][type="application/json+oembed"]').prop('href');

      if(!oEmbedEndPoint || oEmbedEndPoint.length === 0) {
        return;
      }

      $.ajax({
        url: oEmbedEndPoint
      }).done(function (oEmbedResponse) {
        if(oEmbedResponse.html) {
          $el.hide()
             .html(oEmbedResponse.html)
             .fadeIn(500);
        }
      });
    });
  });
});