"use client";

import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import gsap from "gsap";

export interface CardSwapHandle {
  next: () => void;
}

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  skewAmount?: number;
  easing?: "linear" | "power1.out" | "power2.out" | "power3.out" | "elastic.out";
  children: ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ customClass, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={`absolute top-1/2 left-1/2 rounded-xl border border-white bg-black [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] ${customClass ?? ""} ${rest.className ?? ""}`}
    />
  )
);
Card.displayName = "Card";

interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

const makeSlot = (
  i: number,
  distX: number,
  distY: number,
  total: number
): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.2,
  zIndex: total - i,
});

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });

const CardSwap = forwardRef<CardSwapHandle, CardSwapProps>(({
  width = "100%",
  height = "100%",
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 4,
  easing = "power2.out",
  children,
}, ref) => {
  const easingMap = {
    "linear": "linear",
    "power1.out": "power1.out",
    "power2.out": "power2.out",
    "power3.out": "power3.out",
    "elastic.out": "elastic.out(0.6,0.9)",
  };

  const config = {
    ease: easingMap[easing],
    durDrop: 0.6,
    durMove: 0.6,
    durReturn: 0.6,
    promoteOverlap: 0.4,
    returnDelay: 0.1,
  };

  const childArr = useMemo(
    () => Children.toArray(children) as ReactElement<CardProps>[],
    [children]
  );
  const refs = useMemo(
    () => childArr.map(() => React.createRef<HTMLDivElement>()),
    [childArr.length]
  );
  const order = useRef<number[]>(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<NodeJS.Timeout>(undefined);
  const container = useRef<HTMLDivElement>(null);

  const swap = () => {
    if (order.current.length < 2) return;

    const [front, ...rest] = order.current;
    const elFront = refs[front].current!;
    const tl = gsap.timeline();
    tlRef.current = tl;

    // Reduced the distance the card drops down
    tl.to(elFront, {
      y: "+=200", // Reduced from 500 to 300
      duration: config.durDrop,
      ease: config.ease,
    });

    tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);

    rest.forEach((idx, i) => {
      const el = refs[idx].current!;
      const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
      tl.set(el, { zIndex: slot.zIndex }, "promote");
      tl.to(
        el,
        {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          skewY: skewAmount,
          duration: config.durMove,
          ease: config.ease,
        },
        `promote+=${i * 0.08}`
      );
    });

    const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
    tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);

    // Set the card closer to its final position before animating
    tl.set(elFront, {
      x: backSlot.x,
      y: backSlot.y + 100, // Start closer to final position
      z: backSlot.z,
      skewY: skewAmount,
      zIndex: backSlot.zIndex,
    }, "return");

    // Shorter animation distance for the return
    tl.to(
      elFront,
      {
        y: backSlot.y,
        duration: config.durReturn * 0.8, // Slightly faster return
        ease: config.ease,
      },
      "return"
    );

    tl.call(() => {
      order.current = [...rest, front];
    });
  };

  useImperativeHandle(ref, () => ({
    next: () => swap(),
  }));

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => {
      if (r.current) {
        placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount);
      }
    });

    clearInterval(intervalRef.current);
    if (delay > 0) {
      intervalRef.current = setInterval(swap, delay);
    }

    if (pauseOnHover) {
      const node = container.current!;
      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
      };
      const resume = () => {
        tlRef.current?.play();
        if (delay > 0) intervalRef.current = setInterval(swap, delay);
      };
      node.addEventListener("mouseenter", pause);
      node.addEventListener("mouseleave", resume);
      return () => {
        node.removeEventListener("mouseenter", pause);
        node.removeEventListener("mouseleave", resume);
        clearInterval(intervalRef.current);
      };
    }

    return () => clearInterval(intervalRef.current);
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing, refs.length]);

  return (
    <div
      ref={container}
      className="relative bottom-0 right-0 origin-center perspective-[1000px] overflow-visible"
      style={{ width, height }}
    >
      {childArr.map((child, i) =>
        isValidElement<CardProps>(child)
          ? cloneElement(child, {
            key: i,
            ref: refs[i],
            style: {
              width,
              height,
              ...(child.props.style ?? {}),
            },
            onClick: (e) => {
              child.props.onClick?.(e as React.MouseEvent<HTMLDivElement>);
              onCardClick?.(i);
            },
          } as CardProps & React.RefAttributes<HTMLDivElement>)
          : child
      )}
    </div>
  );
});


export default CardSwap;