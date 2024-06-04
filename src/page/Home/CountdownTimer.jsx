import Countdown from 'react-countdown';
// eslint-disable-next-line react/prop-types
const CountdownTimer = ({ endDate }) => {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span className="text-red-500 font-bold">Deadline is Over</span>;
    } else {
      return (
        <div className="flex items-center ">
          <div className="text-center">
            <div className="text-xl font-bold animate-pulse text-primary">{days}</div>
            <div className="text-sm">Days</div>
          </div>
          <div className="text-center p-2">
            <div className="text-xl font-bold animate-pulse text-secondary">{hours}</div>
            <div className="text-sm">Hours</div>
          </div>
          <div className="text-center p-2">
            <div className="text-xl font-bold animate-pulse text-accent">{minutes}</div>
            <div className="text-sm">Minutes</div>
          </div>
          <div className="text-center p-2">
            <div className="text-xl font-bold animate-pulse text-neutral">{seconds}</div>
            <div className="text-sm">Seconds</div>
          </div>
        </div>
      );
    }
  };
  return <Countdown date={endDate} renderer={renderer} />;
};
export default CountdownTimer;
