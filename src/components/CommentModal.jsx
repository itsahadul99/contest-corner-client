import {
    Dialog,
    Transition,
    TransitionChild,
    DialogPanel,
    DialogTitle,
} from '@headlessui/react'
import { Fragment } from 'react'
import toast from 'react-hot-toast'
import useAxiosSecure from '../hooks/useAxiosSecure'

// eslint-disable-next-line react/prop-types
const CommentModal = ({ setModalOpen, isOpen, id }) => {
    const axiosSecure = useAxiosSecure()
    const handleSubmit = async(e) => {
        e.preventDefault()
        const comment = e.target.comment.value;
        const updateContest = {
            comment,
        }
        const { data } = await axiosSecure.patch(`/contests/update/${id}`, updateContest)
        if (data.modifiedCount > 0) {
            setModalOpen(false)
            toast.success("Added a comment for this contests successfully")
        }
    }
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as='div'
                className='relative z-10'
                onClose={() => setModalOpen(false)}
            >
                <TransitionChild
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-black bg-opacity-25' />
                </TransitionChild>

                <div className='fixed inset-0 overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text-center'>
                        <TransitionChild
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'
                        >
                            <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                                <DialogTitle
                                    as='h3'
                                    className='text-lg font-medium text-center leading-6 text-gray-900'
                                >
                                    Write a comment
                                </DialogTitle>
                                <div className='mt-2 w-full'>
                                    <form onSubmit={handleSubmit}>
                                        <textarea name="comment" className='w-full bg-white border rounded-md p-5' placeholder='Write your comment here'></textarea>
                                        <button
                                            type='submit'
                                            className='inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
                                        >
                                          Submit Comment
                                        </button>
                                    </form>
                                </div>
                                <hr className='mt-8 ' />
                                <div className='mt-2  flex justify-end gap-5'>
                                    <button
                                        type='button'
                                        className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                                        onClick={() => setModalOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default CommentModal