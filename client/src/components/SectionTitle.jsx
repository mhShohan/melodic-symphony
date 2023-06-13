import { Slide } from 'react-awesome-reveal';

const SectionTitle = ({ heading, description }) => {
  return (
    <>
      <div className='text-center p-4'>
        <Slide direction='left'>
          <h1 className='text-4xl font-bold uppercase dark:text-cyan-400 text-slate-900'>
            {heading}
          </h1>
        </Slide>
        <Slide direction='right'>
          {description && (
            <p className='md:w-2/3 mx-auto glory mt-2 dark:text-cyan-600 text-slate-700'>
              {description}
            </p>
          )}
        </Slide>
      </div>
    </>
  );
};

export default SectionTitle;
