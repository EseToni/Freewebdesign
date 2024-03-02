import { useState } from "preact/hooks"

const Calendar = () => {
	const [date, setDate] = useState(new Date())
	const [selectedDate, setSelectedDate] = useState(new Date())
	const [selectedMonth, setSelectedMonth] = useState(new Date())
	const [selectedHour, setSelectedHour] = useState("")
	const firstDayOfMonth = new Date(
		selectedMonth.getFullYear(),
		selectedMonth.getMonth(),
		1
	).getDay()
	const lastDayOfMonth = new Date(
		selectedDate.getFullYear(),
		selectedMonth.getMonth() + 1,
		0
	).getDate()

	const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	]
	const hours = [
		"10:00",
		"10:30",
		"11:00",
		"11:30",
		"12:00",
		"12:30",
		"15:30",
		"16:00",
		"16:30",
		"17:00",
		"17:30",
		"19:00",
		"19:30",
		"20:00",
	]
	return (
		<div class="grid grid-cols-6 grid-rows-1 h-[325px] gap-x-2 ">
			<div class="flex flex-col gap-4 col-span-4 ">
				<div
					class="flex gap-8 items-center text-zinc-900 justify-center w-auto"
					id="month"
				>
					<button
						onClick={() => {
							setSelectedMonth(
								new Date(
									selectedMonth.getFullYear(),
									selectedMonth.getMonth() - 1,
									1
								)
							)
						}}
					>
						{"<"}
					</button>
					{months[selectedMonth.getMonth()]}
					<button
						onClick={() => {
							setSelectedMonth(
								new Date(
									selectedMonth.getFullYear(),
									selectedMonth.getMonth() + 1,
									1
								)
							)
						}}
					>
						{">"}
					</button>
				</div>
				<div class="grid grid-cols-7 grid-rows-5 gap-y-1 text-center  items-center">
					{days.map((day) => (
						<span class="text-lg">{day}</span>
					))}
					{Array.from({ length: firstDayOfMonth - 1 }, (_,) => (
						<span></span>
					))}
					{Array.from({ length: lastDayOfMonth }, (_, i) => (
						<button
							disabled={i + 1 < date.getDate()}
							class={`flex-1  w-11 h-11 font-bold rounded-full transition-all disabled:bg-transparent disabled:text-gray-500  ${
								selectedDate.getDate() === i + 1 &&
								selectedDate.getMonth() === selectedMonth.getMonth()
									? " bg-blue-600 text-white shadow-md cursor-default"
									: "bg-blue-100 text-blue-600"
							}`}
							onClick={() => {
								setSelectedDate(
									new Date(
										selectedMonth.getFullYear(),
										selectedMonth.getMonth(),
										i + 1
									)
								)
							}}
						>
							{i + 1}
						</button>
					))}
				</div>
			</div>
			<div class="flex flex-col gap-2 col-span-2">
				<div class="font-medium ">
                    {console.log(selectedDate.getDay() - 1)}
					{days[selectedDate.getDay() - 1 ] ?days[selectedDate.getDay() - 1] : "Sun" }, {months[selectedMonth.getMonth()]}{" "}
					{selectedDate.getDate()} <span class="font-normal text-zinc-800">{selectedHour}</span>
				</div>
				<div class="flex  w-full gap-1 flex-col overflow-y-scroll  scrollOut">
					<div class="flex flex-col gap-2  w-full justify-center items-center ">
						{hours.map(
							(hour) =>
								hour >
									new Date().getHours() + ":" + new Date().getMinutes() && (
									<div class={"flex w-full flex-row gap-2 "}>
										<button
											disabled={selectedHour === hour}
											onClick={() => setSelectedHour(hour)}
											class="flex w-full h-14 items-center justify-center font-bold   bg-white text-blue-600 border-2 rounded-xl border-blue-200 disabled:bg-gray-500 disabled:text-white disabled:border-transparent hover:bg-blue-600 hover:text-white hover:border-transparent   transition-all"
										>
											{hour}
										</button>
										{selectedHour === hour && (
											<button class="bg-blue-600  text-white font-medium rounded-xl w-full h-14 transition-all hover:text-blue-600 hover:bg-transparent hover:shadow-md">
												Next
											</button>
										)}
									</div>
								)
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Calendar
