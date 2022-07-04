import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {Draggable} from "gsap/Draggable";

export function initDrag(containerRef) {
  const container = containerRef.current;
  const rowSize = 131;
  const listItems = [...container.children];

  //=======================
  function changeIndex(item, to) {
    arrayMove(sortables, item.index, to);
    if (to === total - 1) {
      container.appendChild(item.element);
    } else {
      const i = item.index > to ? to : to + 1;
      container.insertBefore(item.element, container.children[i]);
    }
    sortables.forEach((sortable, index) => sortable.setIndex(index));
  }

  function arrayMove(array, from, to) {
    array.splice(to, 0, array.splice(from, 1)[0]);
  }

  function clamp(value, a, b) {
    return value < a ? a : (value > b ? b : value);
  }

  const Sortable = (element, index) => {

    const content = element.children[0];

    const animation = gsap.to(content, 0.3, {
      boxShadow: "var(--Purple500) 10px 16px 32px 0px",
      left: "15px",
      force3D: true,
      paused: true
    });

    const dragger = new Draggable(element, {
      onDragStart: downAction,
      onRelease: upAction,
      onDrag: dragAction,
      cursor: "inherit",
      type: "y"
    });
    const sortable = {
      dragger: dragger,
      element: element,
      index: index,
      setIndex: (index) => setIndex(index)
    };
    gsap.set(element, {y: index * rowSize});
    const setIndex = (index) => {
      sortable.index = index;
      //you can dispatch to store || set order global
      if (!dragger.isDragging) layout();
    };

    function downAction() {
      if(element.querySelector(".tooltip__content"))element.querySelector(".tooltip__content").style.display="none";
      element.querySelector(".user-card__container").style.pointerEvents="none";
      animation.play();
      this.update();
    }

    function dragAction() {
      const index = clamp(Math.round(this.y / rowSize), 0, total - 1);
      if (index !== sortable.index) {
        changeIndex(sortable, index);
      }
    }

    function upAction() {
      element.querySelector(".user-card__container").style.pointerEvents="";
      animation.reverse();
      layout();
    }

    function layout() {
      gsap.to(element, 0.3, {y: sortable.index * rowSize});
    }

    return sortable;
  };

  //=======================

  const sortables = listItems.map((element, index) => Sortable(element, index)); // Array of sortables
  const total = sortables.length;
  gsap.to(container, 0.5, {autoAlpha: 1});
}

export function ScrolltrigerUsers(el) {
  gsap.set(el.querySelectorAll(".users__list-main__box"), {
    opacity: 0,
    top: 100,
    x: 50,
    scale: .9
  });
  ScrollTrigger.batch(el.querySelectorAll(".users__list-main__box"), {
    start: "100% 100%",
    end: "100% 100%",
    onEnter: batch => gsap.to(batch, {
      top: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.2,
      x: 0,
      scale: 1,
    }),
    once: true
  });
}

export function fadeIn(el, from, to) {
  gsap.fromTo(el, {
    opacity: 0,
    y: 100,
    x: -10,
    scale: 1.9,
    ...from
  }, {
    x: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.5,
    y: 0,
    scale: 1,
    ...to
  });
}

export function gsapFromTo(el, from, to) {
  gsap.fromTo(el, {
    opacity: 0,
    ...from
  }, {
    opacity: 1,
    duration: 1,
    stagger: 0.2,
    ...to
  });
}

