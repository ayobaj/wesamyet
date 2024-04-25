import abtt from '../assets/abtt.jpeg';
import value from '../assets/value.png';

const About = () => {
return (
    <div className='bg-white'>
        <h1 className=" h-[300px] text-white font-bold md:text-4xl text-2xl  md:p-[70px] p-[80px] mx-auto " style={{ backgroundImage: `url(${abtt})`, backgroundSize: 'cover', backgroundPosition: 'center', }}>
            
            CONTINENTAL REAL ESTATE MARKET <br/> AND MANAGEMENT LEADER </h1>

            <div className=' border-orange-200'>
                <h1 className='text-center bg-orange-300  border-orange-200 w-[500px] mt-8 text-2xl mx-auto'>Our fundamental identity revolves around continual growth, 
                    <br/>flexibility, and expediting achievement.</h1>


                    <p className=' p-3 md:p-6'>Providing insightful guidance to tenants, proprietors, and investors propels the real estate sector forward.
                        Our enduring dedication to conducting business ethically and fostering a cooperative 
                        approach has yielded sustained prosperity, enabling us to provide outstanding benefits to our clients and investors on a continental scale.</p>
            </div>

            <div className='mt-9 lg:flex-row-reverse lg:flex space-y-7 p-3'>
                <img src={value} className=' mx-auto'/>
                <div>
                <h1 className='p-3 w-[300px] mx-auto text-2xl text-center font-bold border-orange-200  bg-orange-300'>Our Values</h1>
                <p className='p-3 md:p-6' ><span className='font-bold'>Embrace</span> innovation to surpass anticipated outcomes.
                    <span className='font-bold'>Work</span> together to achieve outstanding results.
                    <span className='font-bold'>Cultivate</span> connections to provide long-lasting value.
                    Demonstrate expertise to pioneer our industry's advancement.
                    <span className='font-bold'>Act</span> in the best interest of our clients, employees, and communities.</p>
                </div>
            </div>
    </div>

    
    )
}

export default About
