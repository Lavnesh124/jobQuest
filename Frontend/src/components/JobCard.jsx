import React from 'react';


function jobCard() {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 relative">
            {/* Image in the top left corner */}
            <img
                src="https://via.placeholder.com/50"
                alt="profile"
                className="w-12 h-12 rounded-full absolute top-4 left-4 object-cover"
            />
            {/* Card content with padding to avoid overlap */}
            <div className="pl-20">
                <h5 className="font-bold text-xl mb-2">Card Title</h5>
                <h6 className="text-gray-600 mb-4">Card Subtitle</h6>
            </div>
            <div>
                <p className="text-gray-700 text-base">
                    Some quick example text to build on the card title and make up the bulk
                    of the card's content.
                </p>
                <div className="mt-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition mr-10">
                        Button 1
                    </button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition ">
                        Button 2
                    </button>
                </div>
            </div>
        </div>
    );
}

export default jobCard
