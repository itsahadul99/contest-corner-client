const Banner = () => {
    return (
        <div className="">
            <div className="hero min-h-[calc(100vh-150px)]" style={{ backgroundImage: 'url(https://img.freepik.com/free-photo/colombian-national-soccer-team-concept-still-life_23-2150257157.jpg)' }}>
                <div className="hero-overlay bg-opacity-30"></div>
                <div className="max-w-7xl mx-auto">
                    <div className="w-full lg:w-1/2 px-3">
                        <h1 className="my-5 text-2xl md:text-3xl lg:text-5xl font-black dark:text-[#333333]">Join the Ultimate Contest Experience!</h1>
                        <p className="my-5 dark:text-[#333333] font-medium text-sm md:text-lg">Discover, participate, and win big in exciting contests from around the world. Whether you're a creative talent, a tech wizard, or a passionate enthusiast, ContestHub connects you to endless opportunities to showcase your skills and earn amazing rewards. Jump in and start competing today!</p>
                        {/* <div className="join">
                            <input className="input join-item" type="text" placeholder="Find your contest by it's tag name" />
                            <button className="btn join-item rounded-r-full bg-secondary">Search</button>
                        </div> */}
                        <div className="w-full lg:w-1/2 flex">
                            <input type="text" className="p-2 bg-gray-100 opacity-70 border-secondary border-2 focus:outline-none w-full" name="" placeholder="Find your contest by it's tag name" />
                            <button className="px-5 bg-secondary rounded-r-md font-bold ">Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;