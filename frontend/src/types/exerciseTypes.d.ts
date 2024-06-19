type RepetitionSet = {type: string; finished: boolean; repetitions: number; weight: number};
type TimedSet = {type: string; finished: boolean; time: number; weight: number};
type CardioSet = {type: string; finished: boolean; time: number; distance: number};

type ExerciseSet = RepetitionSet | TimedSet | CardioSet;

interface ReceivedExercise {
	name: string;
	type: string;
	sets: ExerciseSet[];
	template: ReceivedTemplate;
}
