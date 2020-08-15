/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const params = {
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
  },
  observer: true,
  spaceBetween: 30,
  lazy: {
    loadPrevNext: true,
  },
};

function ImgInput({ img, saveImg }) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: [".png", ".jpeg", ".jpg"],
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const imgFile = acceptedFiles.map((file) =>
        Object.assign(file, {
          url: URL.createObjectURL(file),
        })
      );
      saveImg(imgFile[0]);
    },
  });

  return (
    <div>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {img === "" ? (
          <img
            src="https://image.fmkorea.com/files/attach/new/20190706/486616/1139515760/1964885644/69a5ed6da6368495f69472d79fd6e19f.jpg"
            alt="이미지 에러"
            align="center"
            heigth="100%"
            width="100%"
          />
        ) : (
          <div>
            {typeof img[0] !== "string" ? (
              <img
                src={img.url}
                alt="이미지 에러"
                align="center"
                heigth="100%"
                width="100%"
              />
            ) : (
              <img
                src={`https://egluuapi.codingnome.dev/projects/image/${img}`}
                alt="이미지"
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

function ImgInput2({ img, saveImg }) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: [".png", ".jpeg", ".jpg"],
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const imgFile = acceptedFiles.map((file) =>
        Object.assign(file, {
          url: URL.createObjectURL(file),
        })
      );
      saveImg(imgFile[0]);
    },
  });

  return (
    <div>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {img === "" ? (
          <img
            src="https://pixabay.com/ko/illustrations/%EC%9C%84%EC%84%B1-%ED%96%89%EC%84%B1-%EA%B3%B5%EA%B0%84-%EC%B2%9C%EB%AC%B8%ED%95%99-1303512/"
            alt="이미지 에러"
            align="center"
            heigth="100%"
            width="100%"
          />
        ) : (
          <div>
            {typeof img[0] !== "string" ? (
              <img
                src={img.url}
                alt="이미지 에러"
                align="center"
                heigth="100%"
                width="100%"
              />
            ) : (
              <img
                src={img}
                alt="이미지"
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

export { ImgInput2, ImgInput };
