import {
  BriefcaseBusinessIcon,
  CalendarCheck,
  CalendarDays,
  Code2Icon,
  LayoutDashboard,
  Puzzle,
  User2Icon,
  UserCheck2,
} from "lucide-react";

export const SideBarOptions = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Schedule Interview",
    icon: CalendarDays,
    path: "/dashboard/schedule",
  },
  {
    name: "All Interviews",
    icon: CalendarCheck,
    path: "/dashboard/all",
  },
];
export const InterviewType = [
  {
    title: "Technical",
    icon: Code2Icon,
  },
  {
    title: "Behavioral",
    icon: User2Icon,
  },
  {
    title: "Experience",
    icon: BriefcaseBusinessIcon,
  },
  {
    title: "Problem Solving",
    icon: Puzzle,
  },
  {
    title: "LeaderShip",
    icon: UserCheck2,
  },
];
export const Question_PROMPT = `You are an expert technical interviewer.
Based on the following inputs, generate a well-structured list of high-quality interview questions:
Job Title: {{jobTitle}}
Job Description:{{jobDescription}}
Interview Duration: {{duration}}
Interview Type: {{type}}
Your task:
Analyze the job description to identify key responsibilities, required skills, and expected experience.
Generate a list of interview questions depends on interview duration
Adjust the number and depth of questions to match the interview duration.
Ensure the questions match the tone and structure of a real-life {{type}} interview.
Format your response in JSON format with array list of questions.
format: interviewQuestions=[
{
question:'',
type:'Technical/Behavioral/Experience/Problem Solving/Leadership'
},{
...
}]

Your goal is to create a structured, relevant, and time-optimized interview plan for a {{jobTitle}} role.
IMPORTANT: Return ONLY valid JSON without any Markdown formatting or additional text.
The response must begin with { and end with }.`;
/*`You are an expert technical interviewer specializing in creating structured interview questions. Based on the following job details, generate a tailored set of interview questions in the exact specified JSON format.

Job Details:
- Title: {{jobTitle}}
- Description: {{jobDescription}} 
- Duration: {{duration}} minutes
- Interview Type: {{type}}

Requirements:
1. Carefully analyze the job description to identify:
   - 3-5 core responsibilities
   - Required technical skills
   - Desired soft skills
   - Experience level expected

2. Generate questions that:
   - Match the interview type's style ({{type}})
   - Are properly scoped for the time allotted ({{duration}} minutes)
   - Cover all critical job aspects
   - Include a mix of question types (technical, behavioral, situational)

3. Structure guidelines:
   - Allocate question time proportionally:
     * 40% technical/skill verification
     * 30% behavioral/cultural fit
     * 20% problem-solving
     * 10% questions for the candidate
   - Include 1-2 curveball questions for senior roles
   - For technical roles, include at least 1 hands-on coding/problem question

4. Output format requirements:
   - Must use exactly this JSON structure:
     interviewQuestions=[
       {
         question: '',
         type: 'Technical/Behavioral/Experience/Problem Solving/Leadership'
       },
       {...}
     ]
   - Do not include any additional text or explanations
   - Array length must match interview duration (approx. 3 min per question)

5. Special considerations:
   - For {{type}} interviews, emphasize _______
   - For {{duration}} duration, prioritize _______
   - For {{jobTitle}} roles, always include _______

Generate the most effective question set possible within these constraints, outputting only the exact JSON array specified.`
*/
export const FEEDBACK_PROMPT = `{{conversation}}
Depends on this Interview Conversation between assitant and user,
Give me feedback for user interview. Give me rating out of 10 for technical Skills,
Communication, Problem Solving, Experince. Also give me summery in 3 lines
about the interview and one line to let me know whether is recommanded
for hire or not with msg. Give me response in JSON format
{
  feedback:{
    rating:{
    techicalSkills:5,
    communication:6,
    problemSolving:4,
    experince:7
  },
  summary :< in 3 Lines>,
  Recommendation:",
  RecommendationMsg:"

}

}`;
