import { useForm } from 'react-hook-form';
import Button from '../../components/Button';
import Swal from 'sweetalert2';
import { FullLoader, Loader } from '../../components/Loader';
import { useState } from 'react';
import useAxios from '../../hooks/useAxios';

const data = [
  { id: 1, name: 'name', placeholder: 'Class Name', type: 'text' },
  { id: 2, name: 'seat', placeholder: 'Total Seat', type: 'number' },
  { id: 3, name: 'price', placeholder: 'Price', type: 'text' },
  { id: 4, name: 'image', placeholder: 'Class Image', type: 'file' },
];

const url = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_IMAGE_API_KEY
}`;

const CreateClass = () => {
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxios();

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const body = {
      name: data.name,
      seat: Number(data.seat),
      price: Number(data.price),
      photo: '',
    };

    //upload files
    const formData = new FormData();
    formData.append('image', data.image[0]);

    const result = await fetch(url, { method: 'POST', body: formData });
    const imgRes = await result.json();

    body.photo = imgRes.data.display_url;

    //save to database
    const res = await axiosSecure.post('/classes', body);

    if (!res.data.error) {
      reset();
      setLoading(false);
      Swal.fire({ icon: 'success', title: 'Class Created Successfully' });
    } else {
      setLoading(false);
    }
  };

  // if (loading) return <FullLoader />;

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
            {data.map((input) => (
              <InputField
                key={input.id}
                name={input.name}
                placeholder={input.placeholder}
                type={input.type}
                errors={errors}
                register={register}
              />
            ))}
            <div className='mt-5 center'>
              <Button type='submit'>Add Class</Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateClass;

const InputField = ({ name, placeholder, type, errors, register }) => {
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
        {...register(name, { required: true })}
        placeholder={placeholder}
      />
      {errors[name] && <p className='text-red-600'>Must Provide {name}!</p>}
    </div>
  );
};
