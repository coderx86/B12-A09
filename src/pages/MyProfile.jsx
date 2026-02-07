import { useState } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { FaUser, FaEnvelope, FaCamera, FaEdit, FaSave, FaLeaf, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    photoURL: user?.photoURL || ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateUserProfile(formData.displayName, formData.photoURL);
      toast.success('🌿 Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      console.error('Profile update error:', err);
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Helper to format date
  const joinDate = user?.metadata?.creationTime 
    ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) 
    : 'Recently';

  return (
    <div className="min-h-screen bg-[#f8faf9] py-12 px-4 font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* Main Card Container */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 relative">
          
          {/* Decorative Top Banner */}
          <div className="h-48 bg-gradient-to-r from-emerald-700 to-green-600 relative overflow-hidden">
             {/* Abstract Leaf Pattern Overlay (CSS only decoration) */}
            <div className="absolute inset-0 opacity-10">
              <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
              </svg>
            </div>
          </div>

          <div className="px-8 pb-8">
            {/* Avatar - Floating halfway over banner */}
            <div className="relative -mt-20 mb-6 flex justify-center md:justify-start">
              <div className="relative group">
                <div className="w-40 h-40 rounded-full border-4 border-white shadow-lg overflow-hidden bg-emerald-50">
                  {user?.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-emerald-100 text-emerald-600">
                      <FaUser className="text-6xl" />
                    </div>
                  )}
                </div>
                {/* Status Indicator Dot */}
                <div className="absolute bottom-4 right-4 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
              </div>
            </div>

            {/* Content Area */}
            <div className="md:flex md:justify-between md:items-start">
              
              {/* Left Side: Header Info */}
              <div className="mb-8 text-center md:text-left">
                {!isEditing && (
                  <>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                      {user?.displayName || 'Plant Enthusiast'}
                    </h1>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 font-medium bg-gray-50 w-fit mx-auto md:mx-0 px-4 py-1.5 rounded-full border border-gray-100">
                      <FaEnvelope className="text-emerald-500 text-sm" />
                      <span className="text-sm">{user?.email}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Right Side: Edit Toggle (Only visible when not editing) */}
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="mx-auto md:mx-0 flex items-center gap-2 px-6 py-2.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-full font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <FaEdit />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>

            {/* Divider */}
            <hr className="border-gray-100 mb-8" />

            {/* MODE: EDIT FORM */}
            {isEditing ? (
              <form onSubmit={handleSubmit} className="animate-fade-in-up space-y-8 max-w-xl mx-auto md:mx-0">
                <div className="grid gap-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wide flex items-center gap-2">
                      <FaUser className="text-emerald-500" /> Display Name
                    </label>
                    <input
                      type="text"
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                      placeholder="e.g. Oliver Green"
                      required
                    />
                  </div>

                  {/* Photo URL Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wide flex items-center gap-2">
                      <FaCamera className="text-emerald-500" /> Profile Photo URL
                    </label>
                    <div className="flex gap-4 items-start">
                      <input
                        type="url"
                        name="photoURL"
                        value={formData.photoURL}
                        onChange={handleInputChange}
                        className="flex-1 px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                        placeholder="https://example.com/my-photo.jpg"
                      />
                      {/* Mini Preview in Form */}
                      {formData.photoURL && (
                        <div className="w-14 h-14 rounded-xl overflow-hidden border border-gray-200 shrink-0">
                          <img 
                            src={formData.photoURL} 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                            onError={(e) => e.target.style.display = 'none'}
                          />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 pl-1">Paste a direct link to an image to update your avatar.</p>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex items-center gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-emerald-200 transition-all flex justify-center items-center gap-2 disabled:opacity-70"
                  >
                    {loading ? <span className="loading loading-spinner loading-sm"></span> : <><FaSave /> Save Changes</>}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    disabled={loading}
                    className="px-6 py-3.5 rounded-xl text-gray-500 hover:bg-gray-100 font-bold transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              /* MODE: VIEW DETAILS */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                {/* Account Status Card */}
                <div className="bg-[#f2f7f5] rounded-2xl p-6 border border-emerald-100/50">
                   <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg">GreenNest Member</h3>
                        <p className="text-emerald-600 text-sm font-medium">Verified Account</p>
                      </div>
                      <div className="bg-white p-2 rounded-full shadow-sm text-emerald-600">
                        <FaLeaf />
                      </div>
                   </div>
                   <div className="mt-4">
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Member Since</p>
                      <p className="text-gray-700 font-semibold">{joinDate}</p>
                   </div>
                </div>

                {/* Stat/Info Card */}
                <div className="bg-white rounded-2xl p-6 border border-dashed border-gray-300 flex flex-col justify-center items-center text-center hover:border-emerald-400 transition-colors">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-3">
                    <FaUser />
                  </div>
                  <h4 className="text-gray-900 font-bold">Personal Details</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Your profile is visible to other plant lovers in the community.
                  </p>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;