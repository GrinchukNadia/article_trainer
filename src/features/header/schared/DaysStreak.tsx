import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registrateActivity } from "../../../reduxStore/activitySlice";
import type { RootState } from "../../../reduxStore/store";
import { pluralizeDay } from "../../../shared/utils/pluralizeDays";
import fireImg from "../../../assets/fire.png";

function DaysStreak() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(registrateActivity());
  }, [dispatch]);

  const activeDays = useSelector(
    (state: RootState) => state.activity.currentStreak
  );

  return (
    <div style={{ display: "flex", alignItems: "end" }}>
      <span style={{ marginRight: " 6px" }}>{pluralizeDay(activeDays)}</span>
      <img style={{ height: "31px" }} src={fireImg} alt="" />
    </div>
  );
}

export default DaysStreak;
