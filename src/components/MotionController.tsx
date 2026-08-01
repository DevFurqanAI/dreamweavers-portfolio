"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ExperienceStage } from "@/types/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function MotionController() {
  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        document.documentElement.classList.add("reduced-motion");
        return () => document.documentElement.classList.remove("reduced-motion");
      }

      const nativeCleanups: Array<() => void> = [];
      // ScrollTrigger.batch coalesces elements that cross the viewport in the
      // same scroll tick into one onEnter callback instead of letting each of
      // the ~10 [data-reveal] elements run as an independent ScrollTrigger.
      // A fast scroll that carries several sections past "top 86%" at once
      // previously fired that many separate tween-starts back to back.
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 86%",
        once: true,
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { y: 56, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.05,
              ease: "power3.out",
              stagger: 0.06,
              overwrite: true,
            },
          ),
      });

      // The intro loader (IntroGate) and this hero reveal used to run on independent
      // timers, so they could visibly drift out of sync. IntroGate now fires
      // "dw:introDone" the moment it finishes (or immediately if it's skipped), and
      // we gate the reveal on that instead of guessing its duration with a fixed delay.
      const playHeroReveal = () =>
        gsap.fromTo(
          ".hero__line > span",
          { yPercent: 115, rotate: 3 },
          { yPercent: 0, rotate: 0, duration: 1.25, stagger: 0.08, ease: "power4.out", delay: 0.12 },
        );

      if (document.documentElement.dataset.introDone === "true") {
        playHeroReveal();
      } else {
        window.addEventListener("dw:introDone", playHeroReveal, { once: true });
        nativeCleanups.push(() => window.removeEventListener("dw:introDone", playHeroReveal));
      }

      gsap.to(".hero__copy", {
        yPercent: 20,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".service-card").forEach((card, index) => {
        gsap.fromTo(
          card,
          { x: index % 2 === 0 ? -70 : 70, rotateZ: index % 2 === 0 ? -2 : 2 },
          {
            x: 0,
            rotateZ: 0,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 95%",
              end: "top 55%",
              scrub: 1,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".work-project").forEach((project, index) => {
        const copy = project.querySelector<HTMLElement>(".work-project__copy");
        const visual = project.querySelector<HTMLElement>(".work-project__visual");

        gsap.fromTo(
          project,
          { y: 80, opacity: 0.45 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: project,
              start: "top 92%",
              end: "top 58%",
              scrub: 0.7,
            },
          },
        );

        if (copy) {
          gsap.fromTo(
            copy,
            { x: index % 2 === 0 ? -70 : 70 },
            {
              x: 0,
              ease: "none",
              scrollTrigger: {
                trigger: project,
                start: "top 92%",
                end: "top 48%",
                scrub: 0.8,
              },
            },
          );
        }

        if (visual) {
          gsap.fromTo(
            visual,
            { x: index % 2 === 0 ? 90 : -90, scale: 0.94 },
            {
              x: 0,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: project,
                start: "top 92%",
                end: "top 48%",
                scrub: 0.8,
              },
            },
          );
        }
      });

      const marqueeTween = gsap.to(".marquee__track", {
        xPercent: -50,
        duration: 34,
        ease: "none",
        repeat: -1,
      });
      const marqueeSkew = gsap.quickTo(".marquee__track", "skewX", { duration: 0.5, ease: "power3.out" });

      // Scroll speed feeds back into the marquee: it surges and skews with a fast
      // flick, then eases back to its resting pace once the scroll settles.
      const onScrollUpdate = (self: ScrollTrigger) => {
        const velocity = gsap.utils.clamp(-2400, 2400, self.getVelocity());
        const normalized = velocity / 2400;
        gsap.to(marqueeTween, { timeScale: 1 + normalized * 2.4, duration: 0.4, overwrite: true });
        marqueeSkew(normalized * -6);
      };
      const onScrollEnd = () => {
        gsap.to(marqueeTween, { timeScale: 1, duration: 0.7, ease: "power2.out", overwrite: true });
        marqueeSkew(0);
      };
      const velocityTrigger = ScrollTrigger.create({
        trigger: document.body,
        start: 0,
        end: "max",
        onUpdate: onScrollUpdate,
      });
      ScrollTrigger.addEventListener("scrollEnd", onScrollEnd);
      nativeCleanups.push(() => {
        velocityTrigger.kill();
        ScrollTrigger.removeEventListener("scrollEnd", onScrollEnd);
      });

      // Pointer-tilt on the work posters ties them into the same 3D "depth"
      // language as the WebGL loom field behind them.
      if (window.matchMedia("(pointer: fine)").matches) {
        gsap.utils.toArray<HTMLElement>(".work-project").forEach((project) => {
          // A dedicated wrapper (not .work-project__visual, which the scroll-linked
          // x/scale tween above already owns) keeps this pointer tween from fighting
          // over the same element's transform.
          const tilt = project.querySelector<HTMLElement>(".work-project__tilt");
          if (!tilt) return;

          const setRotateX = gsap.quickTo(tilt, "rotateX", { duration: 0.6, ease: "power3.out" });
          const setRotateY = gsap.quickTo(tilt, "rotateY", { duration: 0.6, ease: "power3.out" });

          const move = (event: PointerEvent) => {
            const rect = project.getBoundingClientRect();
            const px = (event.clientX - rect.left) / rect.width - 0.5;
            const py = (event.clientY - rect.top) / rect.height - 0.5;
            setRotateY(px * 12);
            setRotateX(py * -12);
          };
          const leave = () => {
            setRotateX(0);
            setRotateY(0);
          };

          project.addEventListener("pointermove", move);
          project.addEventListener("pointerleave", leave);
          nativeCleanups.push(() => {
            project.removeEventListener("pointermove", move);
            project.removeEventListener("pointerleave", leave);
          });
        });
      }

      gsap.fromTo(
        ".industry-mode-button",
        { x: -26, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.72,
          stagger: 0.055,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".industry-console",
            start: "top 78%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".industry-console__stage",
        { clipPath: "inset(12% 12% 12% 12% round 24px)", scale: 0.96 },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".industry-console",
            start: "top 90%",
            end: "top 48%",
            scrub: 0.8,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-stage]").forEach((section) => {
        const stage = section.dataset.stage as ExperienceStage | undefined;
        if (!stage) return;
        ScrollTrigger.create({
          trigger: section,
          start: "top 58%",
          end: "bottom 42%",
          onEnter: () => emitStage(stage),
          onEnterBack: () => emitStage(stage),
        });
      });

      gsap.to(document.documentElement, {
        "--page-progress": 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((element) => {
        const move = (event: PointerEvent) => {
          const rect = element.getBoundingClientRect();
          gsap.to(element, {
            x: (event.clientX - rect.left - rect.width / 2) * 0.18,
            y: (event.clientY - rect.top - rect.height / 2) * 0.18,
            duration: 0.35,
            ease: "power2.out",
          });
        };
        const leave = () => gsap.to(element, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.35)" });
        element.addEventListener("pointermove", move);
        element.addEventListener("pointerleave", leave);
        nativeCleanups.push(() => {
          element.removeEventListener("pointermove", move);
          element.removeEventListener("pointerleave", leave);
        });
      });

      return () => nativeCleanups.forEach((cleanup) => cleanup());
    },
    { dependencies: [] },
  );

  return null;
}

function emitStage(stage: ExperienceStage) {
  window.dispatchEvent(new CustomEvent<ExperienceStage>("dw:stage", { detail: stage }));
  document.documentElement.dataset.stage = stage;
}
