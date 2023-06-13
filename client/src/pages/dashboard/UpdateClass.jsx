import { useForm } from 'react-hook-form';
import Button from '../../components/Button';
import Swal from 'sweetalert2';
import { FullLoader, Loader } from '../../components/Loader';
import { useState } from 'react';
import useAxios from '../../hooks/useAxios';
import useGet from '../../hooks/useGet';
import { useParams } from 'react-router-dom';

const formArr = [
  { id: 1, name: 'name', placeholder: 'Class Name', type: 'text' },
  { id: 2, name: 'seat', placeholder: 'Total Seat', type: 'number' },
  { id: 3, name: 'price', placeholder: 'Price', type: 'text' },
];

const UpdateClass = () => {
  const { id } = useParams();
  const { isLoading, data, refetch } = useGet(`/classes/${id}`, 'class');
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxios();

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (state) => {
    setLoading(true);
    const body = {
      name: state.name,
      seat: Number(state.seat),
      price: Number(state.price),
      photo: data.classes.photo,
    };
    const res = await axiosSecure.patch(`/classes/${id}`, body);

    if (!res.data.error) {
      refetch();
      setLoading(false);
      Swal.fire({ icon: 'success', title: 'Updated Successfully' });
    } else {
      setLoading(false);
    }
  };

  if (loading || isLoading) return <Loader />;

  return (
    <div className='mt-5'>
      <div>
        {loading ? (
          <Loader />
        ) : (
          <form
            className='max-w-md mx-auto p-5 rounded-md border border-slate-800'
            onSubmit={handleSubmit(onSubmit)}
          >
            {formArr.map((input) => (
              <InputField
                key={input.id}
                name={input.name}
                placeholder={input.placeholder}
                type={input.type}
                defaultValue={data.classes[input.name]}
                errors={errors}
                register={register}
              />
            ))}
            <div className='mt-5 center'>
              <Button type='submit'>Update Class</Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateClass;

const InputField = ({
  name,
  placeholder,
  type,
  errors,
  register,
  defaultValue,
}) => {
  return (
    <div className='mb-2'>
      <label
        className='block text-sm font-bold text-gray-700 capitalize'
        htmlFor={name}
      >
        {name}*
      </label>
      <input
        className={`${
          errors[name] && 'border-red-600'
        } shadow border rounded w-full py-2 px-3  bg-white text-slate-900`}
        id={name}
        type={type}
        name={name}
        defaultValue={defaultValue}
        {...register(name, { required: true })}
        placeholder={placeholder}
      />
      {errors[name] && <p className='text-red-600'>Must Provide {name}!</p>}
    </div>
  );
};
