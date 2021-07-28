import React from "react";
import { Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { useDropzone } from "react-dropzone";
const ImageModify = ({ state, setState }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const imgFile = acceptedFiles.map((file) =>
        Object.assign(file, {
          url: URL.createObjectURL(file),
        }),
      );
      setState({ imgUrl: imgFile[0], isImgChange: true });
    },
  });

  const params = {
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    observer: true,
    spaceBetween: 30,
  };

  return (
    <div>
      <div>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          {state.imgUrl === "" ? (
            <img
              src="https://image.fmkorea.com/files/attach/new/20190706/486616/1139515760/1964885644/69a5ed6da6368495f69472d79fd6e19f.jpg"
              alt="이미지 에러"
              align="center"
              heigth="100%"
              width="100%"
            />
          ) : (
            <div>
              {typeof state.imgUrl !== "string" ? (
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
      <Form>
        <FormGroup>
          <Label for="exampleFile">File</Label>
          <Input type="file" name="file" id="exampleFile" />
          <FormText color="muted">
            This is some placeholder block-level help text for the above input.
            It's a bit lighter and easily wraps to a new line.
          </FormText>
        </FormGroup>
      </Form>
    </div>
  );
};

export default ImageModify;
