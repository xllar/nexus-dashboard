export default function Footer() {
  return (
    <footer className="bg-purple-600 text-white py-6">
      <div className="container mx-auto flex flex-col items-center md:flex-row md:justify-between px-6 space-y-6 md:space-y-0">
        {/* Left Section */}
        <div className="text-center md:text-left">
          <p className="text-sm">&copy; {new Date().getFullYear()} Nexus Dashboard. All Rights Reserved.</p>
        </div>

        {/* Center Section (Links) */}
        <div className="flex flex-wrap justify-center md:justify-start gap-4">
          <a href="/privacy" className="text-sm hover:text-purple-300 transition-colors">Privacy Policy</a>
          <a href="/terms" className="text-sm hover:text-purple-300 transition-colors">Terms of Service</a>
        </div>

        {/* Right Section (Social Media Icons) */}
        <div className="flex gap-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 8H7v4h2v12h5V12h3.642L18 8h-4V6.5C14 6.102 14.149 6 14.5 6H18V2h-3.5C11.42 2 9 4.012 9 6.5V8z" />
            </svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.833.654-2.828.775 1.017-.611 1.798-1.574 2.165-2.724-.95.564-2.005.974-3.127 1.195C19.64 2.69 18.337 2 16.905 2c-2.691 0-4.877 2.185-4.877 4.877 0 .383.043.759.127 1.118C7.728 7.803 4.1 5.882 1.671 2.905c-.422.725-.664 1.565-.664 2.466 0 1.7.866 3.2 2.18 4.08-.803-.026-1.56-.247-2.228-.616v.062c0 2.37 1.685 4.348 3.918 4.794-.411.112-.845.172-1.292.172-.315 0-.623-.03-.923-.087.623 1.945 2.431 3.363 4.576 3.404-1.676 1.313-3.789 2.096-6.086 2.096-.395 0-.785-.023-1.17-.067C2.292 21.002 5.017 22 7.958 22c9.548 0 14.776-7.91 14.776-14.776 0-.225-.005-.449-.015-.673A10.576 10.576 0 0024 4.557z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
