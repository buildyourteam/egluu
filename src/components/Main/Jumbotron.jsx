import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@material-ui/core";
import { useLazyLoading } from "../../hook";
function Jumbotron() {
  const items = [
    {
      src: "https://picsum.photos/id/1/1000/480",
      altText: "Slide 1",
      caption: "Slide 1",
      header: "Slide 1 Header",
      key: "1",
    },
    {
      src: "https://picsum.photos/id/2/1000/480",
      altText: "Slide 2",
      caption: "Slide 2",
      header: "Slide 2 Header",
      key: "2",
    },
    {
      src: "https://picsum.photos/id/3/1000/480",
      altText: "Slide 3",
      caption: "Slide 3",
      header: "Slide 3 Header",
      key: "3",
    },
    {
      src: "https://picsum.photos/id/4/1000/480",
      altText: "Slide 4",
      caption: "Slide 4",
      header: "Slide 4 Header",
      key: "4",
    },
  ];

  return (
    <Carousel autoPlay={false}>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

function Item(props) {
  const lazy = useLazyLoading();

  return (
    <Paper>
      <img
        style={{
          height: "480px",
          color: "#fff",
          lineHeight: "480px",
          textAlign: "center",
          background: "#364d79",
        }}
        data-src={props.item.src}
        alt={props.item.altText}
        ref={lazy.target}
      />
    </Paper>
  );
}
export default Jumbotron;
