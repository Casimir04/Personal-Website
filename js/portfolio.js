$(function () {
  const portfolio = {
    init: function () {
      this.cacheDom();
      this.bindEvents();
      this.start();
    },
    bindEvents: function () {
      this.$hamburger.click(() => {
        this.hamburgerClicked();
      });
    },
    hamburgerClicked: function () {
      menu.init(3);
      setTimeout(() => {
        this.$home.hide();
      }, 400);
    },
    cacheDom: function () {
      this.$home = $(".home");
      this.$contentHeader = this.$home.find("h1");
      this.$content = this.$home.find(".portfolio-con a");
      this.$hamburger = this.$home.find("menu");
    },
    start: function () {
      this.$home.show();
      setTimeout(() => {
        this.$contentHeader.addClass("scale").show();

        setTimeout(() => {
          this.$content.each((i, content) => {
            $(content)
              .addClass("scale")
              .parent(".portfolio-con")
              .css("opacity", "1");
          });
        }, 200);
      }, 400);
    },
  };

  const menu = {
    init: function (active) {
      this.cacheDom(active);
      this.bindEvents();
      this.start();
    },
    bindEvents: function () {
      this.$close.click(() => {
        this.close();
      });
    },
    cacheDom: function (active) {
      this.$menu = $("menu.hamburger-menu");
      this.$active = this.$menu.find(`main a:nth-child(${active}) p`);
      this.$close = this.$menu.find("header button");
    },
    start: function () {
      this.$active.addClass("active");
      this.$menu.show().addClass("hamburger-slide");
      this.$menu.parent("body").css("overflow-y", "hidden");
    },
    close: function () {
      this.$menu
        .removeClass("hamburger-slide")
        .addClass("hamburger-slide-back");

      setTimeout(() => {
        this.$menu.hide().removeClass("hamburger-slide-back");
      }, 400);

      this.$menu.parent("body").css("overflow-y", "auto");
      portfolio.start();
    },
  };

  portfolio.init();
});
