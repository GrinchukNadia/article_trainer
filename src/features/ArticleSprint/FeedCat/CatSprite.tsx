import { forwardRef } from "react";
import styles from "./CatSprite.module.scss";
import { CAT_SPRITE } from "./FeedCatContent.constants";
import cat_sprite from "../../../assets/img/cat_sprite.png";


type CatSpriteProps = {
  frame: number;
  ref?: React.Ref<HTMLDivElement>;
};

export const CatSprite = forwardRef<HTMLDivElement, CatSpriteProps>(
    ({ frame }, ref) => {
        return (<div
            ref={ref}
            className={styles.cat}
            style={{
                width: `${CAT_SPRITE.frameWidth}px`,
                height: `${CAT_SPRITE.frameHeight}px`,
                backgroundImage: `url(${cat_sprite})`,
                backgroundSize: `${CAT_SPRITE.frameWidth * CAT_SPRITE.frames}px ${CAT_SPRITE.frameHeight}px`,
                backgroundPosition: `-${frame * CAT_SPRITE.frameWidth}px 0px`,
            }}>
        </div>
        )
    })