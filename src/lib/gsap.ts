import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Global defaults for institutional, directorial ease
gsap.defaults({
  duration: 1.2,
  ease: "power4.out",
});

export { gsap, ScrollTrigger };
