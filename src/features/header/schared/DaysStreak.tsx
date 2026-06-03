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


  //вынести в отдельный хук useLoadStreak();
  useEffect(() => {
    const loadStreak = async () => {
      try {
        const data = await getStreak();
        dispatch(registrateActivity(data));
      } catch (error) {
        console.error("Failed to load streak", error)
      }
    };
    loadStreak();
  }, [dispatch])


  return (
    <div style={{ display: "flex", alignItems: "end" }}>
      <span style={{ marginRight: " 6px" }}>{token ? pluralizeDay(streak) : pluralizeDay(0)}</span>
      <img style={{ height: "31px" }} src={fireImg} alt="fire" />
    </div> 
  );
}

export default DaysStreak;
