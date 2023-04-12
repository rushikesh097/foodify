import axios from "axios";
import React, { useEffect, useState } from "react";
import { LINK_USER } from "../Data";
import ArticleSection from "./ArticleSection";
import ReviewSection from "./ReviewSection";
import EditProfile from "./EditProfile";

const Profile = (props) => {

    const [user, setUser] = useState({});
    const [articles,setArticles] = useState([])
    const [reviews, setReviews] = useState([]);
    const [showEditProfile,setShowEditProfile] = useState(false);

    useEffect(() => {
        let id = sessionStorage.getItem("userId")
        axios.get(`${LINK_USER}/getuserbyid/${id}`)
        .then((response) => {
            setUser(response.data)
        })
        .catch((err) => {
            console.log(err);
        })
    },[])

    const onArticle = () => {
        axios.get(
          `http://localhost:5000/article/getarticlebyuserid/${user._id}`
        )
        .then((response) => {
            if(response.data !== ""){
                setArticles(response.data);
            }
        })
        .catch(err => console.log(err));
    }

    const onReview = () => {
        axios
          .get(`http://localhost:5000/review/getreviewsbyuserid/${user._id}`)
          .then((response) => {
            if (response.data !== "") {
              setReviews(response.data);
            }
          })
          .catch((err) => console.log(err));
    }

  return (
    <div>
      <section className="pt-16 bg-blueGray-50">
        <div className="w-full lg:w-1/2 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="px-6">
              <div className="text-center mt-12">
                <button
                  className="text-sm text-white font-bold block uppercase tracking-wide text-blueGray-600 py-2 rounded-md bg-blue-400 px-8 hover:bg-blue-300 active:bg-slate-100 mb-2"
                  onClick={()=>{
                    setShowEditProfile(!showEditProfile)
                  }}
                >
                  Edit
                </button>
                <h3 className="text-xl font-semibold leading-normal text-blueGray-700 mb-2">
                  {user.name}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  {user.gender}
                </div>
                <div className="mb-2 text-blueGray-600 mt-10">
                  <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                  Enthusiastic Foody
                </div>
              </div>
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 flex justify-center">
                  <div className="relative">
                    <img
                      alt="..."
                      src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                      className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                    />
                  </div>
                </div>
                <div className="w-full px-4 mt-10">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-2 w-1/2 p-3 text-center">
                      <button
                        className="text-xl w-full font-bold block uppercase tracking-wide text-blueGray-600 py-2 rounded-md bg-green-400 px-8 hover:bg-green-500
                      active:bg-slate-100 mb-2"
                        onClick={onArticle}
                      >
                        Articles
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
                        className="text-xl w-full font-bold block uppercase tracking-wide text-blueGray-600 py-2 rounded-md bg-yellow-400 px-8 hover:bg-yellow-500
                      active:bg-slate-100 mb-2"
                        onClick={onReview}
                      >
                        Reviews
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
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      An artist of considerable range, Jenna the name taken by
                      Melbourne-raised, Brooklyn-based Nick Murphy writes,
                      performs and records all of his own music, giving it a
                      warm, intimate feel with a solid groove structure. An
                      artist of considerable range.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {
        showEditProfile && (
          <EditProfile setShowEditProfile={setShowEditProfile} user={user} setUser={setUser}/>
        )
      }
    </div>
  );
};

export default Profile;
