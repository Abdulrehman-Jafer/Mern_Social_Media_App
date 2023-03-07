export const msToTime = (duration: number) => {
  // var milliseconds = Math.floor((duration % 1000) / 100)
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  return hours + " hours"
};
