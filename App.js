import React, { useState } from 'react'

const questions = [
	'Can you code in Ruby?',
	'Can you code in Javascript?',
	'Can you code in Swift?',
	'Can you code in Java?',
	'Can you code in C#?'
]

function App() {
	const [answers, setAnswers] = useState([])
	const [overallScore, setOverallScore] = useState(0)
	const [averageScore, setAverageScore] = useState(0)
	const [yesClicked, setYesClicked] = useState(
		Array(questions.length).fill(false)
	)
	const [noClicked, setNoClicked] = useState(
		Array(questions.length).fill(false)
	)

	const handleAnswer = (index, answer) => {
		const newAnswers = [...answers]
		newAnswers[index] = answer === 'Yes'
		setAnswers(newAnswers)
		const score =
			(100 * newAnswers.filter(Boolean).length) / questions.length
		setOverallScore(score)
		if (answer === 'Yes') {
			const newYesClicked = [...yesClicked]
			newYesClicked[index] = true
			setYesClicked(newYesClicked)
			setNoClicked(Array(questions.length).fill(false))
		} else {
			setYesClicked(Array(questions.length).fill(false))
			const newNoClicked = [...noClicked]
			newNoClicked[index] = true
			setNoClicked(newNoClicked)
		}
	}

	const calculateAverageScore = () => {
		const totalScores =
			JSON.parse(localStorage.getItem('totalScores')) || []
		const average =
			totalScores.reduce((acc, score) => acc + score, 0) /
			totalScores.length
		setAverageScore(average)
	}

	const handleSubmit = () => {
		const score = (100 * answers.filter(Boolean).length) / questions.length
		const totalScores =
			JSON.parse(localStorage.getItem('totalScores')) || []
		totalScores.push(score)
		localStorage.setItem('totalScores', JSON.stringify(totalScores))
		calculateAverageScore()
		setAnswers([])
		setYesClicked(Array(questions.length).fill(false))
		setNoClicked(Array(questions.length).fill(false))
	}

	return (
		<div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					padding: '40px'
				}}
			>
				{questions.map((question, index) => (
					<div key={index}>
						<p style={{ marginBottom: '20px', fontSize: '20px' }}>
							{question}
						</p>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between'
							}}
						>
							<button
								style={{
									backgroundColor: yesClicked[index]
										? '#000'
										: '#fff',
									color: yesClicked[index] ? '#fff' : '#000',
									width: '50px',
									height: '30px',
									cursor: 'pointer',
									fontSize: '16px'
								}}
								onClick={() => handleAnswer(index, 'Yes')}
							>
								Yes
							</button>
							<button
								style={{
									backgroundColor: noClicked[index]
										? '#000'
										: '#fff',
									color: noClicked[index] ? '#fff' : '#000',
									width: '50px',
									height: '30px',
									cursor: 'pointer',
									fontSize: '16px'
								}}
								onClick={() => handleAnswer(index, 'No')}
							>
								No
							</button>
						</div>
					</div>
				))}
			</div>
			<button
				style={{
					backgroundColor: '#000',
					color: '#fff',
					display: 'block',
					margin: '0 auto',
					width: '100px',
					height: '50px',
					borderRadius: '5px'
				}}
				onClick={handleSubmit}
			>
				Submit
			</button>
			<p style={{ fontSize: '36px', textAlign: 'center', color: 'blue' }}>
				Score for this run: {overallScore.toFixed(2)}
			</p>
			{averageScore !== 0 && (
				<p
					style={{
						fontSize: '36px',
						textAlign: 'center',
						color: 'blue'
					}}
				>
					Average score: {averageScore.toFixed(2)}
				</p>
			)}
		</div>
	)
}

export default App
