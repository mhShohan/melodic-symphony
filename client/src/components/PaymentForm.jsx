import { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAxios from '../hooks/useAxios';
import useAuth from '../hooks/useAuth';
import { Loader } from '../components/Loader';

import './styles/payment.css';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const PaymentForm = ({ item }) => {
  const stripe = useStripe();
  const { user } = useAuth();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [processing, setProcessing] = useState(false);

  const navigate = useNavigate();

  const axiosSecure = useAxios();

  useEffect(() => {
    (async () => {
      const res = await axiosSecure.post('/create-payment-intent', {
        price: item.price,
      });

      setClientSecret(res.data.clientSecret);
    })();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isAlreadyEnrolled = await axiosSecure.get(
      `/payments/exist/${item._id}`
    );

    if (!isAlreadyEnrolled.data) {
      Swal.fire({ icon: 'warning', title: 'Already Enrolled!' });
      return;
    }

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError(null);
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || 'unknown',
            name: user?.displayName || 'anonymous',
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
      setError(confirmError.message);
    } else {
      setError(null);
    }

    // console.log('payment intent', paymentIntent);
    setProcessing(false);

    if (paymentIntent.status === 'succeeded') {
      // @TODO => save the order to data base
      const body = {
        classID: item._id,
        price: item.price,
        instructor: item.instructorName,
        className: item.name,
        transactionID: paymentIntent.id,
      };
      navigate('/dashboard/EnrolledClasses');
      await axiosSecure.post('/payment', body);

      Swal.fire({
        icon: 'success',
        title: 'Payment Successfully!',
        text: 'TransactionID: ' + paymentIntent.id,
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='bg-slate-400 p-10 rounded-lg border border-slate-800'
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '20px',
                color: '#000',
                '::placeholder': {
                  color: '#212325',
                },
              },
              invalid: {
                color: '#cb2a5a',
              },
            },
          }}
        />
        <div className='mt-5 center'>
          <button
            type='submit'
            disabled={!stripe || !clientSecret || processing}
            className='bg-green-800 py-2 px-10 text-white text-xl rounded-md'
          >
            Enroll
          </button>
        </div>
        {error && <p className='text-red-500 text-center mt-5'>{error}</p>}
      </form>
    </>
  );
};

export default PaymentForm;
