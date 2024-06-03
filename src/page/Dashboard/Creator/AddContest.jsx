import { useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import useAuth from "../../../hooks/useAuth";
import DatePicker from "react-datepicker";
import { imageUpload } from "../../../utils";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useRole from "../../../hooks/useRole";

const AddContest = () => {
    const [loading, setLoading] = useState(false)
    const [imagePreview, setImagePreview] = useState()
    const [imageText, setImageText] = useState('Upload Image')
    const [startDate, setStartDate] = useState(new Date());
    const axiosSecure = useAxiosSecure()
    const [, status, ,] = useRole()
    const { user } = useAuth()
    const navigate = useNavigate()
    const handleSubmit = async e => {
        e.preventDefault()
        if(status === 'blocked') {
            return toast.error("You are blocked. Can't add any contest")
        }
        setLoading(true)
        const form = e.target;
        const contestName = form.name.value;
        const tags = form.type.value;
        const prize = form.price.value;
        const entryFee = form.entryFee.value;
        const taskSubmitted = form.taskSubmitted.value;
        const image = form.image.files[0];
        const description = form.description.value;
        const img_url = await imageUpload(image)
        const contestData = {
            contestName,
            tags,
            prize,
            entryFee,
            img: img_url,
            description,
            deadline: startDate,
            taskSubmited: taskSubmitted,
            creatorEmail: user?.email,
            creatorName: user?.displayName,
            participation: 0,
            status: 'Request',

        }
        const { data } = await axiosSecure.post('/addContest', contestData)
        if (data.insertedId) {
            setLoading(false)
            navigate('/dashboard/myCreated')
            Swal.fire({
                title: "Success!",
                text: "You added the contest wait for admin approval",
                icon: "success"
            });
        }
        else {
            toast.error('Something went wrong! Please, try again.')
        }
    }
    const handleImageChange = image => {
        setImagePreview(URL.createObjectURL(image))
        setImageText(image.name)
    }
    return (
        <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
                    <div className='space-y-6'>
                        <div className='space-y-1 text-sm'>
                            <label htmlFor='location' className='block text-gray-600'>
                                Contest Name
                            </label>
                            <input
                                className='w-full bg-white px-4 py-3 text-gray-800 border border-primary focus:outline-primary rounded-md '
                                name='name'
                                id='name'
                                type='text'
                                placeholder='Contest Name'
                                required
                            />
                        </div>

                        <div className='space-y-1 text-sm'>
                            <label htmlFor='category' className='block text-gray-600'>
                                Contest Type
                            </label>
                            <select
                                required
                                className=' bg-white w-full px-4 py-3 border-primary focus:outline-primary rounded-md'
                                name='type'
                            >
                                <option>Article Writing</option>
                                <option>Marketing Strategy</option>
                                <option>Digital Advertisement Contests</option>
                                <option>Gaming Review</option>
                                <option>Book Review</option>
                                <option>Movie Review</option>
                                <option>Business Idea Concerts</option>
                            </select>
                        </div>

                        <div className='space-y-1'>
                            <label htmlFor='date' className='block text-gray-600 mb-2'>
                                Select Date
                            </label>
                            {/* Calender */}
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                inline
                            />
                        </div>
                    </div>
                    <div className='space-y-6'>
                        <div className='flex items-center justify-around gap-4 p-4 bg-white w-full  m-auto rounded-lg'>
                            <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
                                <div className='flex flex-col w-max mx-auto text-center'>
                                    <label>
                                        <input
                                            onChange={e => handleImageChange(e.target.files[0])}
                                            className='text-sm cursor-pointer w-36 hidden'
                                            type='file'
                                            name='image'
                                            id='image'
                                            accept='image/*'
                                            hidden
                                            required
                                        />
                                        <div className='bg-primary text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-primary'>
                                            {imageText.split('.')[0].slice(0, 10) + '...' + imageText.split('.')[1]}
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <div className="">
                                <img className="w-24 h-20" src={imagePreview} alt="" />
                            </div>
                        </div>
                        <div className='flex justify-between gap-2'>
                            <div className='space-y-1 text-sm'>
                                <label htmlFor='price' className='block text-gray-600'>
                                    Contest Price
                                </label>
                                <input
                                    min={0}
                                    className='bg-white w-full px-4 py-3 text-gray-800 border border-primary focus:outline-primary rounded-md '
                                    name='price'
                                    id='price'
                                    type='number'
                                    placeholder='Price'
                                    required
                                />
                            </div>

                            <div className='space-y-1 text-sm'>
                                <label htmlFor='guest' className='block text-gray-600'>
                                    Contest Entry Fee
                                </label>
                                <input
                                    min={0}
                                    className='w-full bg-white px-4 py-3 text-gray-800 border border-primary focus:outline-primary rounded-md '
                                    name='entryFee'
                                    type='number'
                                    placeholder='Entry Fee'
                                    required
                                />
                            </div>
                        </div>

                        <div className='space-y-1 text-sm'>
                            <label htmlFor='description' className='block text-gray-600'>
                                Task Submitted
                            </label>

                            <textarea
                                className='block bg-white rounded-md focus:primary w-full h-28 px-4 py-3 text-gray-800  border border-primary focus:outline-primary '
                                name='taskSubmitted'
                            ></textarea>
                        </div>

                        <div className='space-y-1 text-sm'>
                            <label htmlFor='description' className='block text-gray-600'>
                                Description
                            </label>

                            <textarea
                                id='description'
                                className='block bg-white rounded-md focus:primary w-full h-28 px-4 py-3 text-gray-800  border border-primary focus:outline-primary '
                                name='description'
                            ></textarea>
                        </div>
                    </div>
                </div>

                <button
                    disabled={loading}
                    type='submit'
                    className='bg-primary w-full rounded-md py-3 hover:bg-secondary duration-500 text-white text-center mt-3'
                >
                    {loading ? <TbFidgetSpinner className='animate-spin w-full mx-auto' /> : "Save & Continue"}
                </button>
            </form>
        </div>
    );
};

export default AddContest;