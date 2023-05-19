import axios from "axios";
import React, { useEffect, useState } from "react";
import { LINK_USER } from "../Data";
import ArticleSection from "./ArticleSection";
import ReviewSection from "./ReviewSection";
import EditProfile from "./EditProfile";
import profileBG from "../profile_page_bg.jpg";

const Profile = (props) => {
  const [user, setUser] = useState({});
  const [articles, setArticles] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showEditProfile, setShowEditProfile] = useState(false);

  useEffect(() => {
    let id = sessionStorage.getItem("userId");
    axios
      .get(`${LINK_USER}/getuserbyid/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onArticle = () => {
    axios
      .get(`http://localhost:5000/article/getarticlebyuserid/${user._id}`)
      .then((response) => {
        if (response.data !== "") {
          setArticles(response.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const onReview = () => {
    axios
      .get(`http://localhost:5000/review/getreviewsbyuserid/${user._id}`)
      .then((response) => {
        if (response.data !== "") {
          setReviews(response.data);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <section
        className=" bg-slate-400 pb-16 bg-cover bg-fixed"
        style={{ backgroundImage: `url(${profileBG})` }}
      >
        <div className="w-full px-4 mx-auto grid grid-cols-3 justify-around ">
          <div></div>
          <div className="relative w-2/3 lg:ml-36 col-span-2 min-w-0 break-words bg-white mb-6 shadow-xl rounded-lg mt-16 ">
            <div className="px-6 ">
              <div className="text-right mt-12">
                <button
                  onClick={() => {
                    setShowEditProfile(!showEditProfile);
                  }}
                  className="items-center relative  px-6 py-2 ml-2 overflow-hidden font-bold rounded-3xl group text-right mb-3 "
                >
                  <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-opacity-10 "></span>
                  <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-blue-400 opacity-100 group-hover:-translate-x-8"></span>
                  <span className="inline-flex gap-2 relative w-full text-left text-gray-800 transition-colors duration-200 ease-in-out ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      data-name="Layer 1"
                      fill="#1F2937"
                      className="hover:text-white"
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      id="edit"
                    >
                      <path d="M3.5,24h15A3.51,3.51,0,0,0,22,20.487V12.95a1,1,0,0,0-2,0v7.537A1.508,1.508,0,0,1,18.5,22H3.5A1.508,1.508,0,0,1,2,20.487V5.513A1.508,1.508,0,0,1,3.5,4H11a1,1,0,0,0,0-2H3.5A3.51,3.51,0,0,0,0,5.513V20.487A3.51,3.51,0,0,0,3.5,24Z"></path>
                      <path d="M9.455,10.544l-.789,3.614a1,1,0,0,0,.271.921,1.038,1.038,0,0,0,.92.269l3.606-.791a1,1,0,0,0,.494-.271l9.114-9.114a3,3,0,0,0,0-4.243,3.07,3.07,0,0,0-4.242,0l-9.1,9.123A1,1,0,0,0,9.455,10.544Zm10.788-8.2a1.022,1.022,0,0,1,1.414,0,1.009,1.009,0,0,1,0,1.413l-.707.707L19.536,3.05Zm-8.9,8.914,6.774-6.791,1.4,1.407-6.777,6.793-1.795.394Z"></path>
                    </svg>
                    Edit
                  </span>
                  <span className="absolute inset-0 border-2 border-blue-400 rounded-3xl"></span>
                </button>
                <h3 className="text-gray-800 text-2xl text-center font-bold sm:text-3xl mb-10 ">
                  {user.name}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase text-center">
                  {user.gender}
                </div>
                <div className="mb-2 text-blueGray-600 mt-4 text-center">
                  Enthusiastic Foody
                </div>
              </div>

              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <blockquote className="text-xl italic font-semibold text-gray-900 ">
                      <svg
                        aria-hidden="true"
                        class="w-10 h-10 text-gray-400 dark:text-gray-600"
                        viewBox="0 0 24 27"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                          fill="currentColor"
                        />
                      </svg>
                      <p>
                        " I consider myself a passionate food lover with an
                        insatiable curiosity for all things culinary. From the
                        moment I take that first bite, I am transported into a
                        world of flavors and textures that ignite my senses.
                        Whether it's exploring hidden gems in my city's vibrant
                        food scene or embarking on culinary adventures while
                        traveling, I am constantly on the lookout for new
                        gastronomic experiences to indulge in. I thrive on the
                        thrill of the unknown, always willing to push my taste
                        buds to new limits. Exotic spices, unusual ingredients,
                        and innovative cooking techniques fascinate me. I find
                        joy in discovering hidden flavors and savoring the
                        creativity and artistry behind each dish."
                      </p>
                    </blockquote>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 mt-8">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-2 w-1/2 p-3 text-center">
                      <button
                  onClick={onArticle}
                  className="items-center relative  px-10 py-2 ml-2 overflow-hidden font-bold rounded-3xl group text-right mb-3 "
                >
                  <span className="w-full h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-opacity-10 "></span>
                  <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-green-500 opacity-100 group-hover:-translate-x-8"></span>
                  <span className="inline-flex gap-2 relative w-full text-left text-gray-800 group-hover:text-white transition-colors duration-200 ease-in-out ">
                    ARTICLES
                  </span>
                  <span className="absolute inset-0 border-2 border-green-500 rounded-3xl"></span>
                </button>
                      <div className="flex flex-col gap-4">
                        {articles.map((article, key) => {
                          return (
                            <ArticleSection
                              article={article}
                              key={key}
                              setArticle={props.setArticle}
                            />
                          );
                        })}
                      </div>
                    </div>
                    <div className="lg:mr-4 w-1/2 p-3 text-center">
                      <button
                  onClick={onReview}
                  className="items-center relative  px-10 py-2 ml-2 overflow-hidden font-bold rounded-3xl group text-right mb-3 "
                >
                  <span className="w-full h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-opacity-10 "></span>
                  <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-yellow-500 opacity-100 group-hover:-translate-x-8"></span>
                  <span className="inline-flex gap-2 relative w-full text-left text-gray-800 group-hover:text-white transition-colors duration-200 ease-in-out ">
                    REVIEWS
                  </span>
                  <span className="absolute inset-0 border-2 border-yellow-500 rounded-3xl"></span>
                </button>
                      <div className="flex flex-col gap-4">
                        {reviews.map((review, key) => {
                          return <ReviewSection review={review} key={key} />;
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
      {showEditProfile && (
        <EditProfile
          setShowEditProfile={setShowEditProfile}
          user={user}
          setUser={setUser}
        />
      )}
    </div>
  );
};

export default Profile;
