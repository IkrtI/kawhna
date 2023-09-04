const Emoji = ["😎", "🤓", "🤩", "😏", "😼"][R(5)];

gsap.registerPlugin(ScrollTrigger);
gsap.to("progress", {
  value: 100,
  ease: "none",
  scrollTrigger: { scrub: 0.3 },
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion)");
const sections = document.querySelectorAll(".page-content__section");
const marquees = document.querySelectorAll(".marquee div");
let marqueeText = "";

const updateMarqueeText = () => {
  [...marquees].forEach((marquee) => {
    marquee.classList.add("active");

    marquee.addEventListener("webkitTransitionEnd", () =>
      FText(marquee, marqueeText)
    );
    marquee.addEventListener("transitionend", () =>
      FText(marquee, marqueeText)
    );
  });
};

const FText = (marquee, marqueeText) => {
  marquee.classList.remove("active");
  marquee.innerText = `${marqueeText} ${Emoji} `.repeat(30);
};

const updateBgColor = (color) =>
  document.documentElement.style.setProperty("--color-background", color);

const setActiveSection = (section) => {
  marqueeText = section.querySelector("h2").textContent;
  [...sections].forEach((section) => section.classList.remove("active"));
  section.classList.add("active");
  !prefersReducedMotion.matches && updateBgColor(section.dataset.bgColor);
  updateMarqueeText();
};

if (!prefersReducedMotion.matches) {
  gsap.to(".marquee div", {
    scrollTrigger: {
      trigger: ".page-content",
      scrub: 0.25,
      start: "top bottom",
      end: "bottom top",
      ease: "power2",
    },
    xPercent: -50,
  });
}

gsap.utils.toArray(".page-content__section h2").forEach((heading) => {
  ScrollTrigger.create({
    trigger: heading,
    start: "top center",
    end: "bottom 200px",
    toggleActions: "play reset play reset",
    ease: "power2",
    onEnter: () =>
      marqueeText !== heading.textContent &&
      setActiveSection(heading.parentElement),
    onEnterBack: () =>
      marqueeText !== heading.textContent &&
      setActiveSection(heading.parentElement),
  });
});

function R(Max = 1) {
  return Math.floor(Math.random() * Max);
}

console.log(
  "GSAP ScrollTrigger Cr. https://codepen.io/hexagoncircle/pen/xxwBLMy\nScroll progress Cr.https://codepen.io/Mamboleoo/pen/abdwYaJ"
);
console.log("ขอบคุณที่เข้ามาเยี่ยมชม \nEmail: contact@ikrt.dev");

// var x = 0;

// setInterval(() => {
//   const policyCardTitles = document.getElementsByClassName("policy-card-title");
//   for (let index = 0; index < policyCardTitles.length; index++) {
//     const policyCard = policyCardTitles[index];
//     policyCard.style.backgroundImage = `linear-gradient(${x}deg, #f60, rgb(123, 3, 197))`;
//     x += 1;
//     if (x > 720) {
//       x = 0;
//     }
//   }
// }, 1000);
