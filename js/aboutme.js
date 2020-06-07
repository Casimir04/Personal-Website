$(function () {
  const about = {
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
      menu.init(2);
      setTimeout(() => {
        this.$home.hide();
      }, 400);
    },
    cacheDom: function () {
      this.$home = $(".home");
      this.$overview = this.$home.find(".overview");
      this.$overviewH = this.$overview.find("h2");
      this.$overviewP = this.$overview.find("p");
      this.$skills = this.$home.find(".skills-sec");
      this.$skillsH1 = this.$skills.find(".heading");
      this.$skillsH2 = this.$skills.find("article h2");
      this.$hamburger = this.$home.find("menu");
    },
    start: function () {
      this.$home.addClass("fade-in").show();
      setTimeout(() => {
        this.$overviewH.addClass("slide-in").css("opacity", "1");
        this.$skillsH1.addClass("slide-in").css("opacity", "1");
      }, 400);

      setTimeout(() => {
        this.$overviewP.addClass("slide-in").css("opacity", ".9");
        this.$skillsH2.addClass("slide-in").css("opacity", ".75");
      }, 800);
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
      about.start();
    },
  };

  about.init();
});
