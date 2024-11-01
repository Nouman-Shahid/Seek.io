export default function Footer() {
    return (
        <footer className="bg-white border-t py-10 px-6 text-gray-800 text-sm">
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-center md:text-left">
                {/* <div>
            <h3 className="font-semibold">Product</h3>
            <ul className="mt-2 space-y-1">
              <li>Business</li>
              <li>Designers</li>
              <li>Classrooms</li>
              <li>Newcomers</li>
            </ul>
          </div> */}
                <div>
                    <h3 className="font-semibold">Learning</h3>
                    <ul className="mt-2 space-y-1">
                        <li>Learn Hub</li>
                        <li>Manuals</li>
                        <li>Tutorials</li>
                        <li>Communities</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold">Resources</h3>
                    <ul className="mt-2 space-y-1">
                        <li>Tutorials</li>
                        <li>Editorials</li>
                        <li>Product</li>
                        <li>Newsroom</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold">About</h3>
                    <ul className="mt-2 space-y-1">
                        <li>Company</li>
                        <li>Careers</li>
                        <li>Legal</li>
                        <li>Help</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold">Plans</h3>
                    <ul className="mt-2 space-y-1">
                        <li>Free Plan</li>
                        <li>Bronze Plan</li>
                        <li>Gold Plan</li>
                        <li>Diamond Plan</li>
                    </ul>
                </div>
            </div>

            <div className="text-center mt-10">
                <h2 className="text-lg font-semibold">SEEKIO</h2>
                <p className="text-gray-600">
                    &copy; 2025 SEEKIO. All rights reserved.
                </p>
                {/* <div className="flex justify-center space-x-4 mt-4 text-xl">
            <i className="fab fa-facebook cursor-pointer"></i>
            <i className="fab fa-twitter cursor-pointer"></i>
            <i className="fab fa-instagram cursor-pointer"></i>
            <i className="fas fa-rss cursor-pointer"></i>
          </div> */}
            </div>
        </footer>
    );
}
