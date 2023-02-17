import { FC, memo, useEffect, useReducer } from "react";
import LazyLoad from "react-lazy-load";
import "./style.css";
import ArrowButton from "./arrowButton";
export interface carouselImages {
  imageUrl: string;
}

interface carouselProps {
  images: Array<string>;
  showArrows?: boolean;
  autoPlay?: boolean;
  infiniteLoop?: boolean;
  slideTime?: number;
  arrowSlide?: boolean;
  paused?: boolean;
}

const Carousel: FC<carouselProps> = memo(
  ({
    autoPlay,
    images,
    infiniteLoop,
    showArrows,
    slideTime,
    arrowSlide,
    paused,
  }) => {
    enum actionKind {
      INCREASE = "increment",
      DECREASE = "decrement",
    }

    interface currentIndexAction {
      type: actionKind;
      payload: number;
    }

    interface currentIndexState {
      index: number;
    }

    const currentIndexReducer = (
      state: currentIndexState,
      action: currentIndexAction
    ) => {
      const { payload, type } = action;
      switch (type) {
        case actionKind.INCREASE:
          if (state.index === images.length - 1)
            return {
              ...state,
              index: 0,
            };
          else
            return {
              ...state,
              index: state.index + payload,
            };

        case actionKind.DECREASE:
          if (state.index === 0)
            return {
              ...state,
              index: images.length - 1,
            };
          else
            return {
              ...state,
              index: state.index - payload,
            };
        default:
          return state;
      }
    };

    const [state, dispatch] = useReducer(currentIndexReducer, { index: 0 });

    useEffect(() => {
      let sliderPlay: NodeJS.Timeout;
      if (autoPlay && !paused) {
        sliderPlay = setTimeout(
          () => {
            if (!infiniteLoop) {
              if (state.index !== images.length - 1)
                dispatch({ type: actionKind.INCREASE, payload: 1 });
            } else dispatch({ type: actionKind.INCREASE, payload: 1 });
          },
          slideTime ? slideTime : 1000
        );
      }

      return () => {
        clearInterval(sliderPlay);
      };
    }, [state.index, paused]);

    useEffect(() => {
      if (arrowSlide && !autoPlay) document.onkeydown = handleArrowKey;

      return () => {
        document.onkeydown = null;
      };
    });

    const handleArrowKey = (e: any) => {
      e = e || window.event;

      switch (e.keyCode) {
        //for right arrow key
        case 37:
          dispatch({ type: actionKind.INCREASE, payload: 1 });
          break;
        //for left arrow key
        case 39:
          dispatch({ type: actionKind.DECREASE, payload: 1 });
          break;
      }
    };

    const handleArrowClick = (type: string) => {
      const typeValue = type === "right" ? 1 : -1;
      dispatch({
        type: typeValue === 1 ? actionKind.INCREASE : actionKind.DECREASE,
        payload: typeValue,
      });
    };

    return (
      <>
        {showArrows && !autoPlay && !paused && (
          <ArrowButton
            direction="left"
            onClick={() => handleArrowClick("left")}
          />
        )}

        {images && (
          <LazyLoad height={"100%"}>
            <img
              key={self.crypto.randomUUID()}
              className="carousel-image absolute left-0 top-0 right-0 bottom-0 object-contain object-center w-full h-full"
              width={"100%"}
              height={"100%"}
              src={images[state.index]}
            />
          </LazyLoad>
        )}

        {showArrows && !autoPlay && !paused && (
          <ArrowButton
            direction="right"
            onClick={() => handleArrowClick("right")}
          />
        )}
      </>
    );
  }
);
export default Carousel;
