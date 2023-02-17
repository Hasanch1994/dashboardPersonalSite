import { ComponentType, useRef, useEffect } from "react";

interface ClickOutsideProps {
  // additional props
  onClickOutside: () => void;
}

function withClickOutside<T extends ClickOutsideProps>(
  WrappedComponent: ComponentType<T>
): ComponentType<T> {
  const WithClickOutside = (props: T) => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          wrapperRef.current &&
          !wrapperRef.current.contains(event.target as Node)
        ) {
          props.onClickOutside();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [props.onClickOutside]);

    return (
      <div ref={wrapperRef}>
        <WrappedComponent {...props} />
      </div>
    );
  };

  return WithClickOutside;
}

export default withClickOutside;
