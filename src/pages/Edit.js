import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const mode = searchParams.get("mode");
  console.log(id);
  console.log(mode);
  return (
    <div>
      <p>이곳은 Edit입니다.</p>
      <button
        onClick={() => {
          setSearchParams({ who: "john", hello: "hello" });
        }}
      >
        QS 바꾸기
      </button>
      <button
        onClick={() => {
          navigate("/home");
        }}
      >
        HOME으로 가기
      </button>

      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로 가기
      </button>
    </div>
  );
};

export default Edit;
