import type { RootState } from "../../reduxStore/store";

export const selectBoxWords = (state: RootState, box: number) => {
    const filteredWords = [];
    for (const index in state.srs.progress.byId) {
        if (state.srs.progress.byId[index].box === box) {
            filteredWords.push(state.srs.words.byId[index]);
        }
    }
    return filteredWords;
}