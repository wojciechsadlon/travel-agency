export const formatTime = (seconds) => {
  if(!seconds || isNaN(seconds) || seconds < 0){
    return null
  }else{
    const sec = Math.floor(seconds%60);
    const min = Math.floor((seconds/60)%60);
    const hrs = Math.floor(seconds/3600);
    const formatNum = (num) => String(num).padStart(2, '0');

    return formatNum(hrs) + ':' + formatNum(min) + ':' + formatNum(sec);
  }
};