// ---------------------------------------------------------------------------
// OLQ Assessment – 30 situational questions (2 per OLQ, 15 OLQs, 4 factors)
// ---------------------------------------------------------------------------

export interface Question {
  factor: "Planning & Organizing" | "Social Adjustment" | "Social Effectiveness" | "Dynamic"
  olq: string
  q: string
  options: string[]
  scores: number[]
}

export const questions: Question[] = [
  // =========================================================================
  // Factor 1: Planning & Organizing
  // =========================================================================

  // OLQ 1: Effective Intelligence (Q1–Q2)
  {
    factor: "Planning & Organizing",
    olq: "Effective Intelligence",
    q: "Your college fest is in 3 days and the chief guest cancels last minute. The organizing committee is panicking. You would:",
    options: [
      "Suggest postponing the event until a new chief guest is confirmed",
      "Start calling every contact you have to find a replacement immediately",
      "Propose that a senior faculty member step in as chief guest, and meanwhile reach out to 2-3 backup options",
      "Let the committee head handle it - it's their responsibility",
    ],
    scores: [1, 3, 4, 1],
  },
  {
    factor: "Planning & Organizing",
    olq: "Effective Intelligence",
    q: "You're trekking with friends and realize you've taken a wrong trail. It's getting dark and you have about 2 hours of daylight left. You would:",
    options: [
      "Keep going on the current trail - it might connect to the right path ahead",
      "Immediately retrace your steps to the last known correct point",
      "Check your phone for maps/GPS, assess how far off you are, and decide whether to retrace or find an alternate route",
      "Stop and wait for other trekkers who might know the way",
    ],
    scores: [2, 3, 4, 1],
  },

  // OLQ 2: Reasoning Ability (Q3–Q4)
  {
    factor: "Planning & Organizing",
    olq: "Reasoning Ability",
    q: "Your team has two project ideas for a competition. Idea A is creative but risky - it could score very high or very low. Idea B is solid and safe - guaranteed decent score but unlikely to win. The competition is winner-takes-all. You would argue for:",
    options: [
      "Idea B - a guaranteed decent score is better than risking everything",
      "Idea A - in a winner-takes-all format, you need to maximize upside, not play safe",
      "A hybrid - take the safe foundation of B but add the creative element from A",
      "Let the team vote and go with majority",
    ],
    scores: [2, 4, 3, 1],
  },
  {
    factor: "Planning & Organizing",
    olq: "Reasoning Ability",
    q: "A friend asks you to invest Rs 50,000 in their business idea. They show you impressive revenue projections. You would:",
    options: [
      "Invest - the projections look great and you trust your friend",
      "Decline - you don't mix money and friendship",
      "Ask to see their actual expenses, customer count, and unit economics before deciding",
      "Invest a smaller amount (Rs 10,000) to test the waters",
    ],
    scores: [1, 2, 4, 3],
  },

  // OLQ 3: Organizing Ability (Q5–Q6)
  {
    factor: "Planning & Organizing",
    olq: "Organizing Ability",
    q: "You've been asked to organize a blood donation camp at your college within 2 weeks. You would start by:",
    options: [
      "Creating a poster and sharing it on social media to get donors",
      "Listing everything needed (venue, blood bank tie-up, medical team, volunteers, permissions, equipment) and creating a day-by-day timeline working backwards from the event date",
      "Calling a blood bank first to check availability and requirements",
      "Asking friends to help and dividing work among whoever is available",
    ],
    scores: [2, 4, 3, 2],
  },
  {
    factor: "Planning & Organizing",
    olq: "Organizing Ability",
    q: "You're moving to a new city for work. You have 10 days to find accommodation, set up the house, and start your job. You would:",
    options: [
      "Reach the city first, stay in a hotel, and figure things out day by day",
      "Search for accommodation online before arriving, shortlist 5 options, schedule visits for Day 1-2, keep Day 3 for setup, and start work from Day 4",
      "Ask a friend or colleague in that city to help find a place",
      "Book a PG for the first month and look for a proper place after settling into work",
    ],
    scores: [2, 4, 3, 3],
  },

  // OLQ 4: Power of Expression (Q7–Q8)
  {
    factor: "Planning & Organizing",
    olq: "Power of Expression",
    q: "During a group discussion, two members get into a heated argument and the discussion goes off-track. You would:",
    options: [
      "Stay quiet and wait for the argument to die down",
      "Pick a side and support the person you agree with",
      "Intervene by summarizing what both sides are saying, acknowledge both points, and redirect the group to the original topic",
      "Suggest the group move to the next topic since this one is getting nowhere",
    ],
    scores: [1, 2, 4, 3],
  },
  {
    factor: "Planning & Organizing",
    olq: "Power of Expression",
    q: "You need to explain a technical concept (like how UPI payments work) to your grandmother. You would:",
    options: [
      "Use a simple analogy - \"It's like handing cash to a shopkeeper, but through your phone instead of your hand\"",
      "Explain the technical process step by step - bank account, NPCI, QR code, etc.",
      "Show her by doing a live demo on your phone",
      "Tell her not to worry about how it works and just follow the steps",
    ],
    scores: [4, 2, 3, 1],
  },

  // =========================================================================
  // Factor 2: Social Adjustment
  // =========================================================================

  // OLQ 5: Social Adaptability (Q9–Q10)
  {
    factor: "Social Adjustment",
    olq: "Social Adaptability",
    q: "You've been posted to a new team where everyone speaks a regional language you don't understand. They switch to Hindi/English when talking to you but use their language among themselves. You would:",
    options: [
      "Feel excluded and request the manager to enforce a common language policy",
      "Accept it and focus only on work-related communication",
      "Learn basic phrases in their language, show genuine interest in their culture, and let the comfort build naturally",
      "Spend time only with people who speak your language",
    ],
    scores: [1, 2, 4, 1],
  },
  {
    factor: "Social Adjustment",
    olq: "Social Adaptability",
    q: "At a wedding, you're seated at a table with people much older than you - retired professionals in their 60s. You would:",
    options: [
      "Politely sit through the dinner and leave as soon as possible",
      "Engage them in conversation - ask about their careers, experiences, and opinions on current affairs",
      "Stay on your phone and respond only if someone speaks to you",
      "Find an excuse to move to a table with people your age",
    ],
    scores: [2, 4, 1, 1],
  },

  // OLQ 6: Cooperation (Q11–Q12)
  {
    factor: "Social Adjustment",
    olq: "Cooperation",
    q: "Your team is working on a presentation. Your section is ready but a teammate is struggling with theirs and the deadline is tomorrow. You would:",
    options: [
      "Submit your section on time - their section is their responsibility",
      "Offer to help them finish their section after completing yours, even if it means staying up late",
      "Give them some tips and resources but let them figure it out",
      "Suggest to the team lead that the deadline be extended by a day",
    ],
    scores: [1, 4, 2, 3],
  },
  {
    factor: "Social Adjustment",
    olq: "Cooperation",
    q: "During a team sport (cricket/football), you're playing well individually but the team is losing. The captain changes your position to a less glamorous role that would help the team. You would:",
    options: [
      "Accept the change and play the new role wholeheartedly",
      "Accept but feel frustrated - you were performing well in your position",
      "Suggest an alternative strategy where you can keep your position AND help the team",
      "Tell the captain you disagree and prefer to stay in your current position",
    ],
    scores: [4, 2, 3, 1],
  },

  // OLQ 7: Sense of Responsibility (Q13–Q14)
  {
    factor: "Social Adjustment",
    olq: "Sense of Responsibility",
    q: "You're leading a group project that fails to meet its objective. The professor asks what went wrong. You would:",
    options: [
      "Explain that some team members didn't deliver their parts on time",
      "Take responsibility as the leader - \"I should have tracked progress more closely and intervened earlier\"",
      "Give an honest assessment of what went wrong without blaming anyone specific",
      "Say you did your best but the objective was too ambitious for the timeline",
    ],
    scores: [1, 4, 3, 2],
  },
  {
    factor: "Social Adjustment",
    olq: "Sense of Responsibility",
    q: "You promised to pick up your younger sibling from their coaching class at 7 PM. At 6:30 PM, your friends invite you to a movie that starts at 6:45. You would:",
    options: [
      "Ask your sibling to take an auto home and go for the movie",
      "Pick up your sibling first, drop them home, and join friends for a later show if possible",
      "Call your parents and ask them to pick up your sibling instead",
      "Tell your friends you'll join them after picking up your sibling, even if you miss the beginning",
    ],
    scores: [1, 4, 3, 3],
  },

  // =========================================================================
  // Factor 3: Social Effectiveness
  // =========================================================================

  // OLQ 8: Initiative (Q15–Q16)
  {
    factor: "Social Effectiveness",
    olq: "Initiative",
    q: "You notice that your apartment building has no fire safety equipment despite being 10 floors. You would:",
    options: [
      "Hope nothing happens - it's the builder's responsibility",
      "Mention it in the next RWA meeting",
      "Research fire safety requirements, prepare a brief with costs and vendors, and present it to the RWA with a proposal",
      "Buy a fire extinguisher for your own flat",
    ],
    scores: [1, 2, 4, 2],
  },
  {
    factor: "Social Effectiveness",
    olq: "Initiative",
    q: "During an internship, you finish your assigned work early. There are 3 hours left in the day. You would:",
    options: [
      "Wait for your manager to assign more work",
      "Ask your manager if there's anything else you can help with",
      "Identify a process or task that seems inefficient, research a better approach, and present it to your manager",
      "Use the time to learn something new online",
    ],
    scores: [1, 3, 4, 2],
  },

  // OLQ 9: Self-Confidence (Q17–Q18)
  {
    factor: "Social Effectiveness",
    olq: "Self-Confidence",
    q: "In a meeting, a senior person makes a factual claim you're sure is incorrect. Everyone else is nodding. You would:",
    options: [
      "Stay quiet - they're senior and you could be wrong",
      "Politely raise your point - \"I may be wrong, but my understanding is different. Could we verify this?\"",
      "Mention it privately to the senior person after the meeting",
      "Nod along but make your own decision based on what you know",
    ],
    scores: [1, 4, 3, 2],
  },
  {
    factor: "Social Effectiveness",
    olq: "Self-Confidence",
    q: "You've prepared thoroughly for a presentation but just before going on stage, you realize the audience includes industry experts who know far more than you. You would:",
    options: [
      "Stick to your preparation and present confidently - you've done your homework",
      "Reduce the scope of your presentation to only the parts you're absolutely sure about",
      "Start by acknowledging the experts in the room and invite them to add their perspective during Q&A",
      "Feel nervous and rush through the presentation to get it over with",
    ],
    scores: [4, 2, 3, 1],
  },

  // OLQ 10: Speed of Decision (Q19–Q20)
  {
    factor: "Social Effectiveness",
    olq: "Speed of Decision",
    q: "You're driving to an important exam. Midway, you realize you left your admit card at home. The exam starts in 40 minutes. Your home is 20 minutes back, the exam center is 15 minutes ahead. You would:",
    options: [
      "Go back home - you can't enter without the admit card",
      "Continue to the exam center, explain the situation to the invigilator, and call someone at home to photograph and send the admit card",
      "Pull over and think about what to do",
      "Call the exam center to ask if they'll allow entry without the card, then decide",
    ],
    scores: [2, 4, 1, 3],
  },
  {
    factor: "Social Effectiveness",
    olq: "Speed of Decision",
    q: "You're the captain of a quiz team. In the final round, you have 10 seconds to answer. You're 70% sure of the answer. Your teammate whispers a different answer they're 50% sure of. You would:",
    options: [
      "Go with your answer - you're more confident",
      "Go with your teammate's answer to maintain team harmony",
      "Quickly ask your teammate their reasoning and decide in 3 seconds",
      "Skip the question to avoid losing points",
    ],
    scores: [4, 1, 3, 2],
  },

  // OLQ 11: Ability to Influence Group (Q21–Q22)
  {
    factor: "Social Effectiveness",
    olq: "Ability to Influence Group",
    q: "Your friend group wants to go to Goa for a trip but you think Himachal would be better given the budget and season. Most people prefer Goa. You would:",
    options: [
      "Go along with Goa - majority wins",
      "Make a quick comparison (cost, weather, travel time, activities) and share it in the group chat to let people reconsider",
      "Insist on Himachal and refuse to go if it's Goa",
      "Suggest the group consider both options seriously before deciding",
    ],
    scores: [1, 4, 1, 3],
  },
  {
    factor: "Social Effectiveness",
    olq: "Ability to Influence Group",
    q: "In a class group project, the team wants to take a shortcut that you believe will reduce quality. You would:",
    options: [
      "Go along - it's a group decision",
      "Explain specifically what quality will be lost and propose a middle ground that saves time without cutting corners",
      "Do your own part with full quality and let others take shortcuts on theirs",
      "Escalate to the professor that the team isn't putting in effort",
    ],
    scores: [1, 4, 2, 1],
  },

  // OLQ 12: Liveliness (Q23–Q24)
  {
    factor: "Social Effectiveness",
    olq: "Liveliness",
    q: "It's Day 3 of a 5-day outdoor training camp. Everyone is exhausted, morale is low, and it's raining. You would:",
    options: [
      "Push through silently - complaining won't help",
      "Crack a joke, start a song, or suggest a quick fun activity to lift the mood before the next task",
      "Motivate the group with a speech about why you're all here",
      "Take a break and rest - people need recovery, not motivation",
    ],
    scores: [2, 4, 3, 2],
  },
  {
    factor: "Social Effectiveness",
    olq: "Liveliness",
    q: "You're at a family gathering where everyone is sitting quietly and the mood is dull. You would:",
    options: [
      "Sit quietly - not every gathering needs to be exciting",
      "Start a conversation, bring up an interesting family story, or suggest a game to get people talking",
      "Play music on your phone to liven up the atmosphere",
      "Spend time on your phone until it's time to leave",
    ],
    scores: [2, 4, 3, 1],
  },

  // =========================================================================
  // Factor 4: Dynamic
  // =========================================================================

  // OLQ 13: Determination (Q25–Q26)
  {
    factor: "Dynamic",
    olq: "Determination",
    q: "You've failed the SSB interview for the 3rd time. Your family is suggesting you take a government job exam instead. You would:",
    options: [
      "Accept their advice - 3 failures is a clear signal",
      "Analyze what went wrong in each attempt, identify specific gaps, create a focused improvement plan, and try again",
      "Take a break for a few months to think about what you really want",
      "Apply for the government job as a backup but continue SSB prep alongside",
    ],
    scores: [1, 4, 2, 3],
  },
  {
    factor: "Dynamic",
    olq: "Determination",
    q: "You're running a 5 km race. At 3.5 km, you're exhausted and your legs are cramping. You can see other runners slowing down and walking. You would:",
    options: [
      "Walk the rest - finishing matters, not the speed",
      "Slow your pace but keep running - refuse to walk",
      "Stop, stretch for 30 seconds, then continue running",
      "Drop out - you've already covered most of the distance",
    ],
    scores: [2, 4, 3, 1],
  },

  // OLQ 14: Courage (Q27–Q28)
  {
    factor: "Dynamic",
    olq: "Courage",
    q: "You witness a senior student bullying a junior in your hostel. The senior is known for being aggressive. You would:",
    options: [
      "Ignore it - getting involved will make you a target",
      "Directly intervene and tell the senior to stop",
      "Report it to the warden anonymously",
      "Check on the junior afterward and encourage them to report it",
    ],
    scores: [1, 4, 2, 3],
  },
  {
    factor: "Dynamic",
    olq: "Courage",
    q: "During a team activity, you discover that your team's approach has a fundamental flaw that nobody else has noticed. Pointing it out means restarting the work. The deadline is close. You would:",
    options: [
      "Stay quiet - pointing it out now will demoralize the team and waste time",
      "Raise it immediately - \"I think we have a problem. Better to fix it now than submit flawed work\"",
      "Try to fix the flaw yourself without telling the team",
      "Mention it to the team lead privately and let them decide",
    ],
    scores: [1, 4, 2, 3],
  },

  // OLQ 15: Stamina (Q29–Q30)
  {
    factor: "Dynamic",
    olq: "Stamina",
    q: "You have a final exam tomorrow morning and a family emergency arises at 10 PM that keeps you awake until 3 AM. You have barely studied. You would:",
    options: [
      "Skip the exam and request a re-test later",
      "Sleep for 2 hours (3-5 AM), wake up, do a focused revision of key topics, and give the exam",
      "Pull an all-nighter to cover as much syllabus as possible",
      "Go to the exam and attempt whatever you already know without additional study",
    ],
    scores: [1, 4, 2, 3],
  },
  {
    factor: "Dynamic",
    olq: "Stamina",
    q: "You're on Day 4 of a 5-day SSB. You've had 4 hours of sleep each night, you're physically sore from GTO tasks, and your personal interview is in 1 hour. You would:",
    options: [
      "Tell yourself you've done your best in the first 4 days and whatever happens in the interview happens",
      "Use the 1 hour to splash water on your face, review your PIQ one final time, do some light stretching, and walk into the interview with full energy",
      "Request to be interviewed later in the day so you can rest",
      "Have a strong coffee and mentally rehearse key answers",
    ],
    scores: [2, 4, 1, 3],
  },
]
