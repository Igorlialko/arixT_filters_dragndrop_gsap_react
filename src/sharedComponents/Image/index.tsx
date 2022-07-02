import React, {FC, useEffect, useState} from "react";

// import card from "../../assets/image/people.png";

const Image: FC<{ src: string, alt: string }> = ({src, alt, ...arg}) => {
  const [link, setLink] = useState<any>(null);

  useEffect(() => {
    // fetch(src).then(res => res.blob()).then(response => {
    //   if (response.type === "image/png" || response.type === "image/jpeg") {
    //     setLink(src);
    //   } else {
    //     setLink(card);
    //   }
    // }).catch(() => {
    //   setLink(card);
    // });
    setLink(src);
  }, [src, setLink]);

  return (
    <img src={link} alt={alt} {...arg} />
  );
};
export default Image;