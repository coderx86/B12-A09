import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaLeaf, FaSearch } from 'react-icons/fa';

const Plants = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetch('/plants.json')
      .then(res => res.json())
      .then(data => {
        setPlants(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching plants:', err);
        setLoading(false);
      });
  }, []);

  // Get unique categories
  const categories = ['All', ...new Set(plants.map(plant => plant.category))];

  // Filter plants based on search and category
  const filteredPlants = plants.filter(plant => {
    const matchesSearch = plant.plantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          plant.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || plant.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-green-500"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">
          <FaLeaf className="inline text-green-500 mr-2" />
          Our Plant Collection
        </h1>
        <p className="text-base-content/70 max-w-2xl mx-auto">
          Explore our curated selection of indoor plants, each chosen for their beauty and ability to thrive in your home
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Search Bar */}
        <div className="relative flex-1">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50" />
          <input
            type="text"
            placeholder="Search plants..."
            className="input input-bordered w-full py-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`btn btn-sm ${
                selectedCategory === category
                  ? 'btn-success text-white'
                  : 'btn-outline btn-success'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Plants Grid */}
      {filteredPlants.length === 0 ? (
        <div className="text-center py-20">
          <FaLeaf className="text-6xl text-base-content/30 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-base-content/70">No plants found</h3>
          <p className="text-base-content/50">Try adjusting your search or filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlants.map(plant => (
            <div
              key={plant.plantId}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group"
            >
              <figure className="relative overflow-hidden">
                <img
                  src={plant.image}
                  alt={plant.plantName}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 badge badge-success text-white">
                  {plant.careLevel}
                </div>
                {plant.availableStock < 6 && (
                  <div className="absolute top-4 right-4 badge badge-warning">
                    Only {plant.availableStock} left!
                  </div>
                )}
              </figure>
              <div className="card-body">
                <h3 className="card-title">
                  {plant.plantName}
                </h3>
                <div className="badge badge-outline badge-sm">{plant.category}</div>
                <p className="text-base-content/70 text-sm line-clamp-2">
                  {plant.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-600">${plant.price}</span>
                  <div className="flex items-center text-lg gap-1 text-yellow-500">
                    <FaStar />
                    <span className="text-base-content font-bold">{plant.rating}</span>
                  </div>
                </div>
                <div className="text-sm text-base-content/60">
                  by {plant.providerName}
                </div>
                <div className="card-actions justify-end">
                  <Link
                    to={`/plants/${plant.plantId}`}
                    className="btn btn-primary bg-green-500 border-green-500 hover:bg-green-600 hover:border-green-600 w-full"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Results Count */}
      <div className="text-center mt-8 text-base-content/60">
        Showing {filteredPlants.length} of {plants.length} plants
      </div>
    </div>
  );
};

export default Plants;
