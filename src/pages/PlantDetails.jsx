import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { FaStar, FaLeaf, FaArrowLeft, FaCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';

const PlantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch('/plants.json')
      .then(res => res.json())
      .then(data => {
        const foundPlant = data.find(p => p.plantId === parseInt(id));
        setPlant(foundPlant);
        setLoading(false);
        // Pre-fill form with user data if available
        if (user) {
          setFormData({
            name: user.displayName || '',
            email: user.email || ''
          });
        }
      })
      .catch(err => {
        console.error('Error fetching plant:', err);
        setLoading(false);
      });
  }, [id, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success('🌿 Consultation booked successfully! We\'ll contact you soon.', {
        position: 'top-right',
        autoClose: 3000
      });
      setFormData({ name: '', email: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-green-500"></span>
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <FaLeaf className="text-6xl text-base-content/30 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Plant Not Found</h2>
        <p className="text-base-content/60 mb-6">The plant you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/plants')} className="btn btn-success">
          Browse Plants
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 max-w-7xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="btn btn-ghost mb-6 gap-2"
      >
        <FaArrowLeft /> Back
      </button>

      {/* 3 Column Grid: Image | Info | Consultation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Column 1: Plant Image */}
        <div className="relative">
          <img
            src={plant.image}
            alt={plant.plantName}
            className="w-full h-[400px] lg:h-[500px] object-cover rounded-2xl shadow-xl"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="badge badge-success badge-lg text-white">{plant.careLevel}</span>
            <span className="badge badge-primary badge-lg">{plant.category}</span>
          </div>
        </div>

        {/* Column 2: Plant Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-2">{plant.plantName}</h1>
          
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-1 text-yellow-500">
              <FaStar className="text-lg" />
              <span className="text-base font-semibold text-base-content">{plant.rating}</span>
            </div>
            <span className="text-base-content/40">|</span>
            <span className="text-base-content/60 text-sm">by {plant.providerName}</span>
          </div>

          <p className="text-2xl font-bold text-green-600 mb-4">${plant.price}</p>

          <p className="text-base-content/80 mb-4 leading-relaxed">
            {plant.description}
          </p>

          {/* Plant Details Grid */}
          <div className="grid grid-cols-2 gap-3 mt-auto">
            <div className="bg-base-200 p-3 rounded-xl">
              <p className="text-xs text-base-content/60">Care Level</p>
              <p className="font-semibold text-green-600">{plant.careLevel}</p>
            </div>
            <div className="bg-base-200 p-3 rounded-xl">
              <p className="text-xs text-base-content/60">Category</p>
              <p className="font-semibold">{plant.category}</p>
            </div>
            <div className="bg-base-200 p-3 rounded-xl">
              <p className="text-xs text-base-content/60">Stock</p>
              <p className={`font-semibold ${plant.availableStock < 6 ? 'text-warning' : 'text-success'}`}>
                {plant.availableStock} units
              </p>
            </div>
            <div className="bg-base-200 p-3 rounded-xl">
              <p className="text-xs text-base-content/60">Provider</p>
              <p className="font-semibold text-sm">{plant.providerName}</p>
            </div>
          </div>
        </div>

        {/* Column 3: Book Consultation Form */}
        <div className="bg-base-200 p-6 rounded-2xl h-fit">
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
            <FaLeaf className="text-green-500" />
            Book a Consultation
          </h3>
          <p className="text-base-content/60 text-sm mb-4">
            Need help caring for this plant? Book a free consultation with our experts!
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="input input-bordered w-full"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-success w-full text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <>
                  <FaCheck /> Book Now
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlantDetails;
