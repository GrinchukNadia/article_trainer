import board from "../../assets/img/board_middle.png";
import wall from "../../assets/img/wallpaper_flower.png";
import cat_sprite from "../../assets/img/cat_sprite.png";
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
// import clsx from "clsx";
import styles from "./Another.module.scss";
import { useEffect, useRef, useState } from "react";

type FeedCatContentType = {
    frame: any,
    setFrame: any,
    close: any
}

export function FeedCatContent({ frame, setFrame, close }: FeedCatContentType) {
    const pointerPosition = [352, 485, 612, 744, 879];
    const articles = ["die", "der", "das"];
    const [orderArticles] = useState(() => {
        const result = [...articles];
        for (let i = 0; i < 2; i++) {
            const randomNum = Math.floor(Math.random() * 3);
            result.push(articles[randomNum])
        }
        return result.sort(() => Math.random() - 0.5);
    });
    const [currentArticle, setCurrentArticle] = useState(0)
    const [fishes, setFishes] = useState([
        { id: "1", text: "Tag", article: "der" },
        { id: "2", text: "Katze", article: "die" },
        { id: "3", text: "Schwimmbad", article: "das" },
        { id: "4", text: "Haus", article: "das" },
        { id: "5", text: "Blume", article: "die" },
        { id: "6", text: "Sehenswürdigkeit", article: "die" },
        { id: "7", text: "Hund", article: "der" },
        { id: "8", text: "Man", article: "der" },
        { id: "9", text: "Salz", article: "das" },
        { id: "10", text: "Milch", article: "die" },
        { id: "11", text: "Gemüse", article: "das" },
        { id: "12", text: "Hund", article: "der" },
    ])

    const [results, setResults] = useState<
        ("correct" | "wrong" | null)[]
    >([]);

    const [isOverCat, setIsOverCat] = useState<boolean | undefined>(false);
    const catRef = useRef<HTMLDivElement | null>(null);
    const FRAME_WIDTH = 350;
    const FRAME_HEIGHT = 290;
    const FRAMES = 11;

    const [activeFish, setActiveFish] = useState<null | {
        id: string;
        scale: number;
        text: string;
        article: string,
        x: number;
        y: number;
    }>(null);

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

    function startDrag(fish: any, e: React.PointerEvent) {
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
            const isCorrect = activeFish.article === orderArticles[currentArticle];


            animateCat(
                isCorrect
                    ? [8, 7, 6, 10]
                    : [8, 7, 6, 9]
                , 150);

            setTimeout(() => {
                setCorrectMessage(true);
            }, 600);

            setResults(prev => [...prev, isCorrect ? "correct" : "wrong"]);

            setCurrentArticle(prev => prev + 1);
            setFishes(prev => prev.filter(fish => fish.id !== activeFish.id));
            //логика после того как рыбка была брошена над котом
        } else {
            setActiveFish((prev: any) =>
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
                animateCat([1, 0, 3, 0, 1, 0], 450)
            } else {
                animateCat([1, 0, 1, 0, 1, 0], 450);
            }
        }, 6 * 450);

        return () => clearInterval(interval);
    }, [standartAnimation]);

    const VP_Width = 1260;
    const VP_Height = 800;


    return (
        <div className={styles.viewport}>
            <div
                onPointerMove={moveDrag}
                onPointerUp={endDrag}
                className={styles.game}

                style={{ backgroundImage: `url(${wall})`, minWidth: `${VP_Width}px`, height: `${VP_Height}px`, }}
            >
                <div className={styles.wall}>
                    <div className={styles.heart} style={{ backgroundImage: `url(${heart})` }}></div>
                    <div className={styles.coin} style={{ backgroundImage: `url(${coin})` }}></div>
                    <div className={styles.blur_panel} style={{ top: "20px", left: "40px" }}></div>
                    <div className={styles.blur_panel} style={{ top: "97px", left: "40px" }}></div>
                    <div className={styles.pointer} style={{ left: `${pointerPosition[currentArticle]}px` }}></div>

                    <div className={styles.order}>
                        <div className={styles.order_left}></div>
                        <div className={styles.order_midle}>
                            {orderArticles.map((article: string) => <div className={styles.article}>{article}</div>)}
                        </div>
                        <div className={styles.order_right}></div>
                    </div>

                    {results.map((result, index) => (
                        <div
                            className={result === "correct" ? styles.correct : styles.wrong}
                            style={{ left: `${pointerPosition[index]}px` }}></div>
                    )

                    )}


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

                    <div
                        ref={catRef}
                        className={styles.cat}
                        style={{
                            width: `${FRAME_WIDTH}px`,
                            height: `${FRAME_HEIGHT}px`,
                            backgroundImage: `url(${cat_sprite})`,
                            backgroundSize: `${FRAME_WIDTH * FRAMES}px ${FRAME_HEIGHT}px`,
                            backgroundPosition: `-${frame * FRAME_WIDTH}px 0px`,
                        }}>
                    </div>
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
                                onPointerDown={(e: any) => {
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