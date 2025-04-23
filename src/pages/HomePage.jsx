import React from "react";
import { Link } from "react-router-dom";
import Button from "@/component/UI/Button";
import CardComp from "@/component/CardComp";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <>
      {/* Hero Section with Background Video */}
      <section className="relative min-h-screen text-white overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/HeroVideo.mp4.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Welcome to <span className="text-green-400">RecipeNest </span>
          </motion.h1>

          <p className="text-lg md:text-xl mb-6 max-w-2xl">
            Discover mouth-watering recipes and connect with expert chefs from around the world.
          </p>

          <div className="flex justify-center flex-wrap gap-4 mb-10">
            <Link to="/chefs">
              <Button>Explore Chefs</Button>
            </Link>
            <Link to="/recipes">
              <Button> Browse Recipes </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="bg-white text-gray-800 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Categories</h2>
          <p className="text-lg text-gray-600">Find recipes by category and taste.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <CardComp
            title="Burgers"
            description="Juicy and loaded with flavors you will never forget."
            image="/Images/Burger.jpg"
          >
            <Button>View Recipes</Button>
          </CardComp>

          <CardComp
            title="Pizza"
            description="Oven-baked perfection with endless toppings."
            image="/Images/pizza.jpeg"
          >
            <Button>View Recipes</Button>
          </CardComp>

          <CardComp
            title="Vegetarian"
            description="Healthy, wholesome, and delicious plant-based meals."
            image="/Images/vegeterian.jpeg"
          >
            <Button>Explore Veg</Button>
          </CardComp>

          <CardComp
            title="Desserts"
            description="Sweet treats for every occasion. Try it and enjoy it."
            image="/Images/dessert.jpeg"
          >
            <Button>See Sweets</Button>
          </CardComp>
        </div>
      </section>

      {/* Featured Recipes Scroll Section */}
      <section className="bg-gray-100 text-gray-900 py-16 px-4">
        <div className="max-w-6xl mx-auto mb-8">
          <h2 className="text-3xl font-bold mb-2">Featured Recipes</h2>
          <p className="text-gray-600">Handpicked favorites you'll love to try today.</p>
        </div>

        <div className="overflow-x-auto">
          <div className="flex gap-6 max-w-6xl mx-auto pb-4">
            <div className="min-w-[250px]">
              <CardComp
                title="Spaghetti Carbonara"
                description="Classic Italian pasta with creamy egg sauce."
                image="/Images/spaghetti.jpeg"
              >
                <Button>Try Now</Button>
              </CardComp>
            </div>

            <div className="min-w-[250px]">
              <CardComp
                title="Chicken Tikka"
                description="Tender, spicy grilled chicken delight."
                image="/Images/tikka.jpeg"
              >
                <Button>Explore</Button>
              </CardComp>
            </div>

            <div className="min-w-[250px]">
              <CardComp
                title="Sushi Platter"
                description="Fresh, colorful, and deliciously authentic."
                image="/Images/sushi.jpeg"
              >
                <Button>View</Button>
              </CardComp>
            </div>

            <div className="min-w-[250px]">
              <CardComp
                title="Churros & Chocolate"
                description="Crispy treats dipped in rich chocolate."
                image="/Images/churros.jpeg"
              >
                <Button>Dive In</Button>
              </CardComp>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
