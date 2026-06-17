import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";

export function AnimatedCounter({ value, suffix = "", prefix = "", decimals = 0 }) {
  const { ref, value: animatedValue } = useAnimatedCounter(value * Math.pow(10, decimals));
  const display = (animatedValue / Math.pow(10, decimals)).toFixed(decimals);
  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

