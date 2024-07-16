import { RefObject, useState, useEffect } from "react"

export const range = (
  start: number = 0,
  stop: number = 1,
  step: number = 0.1,
  precision: number = 1
): Array<number> =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) =>
    Number((start + i * step).toFixed(precision))
  )

export const useOnScreen = (
  ref: RefObject<HTMLElement> | null,
  observerOptions?: IntersectionObserverInit
) => {
  const [intersectionValues, setIntersectionValues] = useState({
    isIntersecting: false,
    ratio: 0,
    width: 0,
    height: 0,
  })

  useEffect(() => {
    let observable: HTMLElement

    const observer = new IntersectionObserver(([entry]) => {
      setIntersectionValues((prevValues) => ({
        ...prevValues,
        isIntersecting: entry.isIntersecting,
        ratio: Math.round(entry.intersectionRatio * 100),
        width: Math.round(entry.intersectionRect.width),
        height: Math.round(entry.intersectionRect.height),
      }))
    }, observerOptions)

    if (ref) {
      observable = ref.current as HTMLElement
      observer.observe(observable)
    }

    return () => observer.unobserve(observable)
  }, [observerOptions, ref])

  return intersectionValues
}
