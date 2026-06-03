import board from "../../assets/img/board_middle.png";
import wall from "../../assets/img/wallpaper_flower.png";
import windowImg from "../../assets/img/window_day.png";
import paint from "../../assets/img/paint1.png";
import aquarium from "../../assets/img/aquarium.png";
import hanged_plant from "../../assets/img/hanged_plant.png";
import shelf from "../../assets/img/shelf.png";
import coin from "../../assets/img/coin.png";
import heart from "../../assets/img/heart.png";
import close_img from "../../assets/img/close_img.png";
import floor from "../../assets/img/floor.png";
import notebook from "../../assets/img/notebook.png";
import lamp from "../../assets/img/lamp.png";
import flower_pot from "../../assets/img/flower_pot.png";
import FishCard from "./FishCard";
import styles from "./Another.module.scss";
import { useEffect, useRef, useState } from "react";
import { articles, CAT_ANIMATION, pointerPosition, VIEWPORT } from "./FeedCat/FeedCatContent.constants";
import { INITIAL_FISHES } from "./FeedCat/feedCatData";
import { type ActiveFish, type Article, type FeedCatContentProps, type Fish, type Result } from "./FeedCat/Types";
import { ArticleOrder } from "./FeedCat/ArticlesOrder";
import { CatSprite } from "./FeedCat/CatSprite";
// import clsx from "clsx";


function mixRandomArticles(articles:Article[], ammount:number) {
    const result = [...articles];
    for (let i = 0; i < ammount - articles.length; i++) {
        const randomNum = Math.floor(Math.random() * 3);
        result.push(articles[randomNum])
    }
    return result.sort(() => Math.random() - 0.5);
}

export function FeedCatContent({ frame, setFrame, close }: FeedCatContentProps) {

    const [orderArticles] = useState(mixRandomArticles(articles, 5));
    const [currentArticleIndex, setCurrentArticleIndex] = useState<number>(0);
    const [fishes, setFishes] = useState(INITIAL_FISHES)
    const [results, setResults] = useState<Result[]>([]);
    const [isOverCat, setIsOverCat] = useState<boolean | undefined>(false);
    const catRef = useRef<HTMLDivElement | null>(null);
    const [activeFish, setActiveFish] = useState<ActiveFish>(null);

    function aboveTarget(e: React.PointerEvent) {
        if (!catRef.current) return;

        const rect = catRef.current.getBoundingClientRect();

        return e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom;
    }

    useEffect(() => {
        if (!activeFish) return;

        setFrame(isOverCat ? 8 : 6)
    }, [isOverCat, activeFish, setFrame])

    function startDrag(fish: Fish, e: React.PointerEvent) {
        setActiveFish({
            id: fish.id,
            scale: 1,
            article: fish.article,
            text: fish.text,
            x: e.clientX,
            y: e.clientY,
        });
        setStandartAnimation(false);
        setCorrectMessage(false);
    }

    function moveDrag(e: React.PointerEvent) {
        if (!activeFish) return;
        const overCat = aboveTarget(e);

        setActiveFish(prev =>
            prev
                ? {
                    ...prev,
                    x: e.clientX,
                    y: e.clientY,
                    scale: overCat ? 0.4 : 1,
                }
                : null
        );

        setIsOverCat(overCat);


    }

    const [correctMessage, setCorrectMessage] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState("");

    function endDrag(e: React.PointerEvent) {
        if (!activeFish) return;
        // тут проверяешь: попала ли рыбка в рот кота
        if (aboveTarget(e)) {
            const isCorrect = activeFish.article === orderArticles[currentArticleIndex];


            animateCat(
                isCorrect
                    ? CAT_ANIMATION.eatingThenHappy
                    : CAT_ANIMATION.eatingThenAngry
                , 150);

            setTimeout(() => {
                setCorrectMessage(true);
            }, 600);

            setResults(prev => [...prev, isCorrect ? "correct" : "wrong"]);

            setCurrentArticleIndex(prev => prev + 1);
            setFishes(prev => prev.filter(fish => fish.id !== activeFish.id));
            //логика после того как рыбка была брошена над котом
        } else {
            setActiveFish((prev: ActiveFish) =>
                prev ? { ...prev, scale: 1 } : null
            );
        }
        setCorrectAnswer(`${activeFish.article} ${activeFish.text}`)
        setActiveFish(null);
        setIsOverCat(false);
    }

    function animateCat(frames: number[], interval: number) {

        frames.forEach((frameNumber, index) => {
            setTimeout(() => {
                setFrame(frameNumber);
            }, index * interval);
        });
    }

    const [standartAnimation, setStandartAnimation] = useState(true);

    useEffect(() => {
        if (!standartAnimation) return;


        const interval = setInterval(() => {
            if (Math.random() < 0.4) {
                animateCat(CAT_ANIMATION.blinking, 450)
            } else {
                animateCat(CAT_ANIMATION.waiting, 450);
            }
        }, 6 * 450);

        return () => clearInterval(interval);
    }, [standartAnimation]);



    return (
        <div className={styles.viewport}>
            <div
                onPointerMove={moveDrag}
                onPointerUp={endDrag}
                className={styles.game}

                style={{ backgroundImage: `url(${wall})`, minWidth: `${VIEWPORT.width}px`, height: `${VIEWPORT.height}px`, }}
            >
                <div className={styles.wall}>
                    <div className={styles.heart} style={{ backgroundImage: `url(${heart})` }}></div>
                    <div className={styles.coin} style={{ backgroundImage: `url(${coin})` }}></div>
                    <div className={styles.blur_panel} style={{ top: "20px", left: "40px" }}></div>
                    <div className={styles.blur_panel} style={{ top: "97px", left: "40px" }}></div>
                    <div className={styles.pointer} style={{ left: `${pointerPosition[currentArticleIndex]}px` }}></div>

                    <ArticleOrder articles={orderArticles} results={results} />


                    <div
                        onClick={close}
                        className={styles.close}
                        style={{ backgroundImage: `url(${close_img})` }}
                    ></div>

                    <div className={styles.windowImg} style={{ backgroundImage: `url(${windowImg})` }}></div>
                    <div className={styles.paint} style={{ backgroundImage: `url(${paint})` }}></div>
                    <div className={styles.hanged_plant} style={{ backgroundImage: `url(${hanged_plant})` }}></div>
                    <div className={styles.shelf} style={{ backgroundImage: `url(${shelf})` }}></div>
                    <div className={styles.floor} style={{ backgroundImage: `url(${floor})` }}></div>

                    <CatSprite frame={frame} ref={catRef}/>

                    {correctMessage ?
                        <div className={styles.message}>
                            <div className={styles.messageLeft}></div>
                            <div className={styles.messageMiddle}>{`${correctAnswer}`}</div>
                            <div className={styles.messageRight}></div>
                        </div>
                        : ""}
                    <div className={styles.notebook} style={{ backgroundImage: `url(${notebook})` }}></div>
                    <div className={styles.flower_pot} style={{ backgroundImage: `url(${flower_pot})` }}></div>
                    <div className={styles.aquarium} style={{ backgroundImage: `url(${aquarium})` }}></div>
                    <div className={styles.lamp} style={{ backgroundImage: `url(${lamp})` }}></div>
                    <div className={styles.lamp_light}></div>
                    <div className={styles.table}></div>
                </div>
                <div

                    className={styles.board}
                    style={{ backgroundImage: `url(${board})`, cursor: activeFish ? "grabbing" : "grab", }} >
                    <div className={styles.fishLoop}>
                        {[...fishes.slice(0, 7), ...fishes.slice(0, 7)].map((fish, index) => (
                            <FishCard
                                onPointerDown={(e: React.PointerEvent) => {
                                    e.currentTarget.setPointerCapture(e.pointerId);
                                    e.stopPropagation();
                                    startDrag(fish, e);
                                }}
                                isDragging={fish.id === activeFish?.id}
                                key={`${fish.id}-${index}`}
                                id={`${fish.id}-${index}`}
                                text={fish.text}
                            />
                        ))}
                    </div>
                    {activeFish && (
                        <div
                            className={styles.dragFish}
                            style={{
                                position: "fixed",
                                zIndex: 9999,
                                pointerEvents: "none",
                                left: activeFish.x,
                                top: activeFish.y,
                                transform: "translate(-50%, -50%)",
                            }}
                        >
                            <FishCard
                                id={activeFish.id}
                                text={activeFish.text}
                                scale={activeFish.scale}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}