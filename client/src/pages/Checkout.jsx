import { useParams } from 'react-router-dom';
import useGet from '../hooks/useGet';
import { Loader } from '../components/Loader';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../components/PaymentForm';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT);

const Checkout = () => {
  const { id } = useParams();
  const { isLoading, data } = useGet(`/classes/${id}`, 'singleClass');

  return (
    <div className='py-10 dark:bg-slate-800 bg-slate-100'>
      <div className='container'>
        {isLoading ? (
          <Loader />
        ) : (
          <div className='md:flex gap-10'>
            <div className='text-center flex flex-col items-center border dark:border-cyan-500 border-slate-800 p-5 rounded-lg'>
              <div className='w-80 h-80'>
                <img
                  src={data.classes.photo}
                  alt={data.classes.name}
                  className='w-80 h-80 object-cover rounded-lg'
                />
              </div>
              <div className='dark:text-cyan-500 text-slate-800 mt-5'>
                <h1>{data.classes.name}</h1>
                <h1>{data.classes.instructorName}</h1>
                <h1>Price: ${data.classes.price}</h1>
                <h1>
                  Available Seat: {data.classes.seat - data.classes.enrolled}
                </h1>
              </div>
            </div>
            <div className='flex-grow flex items-center'>
              <div className='w-full'>
                <Elements stripe={stripePromise}>
                  <PaymentForm price={data.classes.price} item={data.classes} />
                </Elements>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
