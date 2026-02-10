import { useEffect, useState, useRef, forwardRef } from "react";

import Image from "./Image";
import styles from "../../Media.module.css";
import Placeholder from "../Placeholder";

const ImageCompose = ({ medium, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`${styles.mediaContainer} ${className}`}>
      <Placeholder medium={medium} isLoaded={isLoaded} />
      <Image medium={medium} setIsLoaded={setIsLoaded} />
    </div>
  );
};

export default ImageCompose;
