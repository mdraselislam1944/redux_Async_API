import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, incrementByAmount } from './redux/features/Counter/counterSlice';
import { useDeleteTasksMutation, useGetPostsQuery, useSetTasksMutation, useUpdateTasksMutation } from './redux/features/Counter/api/BaseApi';
import { unwrapResult } from '@reduxjs/toolkit';

const App = () => {
  const count=useSelector((state)=>state.counter.value);
  const dispatch=useDispatch();
  const {data,isLoading }=useGetPostsQuery();
  const [setData, { data: postData, isLoading: isSetDataLoading, error }]=useSetTasksMutation();
  const [patchData, { data: patchedData, isLoading: isPatchDataLoading, error: patchDataError }]=useUpdateTasksMutation();
  const [DeleteData, { data: deleted, isLoading: isDeleted, error: isError }]=useDeleteTasksMutation();

  if(!isLoading){
    console.log(data);
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const form=e.target;
    const data={
      id:form.id.value,
      name:form.name.value,
      status:form.status.value,
    }
    const result = await setData(data);
    if (result.error) {
      console.error('Mutation failed:', result.error);
    } else {
      console.log('Mutation successful:', result.data);
    }
  }
const handleUpdate=async(e)=>{
  e.preventDefault();
  const form=e.target;
  const data={
    status:form.status.value,
  }
  const result = await patchData({id: form.id.value,data,});
  if (result.error) {
    console.error('Patch failed:', result.error);
  } else {
    console.log('Patch successful:', result.data);
  }
}

const handleDelete = async (e) => {
  e.preventDefault();
  const form = e.target;
  const id = form.id.value;
  try {
    const result = await DeleteData(id);
    console.log('Deleted task:', result);
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};


  return (
    <div className='text-center my-40'>
      <h1>count : {count}</h1>
      <button onClick={()=>dispatch(increment())} className='btn btn-info my-2'>increment</button><br/>
      <button onClick={()=>dispatch(decrement())} className='btn btn-info my-2'>decrement</button><br/>
      <button onClick={()=>dispatch(incrementByAmount(5))}  className='btn btn-info my-2'>incrementBy value</button><br/>
      <form onSubmit={handleSubmit}>
        <input type="number" name="id" id="id" className="input input-bordered w-full max-w-xs my-2"  placeholder='enter serial number'/><br/>
        <input type="text" name="name" id="name" className="input input-bordered w-full max-w-xs my-2"  placeholder='enter your name'/><br/>
        <input type="text" name="status" id="status" className="input input-bordered w-full max-w-xs my-2"  placeholder='enter your status'/><br/>
        <input type="submit" value="submit" className='btn btn-info ' />
      </form>
      <form onSubmit={handleUpdate}>
        <input type="text" name="id" id="id" className="input input-bordered w-full max-w-xs my-2"  placeholder='enter serial number'/><br/>
        <input type="text" name="status" id="status" className="input input-bordered w-full max-w-xs my-2"  placeholder='enter your status'/><br/>
        <input type="submit" value="update" className='btn btn-info ' />
      </form>

      <form onSubmit={handleDelete}>
        <input type="text" name="id" id="id" className="input input-bordered w-full max-w-xs my-2"  placeholder='enter serial number'/><br/>
        <input type="submit" value="Delete" className='btn btn-info ' />
      </form>

    </div>
  );
};

export default App;