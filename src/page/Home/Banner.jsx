import { TypeAnimation } from "react-type-animation";

/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line react/prop-types
const Banner = ({handleSearch}) => {
    return (
        <div className="">
            <div className="hero min-h-[calc(100vh-150px)]" style={{ backgroundImage: 'url(https://img.freepik.com/free-photo/colombian-national-soccer-team-concept-still-life_23-2150257157.jpg)' }}>
                <div className="hero-overlay bg-opacity-30"></div>
                <div className="max-w-7xl mx-auto">
                    <div className="w-full md:w-1/2 px-3">
                        {/* <h1 className="my-5 text-2xl md:text-3xl lg:text-5xl font-black dark:text-[#333333]">Join the Ultimate Contest Experience!</h1> */}
                        <div className="my-5 text-xl md:text-3xl lg:text-5xl font-black dark:text-[#333333] min-h-[50px] md:min-h-[100px]">
                            <TypeAnimation
                                sequence={[
                                    // Same substring at the start will only be typed once, initially
                                    'Join the Ultimate Article Writing Contest!',
                                    1000,
                                    'Join the Ultimate Marketing Strategy Contest!',
                                    1000,
                                    'Join the Ultimate Digital Advertisement Contests!',
                                    1000,
                                    'Join the Ultimate Gaming Review Contest!',
                                    1000,
                                    'Join the Ultimate Book Review Contest!',
                                    1000,
                                    'Join the Ultimate Business Idea Concerts Contest!',
                                    1000,
                                ]}
                                speed={30}
                                repeat={Infinity}
                            />
                        </div>
                        <p className="my-5 dark:text-[#333333] font-medium text-sm md:text-lg">Discover, participate, and win big in exciting contests from around the world. Whether you're a creative talent, a tech wizard, or a passionate enthusiast, ContestHub connects you to endless opportunities to showcase your skills and earn amazing rewards. Jump in and start competing today!</p>
                        <form onSubmit={handleSearch} className="w-full lg:w-1/2 flex my-5 md:my-8">
                            <input type="text" className="p-2 bg-gray-100 opacity-70 border-primary/70 border-2 focus:outline-none w-full" name="value" placeholder="Find your contest by it's tag name" />
                            <button
                            type="submit"
                            className="px-5 bg-primary/70 duration-300 hover:bg-secondary rounded-r-md font-bold "
                            >Search</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;