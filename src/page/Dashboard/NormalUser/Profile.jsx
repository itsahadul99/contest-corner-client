
import { Helmet } from 'react-helmet-async'
import useAuth from '../../../hooks/useAuth'
import { FaSpinner } from 'react-icons/fa'
import toast from 'react-hot-toast'
import { imageUpload } from '../../../utils'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'

const Profile = () => {
    const { user, updateUserProfile, isLoading } = useAuth()
    const [imagePreview, setImagePreview] = useState()
    const [imageText, setImageText] = useState('Upload Image')
    const axiosSecure = useAxiosSecure()
    const handleUpdate = async e => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const address = form.address.value;
        const image = form.image.files[0];
        try {
            const img_url = await imageUpload(image)
            updateUserProfile(name, img_url)
                .then(async () => {
                    const updateInfo = {
                        address: address,
                        name: name,
                        userImg: img_url,
                    }
                    const { data } = await axiosSecure.put(`/user/update/${user?.email}`, updateInfo)
                    if (data.modifiedCount > 0) {
                        form.reset()
                        toast.success("Successfully update !!")
                    }
                })
        } catch (error) {
            toast.error(error?.message);

        }
    }
    const handleImageChange = image => {
        setImagePreview(URL.createObjectURL(image))
        setImageText(image.name)
    }
    const { data: userDb = {} } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/user/${user?.email}`)
            return data;
        }
    })
    const { data: userStatistics = {} } = useQuery({
        queryKey: ['winRate', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/userWin/${user?.email}`)
            return data;
        }
    })
    const winRate = (userStatistics.completedCount) * 100 / (userStatistics.attemptedCount)
    return (
        <div className='flex flex-col justify-center items-center md:h-[calc(100vh-100px)]'>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <div className='bg-white shadow-lg rounded-2xl md:w-3/5 h-full'>
                <img
                    alt='profile'
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWumRdY_Qm3mPwyVFyyunAlNqGI721bc3Ftw&s'
                    className='w-full mb-4 rounded-t-lg h-36 bg-cover'
                />
                <div className='flex flex-col items-center justify-center p-4 -mt-20 text-xs md:text-sm'>
                    <a href='#' className='relative block'>
                        <img
                            alt='profile'
                            src={user?.photoURL}
                            className='mx-auto object-cover rounded-full h-28 w-28  border-2 border-white '
                        />
                    </a>
                    <p className='font-bold text-black '>
                        Name: {user?.displayName}
                    </p>
                    <p className='font-bold text-black '>
                        Email: {user?.email}
                    </p>
                    <p className='font-bold text-black '>
                        Address: {userDb?.address ? userDb?.address : 'Not Provide'}
                    </p>
                    <div>
                        {/* You can open the modal using document.getElementById('ID').showModal() method */}
                        <button className='bg-primary/70 px-10 py-1 my-2 rounded-lg text-white cursor-pointer hover:bg-secondary/70 block mb-1' onClick={() => document.getElementById('my_modal_3').showModal()}>Update Profile</button>
                        <dialog id="my_modal_3" className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                                <form onSubmit={handleUpdate} className='mx-5 space-y-3'>
                                    <div className='mt-4'>
                                        <label
                                            className='block mb-2 text-sm font-medium text-gray-600 '
                                            htmlFor='name'
                                        >
                                            Update Name:
                                        </label>
                                        <input
                                            id='name'
                                            autoComplete='name'
                                            name='name'
                                            className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                                            type='text'
                                        />
                                    </div>
                                    <div className='flex items-center justify-around gap-4 p-4 bg-white w-full  m-auto rounded-lg'>
                                        <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
                                            <div className='flex flex-col w-max mx-auto text-center'>
                                                <label>
                                                    <input
                                                        // disabled={loading}
                                                        onChange={e => handleImageChange(e.target.files[0])}
                                                        className='disabled:cursor-not-allowed text-sm cursor-pointer w-36 hidden'
                                                        type='file'
                                                        name='image'
                                                        id='image'
                                                        accept='image/*'
                                                        hidden
                                                        required
                                                    />
                                                    <div className='bg-secondary text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-primary'>
                                                        {imageText.split('.')[0].slice(0, 10) + '...' + imageText.split('.')[1]}
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                        <div>
                                            <img className="w-24 h-20" src={imagePreview} alt="" />
                                        </div>
                                    </div>
                                    <div className='mt-4'>
                                        <label
                                            className='block mb-2 text-sm font-medium text-gray-600 '
                                            htmlFor='LoggingEmailAddress'
                                        >
                                            Address:
                                        </label>
                                        <input
                                            name='address'
                                            className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                                            type='text'
                                            required
                                        />
                                    </div>
                                    <div className='mt-6'>
                                        <button
                                            disabled={isLoading}
                                            type='submit'
                                            className='disabled:cursor-not-allowed flex justify-center items-center gap-2.5 w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50'
                                        >
                                            {isLoading ? <FaSpinner className="animate-spin" /> : ' Update'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </dialog>
                    </div>
                </div>
                <div className='my-5 px-5'>
                    <h1 className='text-center text-lg md:text-2xl font-bold my-3 lg:my-5'>Your Current Activity Status</h1>
                    <hr />
                    <div className='text-sm md:text-lg flex justify-center items-center my-5'>
                        <div className='border-r-2 flex-1 text-start ml-2 md:ml-5 mt-5 text-lg md:text-xl font-semibold space-y-2'>
                            <h1> Registration Contest: {userStatistics.attemptedCount} Times</h1>
                            <h1> Win the Contest: {userStatistics.completedCount} Times</h1>
                        </div>
                        <div className='text-center flex-1 mt-5'>
                            <div className={`radial-progress ${winRate > 50? 'text-primary': 'text-red-400'}`} style={{ "--value": winRate > 0? winRate.toFixed(2): 0 }} role="progressbar">{winRate > 0? winRate.toFixed(2): 0}%</div>
                            <p className='text-xs md:text-sm italic font-semibold'> Win rate: {winRate > 0? winRate.toFixed(2): 0}%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile