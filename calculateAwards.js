// Function to determine difficulty and award amount based on OSCARS rules
function calculateAwards (prDetails) {
  let difficulty = 'easy' // Default value
  let awardAmount = 100000 // Default value in cents (100k)
  let priorityMultiplier = 1 // Default multiplier
  let penalties = 0 // Default penalties

  // Example rules based on labels and other PR details
  if (prDetails.labels.includes('hard')) {
    difficulty = 'hard'
    awardAmount = 500000 // 500k
  } else if (prDetails.labels.includes('medium')) {
    difficulty = 'medium'
    awardAmount = 250000 // 250k
  }

  // Check for priority labels
  if (prDetails.labels.includes('high-priority')) {
    priorityMultiplier = 2 // Double the award for high-priority
  }

  // Check for penalties based on comments or other criteria
  if (prDetails.comments > 5) {
    penalties += 10000 // Deduct 10k for excessive comments
  }

  // Calculate final award amount
  let finalAwardAmount = (awardAmount * priorityMultiplier) - penalties

  // Ensure the final award amount is not negative
  finalAwardAmount = Math.max(finalAwardAmount, 0)

  // Return the calculated values
  return { difficulty, finalAwardAmount }
}

// Read PR details from environment variables
const prDetails = {
  labels: process.env.PR_LABELS ? process.env.PR_LABELS.split(',') : [],
  comments: parseInt(process.env.PR_COMMENTS || 0, 10) // Assuming you pass the number of comments
}

// Calculate awards
const { difficulty, finalAwardAmount } = calculateAwards(prDetails)

// Output the results
console.log(`${difficulty},${finalAwardAmount}`)
