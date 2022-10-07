import React, { useState, useEffect } from "react";

import "./App.css";
import img1 from "./icons/img1.jpg";
import img2 from "./icons/img2.jpg";
import img3 from "./icons/img3.jpg";
import img4 from "./icons/img4.jpg";
import img5 from "./icons/img5.jpg";
import img6 from "./icons/img6.jpg";
import img7 from "./icons/img7.jpg";
import img8 from "./icons/img8.jpg";
import img9 from "./icons/img9.jpg";
import questionCard from "./icons/questionCard.png";
import fontImg from "./icons/fontImg.jpg";

const initialArrayCards = [
  { id: 1, img: img1 },
  { id: 2, img: img2 },
  { id: 3, img: img3 },
  { id: 4, img: img4 },
  { id: 5, img: img5 },
  { id: 6, img: img6 },
  { id: 7, img: img7 },
  { id: 8, img: img8 },
  { id: 9, img: img9 },
];

const pairOfArrayCards = [...initialArrayCards, ...initialArrayCards];

const App = () => {
  const [arrayCards, setArrayCards] = useState([]);
  const [openedCards, setOpenedCards] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  const shuffle = (array) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  useEffect(() => {
    setArrayCards(shuffle(pairOfArrayCards));
  }, []);

  const flipCard = (index) => () => {
    setOpenedCards((opened) => [...opened, index]);
    setMoves((prevMove) => prevMove + 1);
  };

  useEffect(() => {
    if (openedCards < 2) return;
    const firstMatched = arrayCards[openedCards[0]];
    const secondMatched = arrayCards[openedCards[1]];

    if (secondMatched && firstMatched.id === secondMatched.id) {
      setMatched([...matched, firstMatched.id]);
    }
    if (openedCards.length === 2) setTimeout(() => setOpenedCards([]), 1000);
  }, [openedCards]);

  const handleGameRestart = () => {
    setOpenedCards([]);
    setMatched([]);
    setMoves(0);
    setArrayCards(shuffle(pairOfArrayCards));
  };

  return (
    <div className="App">
      <div className="cards">
        {arrayCards.map((item, index, array) => {
          let isFlipped = false;

          if (openedCards.includes(index)) isFlipped = true;
          if (matched.includes(item.id)) isFlipped = true;

          return (
            <div
              key={index}
              className={`card ${isFlipped ? "flipped" : ""}`}
              onClick={flipCard(index)}
            >
              <div className="inner">
                <div className="front">
                  <img src={item.img} width="100" height="100" />
                </div>
                <div className="back">
                  <img src={questionCard} width="100" height="100" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="strokes">Вы сделали {moves} ходов</p>
      <button className="button-restart" onClick={handleGameRestart}>
        Начать заново!
      </button>
    </div>
  );
};

export default App;
