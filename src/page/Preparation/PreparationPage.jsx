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
            <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-5 md:gap-8 lg:gap-10'>
                {categories.map(({ name, key }) => (
                    <div key={key} className="mb-8 p-5 border rounded-lg shadow-md hover:scale-105 duration-500 cursor-pointer">
                        <h2 className="text-xl md:text-2xl font-semibold mb-4">{name}</h2>
                        <div className="bg-base-100 rounded-lg p-4">
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
            <SectionTitle title="Learn More Here" subTitle="Visit those link" />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center *:text-center gap-5 md:gap-8'>
                <div className='space-y-2 border-r-2'>
                    <h1 className='text-lg md:text-xl font-semibold'>For Logo Design: </h1>
                    <div className='flex flex-col gap-2 *:underline'>
                        <a className='text-primary font-medium visited:text-red-400' target='_blank' href="https://www.canva.com">Canva</a>
                        <a className='text-primary font-medium visited:text-red-400' target='_blank' href="https://www.smashingmagazine.com/">Smashing</a>
                        <a className='text-primary font-medium visited:text-red-400' target='_blank' href="https://www.logoinspirations.com">Logo Inspiration</a>
                    </div>
                </div>
                <div className='space-y-2 border-r-2'>
                    <h1 className='text-lg md:text-xl font-semibold'>Digital Marketing: </h1>
                    <div className='flex flex-col gap-2 *:underline'>
                        <a className='text-primary font-medium visited:text-red-400' target='_blank' href="https://neilpatel.com/">Nelpatel</a>
                        <a className='text-primary font-medium visited:text-red-400' target='_blank' href="https://moz.com/">Moz.com</a>
                        <a className='text-primary font-medium visited:text-red-400' target='_blank' href="">Buffer.com</a>
                    </div>
                </div>
                <div className='space-y-2'>
                    <h1 className='text-lg md:text-xl font-semibold'>Game Review: </h1>
                    <div className='flex flex-col gap-2 *:underline'>
                        <a className='text-primary font-medium visited:text-red-400' target='_blank' href="https://www.polygon.com/">Play Ground</a>
                        <a className='text-primary font-medium visited:text-red-400' target='_blank' href="https://kotaku.com">Kotaku.com</a>
                        <a className='text-primary font-medium visited:text-red-400' target='_blank' href="https://www.ign.com">Ign.com</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreparationPage;