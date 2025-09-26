# Wyatt Blanchette Midterm

- Unordered list of the following information:
- Wyatt Blanchette
- meta-ads-mentioning-israel-after-2015-09-11.csv

## Overview

I chose this dataset for a few reasons. I have been heavily invested in the Israel Palestine October 7th conflict and its continued ramifications these last few years. I also have been aware of Israel's media spending for a while now, specifically as it relates to targets ads concerning birthright, promoting statewide propaganga, the IDF, and distorted truths surrounding their relations with Palestine, Gaza, and other contested areas. I also remember reading a few years about about the amount of ads meta specifically has hosted throughout the years promoting Israeli policies.

This dataset specifically contains some really interesting values, including currensy or spend, min and max impressions, as well as a link to the original ad. The fact that it contains so many years could also prove to be a strong way to filter the data.



```js
import {utcParse,utcFormat} from "d3-time-format";
```

Then, divide the notebook into meaningfully sections and subsections.
Use the following general scheme to revise as needed.

## Attach the data

```js
const israelAds = FileAttachment("./../data/midterm-options/meta-ads/meta-ads-mentioning-israel-after-2015-09-11.csv").csv({typed: true})
```

```js
israelAds
```

## Convert Dates

```js
const parseDate = utcParse("%Y-%m-%d")

let adsDateObj = israelAds.map(
  (ads) => {
    ads.ad_creation_time = parseDate(ads.ad_creation_time)
    return ads
  }
)

```

```js
adsDateObj
```


## Grouping #1 - Name of grouping here

Explain your plan to group the data in a particular way here, before you do so.
At least one of the groupings should use some variation of D3's `.rollup()`, so
you can count particular grouped properties.

Provide a procedure of your grouping plan in an ordered list before the codeblock:

1. Coding_Action_1
2. Coding_Action_2
3. ...

```js

```

## Grouping #2 - Name of grouping here

For the grouping, I paired max_spend and max_impressions. The idea here is to investigate how increased spend may have generated more impressions. 

For the second, I also investigated impressions, however this time with minimum spend. 


1. Grouped max spend and impressions using d3 group.
2. Grouped impression with min spend using d3 rollup to get the count.
3. Output first grouped variable, spendImpressions.
4. Output second grouped variable, minSpendImpressions.

```js
let spendImpressions = d3.group(
  israelAds,
  (d) => d.max_spend,
  (d) => d.max_impressions
)

let minSpendImpressions = d3.rollup(
  israelAds,
  (D) => D.length,
  (d) => d.min_spend,
    (d) => d.max_impressions
)
```
```js
spendImpressions
```

```js
minSpendImpressions
```
## Reflection

Use the following prompt to guide your reflection about your data work:
"What 2-3 insights and 2-3 questions did you glean from your initial work
with the dataset?"

Use the PR-TEMPLATE prompts to reflect on the midterm experience.