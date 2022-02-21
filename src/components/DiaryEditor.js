import React, { useState, useRef, useContext, useEffect } from "react";
import MyHeader from "./../components/MyHeader";
import MyButton from "./../components/MyButton";
import { useNavigate } from "react-router-dom";
import EmotionItem from "./EmotionItem";
import { DiaryDispatchContext } from "../App";
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

const DiaryEditor = ({ isEdit, originData }) => {
  const navigate = useNavigate();

  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));

  const handleClickEmotion = (emotion) => {
    setEmotion(emotion);
  };

  const { onCreate, onEdit } = useContext(DiaryDispatchContext);

  const handleCreateSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    if (window.confirm("새로운 일기를 작성하시겠습니까?")) {
      onCreate(date, content, emotion);
      navigate("/", { replace: true });
    }
  };

  const handleEditSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    if (window.confirm("일기를 수정하시겠습니까?")) {
      onEdit(originData.id, date, content, emotion);
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date, 10))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);
  return (
    <div className='DiaryEditor'>
      <div>
        <MyHeader
          headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
          leftChild={
            <MyButton
              text={"< 뒤로가기"}
              type={"default"}
              onClick={() => navigate(-1)}
            />
          }
        />
      </div>
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className='input_box'>
            <input
              className='input_date'
              type='date'
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className='input_box emotion_list_wrapper'>
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmotion}
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className='input_box text_wrapper'>
            <textarea
              placeholder='오늘은 어땠나요'
              ref={contentRef}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </div>
        </section>
        <section>
          <div className='control_box'>
            <MyButton
              text={"취소하기"}
              type={"default"}
              onClick={() => {
                navigate(-1);
              }}
            />
            <MyButton
              text={"작성완료"}
              type={"positive"}
              onClick={isEdit ? handleEditSubmit : handleCreateSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
