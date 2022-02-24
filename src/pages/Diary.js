import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";

const Diary = () => {
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기`;
  }, [id]);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id, 10) === parseInt(id, 10)
      );

      if (targetDiary) {
        setData(targetDiary);
        // 일기가 있을 때
      } else {
        // 일기가 없을 때
        alert("없는 일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList, navigate]);

  if (!data) {
    return <div className='DiaryPage'>로딩중입니다...</div>;
  } else {
    const curEmotionData = emotionList.find(
      (it) => parseInt(it.emotion_id, 10) === parseInt(data.emotion)
    );

    return (
      <>
        <div className='DiaryPage'>
          <MyHeader
            leftChild={
              <MyButton
                type={"default"}
                text={"< 뒤로가기"}
                onClick={() => navigate(-1)}
              />
            }
            headText={`${getStringDate(new Date(data.date))} 기록`}
            rightChild={
              <MyButton
                type={"default"}
                text={"수정하기"}
                onClick={() => navigate(`/edit/${data.id}`)}
              />
            }
          />
          <article>
            <section>
              <h4>오늘의 감정</h4>
              <div
                className={[
                  "diary_img_wrapper",
                  `diary_img_wrapper_${data.emotion}`,
                ].join(" ")}
              >
                <img
                  src={curEmotionData.emotion_img}
                  alt={`emotion${curEmotionData.emotion}.png`}
                />
                <div className='emotion_descript'>
                  {curEmotionData.emotion_descript}
                </div>
              </div>
            </section>
          </article>
          <section>
            <h4>오늘의 일기</h4>
            <div className='diary_content_wrapper'>
              <p>{data.content}</p>
            </div>
          </section>
        </div>
      </>
    );
  }
};

export default Diary;
