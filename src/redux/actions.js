export const setCurrentSnippet = (snippetName) => {
  return {
    type: "SET_CURRENT_SNIPPET",
    payload: snippetName,
  };
};
