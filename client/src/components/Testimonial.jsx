import Title from "./Title";

const Testimonial = () => {
  return (
    <>
      <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-sky-50 pt-20 pb-20">
        <Title
          title={"What Our Guests Say"}
          subTitle={
            "Discover why discerning travelers consistently choose GoStays for their exclusive & luxurious accommodations around the world."
          }
        />
        <div class="flex flex-wrap items-center justify-center gap-6 pt-24 px-4 sm:px-6 lg:px-8 cursor-pointer ">
          <div class="w-full sm:w-80 border border-gray-300 pb-6 md:mb-0 mb-12 rounded-lg bg-white shadow-lg transform transition duration-300 hover:scale-105">
            <div class="flex flex-col items-center px-5 py-4 relative">
              <img
                class="h-24 w-24 absolute -top-14 rounded-full object-cover border-4 border-white shadow-md"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
                alt="Donald Jackman"
              />
              <div class="pt-8 text-center">
                <h1 class="text-xl font-semibold text-gray-800 mt-2">
                  Donald Jackman
                </h1>
                <p class="text-gray-600">Content Creator</p>
              </div>
            </div>
            <p class="text-gray-700 px-6 text-center text-base leading-relaxed">
              I've been using imagify for nearly two years, primarily for
              Instagram, and it has been incredibly user-friendly, making my
              work much easier.
            </p>
            <div class="flex justify-center pt-4">
              <div class="flex gap-1 text-orange-500">
                <svg
                  class="w-5 h-5"
                  viewBox="0 0 22 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" />
                </svg>
                <svg
                  class="w-5 h-5"
                  viewBox="0 0 22 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" />
                </svg>
                <svg
                  class="w-5 h-5"
                  viewBox="0 0 22 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" />
                </svg>
                <svg
                  class="w-5 h-5"
                  viewBox="0 0 22 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" />
                </svg>
                <svg
                  class="w-5 h-5"
                  viewBox="0 0 22 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" />
                </svg>
              </div>
            </div>
          </div>

          <div class="w-full sm:w-80 border border-gray-300 pb-6 md:mb-0 mb-12 cursor-pointer rounded-lg bg-white shadow-lg transform transition duration-300 hover:scale-105">
            <div class="flex flex-col items-center px-5 py-4 relative">
              <img
                class="h-24 w-24 absolute -top-14 rounded-full object-cover border-4 border-white shadow-md"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
                alt="Richard Nelson"
              />
              <div class="pt-8 text-center">
                <h1 class="text-xl font-semibold text-gray-800 mt-2">
                  Richard Nelson
                </h1>
                <p class="text-gray-600">Instagram Influencer</p>
              </div>
            </div>
            <p class="text-gray-700 px-6 text-center text-base leading-relaxed">
              I've been using imagify for nearly two years, primarily for
              Instagram, and it has been incredibly user-friendly, making my
              work much easier.
            </p>
            <div class="flex justify-center pt-4">
              <div class="flex gap-1 text-orange-500">
                <svg
                  class="w-5 h-5"
                  viewBox="0 0 22 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" />
                </svg>
                <svg
                  class="w-5 h-5"
                  viewBox="0 0 22 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" />
                </svg>
                <svg
                  class="w-5 h-5"
                  viewBox="0 0 22 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" />
                </svg>
                <svg
                  class="w-5 h-5"
                  viewBox="0 0 22 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" />
                </svg>
                <svg
                  class="w-5 h-5"
                  viewBox="0 0 22 20"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" />
                </svg>
              </div>
            </div>
          </div>

          <div class="w-full sm:w-80 border border-gray-300 pb-6 rounded-lg bg-white shadow-lg transform transition duration-300 hover:scale-105 cursor-pointer">
            <div class="flex flex-col items-center px-5 py-4 relative">
              <img
                class="h-24 w-24 absolute -top-14 rounded-full object-cover border-4 border-white shadow-md"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
                alt="James Washington"
              />
              <div class="pt-8 text-center">
                <h1 class="text-xl font-semibold text-gray-800 mt-2">
                  James Washington
                </h1>
                <p class="text-gray-600">Marketing Manager</p>
              </div>
            </div>
            <p class="text-gray-700 px-6 text-center text-base leading-relaxed">
              I've been using imagify for nearly two years, primarily for
              Instagram, and it has been incredibly user-friendly, making my
              work much easier.
            </p>
            <div class="flex justify-center pt-4">
              <div class="flex gap-1 text-orange-500">
                <svg
                  class="w-5 h-5"
                  viewBox="0 0 22 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" />
                </svg>
                <svg
                  class="w-5 h-5"
                  viewBox="0 0 22 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" />
                </svg>
                <svg
                  class="w-5 h-5"
                  viewBox="0 0 22 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" />
                </svg>
                <svg
                  class="w-5 h-5"
                  viewBox="0 0 22 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" />
                </svg>
                <svg
                  class="w-5 h-5"
                  viewBox="0 0 22 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
