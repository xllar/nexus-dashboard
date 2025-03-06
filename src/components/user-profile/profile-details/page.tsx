/* eslint-disable @next/next/no-img-element */
export default function ProfileDetails() {
  return (
    <div className="space-y-6">
      {/* Profile Information */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Profile Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-700">Full Name</label>
            <p className="text-gray-500">Admin</p>
          </div>
          <div>
            <label className="text-gray-700">Email</label>
            <p className="text-gray-500">admin@example.com</p>
          </div>
          <div>
            <label className="text-gray-700">Phone Number</label>
            <p className="text-gray-500">(123) 456-7890</p>
          </div>
          <div>
            <label className="text-gray-700">Address</label>
            <p className="text-gray-500">123 Main St, City, Country</p>
          </div>
        </div>
      </div>

      {/* Profile Picture Section */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Profile Picture</h3>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src="/profile-pic.jpg"
              alt="Profile Picture"
              className="h-20 w-20 rounded-full border-2 border-blue-500 shadow-md"
            />
            <div className="absolute bottom-0 right-0 bg-blue-500 p-1 rounded-full border-2 border-white">
              <span className="text-white text-sm">Edit</span>
            </div>
          </div>
          <p className="text-gray-500">Click to change</p>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Social Media</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <span className="font-medium text-gray-700">Facebook:</span>
            <a href="https://facebook.com/admin" className="text-blue-500 hover:underline">
              facebook.com/admin
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <span className="font-medium text-gray-700">Twitter:</span>
            <a href="https://twitter.com/admin" className="text-blue-500 hover:underline">
              twitter.com/admin
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <span className="font-medium text-gray-700">LinkedIn:</span>
            <a href="https://linkedin.com/in/admin" className="text-blue-500 hover:underline">
              linkedin.com/in/admin
            </a>
          </div>
        </div>
      </div>

      {/* Detailed Address */}
      <div className="bg-gray=50 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Address Details</h3>
        <div>
          <label className="text-gray-700">Street Address</label>
          <p className="text-gray-500">123 Main St</p>
        </div>
        <div>
          <label className="text-gray-700">City</label>
          <p className="text-gray-500">City</p>
        </div>
        <div>
          <label className="text-gray-700">State</label>
          <p className="text-gray-500">State</p>
        </div>
        <div>
          <label className="text-gray-700">Country</label>
          <p className="text-gray-500">Country</p>
        </div>
        <div>
          <label className="text-gray-700">ZIP Code</label>
          <p className="text-gray-500">12345</p>
        </div>
      </div>
    </div>
  );
}
