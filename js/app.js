$(function () {
  const intro = {
    init: function (page) {
      this.cacheDom();
      this.start(page);
    },
    cacheDom: function () {
      this.$intro = $(".intro");
      this.$logoSvg = this.$intro.find("svg");
      this.$logoCir = this.$logoSvg.find("#logo-cir");
      this.$logoRec = this.$logoSvg.find("#logo-rec");
      this.$logoTri = this.$logoSvg.find("#logo-tri");
      this.$label = this.$intro.find(".intro-label");
      this.$labelText = this.$label.find("h1");
      this.$labelBlock = this.$label.find("span");
    },
    start: function (page) {
      this.$intro.show();
      this.$logoCir.addClass("start");
      setTimeout(() => {
        this.$logoRec.addClass("start");
      }, 400);

      setTimeout(() => {
        this.$logoTri.addClass("startRotate");
      }, 800);

      setTimeout(() => {
        this.$labelBlock.addClass("slide");
      }, 1400);

      setTimeout(() => {
        this.$labelBlock.hide();
      }, 2000);

      setTimeout(() => {
        this.fadeOut(this.$intro, page);
      }, 2200);
    },
    fadeOut: function (selected, page) {
      selected.addClass("fade-out");
      selected[0].addEventListener("animationend", () => {
        selected.hide();
      });
      setTimeout(() => {
        home.init();
      }, 300);
    },
  };

  const home = {
    init: function () {
      this.cacheDom();
      this.cacheAnimation();
      this.bindEvents();
      this.start();
    },
    bindEvents: function () {
      this.$hamburger.click(() => {
        this.hamburgerClicked();
      });
    },
    hamburgerClicked: function () {
      menu.init(1);
    },
    cacheDom: function () {
      this.$home = $(".home");
      this.$hamburger = this.$home.find("menu");
      //hero
      this.$hero = this.$home.find(".hero-sec");
      this.$heroImg = this.$hero.find("img");
      this.$heroHeading = this.$hero.find("h1");
      this.$heroIndicator = this.$home.find(".hero-indicator");

      //skills
      this.$skills = this.$home.find(".skills-sec");
      this.$skillsHeading = this.$skills.find(".skills-heading");
      this.$skillsInfoHeading = this.$skills.find("article h2");
      this.$skillsInfoDetails = this.$skills.find("article .details");

      //focus
      this.$focus = this.$home.find(".focus-sec");
      this.$focusHeading = this.$focus.find(".focus-heading");
      this.$focusRow = this.$focus.find(".focus-details-row");
      this.$responsi;

      //team
      this.$team = this.$home.find(".team-sec");

      //process
      this.$process = this.$home.find(".process-sec");
      this.$processTrigger = this.$process.find(
        ".process-details-row:nth-child(2)"
      );

      //best
      this.$best = this.$home.find(".best-sec");

      //footer
      this.$footer = this.$home.find("footer");
    },
    cacheAnimation: function () {
      this.controller = new ScrollMagic.Controller();
      this.cacheSectionGrp();
      this.cachePageScene(this.$hero, this.$hero);
      this.cachePageScene(this.$focus, this.$focus);
      this.cacheFadeInScene(this.$team, this.$team);
      this.cacheFadeInScene(this.$team, this.$process);
      this.cachePageInScene(this.$processTrigger, this.$best);
    },
    cacheSectionGrp: function () {
      this.cacheSlideArray(
        this.$skillsHeading,
        this.$skillsInfoHeading,
        this.$skillsInfoDetails,
        "Skills"
      );
      this.cacheSlideArray(
        this.$focusHeading,
        this.$focusRow,
        this.$focusRow,
        "Focus"
      );
    },
    pushItemIntoArray: function (grp, arr) {
      grp.forEach((items) => {
        items.each((i, item) => {
          arr.push(item);
        });
      });
    },
    cacheSlideArray: function (heading, first, second, sectionType) {
      const arr = [heading];
      let arrangedArr;

      if (sectionType === "Focus") {
        const grp = [first];
        this.pushItemIntoArray(grp, arr);
        arrangedArr = arr;
      } else {
        const grp = [first, second];
        this.pushItemIntoArray(grp, arr);
        arrangedArr = this.arrangeArr(arr);
      }

      this.cacheSlideScene(arrangedArr, sectionType);
      this.slideAnimation(arrangedArr, sectionType);
    },
    cacheSlideScene: function (arr, sectionType) {
      eval(`
        this.slide${sectionType} = gsap.timeline({
          defaults: { duration: 0.15, ease: "power2inOut" },
        });
        this.slideScene = new ScrollMagic.Scene({
        triggerElement: arr[0].parent()[0],
        triggerHook: 0.5,
        })
          .setTween(this.slide${sectionType})
          // .addIndicators()
          .addTo(this.controller)
          .reverse(true);
      `);
    },
    arrangeArr: function (arr) {
      const mid = (arr.length - 1) / 2;
      let next = mid + 1;
      let replace = 2;

      for (let i = 0; i < mid - 1; i++) {
        let current = arr[next];
        arr.splice(next, 1);
        arr.splice(replace, 0, current);
        next++;
        replace += 2;
      }

      return arr;
    },
    slideAnimation: function (arr, sectionType) {
      eval(`
        arr.forEach((item) => {
          this.slide${sectionType}.fromTo(item, { x: "-1%", opacity: 0 }, { x: 0, opacity: 1 });
        });
      `);
    },
    cachePageScene: function (trigger, sectionType) {
      const page = trigger[0];
      this.page = gsap.timeline();
      eval(`
        this.pageScene = new ScrollMagic.Scene({
          triggerElement: page,
          duration: "50%",
          triggerHook: 0,
        })
          .setTween(this.page)
          .setPin(page, { pushFollowers: false })
          // .addIndicators({
          //   name: "page",
          //   indent: 50,
          // })
          .addTo(this.controller);

          this.pageAnimation(sectionType);
      `);
    },
    pageAnimation: function (sectionType) {
      eval(`
        this.page.fromTo(
          sectionType,
          {
            opacity: 1,
            scale: 1,
          },
          {
            opacity: 0,
            scale: 0,
          }
        );
      `);
    },
    cachePageInScene: function (trigger, sectionType) {
      const page = trigger[0];
      this.pageIn = gsap.timeline({
        defaults: { duration: 1, ease: "power2inOut" },
      });

      eval(`
        this.pageInScene = new ScrollMagic.Scene({
          triggerElement: page,
          triggerHook: 0,
        })
          .setTween(this.pageIn)
          // .addIndicators({
          //   name: "page",
          //   indent: 50,
          // })
          .addTo(this.controller);

          this.pageInAnimation(sectionType);
      `);
    },
    pageInAnimation: function (sectionType) {
      eval(`
        this.pageIn.fromTo(
          sectionType,
          {
            opacity: 0,
            scale: 0,
          },
          {
            opacity: 1,
            scale: 1,
          }
        );
      `);
    },
    cacheFadeInScene: function (trigger, sectionType) {
      this.fadeIn = gsap.timeline({
        defaults: { duration: 0.4, ease: "power2inOut" },
      });
      const page = trigger[0];

      eval(`
      this.fadeInScene = new ScrollMagic.Scene({
        triggerElement: page,
        triggerHook: 0.5,
      })
        .setTween(this.fadeIn)
        // .addIndicators({
        //   name: "fadeIn",
        // })
        .addTo(this.controller);
      `);
      this.fadeInAnimation(sectionType);
    },
    fadeInAnimation: function (sectionType) {
      eval(`
      this.fadeIn.fromTo(
        sectionType,
        {
          opacity: 0,
        },
        {
          opacity: 1,
        }
      );
      
      `);
    },
    start: function () {
      this.$home.addClass("fade-in").show();

      setTimeout(() => {
        this.$heroHeading.addClass("slide-in").show();
        this.$heroImg.addClass("slide-in-opp").show();
      }, 400);

      setTimeout(() => {
        this.$heroIndicator.addClass("fade-in");
      }, 700);

      setTimeout(() => {}, 1000);

      setTimeout(() => {
        this.$heroIndicator.addClass("up-down");
      }, 4000);
    },
    resize: function () {
      this.$best.css({
        opacity: 1,
        scale: 1,
      });
    },
  };

  const menu = {
    init: function () {
      this.cacheDom();
      this.bindEvents();
      this.start();
    },
    bindEvents: function () {
      this.$close.click(() => {
        this.close();
      });
    },
    cacheDom: function () {
      this.$menu = $("menu.hamburger-menu");
      this.$close = this.$menu.find("button");
      this.$active = this.$menu.find("main a:first-child p");
      this.$active.addClass("active");
    },
    start: function () {
      this.$menu.hasClass("hamburger-slide-back")
        ? this.$menu.removeClass("hamburger-slide-back")
        : this.$menu;

      this.$menu.addClass("hamburger-slide").show();
      this.$menu.parents("body").css("overflow", "hidden");
    },
    close: function () {
      this.$menu.removeClass("hamburger-slide");
      this.$menu.addClass("hamburger-slide-back");
      this.$menu.parents("body").css("overflow", "auto");
      setTimeout(() => {
        this.$menu.hide();
      }, 400);
    },
  };

  intro.init();
});
