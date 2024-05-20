
"use client"
import Navbar from "@/components/customComponents/navbar";
import Image from "next/image";
import { useState } from "react";
import Userinfo from "@/hooks/userinfo";
import Link from "next/link";

export default function Home() {
  const {user} = Userinfo()
  const capitalize = (str: string): string => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
<>
  <main className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-blue-600 text-white py-20">
          <div className="container mx-auto px-6 text-center">
            <h4 className="text-3xl font-bold mb-2">Welcome {capitalize(user.username)}</h4>
            <h2 className="text-5xl font-bold mb-2">Stay Organized with Our To-Do App</h2>
            <p className="text-xl mb-6">Manage your tasks efficiently and never miss a deadline.</p>
            <Link href={`${user ? "/dashboard" : "/signup"}`} className="bg-white text-blue-600 font-semibold py-2 px-4 rounded shadow-lg hover:bg-gray-100">Get Started</Link>
          </div>
         
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-8">Features</h2>
            <div className="flex flex-wrap justify-center">
              <div className="w-full md:w-1/3 p-4">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  
                  <h3 className="text-2xl font-bold mb-2">Easy to Use</h3>
                  <p className="text-gray-700">Our app is designed with simplicity in mind, allowing you to manage your tasks effortlessly.</p>
                </div>
              </div>
              <div className="w-full md:w-1/3 p-4">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                 
                  <h3 className="text-2xl font-bold mb-2">Reminders</h3>
                  <p className="text-gray-700">Set reminders for your tasks and never miss a deadline.</p>
                </div>
              </div>
              <div className="w-full md:w-1/3 p-4">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                 
                  <h3 className="text-2xl font-bold mb-2">Collaboration</h3>
                  <p className="text-gray-700">Work together with your team and get things done faster.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        {user ? <></> : <>     
        <section className="bg-blue-600 text-white py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-2">Ready to Boost Your Productivity?</h2>
            <p className="text-xl mb-6">Sign up today and start organizing your tasks effortlessly.</p>
            <Link href="/signup" className="bg-white text-blue-600 font-semibold py-2 px-4 rounded shadow-lg hover:bg-gray-100">Get Started</Link>
          </div>
        </section>
        </>}
      </main>
</>

  );
}
