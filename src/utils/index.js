import axios from 'axios'

// Image upload
export const imageUpload = async image => {
  const formData = new FormData()
  formData.append('image', image)
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_API_IMGBB}`,
    formData
  )
  return data.data.display_url
}
// data.js
export const studyPlans = [
  {
    "category": "logoDesign",
    "plan": "Week 1: Basic Design Principles, Week 2: Typography, Week 3: Color Theory"
  },
  {
    "category": "logoDesign",
    "plan": "Week 1: Inspiration Gathering, Week 2: Sketching Ideas, Week 3: Digital Design"
  },
  {
    "category": "digitalMarketing",
    "plan": "Week 1: Introduction to Digital Marketing, Week 2: SEO Basics, Week 3: Social Media Strategies"
  },
  {
    "category": "digitalMarketing",
    "plan": "Week 1: Content Marketing, Week 2: Email Marketing, Week 3: Analytics and Reporting"
  },
  {
    "category": "bookReview",
    "plan": "Week 1: Reading Techniques, Week 2: Analyzing Themes, Week 3: Writing Reviews"
  },
  {
    "category": "bookReview",
    "plan": "Week 1: Selecting Books, Week 2: Critical Thinking, Week 3: Review Structure"
  },
  {
    "category": "gameReview",
    "plan": "Week 1: Playing and Recording, Week 2: Analysis of Gameplay, Week 3: Writing and Editing"
  },
  {
    "category": "gameReview",
    "plan": "Week 1: Research and Preparation, Week 2: Hands-On Gameplay, Week 3: Review Compilation"
  }
];
