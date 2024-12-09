"use client";

import { useEffect, useState } from "react";

// import Countdown from "react-countdown";

// const CountdownTimer = ({ date }: { date: number }) => {
//   return (
//     <p className="font-medium">
//       <span>Time left:</span> <Countdown date={date} />
//     </p>
//   );
// };

// export default CountdownTimer;

const CountdownTimer = ({
  hours,
  minutes,
  seconds,
}: {
  hours: number;
  minutes: number;
  seconds: number;
}) => {
  const [timeLeft, setTimeLeft] = useState({
    hours,
    minutes,
    seconds,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const totalSeconds =
          prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;
        if (totalSeconds <= 0) {
          clearInterval(timer);
          return { hours: 0, minutes: 0, seconds: 0 };
        }
        return {
          hours: Math.floor(totalSeconds / 3600),
          minutes: Math.floor((totalSeconds % 3600) / 60),
          seconds: totalSeconds % 60,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (value: number) => String(value).padStart(2, "0");
  return (
    <div className="text-shadow-sm mt-6 flex items-end justify-end text-[20px] font-medium text-neutral-light-gray lg:mt-0 lg:text-[22px]">
      {formatTime(timeLeft.hours)}H : {formatTime(timeLeft.minutes)}M :{" "}
      {formatTime(timeLeft.seconds)}S Left
    </div>
  );
};

export default CountdownTimer;
