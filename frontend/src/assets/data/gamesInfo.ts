import card_match from "../images/card_match.png";
import digital_span from "../images/digital_span.png";
import sequence_recall from "../images/sequence_recall.png";
import visual_search from "../images/visual_search.png";
import stroop_test from "../images/stroop_test.png";
import go_no_go from "../images/go_no_go.png";
import choice_reaction from "../images/choice_reaction_time.png";
import pattern_puzzle from "../images/pattern_puzzle.png";
import arithmetic_puzzle from "../images/arithmetic_puzzle.png";

export const gamesInfo = [
  {
    title: "Card Match",
    description:
      "A game designed to enhance working memory and attention by challenging players to remember and match pairs of cards.",
    domain: "Memory",
    imgLink: card_match,
    gameLocation: "/games/card-match",
  },
  {
    title: "Digital Span",
    description:
      "A game that tests and improves verbal working memory by requiring players to recall sequences of numbers.",
    domain: "Memory",
    imgLink: digital_span,
    gameLocation: "/games/digital-span",
  },
  {
    title: "Sequence Recall",
    description:
      "A game focused on enhancing sequential memory and processing speed by having players remember and reproduce sequences of numbers.",
    domain: "Memory",
    imgLink: sequence_recall,
    gameLocation: "/games/sequence-recall",
  },
  {
    title: "Visual Search",
    description:
      "A game that improves visual attention and processing speed by challenging players to find specific targets among distractors.",
    domain: "Attention",
    imgLink: visual_search,
    gameLocation: "/games/visual-search",
  },
  {
    title: "Stroop Test",
    description:
      "A game designed to enhance cognitive control and executive function by requiring players to identify the color of words while ignoring their meaning.",
    domain: "Attention",
    imgLink:
    stroop_test,
    gameLocation: "/games/stroop-test",
  },
  {
    title: "Go/No-Go Task",
    description:
      "A game that targets inhibitory control and attention by having players respond to certain stimuli while withholding responses to others.",
    domain: "Reaction",
    imgLink:
      go_no_go,
    gameLocation: "/games/go-no-go",
  },
  {
    title: "Choice Reaction Time",
    description:
      "A game that measures and improves reaction time and decision-making by requiring players to quickly respond to different stimuli with specific actions.",
    domain: "Reaction",
    imgLink:
      choice_reaction,
    gameLocation: "/games/choice-reaction",
  },
  {
    title: "Pattern Puzzle",
    description:
      "A game that enhances problem-solving skills and cognitive flexibility by challenging players to identify and complete patterns.",
    domain: "Problem Solving",
    imgLink:
    pattern_puzzle,
    gameLocation: "/games/pattern-puzzle",
  },
  {
    title: "Arithmetic Puzzle",
    description:
      "A game designed to improve numerical reasoning and cognitive flexibility by requiring players to solve arithmetic problems under time constraints.",
    domain: "Problem Solving",
    imgLink:
      arithmetic_puzzle,
    gameLocation: "/games/arithmetic-puzzle",
  },
];
