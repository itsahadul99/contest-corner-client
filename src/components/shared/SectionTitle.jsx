const SectionTitle = ({title,subTitle}) => {
    return (
        <div className="text-center my-5 lg:my-8">
            <p className="text-sm md:text-lg font-semibold text-secondary">{subTitle}</p>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold default:text-[#333333] dark:text-primary">{title}</h1>
        </div>
    );
};

export default SectionTitle;