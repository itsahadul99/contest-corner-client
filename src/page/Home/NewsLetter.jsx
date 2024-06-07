import Container from "../../components/shared/Container";
import Mail from '../../assets/receive-mail.png';
/* eslint-disable react/no-unescaped-entities */
const NewsLetter = () => {
    return (
        <>
            <Container>
                <div className="max-w-7xl mx-auto py-8 bg-base-200 border shadow-sm rounded-lg">
                    <div>
                        <img className='mx-auto size-16' src={Mail} alt="" />
                        <h1 className="text-xl md:text-2xl lg:text-3xl font-black my-5 mb-8 text-center">Stay Updated with Contest Corner!</h1>
                        <div className='w-full lg:w-1/2 text-center mx-auto'>
                            <p className='text-sm'>Subscribe to our newsletter to get the latest updates on upcoming contests, exclusive preparation tips, and much more. Don’t miss out on the excitement!</p>
                            <div className="join my-5">
                                <input className="input input-bordered join-item" placeholder="Email" />
                                <button className="px-2 md:px-4 py-1 md:py-2 bg-primary hover:bg-secondary duration-300 rounded-r-md text-xs font-medium md:text-lg text-white">Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default NewsLetter;