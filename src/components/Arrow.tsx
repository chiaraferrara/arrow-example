/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const move = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 40px 0; }
`;

const ArrowStyled = styled.div<{ width: string; angle: number }>`
  position: absolute;
  height: 4px;
  background: #85bc29;
  border-radius: 4px;
  overflow: hidden;
  transform-origin: left center;
  transform: ${({ angle }) => `rotate(${angle}deg)`};
  width: ${({ width }) => width};

  /* Pseudo-elemento per effetto decorativo */
  &::after {
    content: "";
    position: absolute;
    left: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.3) 25%,
      transparent 25%,
      transparent 75%,
      rgba(255, 255, 255, 0.3) 75%,
      rgba(255, 255, 255, 0.3)
    );
    background-size: 20px 20px;
    animation: ${move} 2s linear infinite;
  }
`;

export default function Arrow({
  fromId,
  toId,
}: {
  fromId: string;
  toId: string;
}) {
  const [style, setStyle] = useState<{
    width: string;
    angle: number;
    top: string;
    left: string;
  }>({
    width: "0px",
    angle: 0,
    top: "0px",
    left: "0px",
  });

  useEffect(() => {
    const fromElem = document.getElementById(fromId);
    const toElem = document.getElementById(toId);
    const containerElem = fromElem?.parentElement?.parentElement;

    if (fromElem && toElem && containerElem) {
      const containerRect = containerElem.getBoundingClientRect();
      const fromRect = fromElem.getBoundingClientRect();
      const toRect = toElem.getBoundingClientRect();

      // Calcolo delle coordinate relative al contenitore principale
      const fromX = fromRect.left + fromRect.width / 2 - containerRect.left;
      const fromY = fromRect.top + fromRect.height / 2 - containerRect.top;
      const toX = toRect.left + toRect.width / 2 - containerRect.left;
      const toY = toRect.top + toRect.height / 2 - containerRect.top;

      const angle = (Math.atan2(toY - fromY, toX - fromX) * 180) / Math.PI;
      const distance = Math.sqrt(
        Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2)
      );

      setStyle({
        left: `${fromX}px`,
        top: `${fromY}px`,
        width: `${distance}px`,
        angle: angle,
      });
    }
  }, [fromId, toId]);

  return (
    <ArrowStyled
      style={{ top: style.top, left: style.left }}
      width={style.width}
      angle={style.angle}
    />
  );
}
