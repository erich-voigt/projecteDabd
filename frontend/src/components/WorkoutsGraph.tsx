import {areaElementClasses, legendClasses, lineElementClasses, markElementClasses} from "@mui/x-charts";
import {LineChart} from "@mui/x-charts/LineChart";

interface WorkoutsGraphProps {
	data: {
		months: string[];
		values: number[];
	};
}

export default function WorkoutsGraph({data}: WorkoutsGraphProps) {
	return (
		<LineChart
			sx={{
				[`& .${lineElementClasses.root}`]: {
					stroke: "rgb(162,230,53)"
				},
				[`& .${areaElementClasses.root}`]: {
					fill: "url('#areaGradient')"
				},
				[`& .${markElementClasses.root}`]: {
					fill: "rgb(24,24,27)",
					stroke: "rgb(162,230,53)"
				},
				[`& .${markElementClasses.faded}`]: {
					fill: "rgb(24,24,27)",
					stroke: "rgb(162,230,53)"
				},
				[`& .${legendClasses.root}`]: {
					display: "none"
				},
				[`& .MuiChartsAxisHighlight-root`]: {
					stroke: "rgb(228,228,231)"
				}
			}}
			xAxis={[{data: Array.from(Array(12).keys()), valueFormatter: value => data.months[value], max: 11}]}
			yAxis={[{min: -0.1, max: Math.max(...data.values, 1) + 0.1}]}
			series={[
				{
					data: data.values,
					area: true,
					color: "rgb(162,230,53)",
					label: "Workouts",
					valueFormatter: value => `${value}`
				}
			]}
			height={300}
			leftAxis={null}
			bottomAxis={null}
			rightAxis={null}
			topAxis={null}>
			<defs>
				<linearGradient id="areaGradient" gradientTransform="rotate(90)">
					<stop offset="0%" stopColor="rgba(162,230,53,0.20)" />
					<stop offset="100%" stopColor="rgba(162,230,53,0)" />
				</linearGradient>
			</defs>
		</LineChart>
	);
}
