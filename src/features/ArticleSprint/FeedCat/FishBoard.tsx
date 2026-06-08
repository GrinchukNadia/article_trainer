import type { ActiveFish, Fish } from "./Types";
import styles from "./FishBoard.module.scss";
import FishCard from "./FishCard";
type FishBoardProps = {
    fishes: Fish[];
    activeFish?: ActiveFish | null
    onFishPointerDown: (event: React.PointerEvent, fish: Fish) => void;
    result:boolean;
    handleRoundEnd: (wrongIds: number[], wrongAnswers: number) => Promise<void>;
    answeredIds: number[];
    countWrongAnswers: number
};

export function FishBoard({
    fishes,
    activeFish,
    onFishPointerDown,
    result,
    handleRoundEnd,
    answeredIds, 
    countWrongAnswers
}: FishBoardProps) {


    return (
        <div

            className={styles.board}
            style={{cursor: activeFish ? "grabbing" : "grab", }} >
            {!result ? <div className={styles.fishLoop}>
                {[...fishes.slice(0, 7), ...fishes.slice(0, 7)].map((fish, index) => (
                    <FishCard
                        onPointerDown={(e: React.PointerEvent) => onFishPointerDown(e, fish)}
                        isDragging={fish.id === activeFish?.id}
                        key={`${fish.id}-${index}`}
                        id={`${fish.id}-${index}`}
                        text={fish.word}
                    />
                ))}
            </div>
            :
                <button onClick={() => handleRoundEnd(answeredIds, countWrongAnswers)} className={styles.resultButton}>Noch Einmal</button>
            
            }

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
                        text={activeFish.word}
                        scale={activeFish.scale}
                    />
                </div>
            )}
        </div>
    )
}