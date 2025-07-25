export const formatVotes = (votes: number): string => {
  if (votes >= 1000000) {
    return (votes / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (votes >= 1000) {
    return (votes / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return votes.toString();
};
