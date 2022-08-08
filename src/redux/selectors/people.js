
export const s__people = (state) => state?.people;

export const s__previousNext = (state) => {
    const previous = state?.people?.previous;
    const next = state?.people?.next;
    return { previous, next }
};

export const s__getPeopleList = (state) => s__people(state)?.peoples
export const s__getList = (state) => s__people(state)?.list

export const s__getPeopleDetails = (state) => s__people(state).personDetails