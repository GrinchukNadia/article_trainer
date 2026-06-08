import styles from "./HUD.module.scss";

type HUDprops = {
    profile: {
        hearts: number,
        coins: number
    } | null

}
export function HUD({ profile }: HUDprops) {

    return (
        <>
            <div className={styles.heart}></div>
            <div className={styles.coin}></div>
            <div className={styles.blur_panel} style={{ top: "20px" }}>{profile? profile.hearts : 0}</div>
            <div className={styles.blur_panel} style={{ top: "97px" }}>{profile? profile.coins : 0}</div>
        </>
    )
}