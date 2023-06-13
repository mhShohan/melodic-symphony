import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import HeadTitle from '../../components/HeadTitle';
import SectionTitle from '../../components/SectionTitle';
import Banner from './Banner';
import PopularInstructor from './PopularInstructor';
import PopularClasses from './PopularClasses';
import Reviews from './Reviews';
import ContactUs from './ContactUs';
import { Slide } from 'react-awesome-reveal';

const Homepage = () => {
  return (
    <>
      <HeadTitle>Homepage</HeadTitle>
      <Banner />
      <section className='py-10 dark:bg-zinc-800 bg-slate-100'>
        <SectionTitle heading='Popular Instructors'></SectionTitle>
        <div className='container'>
          <PopularInstructor />
          <div className='center my-5'>
            <Link to='/instructors'>
              <Button>View All</Button>
            </Link>
          </div>
        </div>
      </section>
      <section className='py-10 dark:bg-slate-800 bg-slate-200'>
        <SectionTitle heading='Popular Classes'></SectionTitle>
        <div className='container'>
          <PopularClasses />
          <div className='center my-5'>
            <Link to='/classes'>
              <Button>View All</Button>
            </Link>
          </div>
        </div>
      </section>
      <section id='reviews_section' className='py-10'>
        <div className='container'>
          <SectionTitle heading='Reviews' />
          <Reviews />
        </div>
      </section>
      <section className='bg-white dark:bg-gray-800 py-16'>
        <SectionTitle
          heading='About Us'
          description='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias adipisci dicta id. Nihil nostrum necessitatibus possimus nam neque numquam? Excepturi.'
        />
      </section>
      <ContactUs />
    </>
  );
};

export default Homepage;
