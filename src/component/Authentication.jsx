import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, loggedUser, logoutUser } from '../redux/features/Counter/api/userSlice';

const Authentication = () => {
    const { handleSubmit, register } = useForm();
    const dispatch = useDispatch();

    const { isLoading, isError, error, email,name } = useSelector((state) => state.userSlice);
    const onSubmit = (data) => {
        dispatch(createUser(data));
    }
    const handleLogOut = () => {
        dispatch(logoutUser());
    }
    const onSubmitForSignIn = (data) => {
        dispatch(loggedUser(data));
    }
    return (
        <div className='text-center my-40'>
            <h1>authentication</h1>
            {
                email ?<>
                <button onClick={handleLogOut} className='btn btn-info my-5'>LogOut</button> <h1>{email+" "+name}</h1>
                </>:<>
                <h1>please loggedIn</h1>
                </>
            }
            <form onSubmit={handleSubmit(onSubmit)}>
                <input required type="text" {...register("name")} className="input input-bordered w-full max-w-xs my-2" placeholder='Enter your name' /> <br />
                <input required type="email" {...register("email")} className="input input-bordered w-full max-w-xs my-2" placeholder='Enter your email' /> <br />
                <input required type="password" {...register("password")} className="input input-bordered w-full max-w-xs my-2" placeholder='Enter your password' /> <br />
                <input type="submit" value="submit" className='btn btn-info ' />
            </form>
            <form onSubmit={handleSubmit(onSubmitForSignIn)}>
                <input required type="email" {...register("email")} className="input input-bordered w-full max-w-xs my-2" placeholder='Enter your email' /> <br />
                <input required type="password" {...register("password")} className="input input-bordered w-full max-w-xs my-2" placeholder='Enter your password' /> <br />
                <input type="submit" value="submit" className='btn btn-info ' />
            </form>
        </div>
    );
};

export default Authentication;