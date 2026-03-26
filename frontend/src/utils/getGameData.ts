  // const [history, setHistory] = useState<GameHistoryEntry>([] as GameHistoryEntry);
  // const apiFetch = useApiFetch()

  // const playAgain = async () => {
  //   // send data to db
  //   const response = await apiFetch("/sessions", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       gameName: GameName.STROOP_TEST,
  //       correct: state.totalCorrect,
  //       incorrect: state.totalIncorrect,
  //       totalTime: state.totalTime,
  //       domain: Domain.ATTENTION,
  //     }),
  //   });

  //   if (!response.ok) {
  //     console.error("Failed to save session data");
  //     return;
  //   }

  //   // reset game
  //   // start new game
  //   dispatch({ type: "resetGame" });
  // };
  // const returnHome = async () => {
  //   // send data to db
  //   const response = await apiFetch("/sessions", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       gameName: GameName.STROOP_TEST,
  //       correct: state.totalCorrect,
  //       incorrect: state.totalIncorrect,
  //       totalTime: state.totalTime,
  //       domain: Domain.ATTENTION,
  //     }),
  //   });

  //   if (!response.ok) {
  //     console.error("Failed to save session data");
  //     return;
  //   }

  //   // go home
  //   dispatch({ type: "home" });
  // };

  // // loading all data upon home page render
  // useEffect(() => {
  //   if (state.gameState !== "home") return;

  //   // fetch user performance data from the API and dispatch to the reducer
  //   const fetchData = async () => {
  //     const response = await apiFetch("/sessions/stroop-test/", {
  //       method: "GET",
  //     });
  //     // Process the data and dispatch to the reducer
  //     const result: SessionsResponse = await response.json();
  //     console.log("Fetched data:", result);
  //     dispatch({
  //       type: "setAverages",
  //       payload: {
  //         averageScore: result.data.stats.averageScore,
  //         averageAccuracy: result.data.stats.accuracy,
  //       },
  //     });
  //     dispatch({ type: "setHighScore", payload: result.data.stats.highscore });
  //     const historyData = result.data.sessions.map((session) => ({
  //       id: session.id,
  //       date: new Date(session.createdAt),
  //       score: session.correct,
  //       accuracy:
  //         session.correct + session.incorrect > 0
  //           ? Math.round(
  //               (session.correct / (session.correct + session.incorrect)) * 100,
  //             )
  //           : 0,
  //       reaction: session.reactionTimeAvg,
  //     }));
  //     setHistory(historyData);
  //   };
  //   fetchData();
  // }, [state.gameState]); // eslint-disable-line react-hooks/exhaustive-deps