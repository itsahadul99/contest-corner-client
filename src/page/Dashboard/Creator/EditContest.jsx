import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useLoaderData, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import { imageUpload } from "../../../utils";
import Swal from "sweetalert2";
import DashboardHelmet from "../../../components/DashboardHelmet";
const EditContest = () => {
    const contest = useLoaderData();
    const [loading, setLoading] = useState(false)
    const [imagePreview, setImagePreview] = useState()
    const [imageText, setImageText] = useState('Upload Image')
    const [startDate, setStartDate] = useState(new Date(contest?.deadline).toLocaleDateString());
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const navigate = useNavigate()
    const handleSubmit = async e => {
        setLoading(true)
        e.preventDefault()
        const form = e.target;
        const contestName = form.name.value;
        const tags = form.type.value;
        const prize = form.price.value;
        const entryFee = form.entryFee.value;
        const taskSubmitted = form.taskSubmitted.value;
        const image = form.image.files[0] || contest?.img;
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
        const { data } = await axiosSecure.patch(`/contests/update/${contest?._id}`, contestData)
        console.log(data);
        if (data.modifiedCount > 0) {
            setLoading(false)
            navigate('/dashboard/myCreated')
            Swal.fire({
                title: "Updated!",
                text: "Update successfully",
                icon: "success"
            });
        }
        else{
            toast.error('Something went wrong! Please, try again.')
        }
    }
    const handleImageChange = image => {
        setImagePreview(URL.createObjectURL(image))
        setImageText(image.name)
    }
    return (
        <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
            <DashboardHelmet title="Edit Contest" />
            <form 
            onSubmit={handleSubmit}
            >
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
                                defaultValue={contest?.contestName}
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
                                        />
                                        <div className='bg-primary text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-primary'>
                                            {imageText.split('.')[0].slice(0, 10) + '...' + imageText.split('.')[1]}
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <div className="">
                                <img className="w-24 h-20" src={imagePreview? imagePreview: contest?.img} alt="" />
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
                                    defaultValue={contest?.prize}
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
                                    defaultValue={contest?.entryFee}
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
                                defaultValue={contest?.taskSubmited}
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
                                defaultValue={contest?.description}
                            ></textarea>
                        </div>
                    </div>
                </div>

                <button
                    disabled={loading}
                    type='submit'
                    className='bg-primary w-full rounded-md py-3 hover:bg-secondary duration-500 text-white text-center mt-3'
                >
                    {loading ? <TbFidgetSpinner className='animate-spin w-full mx-auto' /> : "Update & Continue"}
                </button>
            </form>
        </div>
    );
};

export default EditContest;