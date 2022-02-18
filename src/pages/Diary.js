import React from "react";
import { useParams } from "react-router-dom";
const Diary = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <p>이곳은 Diary입니다.</p>
    </div>
  );
};

export default Diary;
