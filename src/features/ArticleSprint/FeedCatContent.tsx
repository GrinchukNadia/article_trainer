import wall from "../../assets/img/wallpaper_flower.png";
import windowImg from "../../assets/img/window_day.png";
import paint from "../../assets/img/paint1.png";
import aquarium from "../../assets/img/aquarium.png";
import hanged_plant from "../../assets/img/hanged_plant.png";
import shelf from "../../assets/img/shelf.png";
import floor from "../../assets/img/floor.png";
import notebook from "../../assets/img/notebook.png";
import lamp from "../../assets/img/lamp.png";
import flower_pot from "../../assets/img/flower_pot.png";
import styles from "./Another.module.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import { articles, CAT_ANIMATION, VIEWPORT } from "./FeedCat/FeedCatContent.constants";
// import { INITIAL_FISHES } from "./FeedCat/feedCatData";
import { type ActiveFish, type Article, type FeedCatContentProps, type Fish, type Result } from "./FeedCat/Types";
import { ArticleOrder } from "./FeedCat/ArticlesOrder";
import { CatSprite } from "./FeedCat/CatSprite";
import { FishBoard } from "./FeedCat/FishBoard";
import { HUD } from "./FeedCat/HUD";
import { getWordsFeedCat, sendResultFeedCat, type FeedCatResponse } from "../api/games/feedCat";
// import clsx from "clsx";


function mixRandomArticles(articles: Article[], ammount: number) {
    const result = [...articles];
    for (let i = 0; i < ammount - articles.length; i++) {
        const randomNum = Math.floor(Math.random() * 3);
        result.push(articles[randomNum])
    }
    return result.sort(() => Math.random() - 0.5);
}

export function FeedCatContent({ frame, setFrame, close }: FeedCatContentProps) {

    const [orderArticles, setOrderArticles] = useState(mixRandomArticles(articles, 5));
    const [currentArticleIndex, setCurrentArticleIndex] = useState<number>(0);
    const [fishes, setFishes] = useState<Fish[]>([]);
    const [profile, setProfile] = useState<FeedCatResponse["profile"] | null>(null);
    const [results, setResults] = useState<Result[]>([]);
    const [allAnswered, setAllAnswered] = useState(false);
    const [isOverCat, setIsOverCat] = useState<boolean | undefined>(false);
    const catRef = useRef<HTMLDivElement | null>(null);
    const [activeFish, setActiveFish] = useState<ActiveFish>(null);
    const [answeredIds, setAnsweredIds] = useState<number[]>([]);
    const [countWrongAnswers, setCountWrongAnswers] = useState(0);

    const loadSprint = useCallback(async () => {
        const {profile, words} = await getWordsFeedCat();
        setProfile(profile);
        setFishes(words);
    }, []);

    async function handleRoundEnd (wrongIds: number[], wrongAnswers: number) {
        const {profile, words} = await sendResultFeedCat(wrongIds, wrongAnswers);
        setProfile(profile);
        setFishes(words);
        setAllAnswered(false);
        setStandartAnimation(true);
        setCorrectMessage(false);
        setFrame(6);
        setOrderArticles(mixRandomArticles(articles, 5));
        setResults([]);
        setCurrentArticleIndex(0);
    }

    useEffect(() => {
        loadSprint()
    }, [loadSprint])


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
            word: fish.word,
            x: e.clientX,
            y: e.clientY,
        });
        setStandartAnimation(false);
        setCorrectMessage(false);
    }
    function onFishPointerDown(e: React.PointerEvent, fish: Fish) {
        e.currentTarget.setPointerCapture(e.pointerId);
        e.stopPropagation();
        startDrag(fish, e);
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

            setCountWrongAnswers((prev) => isCorrect ? prev: prev + 1)
            setResults(prev => [...prev, isCorrect ? "correct" : "wrong"]);
            setCurrentArticleIndex(prev => prev + 1);
            setFishes(prev => prev.filter(fish => fish.id !== activeFish.id));
            setAnsweredIds(prev => [...prev, activeFish.id]);
            setTimeout(() => {
                results.length > 3 && setAllAnswered(true);
            }, 600)
            //логика после того как рыбка была брошена над котом
        } else {
            setActiveFish((prev: ActiveFish) =>
                prev ? { ...prev, scale: 1 } : null
            );
        }
        setCorrectAnswer(`${activeFish.article} ${activeFish.word}`)
        setActiveFish(null);
        setIsOverCat(false);
    }

    const animationTimeouts = useRef<ReturnType<typeof setTimeout>[]>([]);
    function clearCatAnimation() {
        animationTimeouts.current.forEach(clearTimeout);
        animationTimeouts.current = [];
    }

    function animateCat(frames: number[], interval: number) {
        clearCatAnimation();

        frames.forEach((frameNumber, index) => {
            const timeoutId = setTimeout(() => {
                setFrame(frameNumber);
            }, index * interval);

            animationTimeouts.current.push(timeoutId);
        });
    }
    useEffect(() => {
        return () => {
            clearCatAnimation();
        };
    }, []);

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
                    <HUD profile={profile} />
                    <ArticleOrder 
                        articles={orderArticles} 
                        results={results} 
                        currentArticleIndex={currentArticleIndex} />
                    <div onClick={close} className={styles.close}></div>

                    <div className={styles.windowImg} style={{ backgroundImage: `url(${windowImg})` }}></div>
                    <div className={styles.paint} style={{ backgroundImage: `url(${paint})` }}></div>
                    <div className={styles.hanged_plant} style={{ backgroundImage: `url(${hanged_plant})` }}></div>
                    <div className={styles.shelf} style={{ backgroundImage: `url(${shelf})` }}></div>
                    <div className={styles.floor} style={{ backgroundImage: `url(${floor})` }}></div>

                    <CatSprite frame={frame} ref={catRef} />

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
                <FishBoard 
                    fishes={fishes} 
                    activeFish={activeFish} 
                    onFishPointerDown={onFishPointerDown} 
                    result={allAnswered}
                    handleRoundEnd={handleRoundEnd}
                    answeredIds={answeredIds}
                    countWrongAnswers={countWrongAnswers}
                />
            </div>
        </div >
    )
}