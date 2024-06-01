import useAuth from "../../hooks/useAuth";

const Welcome = () => {
    const {user} = useAuth()
    return (
        <div className="flex flex-col justify-center items-center">
            <img className="w-full h-[calc(100vh-50px)] mx-auto rounded-md" src="https://cdn.dribbble.com/users/1261045/screenshots/11391612/media/58cd07da8fb87504d054fb1d186abcb0.gif" alt="" />
        </div>
    );
};

export default Welcome;