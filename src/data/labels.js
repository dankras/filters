export const INCOME_BUCKET_TO_LABEL = {
  1: ["<$15k", "<$15k"],
  2: ["$15k", "$25k"],
  3: ["$25k", "$35k"],
  4: ["$35k", "$50k"],
  5: ["$50k", "$75k"],
  6: ["$75k", "$100k"],
  7: ["$100k", "$150k"],
  8: ["$150k", "$200k"],
  9: [">$200k", ">$200k"],
};

export const sexPartnerScoreToLabel = (score) =>
  ({ 0: "0", 1: "1", 2: "2-4", 3: "5-9", 4: "10+" }[score]);

export const NUM_CHILDREN_WANTED_TO_LABEL = {
  0: ["0", "0"],
  1: ["1", "1"],
  2: ["2", "3"],
  3: ["4+", "4+"],
};
