import React, { useEffect, useRef, useCallback } from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import thumbnail from './img/thumbnail.png';
import PropTypes from 'prop-types';

function useFallbackImageInSSR(fallbackSrc) {
  const ref = useRef(null)
  /**
   * Error happened / catched after hydration
   */
  const onError = useCallback(
    e => { e.target.src = fallbackSrc }, [fallbackSrc],
  )

  /**
   * Error happened before hydration, but catched after hydration
   */
  useEffect(() => {
    if (ref && ref.current) {
      const { complete, naturalHeight } = ref.current
      const errorLoadingImgBeforeHydration = complete && naturalHeight === 0

      if (errorLoadingImgBeforeHydration) {
        ref.current.src = fallbackSrc
      }
    }
  }, [fallbackSrc])

  return {
    ref,
    onError,
  }
}

export default function ImgSlide( props ){
  const { imgList } = props; 
  const fallbackImageProps = useFallbackImageInSSR(thumbnail);

  const params = {
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    observer: true,
    spaceBetween: 30,
    lazy: {
      loadPrevNext: true
    },
    margin: '10px',
    height: '700px'
  };

  return (
      <Swiper {...params}>
          {imgList.map((value, i) => (
          <div key={i}>
              <img
              src={value}
              {...fallbackImageProps}
              alt="제품 소개 이미지"
              align="center"
              height="100%"
              width="100%"
              />
          </div>
      ))}
      </Swiper>
  );
}
