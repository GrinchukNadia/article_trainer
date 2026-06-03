import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../reduxStore/store";
import { pluralizeDay } from "../../../shared/utils/pluralizeDays";
import fireImg from "../../../assets/img/fire.png";
import { useEffect, useState } from "react";
import { getStreak } from "../../api/stats/stats";

function DaysStreak() {

  const token = useSelector(
    (state: RootState) => state.auth.token
  );
  const [streak, setStreak] = useState(0);
  const dispatch = useDispatch();


  //в будущем вынести в отдельный хук useLoadStreak();
  useEffect(() => {
    const loadStreak = async () => {
      try {
        const data = await getStreak();
        setStreak(data);
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