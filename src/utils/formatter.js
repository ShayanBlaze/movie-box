export const formatVotes = (votes) => {
  if (votes >= 1000000) {
    return (votes / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (votes >= 1000) {
    return (votes / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  } else {
    return votes.toString();
  }
};