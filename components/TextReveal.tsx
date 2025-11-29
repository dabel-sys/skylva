
import React, { useRef } from 'react';
import { m, useInView, Variants } from 'framer-motion';

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  mode?: 'words' | 'chars';
  triggerOnce?: boolean;
}

const TextReveal: React.FC<TextRevealProps> = ({ 
  children, 
  className = "", 
  delay = 0,
  duration = 0.8,
  stagger = 0.03,
  mode = 'words',
  triggerOnce = false
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: triggerOnce, margin: "-10%" });
  
  const text = children || "";
  const words = text.split(" ");

  const variants: Variants = {
    hidden: { y: "120%", opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: duration,
        // The "Brandz" Ease: Heavy start, smooth end.
        ease: [0.25, 1, 0.5, 1] as const,
        delay: delay + (i * stagger)
      }
    })
  };

  if (mode === 'chars') {
    let charIndex = 0;
    return (
      <span 
        ref={ref} 
        className={`inline-block whitespace-pre-wrap ${className}`} 
        aria-label={text}
      >
        <span className="sr-only">{text}</span>
        <span aria-hidden="true">
          {words.map((word, wordIndex) => {
            const chars = word.split("");
            return (
              <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
                {chars.map((char, i) => {
                  const currentDelayIndex = charIndex;
                  charIndex++;
                  return (
                    <span key={i} className="inline-block overflow-hidden -mb-[0.1em] pb-[0.1em] align-bottom">
                      <m.span
                        className="inline-block"
                        custom={currentDelayIndex}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={variants}
                      >
                        {char}
                      </m.span>
                    </span>
                  );
                })}
              </span>
            );
          })}
        </span>
      </span>
    );
  }

  // Default Word Mode
  return (
    <span ref={ref} className={`inline-block ${className}`} aria-label={text}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.2em] -mb-[0.1em] pb-[0.1em] align-bottom">
            <m.span
              className="inline-block"
              custom={i}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={variants}
            >
              {word}
            </m.span>
          </span>
        ))}
      </span>
    </span>
  );
};

export default TextReveal;