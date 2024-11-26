import React from "react";
import "../styles/successStories.css";

const SuccessStories = () => {
  const stories = [
    {
      id: 1,
      image: "https://st2.depositphotos.com/1694341/48383/i/450/depositphotos_483839942-stock-photo-los-angeles-jul-john-legend.jpg",
      title: "Landing a Dream Job",
      description: "John used our platform to find his dream job as a software engineer at a top tech company.",
    },
    {
      id: 2,
      image: "https://media.istockphoto.com/id/1326417862/photo/young-woman-laughing-while-relaxing-at-home.jpg?s=612x612&w=0&k=20&c=cd8e6RBGOe4b8a8vTcKW0Jo9JONv1bKSMTKcxaCra8c=",
      title: "Growing a Small Business",
      description: "Emma connected with skilled professionals through our platform and expanded her business.",
    },
    {
      id: 3,
      image: "https://media.istockphoto.com/id/1364917563/photo/businessman-smiling-with-arms-crossed-on-white-background.jpg?s=612x612&w=0&k=20&c=NtM9Wbs1DBiGaiowsxJY6wNCnLf0POa65rYEwnZymrM=",
      title: "Career Change Success",
      description: "David transitioned from teaching to web development with opportunities found here.",
    },
  ];

  return (
    <div className="success-stories">
      <h1>Success Stories</h1>
      <p>Be inspired by the success stories of individuals and businesses who found success through our platform.</p>

      <div className="stories-grid">
        {stories.map((story) => (
          <div key={story.id} className="story-card">
            <img src={story.image} alt={story.title} />
            <h3>{story.title}</h3>
            <p>{story.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuccessStories;
