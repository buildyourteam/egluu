import React, { useEffect, useRef, useCallback } from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';

const thumbnail =
  'https://i.pinimg.com/originals/72/1a/8b/721a8bd73983160aa979575c9d65a085.jpg';

function useFallbackImageInSSR(fallbackSrc) {
  const ref = useRef(null);
  /**
   * Error happened / catched after hydration
   */
  const onError = useCallback(
    e => {
      e.target.src = fallbackSrc;
    },
    [fallbackSrc],
  );

  /**
   * Error happened before hydration, but catched after hydration
   */
  useEffect(() => {
    if (ref && ref.current) {
      const { complete, naturalHeight } = ref.current;
      const errorLoadingImgBeforeHydration = complete && naturalHeight === 0;

      if (errorLoadingImgBeforeHydration) {
        ref.current.src = fallbackSrc;
      }
    }
  }, [fallbackSrc]);

  return {
    ref,
    onError,
  };
}

export function ImgSlide(props) {
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
      loadPrevNext: true,
    },
    margin: '10px',
    height: '700px',
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

export function ImgInput({ state, setState }) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      const imgFile = acceptedFiles.map(file =>
        Object.assign(file, {
          url: URL.createObjectURL(file),
        }),
      );
      setState({ ...state, imgUrl: imgFile });
    },
  });

  const params = {
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    observer: true,
    spaceBetween: 30,
  };

  return (
    <div>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        {state.imgUrl === '' ? (
          <img
            src={thumbnail}
            alt="이미지 에러"
            align="center"
            heigth="100%"
            width="100%"
          />
        ) : (
          <div>
            {typeof state.imgUrl[0] !== 'string' ? (
              <img
                src={state.imgUrl.url}
                alt="이미지 에러"
                align="center"
                heigth="100%"
                width="100%"
              />
            ) : (
              <img
                src={state.imgUrl}
                alt="이미지 에러"
                align="center"
                heigth="100%"
                width="100%"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
