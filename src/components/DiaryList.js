import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된순" },
];

const filterOptionList = [
  { value: "all", name: "전부다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안좋은 감정만" },
];

const ControlMenu = React.memo(({ value, onChange, optionList }) => {
  return (
    <select
      className='ControlMenu'
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
});

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  // 감정
  const [filter, setFilter] = useState("all");

  // 최신순, 오래된순
  const [sortType, setSortType] = useState("latest");

  // 이런 식으로 onChange 함수를 props 으로 전달하면 React.memo가 제대로 동작되지 않는다. > 새롭게 함수가 생성하기 때문
  // 렌더링이 일어났을 때도 useState 구문은 useCallback을 이미 감싸고 나온 형태이기 때문에 React.memo로 가능하다!
  // 상태변화 함수 그 자체를 내려주면 최적화하기 쉽다.

  // const handleSetSortType = (sortType) => {
  //   setSortType(sortType);
  // };

  // const handleSetFilter = (filter) => {
  //   setFilter(filter);
  // };

  const getProcessedDiaryList = () => {
    const filterCallBack = (item) => {
      if (filter === "bad") {
        return parseInt(item.emotion, 10) > 3;
      } else {
        return parseInt(item.emotion, 10) <= 3;
      }
    };

    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date, 10) - parseInt(a.date, 10);
      } else {
        return parseInt(a.date, 10) - parseInt(b.date, 10);
      }
    };

    //깊은 복사
    const copyList = JSON.parse(JSON.stringify(diaryList));

    const filteredList =
      filter === "all" ? copyList : copyList.filter((it) => filterCallBack(it));
    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className='DiaryList'>
      <div className='menu_wrapper'>
        <div className='left_col'>
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className='right_col'>
          <MyButton
            type={"positive"}
            text={"새 일기 쓰기"}
            onClick={() => {
              navigate("/new");
            }}
          />
        </div>
      </div>

      {getProcessedDiaryList().map((it) => (
        <DiaryItem key={it.id} {...it} />
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};
export default DiaryList;
