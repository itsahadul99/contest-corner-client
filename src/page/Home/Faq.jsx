
import { useState } from "react";
import SectionTitle from "../../components/shared/SectionTitle";
import Container from "../../components/shared/Container";
// Sample FAQ data
const faqs = [
    {
        question: "How do I join a contest?",
        answer: "Simply sign up for an account, browse through the available contests, and register for the ones that match your skills and interests. It's fast and easy!",
    },
    {
        question: "Is there any cost to participate in the contests?",
        answer: "Some contests are free to enter, while others may have a small registration fee. The contest details page will clearly mention if there’s a fee involved.",
    },
    {
        question: "How can I prepare for a contest?",
        answer: "We offer study materials, practice tests, and expert tips to help you prepare for contests. You can also join discussion forums to connect with other participants.",
    },
    {
        question: "What happens if I win a contest?",
        answer: "Winners receive exciting prizes, ranging from gift cards to cash rewards, and sometimes even career opportunities like internships. You'll also gain recognition in the contest community!",
    },
    {
        question: "Can I participate in multiple contests at the same time?",
        answer: "Yes, you can register for and participate in multiple contests simultaneously. Make sure to manage your time well to avoid any overlap in deadlines.",
    },
    {
        question: "How are the contest winners selected?",
        answer: "Winners are selected based on the quality of their submissions and performance in the contest. Each contest has its own evaluation criteria, which are clearly mentioned on the contest page.",
    },
];

// eslint-disable-next-line react/prop-types
function FAQItem({ question, answer, isOpen, onClick }) {
    return (
        <div
            className={`px-4 rounded-xl my-2 ${isOpen ? "bg-[#ecf1f7]" : "bg-base-100"}`}
        >
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center py-4 text-lg font-semibold"
            >
                <span className="font-medium font-beVietnam text-xl">
                    {question}
                </span>
                <svg
                    className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>
            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-screen opacity-100 py-4" : "max-h-0 opacity-0"}`}
            >
                <div className="rounded-lg mb-2 text-md font-beVietnam">
                    {answer}
                </div>
            </div>
        </div>
    );
}

export default function Faq() {
    const [openIndex, setOpenIndex] = useState(0);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-base-100">
            <SectionTitle title="Frequently Asked Questions" subTitle="Remove Confusion" />
            <Container>
                {faqs.map((faq, index) => (
                    <FAQItem
                        key={index}
                        question={faq.question}
                        answer={faq.answer}
                        isOpen={openIndex === index}
                        onClick={() => toggleFAQ(index)}
                    />
                ))}
            </Container>
        </section>
    );
}
