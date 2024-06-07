import SectionTitle from '../../components/shared/SectionTitle';
import { studyPlans } from '../../utils/index';
const categories = [
    { name: "Logo Design", key: "logoDesign" },
    { name: "Digital Marketing", key: "digitalMarketing" },
    { name: "Book Review", key: "bookReview" },
    { name: "Game Review", key: "gameReview" }
];
const PreparationPage = () => {
    return (
        <div className="container mx-auto p-6">
            <SectionTitle title="Practice Makes Perfect" subTitle="learn more" />
            <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-5 md:gap-8'>
                {categories.map(({ name, key }) => (
                    <div key={key} className="mb-8 p-5 border rounded-lg shadow-md">
                        <h2 className="text-xl md:text-2xl font-semibold mb-4">{name}</h2>
                        <div className="bg-white p-4">
                            <h3 className="text-lg md:text-xl font-medium mb-2">Study Plans</h3>
                            <ul className="list-disc list-inside">
                                {studyPlans
                                    .filter(plan => plan.category === key)
                                    .map((plan, index) => (
                                        <li key={index}>{plan.plan}</li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PreparationPage;