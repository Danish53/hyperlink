import Image from 'next/image';
import Footer from '../shared/footer';
import Header from '../shared/header';
import Link from 'next/link';
import { ArrowBigLeft, ArrowBigRight, ArrowBigRightDash } from 'lucide-react';
import { headers } from 'next/headers';
import { auth } from '../../lib/auth';

const Home = ({ session }: { session: any }) => {
  return (
    <div>
      <div>
        <Header session={session} />
      </div>
      <main className="">
        <div className="banner">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/images/banner-poster.jpg"
            className="banner-video"
            src="/video/video_t.mp4"
          >
            "your browser does not support the video tag."
          </video>
          <div className="banner-content">
            <div className="text-4xl bold">
              FYBIT - PnL leverage crypto trading platform, from traders to traders!
            </div>
            <div className="text-base my-2">
              Sign up to start trading and exploring the world of crypto
            </div>
            <form className="email-form">
              <input type="hidden" name="__RequestVerificationToken" />
              <input type="hidden" name="Other" value="1" />
              <input type="email" name="Email" placeholder="Enter your email" required />
              <button type="submit" className="fybit-btn sign-up-btn">
                Sign Up
              </button>
            </form>
          </div>
        </div>
        {/* PLATFORM SECTION */}
        <section className="bg-[#1a1a1a] py-8 w-full  text-white    flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Right Side (Image/Chart) */}
          <div className=" flex-1 flex justify-center  w-full">
            <div className="rounded-lg overflow-hidden shadow-lg max-w-lg w-full">
              <Image
                src="/images/chart1.png"
                alt="Trading chart platform interface"
                width={600}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          {/* Left Side (Text) */}
          <div className="flex-1 max-w-md ">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Platform</h2>
            <p className="text-gray-300 mb-6">
              Access full functionality and a professional trading interface directly from your
              desktop or mobile device.
            </p>

            <div className="flex gap-4  items-center justify-center">
              <button
                type="button"
                className="bg-[#46c4b3] hover:bg-[#d79b08] text-black font-semibold px-6 py-2 rounded-md transition-all"
              >
                Desktop
              </button>
              <button
                type="button"
                className="bg-transparent border border-[#46c4b3] text-[#46c4b3] font-semibold px-6 py-2 rounded-md hover:bg-[#46c4b3] hover:text-black transition-all"
              >
                Mobile
              </button>
            </div>
          </div>
        </section>

        {/*  STEPS SECTIONS  */}
        <section className="steps-section">
          <h2>How to start trading crypto</h2>
          <p>Get started in just a few minutes</p>
          <div className="steps-container">
            <div className="step-card">
              <div className="icon">
                <Image
                  src="/images/icons/account-index.png"
                  alt="
                Quick registration"
                  className=""
                  height={20}
                  width={20}
                />
              </div>
              <h3>Quick registration</h3>
              <p>
                Create an account in minutes.
                <Link href="/en/Account/Registration"> Sign Up</Link>
              </p>
            </div>
            <div className="arrow">
              <ArrowBigRight />
            </div>
            <div className="step-card">
              <div className="icon">
                <Image alt="name" width={20} height={20} src="/images/icons/wallet-index.png" />
              </div>
              <h3>Deposit funds</h3>
              <p>
                Seect currency, network, and
                <Link href="/en/howToDeposit"> fund through QR codefund through QR code</Link>
              </p>
            </div>
            <div className="arrow">
              <span>
                <ArrowBigRight />
              </span>
            </div>
            <div className="step-card">
              <div className="icon">
                <Image src="/images/icons/bitcoin-index.png" width={20} height={20} alt="btc" />
              </div>
              <h3>About FYBIt Services</h3>
              <p>
                Choose coin, order type, leerage, and direction.{' '}
                <Link href="/HowToTrade"> Find a detailed guide here</Link>
              </p>
            </div>
          </div>
        </section>

        {/*  SUPPORT SECTIONS */}
        <section className="support-section">
          <h2>Fybit by Your Side</h2>
          <div className="support-card-container">
            <div className="support-card support-card-gray">
              <h3>24/7 Customer Service</h3>
              <p>
                Your questions, answered. Contact Fybit customer support with your questions at any
                time.
              </p>
              <Link href="/en/support" className="support-link">
                Fybit help Center
              </Link>
            </div>
            <div className="support-card support-card-yellow">
              <h3>Join Our Community</h3>
              <p>
                The Tybit Global Community is home to millions of users from 200+ countries, with
                support for 20+ languages.
              </p>
              <div className="social-icons">
                <div className="social-icons">
                  <Link href="https://t.me/fybit" target="_blank" className="social-icon">
                    <Image src="/images/icons/telegram.png" alt="telegran" width={30} height={30} />
                  </Link>
                  <Link href="https://facebook.com/fybit" target="_blank" className="social-icon">
                    <Image src="/images/icons/facebook.png" alt="telegran" width={30} height={30} />
                  </Link>
                  <Link
                    href="https://www.youtube.com/@fybit_com"
                    target="_blank"
                    className="social-icon"
                  >
                    <Image src="/images/icons/youtube.png" alt="telegran" width={30} height={30} />
                  </Link>
                  <Link href="https://twitter.com/fybitcom" target="_blank" className="social-icon">
                    <Image src="/images/icons/twitter.png" alt="twitter" width={30} height={30} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SUBSCRIPTION */}
        <section className="subscription">
          <h2 className="text-3xl font-bold text-white mb-6">Get Started with Fybit</h2>

          <form className="flex flex-col items-center gap-4 w-full max-w-sm mx-auto">
            <input type="hidden" name="Other" value="1" />
            <div className="flex gap-4">
              <input
                type="email"
                name="Email"
                placeholder="Enter your email"
                required
                className="w-full bg-white text-black placeholder-gray-500 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#46c4b3]"
              />

              <button
                type="submit"
                className="bg-[#46c4b3] text-white border border-[#46c4b3] transition-colors duration-300 px-5 py-2.5 rounded-md cursor-pointer hover:bg-[#d79b08] hover:border-[#d79b08] w-full"
              >
                Sign Up
              </button>
            </div>
          </form>
        </section>
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
