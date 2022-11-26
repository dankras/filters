import { useState } from "react";
import { filter, join, map, overEvery, toLower, concat, isEmpty } from "lodash";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { PEOPLE } from "./data/people";
import { minHeightInches, maxHeightInches } from "./data/stats";
import { sexPartnerScoreToLabel } from "./data/labels";
import ResultsDisplay from "./components/resultsDisplay";
import LargeScreenLayout from "./components/LargeScreenLayout";
import SmallScreenLayout from "./components/SmallScreenLayout";
import Denominator from "./components/denominator";
import {
  formatIncomeBucket,
  formatFloatToPercent,
  inchesToFeetAndInches,
  replaceLastCommaWithAnd,
} from "./utils";

// TODOs
// - keep state in URL (for sharing)
// - add Big 5 Personality Traits

export default function App() {
  const [isAttractivenessFilterEnabled, setAttractivenessFilterEnabled] =
    useState(true);
  const [attractivenessRange, setAttractivenessRange] = useState([4, 6]);

  const [isHeightFilterEnabled, setHeightFilterEnabled] = useState(true);
  const [heightRange, setHeightRange] = useState([62, 68]);

  const [isIncomeFilterEnabled, setIncomeFilterEnabled] = useState(false);
  const [incomeRange, setIncomeRange] = useState([3, 7]);

  const [isIntelligenceFilterEnabled, setIntelligenceFilterEnabled] =
    useState(false);
  const [intelligenceRange, setIntelligenceRange] = useState([0.3, 0.7]);

  const [isAlcoholFilterEnabled, setAlcoholFilterEnabled] = useState(false);
  const [alcohol, setAlcohol] = useState("No");

  const [isNicotineFilterEnabled, setNicotineFilterEnabled] = useState(false);
  const [nicotine, setNicotine] = useState("No");

  const [isMarijuanaFilterEnabled, setMarijuanaFilterEnabled] = useState(false);
  const [marijuana, setMarijuana] = useState("No");

  const [isPsychFilterEnabled, setPsychFilterEnabled] = useState(false);
  const [psychedelics, setPsychedelics] = useState("No");

  const [isPoliticsFilterEnabled, setPoliticsFilterEnabled] = useState(false);
  const [politics, setPolitics] = useState("Moderate");

  const [
    isPoliticalToleranceFilterEnabled,
    setPoliticalToleranceFilterEnabled,
  ] = useState(false);
  const [politicalTolerance, setPoliticalTolerance] = useState("Yes");

  const [isWantsKidsFilterEnabled, setWantsKidsFilterEnabled] = useState(false);
  const [wantsKids, setWantsKids] = useState("Yes");

  const [isHasKidsFilterEnabled, setHasKidsFilterEnabled] = useState(false);
  const [hasKids, setHasKids] = useState("No");

  const [isSexPartnersFilterEnabled, setSexPartnersFilterEnabled] =
    useState(false);
  const [sexPartners, setSexPartners] = useState(1.0);

  const leftIncome = formatIncomeBucket(incomeRange[0], true);
  const rightIncome = formatIncomeBucket(incomeRange[1], false);

  const filtersConfig = [
    {
      label: "Attractiveness",
      type: "range",
      isEnabled: isAttractivenessFilterEnabled,
      setEnabled: setAttractivenessFilterEnabled,
      range: attractivenessRange,
      setRange: setAttractivenessRange,
      predicate: (person) =>
        person.avg_physical_attractiveness_rating >= attractivenessRange[0] &&
        person.avg_physical_attractiveness_rating <= attractivenessRange[1],
      display:
        attractivenessRange[0] === attractivenessRange[1]
          ? attractivenessRange[0] + " (out of 10) in physical attractiveness"
          : `${attractivenessRange[0]} - ${attractivenessRange[1]} (out of 10) in physical attractiveness`,
      min: 1,
      max: 10,
      info: "Rating of physical attractiveness by the opposite sex on a 1 - 10 scale, with 1 being least attractive, 5 being average, and 10 being most attractive. Based on average of 10 ratings of person's photo.",
    },
    {
      label: "Height",
      type: "range",
      isEnabled: isHeightFilterEnabled,
      setEnabled: setHeightFilterEnabled,
      range: heightRange,
      setRange: setHeightRange,
      predicate: (person) =>
        person.height_inches >= heightRange[0] &&
        person.height_inches <= heightRange[1],
      display:
        heightRange[0] === heightRange[1]
          ? "exactly " + inchesToFeetAndInches(heightRange[0]) + " tall"
          : `${inchesToFeetAndInches(heightRange[0])} - ${inchesToFeetAndInches(
              heightRange[1]
            )} tall`,
      min: minHeightInches,
      max: maxHeightInches,
      formatLeftBound: inchesToFeetAndInches,
      formatRightBound: inchesToFeetAndInches,
      info: "How tall are they?",
    },
    {
      label: "Income",
      type: "range",
      isEnabled: isIncomeFilterEnabled,
      setEnabled: setIncomeFilterEnabled,
      range: incomeRange,
      setRange: setIncomeRange,
      predicate: (person) =>
        person.income_bucket >= incomeRange[0] &&
        person.income_bucket <= incomeRange[1],
      display:
        leftIncome === rightIncome
          ? `earning ${leftIncome} per year`
          : `earning ${leftIncome} - ${rightIncome} per year`,
      min: 1,
      max: 9,
      formatLeftBound: (value) => formatIncomeBucket(value, true),
      formatRightBound: (value) => formatIncomeBucket(value, false),
      info: "Last year's income (self-reported)",
    },
    {
      label: "Intelligence",
      type: "range",
      isEnabled: isIntelligenceFilterEnabled,
      setEnabled: setIntelligenceFilterEnabled,
      range: intelligenceRange,
      setRange: setIntelligenceRange,
      predicate: (person) =>
        person.iq_percentile >= intelligenceRange[0] &&
        person.iq_percentile <= intelligenceRange[1],
      display:
        intelligenceRange[0] === intelligenceRange[1]
          ? `${formatFloatToPercent(intelligenceRange[0])}ile IQ`
          : `between ${formatFloatToPercent(
              intelligenceRange[0]
            )} and ${formatFloatToPercent(intelligenceRange[1])}ile IQ`,
      min: 0,
      max: 1,
      step: 0.05,
      formatLeftBound: (value) => formatFloatToPercent(value),
      formatRightBound: (value) => formatFloatToPercent(value),
      info: "IQ represented as a percentile",
    },
    {
      label: "Alcohol",
      type: "dropdown",
      isEnabled: isAlcoholFilterEnabled,
      setEnabled: setAlcoholFilterEnabled,
      value: alcohol,
      setValue: setAlcohol,
      predicate: (person) => person.uses_alcohol === alcohol,
      display: alcohol === "Yes" ? "alcohol drinkers" : "not alcohol drinkers",
      options: [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
      ],
      info: "Do they drink alcohol?",
    },
    {
      label: "Nicotine",
      type: "dropdown",
      isEnabled: isNicotineFilterEnabled,
      setEnabled: setNicotineFilterEnabled,
      value: nicotine,
      setValue: setNicotine,
      predicate: (person) => person.uses_nicotine === nicotine,
      display: nicotine === "Yes" ? "nicotine users" : "not nicotine users",
      options: [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
      ],
      info: "Do they use nicotine?",
    },
    {
      label: "Marijuana",
      type: "dropdown",
      isEnabled: isMarijuanaFilterEnabled,
      setEnabled: setMarijuanaFilterEnabled,
      value: marijuana,
      setValue: setMarijuana,
      predicate: (person) => person.uses_marijuana === marijuana,
      display: marijuana === "Yes" ? "marijuana users" : "not marijuana users",
      options: [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
      ],
      info: "Do they use marijuana?",
    },
    {
      label: "Psychedelics",
      type: "dropdown",
      isEnabled: isPsychFilterEnabled,
      setEnabled: setPsychFilterEnabled,
      value: psychedelics,
      setValue: setPsychedelics,
      predicate: (person) => person.has_used_psychedelics === psychedelics,
      display: psychedelics === "Yes" ? "psychonauts" : "not psychonauts",
      options: [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
      ],
      info: "Have they ever used psychedelics?",
    },
    {
      label: "Politics",
      type: "dropdown",
      isEnabled: isPoliticsFilterEnabled,
      setEnabled: setPoliticsFilterEnabled,
      value: politics,
      setValue: setPolitics,
      predicate: (person) => person.politics === politics,
      display: "politically " + toLower(politics),
      options: [
        { value: "Liberal", label: "Liberal" },
        { value: "Moderate", label: "Moderate" },
        { value: "Conservative", label: "Conservative" },
        { value: "Other", label: "Other" },
        { value: "Apolitical", label: "Apolitical" },
        { value: "Socialist", label: "Socialist" },
        { value: "Libertarian", label: "Libertarian" },
      ],
      info: "Political Beliefs",
    },
    {
      label: "Political Tolerance",
      type: "dropdown",
      isEnabled: isPoliticalToleranceFilterEnabled,
      setEnabled: setPoliticalToleranceFilterEnabled,
      value: politicalTolerance,
      setValue: setPoliticalTolerance,
      predicate: (person) => person.political_tolerance === politicalTolerance,
      display:
        politicalTolerance === "Yes"
          ? "comfortable being friends with someone that disagrees with them politically"
          : politicalTolerance === "Neutral"
          ? "unsure if they'd be friends with someone that disagrees with them politically"
          : "not comfortable being friends with someone that disagrees with them politically",
      options: [
        { value: "Yes", label: "Yes" },
        { value: "Neutral", label: "Neutral" },
        { value: "No", label: "No" },
      ],
      info: "Are they comfortable being friends with someone that disagrees with them on important political topics?",
    },
    {
      label: "Has Kids",
      type: "dropdown",
      isEnabled: isHasKidsFilterEnabled,
      setEnabled: setHasKidsFilterEnabled,
      value: hasKids,
      setValue: setHasKids,
      predicate: (person) => person.has_kids === hasKids,
      display: hasKids === "Yes" ? "parents" : "childfree",
      options: [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
      ],
      info: "Do they already have kids?",
    },
    {
      label: "Wants Kids",
      type: "dropdown",
      isEnabled: isWantsKidsFilterEnabled,
      setEnabled: setWantsKidsFilterEnabled,
      value: wantsKids,
      setValue: setWantsKids,
      predicate: (person) => person.wants_kids === wantsKids,
      display:
        wantsKids === "Yes"
          ? "interested in having kids"
          : "not interested in having kids",
      options: [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
      ],
      info: "Do they want kids?",
    },
    {
      label: "Sexual Partners",
      type: "dropdown",
      isEnabled: isSexPartnersFilterEnabled,
      setEnabled: setSexPartnersFilterEnabled,
      value: sexPartners,
      setValue: setSexPartners,
      predicate: (person) => person.sex_partners_score === sexPartners,
      display: `having sex with ${sexPartnerScoreToLabel(
        sexPartners
      )} partners per year`,
      options: [
        { value: 0.0, label: "0" },
        { value: 1.0, label: "1" },
        { value: 2.0, label: "2-4" },
        { value: 3.0, label: "5-9" },
        { value: 4.0, label: "10+" },
      ],
      info: "How many different partners have they had sex with in the past year?",
    },
  ];

  const [isSexDenominatorEnabled, setSexDenominatorEnabled] = useState(true);
  const [sex, setSex] = useState("female");

  const denominatorsConfig = [
    {
      label: "Sex",
      type: "dropdown",
      isEnabled: isSexDenominatorEnabled,
      setEnabled: setSexDenominatorEnabled,
      value: sex,
      setValue: setSex,
      predicate: (person) => person.gender === sex,
      display: sex,
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
      ],
      info: "Male / Female",
    },
  ];

  const enabledDenominators = filter(denominatorsConfig, "isEnabled");
  const doesPersonPassDenominators = overEvery(
    map(enabledDenominators, "predicate")
  );
  const denominator = filter(PEOPLE, doesPersonPassDenominators).length;
  const denominatorLabel = isSexDenominatorEnabled
    ? sex === "male"
      ? "of single men"
      : "of single women"
    : "of singles";

  const enabledFilters = filter(filtersConfig, "isEnabled");
  const numeratorDisplay = join(map(enabledFilters, "display"), ", ");
  const numeratorDisplayOxfordComma =
    enabledFilters.length > 1
      ? replaceLastCommaWithAnd(numeratorDisplay)
      : numeratorDisplay;
  const doesPersonPassFilters = overEvery(
    map(concat(enabledFilters, enabledDenominators), "predicate")
  );
  const numerator = filter(PEOPLE, doesPersonPassFilters).length;
  const numeratorLabel = isEmpty(enabledFilters)
    ? "exist."
    : "are " + numeratorDisplayOxfordComma + ".";

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));

  const [areFiltersOpen, setFiltersOpen] = useState(isLargeScreen);
  const [areDenominatorsOpen, setDenominatorOpen] = useState(false);

  const CustomResults = ({ margin, width = 450 }) => (
    <ResultsDisplay
      numerator={numerator}
      denominator={denominator}
      denominatorLabel={denominatorLabel}
      numeratorLabel={numeratorLabel}
      toggleFilters={() => setFiltersOpen(!areFiltersOpen)}
      toggleDenominators={() => setDenominatorOpen(!areDenominatorsOpen)}
      margin={margin}
      width={width}
      buttonOrientation={isLargeScreen ? "row" : "column"}
    />
  );

  if (isLargeScreen) {
    return (
      <LargeScreenLayout
        areFiltersOpen={areFiltersOpen}
        setFiltersOpen={setFiltersOpen}
        denominatorComponent={
          <Denominator
            open={areDenominatorsOpen}
            setOpen={setDenominatorOpen}
            denominators={denominatorsConfig}
          />
        }
        resultsComponent={<CustomResults margin={5} />}
        filtersConfig={filtersConfig}
      />
    );
  } else {
    return (
      <SmallScreenLayout
        areFiltersOpen={areFiltersOpen}
        setFiltersOpen={setFiltersOpen}
        denominatorComponent={
          <Denominator
            open={areDenominatorsOpen}
            setOpen={setDenominatorOpen}
            denominators={denominatorsConfig}
          />
        }
        resultsComponent={<CustomResults width="100%" />}
        filtersConfig={filtersConfig}
      />
    );
  }
}
