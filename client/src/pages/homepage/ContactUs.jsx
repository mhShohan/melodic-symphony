import React, { useState } from 'react';
import Button from '../../components/Button';
import SectionTitle from '../../components/SectionTitle';
import { Fade, Slide } from 'react-awesome-reveal';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <section className='bg-gray-100 dark:bg-slate-900 py-16'>
      <div className='container mx-auto px-4'>
        <SectionTitle
          heading='Contact Us'
          description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor
          massa at mauris ultrices, vitae dictum nunc consectetur. Sed cursus
          lacus sed mattis iaculis. Vivamus pharetra tellus id nunc luctus, vel
          molestie tortor faucibus.'
        />
        <div>
          <form onSubmit={handleSubmit} className='md:w-1/2 mx-auto'>
            <Slide direction='left'>
              <div className='mb-4'>
                <label
                  htmlFor='name'
                  className='block text-gray-700 dark:text-gray-300 pl-1'
                >
                  Name
                </label>
                <input
                  type='text'
                  id='name'
                  className='w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-700'
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
            </Slide>
            <Slide direction='right'>
              <div className='mb-4'>
                <label
                  htmlFor='email'
                  className='block text-gray-700 dark:text-gray-300 pl-1'
                >
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  className='w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-700'
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
            </Slide>
            <Slide direction='up'>
              <div className='mb-4'>
                <label
                  htmlFor='message'
                  className='block text-gray-700 dark:text-gray-300 pl-1'
                >
                  Message
                </label>
                <textarea
                  id='message'
                  className='w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-700'
                  rows='4'
                  value={message}
                  onChange={handleMessageChange}
                ></textarea>
              </div>
            </Slide>
            <Fade duration={3000}>
              <div className='center'>
                <Button>Send Message</Button>
              </div>
            </Fade>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
