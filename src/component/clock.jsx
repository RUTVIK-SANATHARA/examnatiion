import React, { useState, useRef, useEffect } from 'react'
const Clock = () => {
const Ref = useRef(null);
const [timer, setTimer] = useState('2:00');
const getTimeRemaining = (e) => {
const total = Date.parse(e) - Date.parse(new Date());
const seconds = Math.floor((total / 1000) % 60);
const minutes = Math.floor((total / 1000 / 60) % 60);
const hours = Math.floor((total / 1000 * 60 * 60) % 24);
return {
total, hours, minutes, seconds
};
}
const startTimer = (e) => {
let { total, hours, minutes, seconds }
= getTimeRemaining(e);
if (total >= 0) {
setTimer(
(minutes > 9 ? minutes : '0' + minutes) + ':'
+ (seconds > 9 ? seconds : '0' + seconds)
)
}
}
const clearTimer = (e) => {
if (Ref.current) clearInterval(Ref.current);
const id = setInterval(() => {
startTimer(e);
}, 1000)
Ref.current = id;
}
const getDeadTime = () => {
let deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 10);
return deadline;
}
useEffect(() => {
clearTimer(getDeadTime());
}, []);
const onClickReset = () => {
clearTimer(getDeadTime());
}
return (
<div className="Codedamn App">
<h2>{timer}</h2>
<button onClick={onClickReset}>Reset</button>
</div>
)
}
export default Clock
