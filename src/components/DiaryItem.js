import React from "react";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";
const DiaryItem = ({ id, emotion, content, date }) => {
  const navigate = useNavigate();

  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  const strDate = new Date(parseInt(date, 10)).toLocaleDateString();

  const goDetail = () => {
    navigate(`diary/${id}`);
  };

  const goEdit = () => {
    navigate(`edit/${id}`);
  };
  return (
    <div className='DiaryItem'>
      <div
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper${emotion}`,
        ].join(" ")}
        onClick={goDetail}
      >
        <img
          src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`}
          alt={`emotion${emotion}.png`}
        />
      </div>
      <div className='info_wrapper' onClick={goDetail}>
        <div className='diary_date'>{strDate}</div>
        <div className='diary_content_preview'>{content.slice(0, 25)}</div>
      </div>

      <div className='btn_wrapper'>
        <MyButton
          type={"default"}
          text={"수정하기"}
          onClick={goEdit}
        ></MyButton>
      </div>
    </div>
  );
};

export default React.memo(DiaryItem);
