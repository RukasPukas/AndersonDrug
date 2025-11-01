// indexSources/Scripts/newsBulletin.js
// jQuery-based carousel for .news-bulletin-carousel instances
(function ($) {
  $(function () {
    // Initialize each carousel independently
    $(".news-bulletin-carousel").each(function () {
      var $carousel = $(this);
      var $stage = $carousel.find(".news-bulletin-stage");
      var $cards = $stage.children(".news-bulletin-container");
      var count = $cards.length;

      // Nothing to do if no cards
      if (!count) return;

      // Prep: hide all, show first
      $cards.hide().attr("aria-hidden", "true");
      $cards.eq(0).show().attr("aria-hidden", "false");

      // Cache state on the carousel
      $carousel.data("nb", { idx: 0, count: count });

      // Disable buttons if only one card
      if (count <= 1) {
        $carousel
          .find(".news-bulletin-btn")
          .addClass("is-disabled")
          .attr("disabled", true);
      }

      // Lock to avoid spamming clicks during animation
      var animating = false;

      function showAt(newIdx) {
        if (animating) return;
        var state = $carousel.data("nb");
        if (!state) return;
        var oldIdx = state.idx;
        if (newIdx === oldIdx) return;

        var $old = $cards.eq(oldIdx);
        var $new = $cards.eq(newIdx);

        animating = true;
        // Fade transition
        $old.stop(true, true).fadeOut(160, function () {
          $old.attr("aria-hidden", "true");
          $new.stop(true, true).fadeIn(200, function () {
            $new.attr("aria-hidden", "false");
            state.idx = newIdx;
            $carousel.data("nb", state);
            animating = false;
          });
        });
      }

      // Next / Prev handlers
      $carousel.on("click", ".news-bulletin-btn-next", function () {
        var state = $carousel.data("nb");
        if (!state || state.count < 2) return;
        var nextIdx = (state.idx + 1) % state.count;
        showAt(nextIdx);
      });

      $carousel.on("click", ".news-bulletin-btn-prev", function () {
        var state = $carousel.data("nb");
        if (!state || state.count < 2) return;
        var prevIdx = (state.idx - 1 + state.count) % state.count;
        showAt(prevIdx);
      });

      // Keyboard support: left/right arrows when carousel is focused
      // (Tab to a button, then use arrows)
      $carousel.attr("tabindex", "0").on("keydown", function (e) {
        if (e.key === "ArrowRight") {
          $carousel.find(".news-bulletin-btn-next").trigger("click");
        } else if (e.key === "ArrowLeft") {
          $carousel.find(".news-bulletin-btn-prev").trigger("click");
        }
      });

      // Optional: fix stage height to the tallest card to avoid layout jumps
      // (Run after images load)
      function setStageHeight() {
        var maxH = 0;
        $cards.each(function () {
          var $c = $(this);
          var wasHidden = $c.css("display") === "none";
          if (wasHidden) $c.css({ visibility: "hidden" }).show();
          maxH = Math.max(maxH, $c.outerHeight(true));
          if (wasHidden) $c.hide().css({ visibility: "" });
        });
        $stage.css("min-height", maxH + "px");
      }

      // Initial and on window load (for images)
      setStageHeight();
      $(window).on("load resize", setStageHeight);
    });
  });
})(jQuery);
