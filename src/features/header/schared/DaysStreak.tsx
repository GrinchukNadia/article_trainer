import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../reduxStore/store";
import { pluralizeDay } from "../../../shared/utils/pluralizeDays";
import fireImg from "../../../assets/img/fire.png";
import { useEffect } from "react";
import { getStreak } from "../../api/stats/stats";
import { registrateActivity } from "../../../reduxStore/activitySlice";

function DaysStreak() {

  const token = useSelector(
    (state: RootState) => state.auth.token
  );
  const streak = useSelector((state: RootState) => state.activity.currentStreak);
  const dispatch = useDispatch();


  useEffect(() => {
    if (!token) return;

    const loadStreak = async () => {
      try {
        const data = await getStreak(token);
        dispatch(registrateActivity(data));
      } catch (error) {
        console.error("Failed to load streak", error)
      }
    };

    loadStreak();
  }, [token, dispatch])


  return (
    <>
    {token ? (
    <div style={{ display: "flex", alignItems: "end" }}>
      <span style={{ marginRight: " 6px" }}>{token ? pluralizeDay(streak) : pluralizeDay(0)}</span>
      <img style={{ height: "31px" }} src={fireImg} alt="fire" />
    </div>
    ) : (<></>)
    }
    </>
    
  );
}

export default DaysStreak;
