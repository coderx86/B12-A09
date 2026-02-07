import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { FaStar, FaLeaf, FaSun, FaTint, FaSeedling, FaAward } from 'react-icons/fa';
import { FaArrowRight } from "react-icons/fa";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Hero slider data
const heroSlides = [
  {
    id: 1,
    title: 'Breathe Fresh, Live Green',
    subtitle: 'Transform your space with our premium indoor plants',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200',
    cta: 'Shop Now'
  },
  {
    id: 2,
    title: 'Expert Plant Care Advice',
    subtitle: 'Get personalized tips from our green experts',
    image: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=1200',
    cta: 'Learn More'
  },
  {
    id: 3,
    title: 'Plants for Every Space',
    subtitle: 'From low-light corners to sunny windowsills',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=1200',
    cta: 'Explore Plants'
  }
];

// Plant care tips data
const careTips = [
  {
    id: 1,
    icon: <FaTint className="text-4xl text-blue-500" />,
    title: 'Watering Wisdom',
    description: 'Most indoor plants prefer to dry out between waterings. Stick your finger an inch into the soil – if it\'s dry, it\'s time to water!'
  },
  {
    id: 2,
    icon: <FaSun className="text-4xl text-yellow-500" />,
    title: 'Light Requirements',
    description: 'Bright indirect light works for most plants. Avoid direct sunlight which can scorch leaves, but too little light causes leggy growth.'
  },
  {
    id: 3,
    icon: <FaSeedling className="text-4xl text-green-500" />,
    title: 'Fertilizing Tips',
    description: 'Feed your plants during growing season (spring/summer) with a balanced fertilizer. Cut back in fall and winter when growth slows.'
  }
];

// Green experts data
const experts = [
  {
    id: 1,
    name: 'Dr. Sarah Green',
    specialty: 'Tropical Plant Specialist',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    bio: '15+ years experience in tropical plant care'
  },
  {
    id: 2,
    name: 'Michael Chen',
    specialty: 'Indoor Garden Designer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    bio: 'Award-winning interior plant styling'
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    specialty: 'Plant Health Expert',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
    bio: 'Specializes in plant disease prevention'
  },
  {
    id: 4,
    name: 'James Wilson',
    specialty: 'Succulent & Cactus Expert',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    bio: 'Desert plant enthusiast and educator'
  }
];



const Home = () => {
  const [plants, setPlants] = useState([]);
  const [plantOfWeek, setPlantOfWeek] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/plants.json')
      .then(res => res.json())
      .then(data => {
        // Sort by rating and get top 6
        const topRated = data.sort((a, b) => b.rating - a.rating).slice(0, 6);
        setPlants(topRated);
        // Set Plant of the Week (ID 2)
        const featured = data.find(p => p.plantId === 3);
        setPlantOfWeek(featured);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching plants:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Swiper */}
      <section className="relative">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          className="h-[70vh] min-h-[500px]"
        >
          {heroSlides.map(slide => (
            <SwiperSlide key={slide.id}>
              <div
                className="relative w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white px-4 max-w-3xl">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl mb-8 text-white/90">
                      {slide.subtitle}
                    </p>
                    <Link
                      to="/plants"
                      className="btn btn-lg bg-green-500 border-green-500 hover:bg-green-600 hover:border-green-600 text-white"
                    >
                      {slide.cta}
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Top Rated Indoor Plants Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <FaLeaf className="inline text-green-500 mr-2" />
            Top Rated Indoor Plants
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Discover our customer favorites – handpicked plants with the highest ratings for your home
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-lg text-green-500"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plants.map(plant => (
              <div
                key={plant.plantId}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 group"
              >
                <figure className="relative overflow-hidden">
                  <img
                    src={plant.image}
                    alt={plant.plantName}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 badge badge-success text-white">
                    {plant.careLevel}
                  </div>
                </figure>
                <div className="card-body">
                  <h3 className="card-title text-lg">
                    {plant.plantName}
                    <div className="badge badge-outline badge-sm">{plant.category}</div>
                  </h3>
                  <p className="text-base-content/70 text-sm line-clamp-2">
                    {plant.description}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-2xl font-bold text-green-600">${plant.price}</span>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <FaStar />
                      <span className="text-base-content font-semibold">{plant.rating}</span>
                    </div>
                  </div>
                  <div className="card-actions justify-end mt-4">
                    <Link
                      to={`/plants/${plant.plantId}`}
                      className="btn btn-primary bg-green-500 border-green-500 hover:bg-green-600 hover:border-green-600 btn-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link to="/plants" className="btn btn-outline btn-success btn-lg">
            View All Plants
          </Link>
        </div>
      </section>

      {/* Plant Care Tips Section */}
      <section className="py-16 bg-base-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              🌿 Plant Care Tips
            </h2>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              Essential guidelines to keep your green friends thriving all year round
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {careTips.map(tip => (
              <div
                key={tip.id}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="card-body items-center text-center">
                  <div className="mb-4">{tip.icon}</div>
                  <h3 className="card-title text-xl">{tip.title}</h3>
                  <p className="text-base-content/70">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plant of the Week Section */}
      {plantOfWeek && (
      <section className="py-10 bg-green-600">
        <div className="max-w-7xl mx-auto px-4">
          {/* Simple Header */}
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-2 text-white/80 text-sm uppercase tracking-widest mb-2">
              <FaAward /> Featured
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Plant of the Week</h2>
          </div>

          {/* Simple Card Layout */}
<div className="bg-white rounded-3xl shadow-lg overflow-hidden max-w-3xl mx-auto border border-gray-100">
  <div className="grid grid-cols-1 md:grid-cols-5">
    {/* Image */}
    <div className="relative md:col-span-2 h-72 md:h-auto">
      <img
        src={plantOfWeek.image}
        alt={plantOfWeek.plantName}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:bg-gradient-to-r" />
      <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-red-500 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-sm">
        🔥 20% OFF
      </span>
    </div>

    {/* Content */}
    <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-center">
      <span className="inline-flex items-center gap-1.5 text-emerald-600 font-semibold text-xs uppercase tracking-widest mb-3">
        <span className="w-2 h-2 bg-emerald-500 rounded-full inline-block" />
        {plantOfWeek.category}
      </span>

      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-2">
        {plantOfWeek.plantName}
      </h3>

      <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
        {plantOfWeek.description}
      </p>

      <div className="flex items-end gap-2 mb-6">
        <span className="text-3xl font-bold text-gray-900">${plantOfWeek.price}</span>
        <span className="text-lg text-gray-400 line-through mb-0.5">
          ${(plantOfWeek.price * 1.25).toFixed(2)}
        </span>
      </div>

      <Link
        to={`/plants/${plantOfWeek.plantId}`}
        className="group inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-3 rounded-full w-fit transition-all duration-300 hover:shadow-lg hover:shadow-emerald-200 active:scale-95"
      >
        Get It Now <FaArrowRight />
      </Link>
    </div>
  </div>
</div>

        </div>
      </section>
      )}

      {/* Meet Our Green Experts Section */}
      <section className="py-16 bg-base-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              👨‍🌾 Meet Our Green Experts
            </h2>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              Our team of plant specialists is here to help you every step of the way
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {experts.map(expert => (
              <div
                key={expert.id}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 duration-300"
              >
                <figure className="px-6 pt-6">
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className="rounded-full w-32 h-32 object-cover ring-4 ring-green-500 ring-offset-2"
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h3 className="card-title text-lg">{expert.name}</h3>
                  <p className="text-green-600 font-medium text-sm">{expert.specialty}</p>
                  <p className="text-base-content/60 text-sm">{expert.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eco Decor Ideas Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            🏡 Eco Decor Ideas
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Transform your living space with these inspiring plant styling ideas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative group overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1545241047-6083a3684587?w=600"
              alt="Living Room Plants"
              className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6 text-white">
                <h3 className="text-xl font-bold">Living Room Oasis</h3>
                <p className="text-white/80 text-sm">Create a tropical corner with tall plants</p>
              </div>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600"
              alt="Kitchen Herbs"
              className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6 text-white">
                <h3 className="text-xl font-bold">Kitchen Garden</h3>
                <p className="text-white/80 text-sm">Fresh herbs within arm's reach</p>
              </div>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1463320726281-696a485928c7?w=600"
              alt="Bedroom Plants"
              className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6 text-white">
                <h3 className="text-xl font-bold">Bedroom Sanctuary</h3>
                <p className="text-white/80 text-sm">Air-purifying plants for better sleep</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
