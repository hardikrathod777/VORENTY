import { Check, Star, StarHalf } from 'lucide-react'
import "./landing.css";
import { useState } from 'react';
import Heroimg from "../../assets/images/cover/image.png";
import aprioImg from "../../assets/images/cover/Clients_img/aprio.png";
import githubImg from "../../assets/images/cover/Clients_img/github.png";
import stripeImg from "../../assets/images/cover/Clients_img/stripe.png";
import xeroImg from "../../assets/images/cover/Clients_img/xero.png";
import swatchGroupImg from "../../assets/images/cover/Clients_img/swatch_group.png";
import warbyParkerImg from "../../assets/images/cover/Clients_img/warby_parker.png";
import { Link } from 'react-router-dom';
import DarkGradientButton from '../../components/Button/DarkGradientButton';
import LandingFooter from '../../components/Landing/LandingFooter';
import { FaRocket, FaSignInAlt } from 'react-icons/fa';

export default function LandingPage() {

  const [selectedCard, setSelectedCard] = useState(0); // State to manage selected card

  // Card data
  const cards = [
    {
      title: "Organize my own expenses",
      subtitle: null,
      icon: "💰",
    },
    {
      title: "Manage expenses for a small team",
      subtitle: "(1-9 employees)",
      icon: "🚀",
    },
    {
      title: "Control expenses for a larger organization",
      subtitle: "(10+ employees)",
      icon: "🦋",
    },
  ];
  return (
    <>
      <div className="min-h-screen hero-img overflow-hidden">
        {/* Header */}
        <header className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="text-4xl font-bold text-[#0b2838]">VORANTY</div>
          <Link to="/login">
            <DarkGradientButton label="Sign In" icon={<FaSignInAlt className="h-5 w-5" />} />
          </Link>
        </header>

        {/* Hero Section */}
        <main className="container mx-auto px-4 py-12 grid lg:grid-cols-2 gap-12 items-center ">
          <div className="space-y-8">
            {/* Rating */}
            <div className="flex items-center gap-2">
              <h1 className="text-4xl md:text-5xl font-serif text-[#ffffff] leading-tight">
                Travel and expense, at the speed of chat.
              </h1>

            </div>

            {/* Features List */}
            <div className="space-y-5">
              {[
                "All inclusive. Manage expenses, book travel, reimburse employees, create expense reports, and send invoices.",
                "Corporate card. Cash back on all US purchases. Fraud protection.",
                "45+ integrations. Quickbooks, NetSuite, Sage Intacct, Xero, Workday, Gusto, and so much more.",
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-2 text-[16px] font-medium text-[#ffffff]">
                  <Check className="w-5 h-5 mt-1 flex-shrink-0" />
                  <p>{feature}</p>
                </div>
              ))}
            </div>

            {/* Selection Cards */}
            <div>
              <h2 className="text-white text-xl font-medium mb-4">I want to:</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {cards.map((card, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedCard(index)} // Set selected card state
                    className={`cursor-pointer relative p-6 rounded-lg text-center transition-all duration-300
                  ${selectedCard === index
                        ? "bg-[#37B5FF] text-white shadow-2xl" // Selected: Light Blue
                        : "bg-[#0B2838] text-[#37B5FF] hover:bg-[#1C3D4C] hover:text-white"
                      }`}
                  >
                    <div className="text-4xl mb-4">{card.icon}</div>
                    <h3 className="text-lg font-semibold">{card.title}</h3>
                    {card.subtitle && (
                      <p className="text-sm mt-1">{card.subtitle}</p>
                    )}
                    {/* Small white circle for selected card */}
                    {selectedCard === index && (
                      <div className="mt-4 absolute top-0">
                        <div className="w-5 h-5 bg-white rounded-full mx-auto"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Get Started Form */}
            <div className="space-y-4 w-52">
              <Link to="/register">
                <DarkGradientButton label="Let's Get Started" icon={<FaRocket className="h-5 w-5" />} />
              </Link>

            </div>
          </div>

          {/* App Preview */}
          <div className="hidden lg:block">
            <div className=" rounded-lg w-[1029px] p-4 relative">
              <img
                src={Heroimg}
                alt="Expensify App Preview"
                className="rounded-lg img-hero"
              />
            </div>
          </div>
        </main>
      </div>


      {/* Client */}
      <section className="bg-[#103b52] px-4 py-12 text-center">
        <p className="text-2xl md:text-3xl text-white font-serif">
          Join people using Expensify to streamline their expense management
        </p>
        <div className="clientBox flex justify-evenly flex-wrap mt-5">
          {/* <img className='' src={Clientimg} alt="" /> */}
          <div className="clientImgBox flex items-center">
            <img src={aprioImg} alt="Aprio" />
          </div>
          <div className="clientImgBox flex items-center">
            <img src={githubImg} alt="Github" />
          </div>
          <div className="clientImgBox flex items-center">
            <img src={stripeImg} alt="Stripe" />
          </div>
          <div className="clientImgBox flex items-center">
            <img src={xeroImg} alt="Xero" />
          </div>
          <div className="clientImgBox flex items-center">
            <img src={swatchGroupImg} alt="SwatchGroup" />
          </div>
          <div className="clientImgBox flex items-center">
            <img src={warbyParkerImg} alt="WarbyParker" />
          </div>
        </div>
      </section>

      <LandingFooter />
    </>
  )
}

