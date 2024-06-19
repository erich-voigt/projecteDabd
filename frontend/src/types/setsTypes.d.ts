type RepetitionSet = {type: string; finished: boolean; repetitions: number; weight: number};
type TimedSet = {type: string; finished: boolean; time: number; weight: number};
type CardioSet = {type: string; finished: boolean; time: number; distance: number};

type ExerciseSet = RepetitionSet | TimedSet | CardioSet;

interface SetData {
	repeticiones?: number;
	peso?: number;
	tiempo?: number;
	distancia?: number;
}

interface ReceivedSets {
	data: SetData[] | SetData;
	type: string;
	finished: boolean;
	repetitions: number;
	weight: number;
}
