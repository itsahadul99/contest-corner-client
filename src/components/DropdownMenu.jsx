/* eslint-disable react/prop-types */
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { useMutation } from '@tanstack/react-query';
import useAxiosCommon from '../hooks/useAxiosCommon';
import toast from 'react-hot-toast';
const DropdownMenu = ({ user, handleDelete, refetch }) => {
    const axiosCommon = useAxiosCommon()
    const { mutateAsync } = useMutation({
        mutationFn: async (updateInfo) => {
            const { data } = await axiosCommon.patch(`/user/update/${user?.email}`, updateInfo)
            return data
        },
        onSuccess: () => {
            refetch()
            toast.success('Successfully update user role')
        }
    })
    const handleRole = async (selected) => {
        const user = {
            role: selected,
        }
        try {
            await mutateAsync(user)
        } catch (error) {
            toast.error(error?.message);
        }
    }
    return (
        <div>
            <Menu>
                <MenuButton disabled={user?.role === 'admin'} className="disabled:cursor-not-allowed inline-flex items-center gap-2 rounded-md bg-primary/80 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-secondary/80 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                    Actions
                </MenuButton>
                <Transition
                    enter="transition ease-out duration-75"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <MenuItems
                        anchor="bottom end"
                        className="w-52 origin-top-right rounded-xl border bg-gray-500 p-1 text-sm/6 text-white [--anchor-gap:var(--spacing-1)] focus:outline-none"
                    >
                        <MenuItem>
                            <button onClick={() => handleRole('admin')} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-secondary/70">
                                Make Admin
                            </button>
                        </MenuItem>
                        <MenuItem>
                            <button onClick={() => handleRole('creator')} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-secondary/70">
                                Make Creator

                            </button>
                        </MenuItem>
                        <MenuItem>
                            <button onClick={() => handleRole('user')} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-secondary/70">
                                Make Normal_User
                            </button>
                        </MenuItem>
                        <div className="my-1 h-px bg-white/5" />
                        <MenuItem>
                            <button onClick={() => handleDelete(user?._id)} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-secondary/70">
                                Delete
                            </button>
                        </MenuItem>
                        <MenuItem>
                            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-secondary/70">
                                {/* <TrashIcon className="size-4 fill-white/30" /> */}
                                Block
                            </button>
                        </MenuItem>
                    </MenuItems>
                </Transition>
            </Menu>
        </div>
    );
};

export default DropdownMenu;