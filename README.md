# NFL-Draft-Visualization
Every year, the NFL Draft occurs during late April to early May. The first round attracts the most excitement, with
the hopes of various franchises changed forever as they take chances on various quarterbacks. This project explores the accuracy various mock drafts released in anticipation of the result by the experts: Mike Mayock and Matt Miller.

The visualization represents 10 years of 1st round mock drafts predicted by these experts compared with the actual outcomes. On the horizontal axis, there are the names of the 32 teams in the NFL and on the vertical axis, are the order of the picks, from 1 to 32. Each circle in the scatterplot represents a player picked during the i-th round by the j-th team along the horizontal axis. The color of the circle depicts how accurate the experts were to predicting the true outcome of the draft. 

## Setup

After installing node/npm/yarn:

```sh
npm install
# then
npm run start

# or if using yarn
yarn
# then
yarn start
```

## Questions That This Visualization Seeks to Answer
1) Which team do experts frequently misjudge?
2) Which players did experts predict?
3) Are experts better at judging earlier picks than later picks?
4) Which picks were the biggest surprises?

## Visualization Components
The interactive component of the visualization uses the D3-React library to reveal additional information about each player when mouse hovers over each circle.

## Encountered Problems
Each “expert” makes multiple mock drafts; hence, to standardize the data, we attempted to use their “final” mock draft
for the given year. Additionally, some players they mock are not picked at all in the first round, so it is
difficult to gauge accurately how “wrong” the experts were for players particularly at the end of the draft. 

## Visualization Example
![nfl_draft_vis](https://user-images.githubusercontent.com/35086055/44422389-fa4b3680-a550-11e8-8629-401d25af7aac.png)

## Data Sources:
NFL Draft Data:
https://www.kaggle.com/ronaldjgrafjr/nfl-draft-outcomes

Inspiration:
https://www.cc.gatech.edu/gvu/ii/sportvis/nfldraft/run/
