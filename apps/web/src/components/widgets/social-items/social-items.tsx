import { memo } from "react";
import clsx from "clsx";

import SocialItem from "@/components/widgets/social-items/social-item";
import Icon from "@/components/ui/icon";

import styles from "./social-items.module.scss";
import { TSocial } from "@/types/common.type";

export interface IItem {
  id: number;
  name: string;
  link: string;
}

interface SocialItemsProps {
  items?: TSocial[];
  className?: string;
}

export const SocialItems = memo((props: SocialItemsProps) => {
  const { items, className } = props;

  return (
    <ul className={clsx(styles.list, className)}>
      {items?.map((item) => (
        <li key={item.id} className={styles[item.key]}>
          <SocialItem href={item.link}>
            <Icon height="19" width="19" name={item.key} />
          </SocialItem>
        </li>
      ))}
    </ul>
  );
});

SocialItems.displayName = "SocialItems";
