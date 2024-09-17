import React from "react";

const ImageField = ({ className, src, alt }) => {
  return (
    <>
      <img src={src} alt={alt} className={className} />
    </>
  );
};

export default ImageField;
