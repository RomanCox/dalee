import { ReactNode } from "react";
import styles from "./social-item.module.scss";

const SocialItem = ({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) => {
  return (
    <a href={href} target="_blank" className={styles.container}>
      {children}
    </a>
  );
};

export default SocialItem;
